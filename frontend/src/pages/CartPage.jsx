import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart } from '../features/cart/cartSlice';

export default function CartPage() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold">Cart</h1>
      {cartItems.map((item) => (
        <div key={item._id} className="mt-3 flex items-center justify-between rounded bg-white p-3 shadow">
          <span>{item.name} x {item.qty}</span>
          <button className="text-red-500" onClick={() => dispatch(removeFromCart(item._id))}>Remove</button>
        </div>
      ))}
      <p className="mt-4 text-xl">Total: ${total.toFixed(2)}</p>
      <Link to="/checkout" className="mt-3 inline-block rounded bg-emerald-600 px-4 py-2 text-white">Checkout</Link>
    </div>
  );
}
