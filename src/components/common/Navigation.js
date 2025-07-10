import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { useRouter } from 'next/router';
import { RiLogoutCircleRLine } from "react-icons/ri";

export default function Navigation() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated,user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-gray-800 p-2">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-xl font-bold text-white">User Management</h1>
        <div className='flex gap-2 items-center'>
{user&&
<span className='text-white'>{user.includes('@')?user.split('@')[0]:user}</span>

}
          
      <div className='bg-red-600 p-1'>

        <RiLogoutCircleRLine onClick={handleLogout}  className='text-white cursor-pointer h-6 w-6'/>
        </div>
        </div>
      </div>
    </nav>
  );
}