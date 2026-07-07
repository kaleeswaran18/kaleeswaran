import { useParams, Navigate } from 'react-router-dom';
import { getCategoryById } from '../../utils/dataLoader';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import FocusGrid from '../../components/FocusGrid/FocusGrid';
import PageHeader from '../../components/PageHeader/PageHeader';
import './Category.css';

export default function Category() {
  const { categoryId } = useParams();
  const category = getCategoryById(categoryId);

  if (!category) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="category-page">
      <PageHeader title={category.name} backTo="/" backLabel="Back to Home" />

      <div className="page-container">
        <p className="page-subtitle">Choose a topic</p>
        <FocusGrid>
          {category.subcategories.map((sub) => (
            <CategoryCard
              key={sub.id}
              to={`/learn/${categoryId}/${sub.id}`}
              name={sub.name}
              image={sub.image}
            />
          ))}
        </FocusGrid>
      </div>
    </div>
  );
}
