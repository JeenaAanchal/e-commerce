import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import api from '../api/client';
import { addToCart } from '../features/cart/cartSlice';
import { toggleWishlist } from '../features/wishlist/wishlistSlice';

export default function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <img src={product.images?.[0]} alt={product.name} className="w-full rounded-xl object-cover" />
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="mt-2 text-slate-600">{product.description}</p>
        <p className="mt-4 text-2xl font-semibold">${product.price}</p>
        <p className="mt-2 text-sm">Rating: {product.rating} ({product.numReviews} reviews)</p>
        <div className="mt-4 flex gap-3">
          <input type="number" min="1" value={qty} onChange={(e) => setQty(Number(e.target.value))} className="w-20 rounded border p-2" />
          <button
            className="rounded bg-blue-600 px-4 py-2 text-white"
            onClick={() => dispatch(addToCart({ ...product, qty }))}
          >
            Add to Cart
          </button>
          <button className="rounded border px-4 py-2" onClick={() => dispatch(toggleWishlist(product._id))}>
            Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
