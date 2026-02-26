import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders } from '../features/orders/orderSlice';

export default function OrderHistoryPage() {
  const dispatch = useDispatch();
  const { myOrders } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Order History</h1>
      {myOrders.map((order) => (
        <div key={order._id} className="mt-3 rounded bg-white p-3 shadow">
          <p>Order: {order._id}</p>
          <p>Status: {order.status}</p>
          <p>Paid: {order.isPaid ? 'Yes' : 'No'}</p>
          <p>Total: ${order.totalPrice}</p>
        </div>
      ))}
    </div>
  );
}
