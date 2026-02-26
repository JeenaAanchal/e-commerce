import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeatured } from '../features/products/productSlice';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const dispatch = useDispatch();
  const { featured } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchFeatured());
  }, [dispatch]);

  return (
    <section>
      <h1 className="mb-4 text-3xl font-bold">Featured Products</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {featured.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
