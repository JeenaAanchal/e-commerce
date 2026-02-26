import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';

export default function LoginPage() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: '', password: '' });

  const submit = async (e) => {
    e.preventDefault();
    await dispatch(login(form));
    toast.success('Logged in');
  };

  return (
    <form onSubmit={submit} className="max-w-md rounded bg-white p-4 shadow">
      <h1 className="mb-3 text-2xl font-bold">Login</h1>
      <input className="mb-2 w-full rounded border p-2" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" className="mb-2 w-full rounded border p-2" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button className="rounded bg-blue-600 px-4 py-2 text-white">Login</button>
    </form>
  );
}
