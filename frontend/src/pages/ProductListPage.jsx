import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productSlice';
import ProductCard from '../components/ProductCard';

export default function ProductListPage() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const [filters, setFilters] = useState({ keyword: '', category: '', sort: 'createdAt' });

  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch, filters]);

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold">Shop Products</h1>
      <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        <input
          placeholder="Search"
          className="rounded border p-2"
          onChange={(e) => setFilters((s) => ({ ...s, keyword: e.target.value }))}
        />
        <input
          placeholder="Category ID"
          className="rounded border p-2"
          onChange={(e) => setFilters((s) => ({ ...s, category: e.target.value }))}
        />
        <select className="rounded border p-2" onChange={(e) => setFilters((s) => ({ ...s, sort: e.target.value }))}>
          <option value="createdAt">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>
      {loading ? <p>Loading...</p> : null}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
