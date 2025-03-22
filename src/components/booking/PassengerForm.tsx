import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiCalendar, FiFlag, FiCreditCard, FiUsers, FiAlertCircle } from 'react-icons/fi';

interface Passenger {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  medicalConditions: string;
  dietaryRestrictions: string;
}

interface PassengerFormProps {
  onSubmit: (passenger: Passenger) => void;
  initialData?: Partial<Passenger>;
}

export const PassengerForm: React.FC<PassengerFormProps> = ({
  onSubmit,
  initialData = {},
}) => {
  const [formData, setFormData] = useState<Partial<Passenger>>({
    id: `passenger-${Date.now()}`,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    passportNumber: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
      ...(initialData.emergencyContact || {})
    },
    medicalConditions: '',
    dietaryRestrictions: '',
    ...initialData,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle nested emergency contact fields
    if (name.startsWith('emergency.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        emergencyContact: {
          name: formData.emergencyContact?.name || '',
          relationship: formData.emergencyContact?.relationship || '',
          phone: formData.emergencyContact?.phone || '',
          [field]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'dateOfBirth',
      'nationality',
      'passportNumber',
    ];
    
    requiredFields.forEach((field) => {
      if (!formData[field as keyof Passenger]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Emergency contact required fields
    if (!formData.emergencyContact?.name) {
      newErrors['emergency.name'] = 'Emergency contact name is required';
    }
    
    if (!formData.emergencyContact?.relationship) {
      newErrors['emergency.relationship'] = 'Relationship is required';
    }
    
    if (!formData.emergencyContact?.phone) {
      newErrors['emergency.phone'] = 'Emergency contact phone is required';
    }
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData as Passenger);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="card">
        <h3 className="heading-3 mb-6">Passenger Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div>
            <label className="block text-space-light mb-2">First Name</label>
            <div className="relative">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full bg-space-dark border ${
                  errors.firstName ? 'border-red-500' : 'border-space-light/30'
                } rounded-md px-4 py-2 pl-10 text-white focus:outline-none focus:border-space-light`}
              />
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-space-light" />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-space-light mb-2">Last Name</label>
            <div className="relative">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full bg-space-dark border ${
                  errors.lastName ? 'border-red-500' : 'border-space-light/30'
                } rounded-md px-4 py-2 pl-10 text-white focus:outline-none focus:border-space-light`}
              />
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-space-light" />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-space-light mb-2">Email</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-space-dark border ${
                  errors.email ? 'border-red-500' : 'border-space-light/30'
                } rounded-md px-4 py-2 pl-10 text-white focus:outline-none focus:border-space-light`}
              />
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-space-light" />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-space-light mb-2">Phone</label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full bg-space-dark border ${
                  errors.phone ? 'border-red-500' : 'border-space-light/30'
                } rounded-md px-4 py-2 pl-10 text-white focus:outline-none focus:border-space-light`}
              />
              <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-space-light" />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-space-light mb-2">Date of Birth</label>
            <div className="relative">
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={`w-full bg-space-dark border ${
                  errors.dateOfBirth ? 'border-red-500' : 'border-space-light/30'
                } rounded-md px-4 py-2 pl-10 text-white focus:outline-none focus:border-space-light`}
              />
              <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-space-light" />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-space-light mb-2">Nationality</label>
            <div className="relative">
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className={`w-full bg-space-dark border ${
                  errors.nationality ? 'border-red-500' : 'border-space-light/30'
                } rounded-md px-4 py-2 pl-10 text-white focus:outline-none focus:border-space-light`}
              />
              <FiFlag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-space-light" />
              {errors.nationality && (
                <p className="text-red-500 text-xs mt-1">{errors.nationality}</p>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-space-light mb-2">Passport Number</label>
            <div className="relative">
              <input
                type="text"
                name="passportNumber"
                value={formData.passportNumber}
                onChange={handleChange}
                className={`w-full bg-space-dark border ${
                  errors.passportNumber ? 'border-red-500' : 'border-space-light/30'
                } rounded-md px-4 py-2 pl-10 text-white focus:outline-none focus:border-space-light`}
              />
              <FiCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-space-light" />
              {errors.passportNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.passportNumber}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <h3 className="heading-3 mb-6">Emergency Contact</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-space-light mb-2">Contact Name</label>
            <div className="relative">
              <input
                type="text"
                name="emergency.name"
                value={formData.emergencyContact?.name}
                onChange={handleChange}
                className={`w-full bg-space-dark border ${
                  errors['emergency.name'] ? 'border-red-500' : 'border-space-light/30'
                } rounded-md px-4 py-2 pl-10 text-white focus:outline-none focus:border-space-light`}
              />
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-space-light" />
              {errors['emergency.name'] && (
                <p className="text-red-500 text-xs mt-1">{errors['emergency.name']}</p>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-space-light mb-2">Relationship</label>
            <div className="relative">
              <input
                type="text"
                name="emergency.relationship"
                value={formData.emergencyContact?.relationship}
                onChange={handleChange}
                className={`w-full bg-space-dark border ${
                  errors['emergency.relationship'] ? 'border-red-500' : 'border-space-light/30'
                } rounded-md px-4 py-2 pl-10 text-white focus:outline-none focus:border-space-light`}
              />
              <FiUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-space-light" />
              {errors['emergency.relationship'] && (
                <p className="text-red-500 text-xs mt-1">{errors['emergency.relationship']}</p>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-space-light mb-2">Contact Phone</label>
            <div className="relative">
              <input
                type="tel"
                name="emergency.phone"
                value={formData.emergencyContact?.phone}
                onChange={handleChange}
                className={`w-full bg-space-dark border ${
                  errors['emergency.phone'] ? 'border-red-500' : 'border-space-light/30'
                } rounded-md px-4 py-2 pl-10 text-white focus:outline-none focus:border-space-light`}
              />
              <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-space-light" />
              {errors['emergency.phone'] && (
                <p className="text-red-500 text-xs mt-1">{errors['emergency.phone']}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <h3 className="heading-3 mb-6">Health Information</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-space-light mb-2">Medical Conditions (if any)</label>
            <div className="relative">
              <textarea
                name="medicalConditions"
                value={formData.medicalConditions}
                onChange={handleChange}
                rows={3}
                className="w-full bg-space-dark border border-space-light/30 rounded-md px-4 py-2 text-white focus:outline-none focus:border-space-light"
                placeholder="Please list any medical conditions that our medical team should be aware of."
              ></textarea>
            </div>
          </div>
          
          <div>
            <label className="block text-space-light mb-2">Dietary Restrictions (if any)</label>
            <div className="relative">
              <textarea
                name="dietaryRestrictions"
                value={formData.dietaryRestrictions}
                onChange={handleChange}
                rows={3}
                className="w-full bg-space-dark border border-space-light/30 rounded-md px-4 py-2 text-white focus:outline-none focus:border-space-light"
                placeholder="Please list any dietary restrictions or preferences."
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center p-4 bg-space-blue/20 border border-space-blue/30 rounded-md">
        <FiAlertCircle className="text-space-light mr-3 flex-shrink-0" />
        <p className="text-sm text-space-light">
          All information provided will be kept confidential and is required for safety and regulatory purposes.
          Space travel requires additional health and safety measures.
        </p>
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="btn-primary"
        >
          Save Passenger Information
        </button>
      </div>
    </form>
  );
}; 