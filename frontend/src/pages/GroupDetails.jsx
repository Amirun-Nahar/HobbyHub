import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import { FiUsers, FiCalendar, FiMapPin, FiEdit2, FiTrash2, FiArrowLeft, FiClock, FiStar } from 'react-icons/fi';
import { Fade } from 'react-awesome-reveal';
import toast from 'react-hot-toast';

const GroupDetails = () => {
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchGroup();
  }, [id, user]);

  const fetchGroup = async () => {
    try {
      const token = await user.getIdToken();
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/groups/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setGroup(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching group:', error);
      setError(error.response?.data?.message || 'Error fetching group details');
      toast.error(error.response?.data?.message || 'Error fetching group details');
      navigate('/groups');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinGroup = async () => {
    try {
      const token = await user.getIdToken();
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/groups/${id}/join`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setGroup(data);
      toast.success('Successfully joined the group!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error joining group');
    }
  };

  const handleLeaveGroup = async () => {
    try {
      const token = await user.getIdToken();
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/groups/${id}/leave`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setGroup(data);
      toast.success('Successfully left the group');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error leaving group');
    }
  };

  const handleDeleteGroup = async () => {
    if (!window.confirm('Are you sure you want to delete this group?')) {
      return;
    }

    try {
      const token = await user.getIdToken();
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/groups/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Group deleted successfully');
      navigate('/my-groups');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error deleting group');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E07A5F]"></div>
      </div>
    );
  }

  if (!group) {
    return null;
  }

  const isCreator = group.creator._id === user._id;
  const isMember = group.members.some(member => member._id === user._id);
  const isGroupActive = new Date(group.startDate) > new Date();
  const isGroupFull = group.members.length >= group.maxMembers;

  return (
    <div className="pt-16">
      <div className="container py-8">
        <Fade>
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={() => navigate('/groups')}
              className="flex items-center space-x-2 text-[#E07A5F] hover:text-[#cc6952] transition-colors duration-200"
            >
              <FiArrowLeft className="w-5 h-5" />
              <span>Back to Groups</span>
            </button>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Hero Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="relative h-[400px] w-full">
                <img
                  src={group.imageURL}
                  alt={group.name}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-4xl md:text-5xl font-bold text-white font-['Playfair_Display'] mb-2">
                        {group.name}
                      </h1>
                      <div className="flex items-center space-x-4 text-white/90">
                        <span className="flex items-center space-x-1">
                          <FiMapPin className="w-4 h-4" />
                          <span>{group.location}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <FiUsers className="w-4 h-4" />
                          <span>{group.members.length}/{group.maxMembers} members</span>
                        </span>
                      </div>
                    </div>
                    <span className="px-4 py-2 bg-[#E07A5F] text-white rounded-full font-medium">
                      {group.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* About Section */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                  <h2 className="text-3xl font-bold text-[#3D5A80] dark:text-white font-['Playfair_Display'] mb-6">
                    About this Group
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed text-lg">
                    {group.description}
                  </p>
                </div>

                {/* Members Section */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                  <h2 className="text-3xl font-bold text-[#3D5A80] dark:text-white font-['Playfair_Display'] mb-6">
                    Members ({group.members.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.members.map((member) => (
                      <div
                        key={member._id}
                        className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                      >
                        <img
                          src={member.photoURL || 'https://via.placeholder.com/40'}
                          alt={member.name}
                          className="w-12 h-12 rounded-full border-2 border-[#E07A5F]"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[#3D5A80] dark:text-white truncate">
                            {member.name}
                          </p>
                          {member._id === group.creator._id && (
                            <p className="text-sm text-[#E07A5F] font-medium flex items-center space-x-1">
                              <FiStar className="w-3 h-3" />
                              <span>Creator</span>
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Group Stats */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-[#3D5A80] dark:text-white mb-4">
                    Group Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <FiUsers className="text-2xl text-[#E07A5F]" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Members</p>
                        <p className="text-xl font-semibold text-[#3D5A80] dark:text-white">
                          {group.members.length}/{group.maxMembers}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <FiCalendar className="text-2xl text-[#E07A5F]" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Start Date</p>
                        <p className="text-xl font-semibold text-[#3D5A80] dark:text-white">
                          {new Date(group.startDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <FiMapPin className="text-2xl text-[#E07A5F]" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                        <p className="text-xl font-semibold text-[#3D5A80] dark:text-white">
                          {group.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Creator Info */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-[#3D5A80] dark:text-white mb-4">
                    Created by
                  </h3>
                  <div className="flex items-center space-x-4">
                    <img
                      src={group.creator.photoURL || 'https://via.placeholder.com/50'}
                      alt={group.creator.name}
                      className="w-16 h-16 rounded-full border-3 border-[#E07A5F]"
                    />
                    <div>
                      <p className="font-semibold text-[#3D5A80] dark:text-white">
                        {group.creator.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Group Creator</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-[#3D5A80] dark:text-white mb-4">
                    Actions
                  </h3>
                  <div className="space-y-3">
                    {isCreator ? (
                      <>
                        <button
                          onClick={() => navigate(`/update-group/${id}`)}
                          className="w-full btn btn-secondary flex items-center justify-center"
                        >
                          <FiEdit2 className="mr-2" />
                          Edit Group
                        </button>
                        <button
                          onClick={handleDeleteGroup}
                          className="w-full btn bg-red-600 text-white hover:bg-red-700 flex items-center justify-center"
                        >
                          <FiTrash2 className="mr-2" />
                          Delete Group
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={isMember ? handleLeaveGroup : handleJoinGroup}
                        disabled={!isGroupActive || (isGroupFull && !isMember)}
                        className={`w-full btn ${
                          isMember
                            ? 'bg-[#E07A5F] text-white hover:bg-[#cc6952]'
                            : 'btn-primary'
                        } ${
                          (!isGroupActive || (isGroupFull && !isMember))
                            ? 'opacity-50 cursor-not-allowed'
                            : ''
                        } flex items-center justify-center`}
                      >
                        {isMember ? 'Leave Group' : 'Join Group'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Status Alerts */}
                {(!isGroupActive || isGroupFull) && (
                  <div className={`p-4 rounded-lg ${
                    !isGroupActive 
                      ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-800' 
                      : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <FiClock className="w-5 h-5" />
                      <p className="font-medium">
                        {!isGroupActive 
                          ? 'This group has already started' 
                          : 'This group is full'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default GroupDetails; 