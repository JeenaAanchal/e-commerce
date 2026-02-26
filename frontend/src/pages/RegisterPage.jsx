import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { register } from '../features/auth/authSlice';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const submit = async (e) => {
    e.preventDefault();
    await dispatch(register(form));
    toast.success('Registered successfully');
  };

  return (
    <form onSubmit={submit} className="max-w-md rounded bg-white p-4 shadow">
      <h1 className="mb-3 text-2xl font-bold">Register</h1>
      <input className="mb-2 w-full rounded border p-2" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className="mb-2 w-full rounded border p-2" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" className="mb-2 w-full rounded border p-2" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button className="rounded bg-emerald-600 px-4 py-2 text-white">Create account</button>
    </form>
  );
}
