import React from 'react';
import { X } from 'lucide-react';
import GoogleMap from './GoogleMap';

const ProfileDetail = ({ selectedProfile, setSelectedProfile }) => {
  return (
    <div className="col-span-1 lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{selectedProfile.name}</h2>
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setSelectedProfile(null)}
          >
            <X size={24} />
          </button>
        </div>
      </div>
      
      {/* Google Maps Component */}
      <div className="h-96 bg-gray-200 relative">
        <GoogleMap 
          address={selectedProfile.address}
          lat={selectedProfile.latitude}
          lng={selectedProfile.longitude}
        />
      </div>
      
      {/* Profile Details */}
      <div className="p-4">
        <div className="flex flex-col md:flex-row mb-4">
          <img 
            src={selectedProfile.imageUrl} 
            alt={selectedProfile.name} 
            className="w-24 h-24 rounded-md mb-4 md:mb-0 md:mr-4 object-cover bg-gray-100" 
          />
          <div>
            <h3 className="font-semibold text-lg">Contact Information</h3>
            <p className="text-gray-700"><strong>Address:</strong> {selectedProfile.address}</p>
            <p className="text-gray-700"><strong>Email:</strong> {selectedProfile.name.toLowerCase().replace(' ', '.')}@example.com</p>
            <p className="text-gray-700"><strong>Phone:</strong> (555) 123-4567</p>
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="font-semibold text-lg">About</h3>
          <p className="text-gray-700">{selectedProfile.description}</p>
          <p className="text-gray-700 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. 
            Sed in velit euismod, faucibus nunc at, posuere magna. 
            Nullam vel metus eget tortor convallis efficitur.
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg">Skills & Interests</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {["React", "JavaScript", "UI/UX", "Data Analysis", "Team Leadership"]
              .map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-indigo-100 text-slate-600 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;