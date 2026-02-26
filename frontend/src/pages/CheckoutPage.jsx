import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, saveShippingAddress } from '../features/cart/cartSlice';
import { createOrder } from '../features/orders/orderSlice';
import api from '../api/client';

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const [address, setAddress] = useState({ address: '', city: '', postalCode: '', country: '' });

  const handleCheckout = async () => {
    dispatch(saveShippingAddress(address));
    const total = Math.round(cartItems.reduce((sum, i) => sum + i.price * i.qty, 0) * 100);

    const orderPayload = {
      orderItems: cartItems.map((i) => ({ product: i._id, name: i.name, qty: i.qty, image: i.images?.[0], price: i.price })),
      shippingAddress: address,
      paymentMethod: 'stripe',
      taxPrice: 0,
      shippingPrice: 0,
      totalPrice: total / 100
    };

    const created = await dispatch(createOrder(orderPayload)).unwrap();
    const intent = await api.post('/payments/create-intent', { amount: total, orderId: created._id });

    if (intent.data.clientSecret) {
      toast.success('Payment intent created. Integrate Stripe Elements for card/UPI collection.');
      await api.patch(`/orders/${created._id}/pay`, { id: intent.data.paymentIntentId, status: 'succeeded' });
      dispatch(clearCart());
    } else {
      toast.error('Payment failed to initialize');
    }
  };

  return (
    <div className="max-w-lg rounded bg-white p-4 shadow">
      <h1 className="mb-4 text-2xl font-bold">Checkout</h1>
      {['address', 'city', 'postalCode', 'country'].map((key) => (
        <input
          key={key}
          placeholder={key}
          className="mb-2 w-full rounded border p-2"
          onChange={(e) => setAddress((s) => ({ ...s, [key]: e.target.value }))}
        />
      ))}
      <button className="mt-2 rounded bg-slate-900 px-4 py-2 text-white" onClick={handleCheckout}>
        Place Order & Pay
      </button>
    </div>
  );
}
