'use client';

import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiSave } from 'react-icons/fi';

// Mock user data
const initialUserData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+971 50 123 4567',
  address: 'Downtown Dubai, UAE',
  profileImage: '/images/avatar-placeholder.jpg'
};

const ProfilePage = () => {
  const [userData, setUserData] = useState(initialUserData);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(initialUserData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserData(formData);
    setEditMode(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-white">User Profile</h1>
      
      <div className="bg-space-dark border border-space-light/20 rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Profile Image */}
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div className="relative w-48 h-48 mb-4 rounded-full overflow-hidden border-4 border-space-gold">
              <img 
                src={userData.profileImage} 
                alt="Profile" 
                className="object-cover w-full h-full"
              />
            </div>
            {!editMode && (
              <button 
                onClick={() => setEditMode(true)}
                className="flex items-center gap-2 bg-space-dark hover:bg-space-dark/80 text-white py-2 px-4 rounded-md border border-space-gold transition-colors"
              >
                <FiEdit2 /> Edit Profile
              </button>
            )}
          </div>
          
          {/* Profile Details */}
          <div className="w-full md:w-2/3">
            {editMode ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-space-light mb-1">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 bg-space-dark border border-space-light/30 rounded text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-space-light mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 bg-space-dark border border-space-light/30 rounded text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-space-light mb-1">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 bg-space-dark border border-space-light/30 rounded text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-space-light mb-1">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-2 bg-space-dark border border-space-light/30 rounded text-white"
                  />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button 
                    type="submit" 
                    className="flex items-center gap-2 bg-space-gold hover:bg-space-gold/80 text-space-dark font-medium py-2 px-6 rounded-md transition-colors"
                  >
                    <FiSave /> Save Changes
                  </button>
                  <button 
                    type="button" 
                    onClick={() => {
                      setFormData(userData);
                      setEditMode(false);
                    }}
                    className="flex items-center gap-2 bg-transparent hover:bg-space-light/10 text-white py-2 px-6 rounded-md border border-space-light/30 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <FiUser className="text-space-gold text-xl" />
                  <div>
                    <p className="text-space-light text-sm">Full Name</p>
                    <p className="text-white text-lg">{userData.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <FiMail className="text-space-gold text-xl" />
                  <div>
                    <p className="text-space-light text-sm">Email</p>
                    <p className="text-white text-lg">{userData.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <FiPhone className="text-space-gold text-xl" />
                  <div>
                    <p className="text-space-light text-sm">Phone</p>
                    <p className="text-white text-lg">{userData.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <FiMapPin className="text-space-gold text-xl" />
                  <div>
                    <p className="text-space-light text-sm">Address</p>
                    <p className="text-white text-lg">{userData.address}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Additional sections can be added here */}
      <div className="bg-space-dark border border-space-light/20 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-white">Account Security</h2>
        <div className="flex gap-4">
          <button className="bg-space-dark hover:bg-space-dark/80 text-white py-2 px-4 rounded-md border border-space-gold transition-colors">
            Change Password
          </button>
          <button className="bg-space-dark hover:bg-space-dark/80 text-white py-2 px-4 rounded-md border border-space-light/30 transition-colors">
            Two-Factor Authentication
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 