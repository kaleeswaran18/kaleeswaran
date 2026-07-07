import { useState, useEffect, useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getVocabularyItems } from '../../utils/dataLoader';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import PageHeader from '../../components/PageHeader/PageHeader';
import { useLearningVerticalNav } from '../../hooks/useLearningNavigation';
import './Learning.css';

export default function Learning() {
  const { categoryId, subcategoryId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const pageRef = useRef(null);

  useLearningVerticalNav(pageRef);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const result = await getVocabularyItems(categoryId, subcategoryId);
        if (!cancelled) {
          if (result) setData(result);
          else setError(true);
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [categoryId, subcategoryId]);

  if (error) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="learning-page" ref={pageRef}>
        <PageHeader
          backTo={`/category/${categoryId}`}
          backLabel="Back to category"
        />
        <div className="learning-page__loading">
          <div className="spinner" />
        </div>
      </div>
    );
  }

  return (
    <div className="learning-page" ref={pageRef}>
      <PageHeader
        title={data.subcategory.name}
        backTo={`/category/${categoryId}`}
        backLabel="Back to category"
      />
      <ImageSlider items={data.items} categoryName={data.subcategory.name} />
    </div>
  );
}
