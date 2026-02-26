import { useSelector } from 'react-redux';

export default function ProfilePage() {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) return <p>Please login.</p>;

  return (
    <div className="rounded bg-white p-4 shadow">
      <h1 className="text-2xl font-bold">Profile</h1>
      <p>Name: {userInfo.name}</p>
      <p>Email: {userInfo.email}</p>
      <p>Role: {userInfo.role}</p>
    </div>
  );
}
