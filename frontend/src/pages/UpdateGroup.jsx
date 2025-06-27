import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import { FiUpload } from 'react-icons/fi';
import { Fade } from 'react-awesome-reveal';
import toast from 'react-hot-toast';

const categories = [
  'Art',
  'Music',
  'Sports',
  'Technology',
  'Books',
  'Gaming',
  'Cooking',
  'Fitness',
  'Photography',
  'Other'
];

const UpdateGroup = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    location: '',
    maxMembers: 10,
    startDate: '',
    imageURL: ''
  });
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const token = await user.getIdToken();
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/groups/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const group = response.data;
        setFormData({
          name: group.name,
          description: group.description,
          category: group.category,
          location: group.location,
          maxMembers: group.maxMembers,
          startDate: new Date(group.startDate).toISOString().split('T')[0],
          imageURL: group.imageURL
        });
        setImagePreview(group.imageURL);
      } catch (error) {
        console.error('Error fetching group:', error);
        toast.error('Error loading group data');
        navigate('/my-groups');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchGroup();
    }
  }, [user, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'imageURL' && value) {
      setImagePreview(value);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const MAX_FILE_SIZE = 20 * 1024 * 1024; 
      if (file.size > MAX_FILE_SIZE) {
        toast.error('Image size should be less than 20MB');
        return;
      }

      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          const img = new Image();
          img.onload = async () => {
            try {
              const canvas = document.createElement('canvas');
              let width = img.width;
              let height = img.height;

              const MAX_WIDTH = 2500;
              const MAX_HEIGHT = 2500;

              if (width > height) {
                if (width > MAX_WIDTH) {
                  height = Math.round(height * (MAX_WIDTH / width));
                  width = MAX_WIDTH;
                }
              } else {
                if (height > MAX_HEIGHT) {
                  width = Math.round(width * (MAX_HEIGHT / height));
                  height = MAX_HEIGHT;
                }
              }

              canvas.width = width;
              canvas.height = height;

              const ctx = canvas.getContext('2d');
              ctx.imageSmoothingQuality = 'high';
              ctx.drawImage(img, 0, 0, width, height);

              let quality = 0.9;
              let resizedImage;
              let base64Size;

              do {
                resizedImage = canvas.toDataURL('image/jpeg', quality);
                base64Size = Math.round((resizedImage.length * 3) / 4);
                quality -= 0.1;
              } while (base64Size > MAX_FILE_SIZE && quality > 0.3);

              if (base64Size > MAX_FILE_SIZE) {
                throw new Error('Unable to compress image to acceptable size');
              }

              setImagePreview(resizedImage);
              setFormData(prev => ({
                ...prev,
                imageURL: resizedImage
              }));
            } catch (error) {
              console.error('Error processing image:', error);
              toast.error('Error processing image. Please try a smaller image or different format.');
            }
          };
          img.src = reader.result;
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error reading image:', error);
        toast.error('Error reading image. Please try another image.');
      }
    }
  };

  const validateForm = () => {
    if (!formData.description.trim()) {
      throw new Error('Description is required');
    }
    if (!formData.location.trim()) {
      throw new Error('Location is required');
    }
    if (!formData.startDate) {
      throw new Error('Start date is required');
    }
    if (formData.maxMembers < 2) {
      throw new Error('Maximum members must be at least 2');
    }
    if (!formData.imageURL) {
      throw new Error('Group image is required (either URL or upload)');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      validateForm();

      const token = await user.getIdToken(true);
      
      const groupData = {
        ...formData,
        maxMembers: parseInt(formData.maxMembers),
        startDate: new Date(formData.startDate).toISOString()
      };

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/groups/${id}`,
        groupData,
        {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data) {
        toast.success('Group updated successfully!');
        navigate('/my-groups');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error updating group:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Error updating group';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
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
        <div className="max-w-2xl mx-auto">
          <h1 className="heading text-center">Update Group</h1>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Group Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  className="input mt-1 bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                  readOnly
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Hobby Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input mt-1"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="input mt-1"
                  required
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Meeting Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="input mt-1"
                  required
                />
              </div>

              <div>
                <label htmlFor="maxMembers" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Maximum Members
                </label>
                <input
                  type="number"
                  id="maxMembers"
                  name="maxMembers"
                  value={formData.maxMembers}
                  onChange={handleChange}
                  min="2"
                  max="100"
                  className="input mt-1"
                  required
                />
              </div>

              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="input mt-1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  User Name
                </label>
                <input
                  type="text"
                  value={user?.displayName || ''}
                  className="input mt-1 bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  User Email
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  className="input mt-1 bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                  readOnly
                />
              </div>

              <div>
                <label htmlFor="imageURL" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Image URL (Optional)
                </label>
                <input
                  type="url"
                  id="imageURL"
                  name="imageURL"
                  value={formData.imageURL}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="input mt-1"
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Paste a direct image URL (e.g., from ImgBB) or use the upload option below
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Or Upload Group Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-900 rounded-lg">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover object-center rounded-lg"
                        />
                      </div>
                    ) : (
                      <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                    )}
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                      <label
                        htmlFor="image"
                        className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                      >
                        <span>Upload a file</span>
                        <input
                          id="image"
                          name="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG, GIF up to 20MB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full flex justify-center items-center"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white rounded-full animate-spin border-t-transparent"></div>
                ) : (
                  'Update Group'
                )}
              </button>
            </div>
          </form>
        </div>
      </Fade>
    </div>
  );
};

export default UpdateGroup; 