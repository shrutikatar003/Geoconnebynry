import React, { useState, useEffect } from 'react';
import { Map, Loader } from 'lucide-react';

// Import components
import GoogleMap from './GoogleMap';
import ProfileForm from './ProfileForm';
import ProfileCard from './ProfileCard';
import ProfileDetail from './ProfileDetail';
import SearchFilterBar from './SearchFilterBar';
import sara from '../assets/image.png';
import men from '../assets/imag1.jpg';
import men2 from '../assets/imag2.avif';
import sara2 from '../assets/imag3.jpeg';
import main from '../assets/main2.webp';
import { ArrowRightFromLine } from 'lucide-react';

// Main App Component
const ProfileMapExplorer = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    imageUrl: '',
    address: '',
    latitude: '',
    longitude: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState('all');

  // Load sample data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProfiles([
        {
          id: 1,
          name: "Sarah Johnson",
          description: "Software Engineer with 5 years of experience in web development",
          imageUrl: sara,//refrence to imported file
          address: "123 Tech Avenue, San Francisco, CA",
          latitude: 37.7749,
          longitude: -122.4194
        },
        {
          id: 2,
          name: "Michael Chen",
          description: "Product Manager specializing in SaaS applications",
          imageUrl: men,
          address: "456 Innovation Drive, Seattle, WA",
          latitude: 47.6062,
          longitude: -122.3321
        },
        {
          id: 3,
          name: "Aisha Patel",
          description: "UX Designer focused on creating accessible interfaces",
          imageUrl: sara2,
          address: "789 Design Boulevard, Austin, TX",
          latitude: 30.2672,
          longitude: -97.7431
        },
        {
          id: 4,
          name: "James Wilson",
          description: "Data Scientist with expertise in machine learning",
          imageUrl: men2,
          address: "321 Analytics Way, Boston, MA",
          latitude: 42.3601,
          longitude: -71.0589
        }
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  // Filter profiles based on search term and criteria
  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          profile.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          profile.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterCriteria === 'all') return matchesSearch;
    if (filterCriteria === 'west-coast' && profile.longitude < -100) return matchesSearch;
    if (filterCriteria === 'east-coast' && profile.longitude > -100) return matchesSearch;
    return false;
  });

  // Add or update profile
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Create new profile object
    const profileData = {
      ...formData,
      id: formData.id || Date.now(),
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude)
    };
    
    setTimeout(() => {
      if (formData.id) {
        setProfiles(profiles.map(p => p.id == formData.id ? profileData : p));
      } else {
        setProfiles([...profiles, profileData]);
      }
      
      // Reset form
      setFormData({
        id: '',
        name: '',
        description: '',
        imageUrl: '',
        address: '',
        latitude: '',
        longitude: ''
      });
      
      setShowForm(false);
      setLoading(false);
    }, 800);
  };

  // Delete a profile
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      setLoading(true);
      
      setTimeout(() => {
        setProfiles(profiles.filter(profile => profile.id !== id));
        if (selectedProfile && selectedProfile.id === id) {
          setSelectedProfile(null);
        }
        setLoading(false);
      }, 800);
    }
  };

  // Edit a profile
  const handleEdit = (profile) => {
    setFormData({
      id: profile.id,
      name: profile.name,
      description: profile.description,
      imageUrl: profile.imageUrl,
      address: profile.address,
      latitude: profile.latitude,
      longitude: profile.longitude
    });
    setShowForm(true);
  };

  // View profile details
  const viewProfileDetails = (profile) => {
    setSelectedProfile(profile);
  };

  // Handle adding new profile
  const handleAddNew = () => {
    setFormData({
      id: '',
      name: '',
      description: '',
      imageUrl: '',
      address: '',
      latitude: '',
      longitude: ''
    });
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Header */}
      <header className="bg-gray-600 rounded-md text-white p-4 shadow-md">
        <div className='flex gap-3'>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Geooconnec</h1>
    
          <button 
            className="bg-white text-black px-4 py-2 rounded-md hover:bg-blue-100 transition-colors"
            onClick={() => setIsAdminMode(!isAdminMode)}
          >
            {isAdminMode ? "Exit Admin Mode" : "Admin Mode"}
          </button>
        </div>
        <h3 className='flex align-center mt-2'>    <ArrowRightFromLine />
        </h3>
</div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <div className='h-[375px]'>
          <img src={main} alt='main' className='w-full h-full object-cover'>
          </img>
        </div>
        {/* Search and Filter Bar */}
        <SearchFilterBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterCriteria={filterCriteria}
          setFilterCriteria={setFilterCriteria}
          isAdminMode={isAdminMode}
          handleAddNew={handleAddNew}
        />

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center my-12">
            <div className="text-center">
              <Loader className="mx-auto h-12 w-12 text-gray-800 animate-spin" />
              <p className="mt-4 text-gray-600">Loading profiles...</p>
            </div>
          </div>
        )}

        {/* Admin Form */}
        {showForm && (
          <ProfileForm 
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            setShowForm={setShowForm}
          />
        )}

        {/* Profile View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile List */}
          <div className={`col-span-1 ${selectedProfile ? 'hidden lg:block' : ''}`}>
            {!loading && filteredProfiles.length === 0 && (
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-gray-600">No profiles found matching your criteria.</p>
              </div>
            )}
            
            {filteredProfiles.map(profile => (
              <ProfileCard 
                key={profile.id}
                profile={profile}
                viewProfileDetails={viewProfileDetails}
                isAdminMode={isAdminMode}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </div>
          
          {/* Map and Details View */}
          {selectedProfile ? (
            <ProfileDetail 
              selectedProfile={selectedProfile}
              setSelectedProfile={setSelectedProfile}
            />
          ) : (
            <div className="col-span-1 lg:col-span-2 hidden lg:flex bg-white rounded-lg shadow-md items-center justify-center p-8">
              <div className="text-center">
                <Map size={64} className="mx-auto text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold text-gray-600">Select a profile to view details and location</h2>
                <p className="text-gray-500 mt-2">Click the "View Map" button on any profile card to see their location and additional information.</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Profile Map Explorer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProfileMapExplorer;