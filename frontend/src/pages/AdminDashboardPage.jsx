import { useEffect, useState } from 'react';
import api from '../api/client';

export default function AdminDashboardPage() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const load = async () => {
    const [pRes, oRes] = await Promise.all([api.get('/products'), api.get('/orders')]);
    setProducts(pRes.data);
    setOrders(oRes.data);
  };

  useEffect(() => {
    load();
  }, []);

  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`);
    load();
  };

  const updateStatus = async (id, status) => {
    await api.patch(`/orders/${id}/status`, { status });
    load();
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold">Manage Products</h2>
        {products.map((p) => (
          <div key={p._id} className="mt-2 flex items-center justify-between rounded bg-white p-3 shadow">
            <span>{p.name} - ${p.price}</span>
            <button className="text-red-600" onClick={() => deleteProduct(p._id)}>Delete</button>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-bold">Manage Orders</h2>
        {orders.map((o) => (
          <div key={o._id} className="mt-2 rounded bg-white p-3 shadow">
            <p>{o._id} - {o.status}</p>
            <select defaultValue={o.status} onChange={(e) => updateStatus(o._id, e.target.value)} className="mt-2 rounded border p-2">
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
          </div>
        ))}
      </section>
    </div>
  );
}
