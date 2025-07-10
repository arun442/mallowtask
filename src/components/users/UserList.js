import { useEffect, useState } from 'react';
import { userAPI } from '../../services/api';
import UserCard from './UserCard';
import UserTable from './UserTable';
import ViewToggle from './ViewToggle';
import Loader from '../common/Loader';
import { FaSearch } from "react-icons/fa";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createForm, setCreateForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    avatar: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const fetchUsers = async (page = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await userAPI.getUsers(page);
      setUsers(response.data.data);
      setCurrentPage(response.data.page);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchUsers(page);
  };

  const filteredUsers = users.filter(user =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateClick = () => {
    setCreateForm({
      first_name: '',
      last_name: '',
      email: '',
      avatar: ''
    });
    setIsCreateModalOpen(true);
  };

  const handleCreateInputChange = (e) => {
    const { name, value } = e.target;
    setCreateForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    if (!createForm.first_name || !createForm.last_name || !createForm.email || !createForm.avatar) {
      alert('All fields are mandatory');
      return;
    }

    const formdata = {
      name: `${createForm.first_name} ${createForm.last_name}`,
      email: createForm.email,
      avatar: createForm.avatar,
      first_name: createForm.first_name,
      last_name: createForm.last_name
    };

    setIsSubmitting(true);
    try {
      const response = await userAPI.createUser(formdata);
      const result = response;
      console.log('User created successfully:', result);
      setIsCreateModalOpen(false);
      alert('User created successfully');
      fetchUsers(currentPage);
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateCancel = () => {
    setIsCreateModalOpen(false);
    setCreateForm({
      first_name: '',
      last_name: '',
      email: '',
      avatar: ''
    });
  };

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        Error: {error}
      </div>
    );
  }

  return (
    <div className=" bg-white">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 py-2">
        <h1 className="text-2xl font-semibold text-black ">Users</h1>
        <div className="flex items-center space-x-4">
         
          <div className='flex items-center border rounded-lg  focus:ring-2 focus:ring-blue-500 px-2 gap-1' >
            <input
              type="text"
              placeholder="input search text"
              value={searchTerm}
              onChange={handleSearch}
              className=" py-1   text-gray-800 focus:outline-none "
            />
            <FaSearch/>
          </div>
          <button 
            onClick={handleCreateClick}
            className="bg-[#1990FF] hover:bg-blue-700 text-white px-4 py-1 rounded-lg transition-colors"
          >
            Create User
          </button>
        </div>
      </div>
      <div className='px-4'>
        <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      {isLoading?
        <div className="flex justify-center items-center h-64">
          <Loader size="lg" />
        </div>:
        viewMode === 'card' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} setUsers={setUsers} alluser={filteredUsers}/>
            ))}
          </div>
        ) : (
          <UserTable users={filteredUsers} setUsers={setUsers} alluser={filteredUsers} />
        )
      }
      <div className="flex justify-center items-center space-x-2 pt-2 bg-[#DEDEDE]">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 rounded ${
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Create User</h2>
              <button
                onClick={handleCreateCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500">*</span> First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={createForm.first_name}
                  onChange={handleCreateInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500">*</span> Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={createForm.last_name}
                  onChange={handleCreateInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500">*</span> Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={createForm.email}
                  onChange={handleCreateInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500">*</span> Profile Image Link
                </label>
                <input
                  type="url"
                  name="avatar"
                  value={createForm.avatar}
                  onChange={handleCreateInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCreateCancel}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
                >
                  {isSubmitting ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}