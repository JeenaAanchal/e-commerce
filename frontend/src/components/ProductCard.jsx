import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow">
      <img src={product.images?.[0]} alt={product.name} className="h-44 w-full rounded-lg object-cover" />
      <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>
      <p className="text-sm text-slate-500">${product.price}</p>
      <Link to={`/product/${product._id}`} className="mt-3 inline-block text-blue-600">
        View details
      </Link>
    </div>
  );
}
