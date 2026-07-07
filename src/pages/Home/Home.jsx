import { getCategories } from '../../utils/dataLoader';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import FocusGrid from '../../components/FocusGrid/FocusGrid';
import './Home.css';

export default function Home() {
  const categories = getCategories();
  console.log(categories);

  return (
    <div className="page-container home">
      <header className="home__header animate-fade-in">
        <h1 className="page-title">Learn English</h1>
        <p className="page-subtitle">Choose a category to start learning</p>
      </header>

      <FocusGrid>
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            to={`/category/${category.id}`}
            name={category.name}
            image={category.image}
          />
        ))}
      </FocusGrid>
    </div>
  );
}
