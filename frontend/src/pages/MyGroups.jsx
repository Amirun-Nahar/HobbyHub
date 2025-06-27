import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import { FiEdit2, FiTrash2, FiPlus, FiUsers, FiCalendar, FiMapPin } from 'react-icons/fi';
import { Fade } from 'react-awesome-reveal';
import toast from 'react-hot-toast';

const MyGroups = () => {
  const [createdGroups, setCreatedGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchGroups = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const token = await user.getIdToken();
      
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/groups/user/created`, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCreatedGroups(response.data || []);
    } catch (error) {
      console.error('Error fetching groups:', error);
      if (error.response?.status !== 404) {
        toast.error('Error fetching groups');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, [user]);

  const handleDelete = async (groupId) => {
    if (!window.confirm('Are you sure you want to delete this group? This action cannot be undone.')) {
      return;
    }

    try {
      const token = await user.getIdToken();
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/groups/${groupId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast.success('Group deleted successfully');
      setCreatedGroups(prev => prev.filter(group => group._id !== groupId));
    } catch (error) {
      console.error('Error deleting group:', error);
      toast.error('Failed to delete group');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E07A5F]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen container py-8">
      <Fade>
        <div className="flex items-center justify-between mb-8">
          <h1 className="heading">My Groups</h1>
          <Link 
            to="/create-group" 
            className="btn btn-primary flex items-center gap-2"
          >
            <FiPlus /> Create New Group
          </Link>
        </div>

        {createdGroups.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-[#2A4365] mb-4">
              You haven't created any groups yet
            </h3>
            <Link 
              to="/create-group" 
              className="btn btn-primary inline-flex items-center gap-2"
            >
              <FiPlus /> Create Your First Group
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F2EBE3]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#2A4365]">Group Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#2A4365]">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#2A4365]">Members</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#2A4365]">Start Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#2A4365]">Location</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-[#2A4365]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {createdGroups.map((group) => (
                  <tr key={group._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={group.imageURL} 
                          alt={group.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <span className="font-medium text-[#2A4365]">{group.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-sm bg-[#F2EBE3] text-[#2A4365]">
                        {group.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-[#3D5A80]">
                        <FiUsers className="mr-2" />
                        {group.members.length}/{group.maxMembers}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-[#3D5A80]">
                        <FiCalendar className="mr-2" />
                        {new Date(group.startDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-[#3D5A80]">
                        <FiMapPin className="mr-2" />
                        {group.location}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/update-group/${group._id}`)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                          title="Update Group"
                        >
                          <FiEdit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(group._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          title="Delete Group"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Fade>
    </div>
  );
};

export default MyGroups; 