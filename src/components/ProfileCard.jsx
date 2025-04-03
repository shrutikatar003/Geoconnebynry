import React from 'react';
import { Map, Edit, Trash2 } from 'lucide-react';

const ProfileCard = ({ profile, viewProfileDetails, isAdminMode, handleEdit, handleDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center">
          <img src={profile.imageUrl} alt={profile.name} className="w-16 h-16 rounded-full mr-4 object-cover bg-gray-100" />
          <div>
            <h2 className="text-xl font-semibold">{profile.name}</h2>
            <p className="text-gray-600 text-sm">{profile.address}</p>
          </div>
        </div>
        <p className="mt-3 text-gray-700">{profile.description}</p>
        
        <div className="mt-4 flex justify-between">
          <button 
            className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
            onClick={() => viewProfileDetails(profile)}
          >
            <Map size={18} className="mr-1" /> View Map
          </button>
          
          {isAdminMode && (
            <div className="flex space-x-2">
              <button 
                className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition-colors"
                onClick={() => handleEdit(profile)}
              >
                <Edit size={18} />
              </button>
              <button 
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
                onClick={() => handleDelete(profile.id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;