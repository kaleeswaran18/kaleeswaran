import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const Home = lazy(() => import('../pages/Home/Home'));
const Category = lazy(() => import('../pages/Category/Category'));
const Learning = lazy(() => import('../pages/Learning/Learning'));
const Settings = lazy(() => import('../pages/Settings/Settings'));

function PageLoader() {
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50dvh',
    }}>
      <div className="spinner" />
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="category/:categoryId" element={<Category />} />
          <Route path="learn/:categoryId/:subcategoryId" element={<Learning />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
