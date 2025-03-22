import React, { useState, ChangeEvent } from 'react';
import { Passenger } from '@/types/passenger';
import { FiAlertCircle } from 'react-icons/fi';

interface PassengerFormProps {
  passenger: Passenger;
  onChange: (passenger: Passenger) => void;
}

interface FormErrors {
  [key: string]: string;
}

export const PassengerForm: React.FC<PassengerFormProps> = ({ passenger, onChange }) => {
  const [errors, setErrors] = useState<FormErrors>({});
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Handle checkbox inputs
    const updatedValue = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : value;
    
    const updatedPassenger = {
      ...passenger,
      [name]: updatedValue
    };
    
    onChange(updatedPassenger);
    validateField(name, updatedValue);
  };
  
  const validateField = (name: string, value: any) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) {
          newErrors[name] = `${name === 'firstName' ? 'First' : 'Last'} name is required`;
        } else {
          delete newErrors[name];
        }
        break;
        
      case 'email':
        if (!value.trim()) {
          newErrors[name] = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors[name] = 'Email format is invalid';
        } else {
          delete newErrors[name];
        }
        break;
        
      case 'phone':
        if (value.trim() && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(value)) {
          newErrors[name] = 'Phone number format is invalid';
        } else {
          delete newErrors[name];
        }
        break;
        
      case 'dateOfBirth':
        if (!value) {
          newErrors[name] = 'Date of birth is required';
        } else {
          delete newErrors[name];
        }
        break;
        
      case 'passportNumber':
        if (!value.trim()) {
          newErrors[name] = 'Passport number is required';
        } else {
          delete newErrors[name];
        }
        break;
        
      case 'passportExpiry':
        if (!value) {
          newErrors[name] = 'Passport expiry date is required';
        } else {
          const expiryDate = new Date(value);
          const today = new Date();
          if (expiryDate <= today) {
            newErrors[name] = 'Passport must not be expired';
          } else {
            delete newErrors[name];
          }
        }
        break;
        
      case 'spaceflightConsent':
        if (!value) {
          newErrors[name] = 'You must consent to spaceflight requirements';
        } else {
          delete newErrors[name];
        }
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
  };
  
  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div>
        <h4 className="text-lg font-medium text-space-light mb-4">Personal Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-space-light mb-1 text-sm">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={passenger.firstName}
              onChange={handleChange}
              className={`w-full bg-space-dark/50 border ${
                errors.firstName ? 'border-red-500' : 'border-space-light/30'
              } rounded-md px-4 py-2 text-white focus:outline-none focus:border-space-accent`}
              required
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <FiAlertCircle className="mr-1" /> {errors.firstName}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-space-light mb-1 text-sm">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={passenger.lastName}
              onChange={handleChange}
              className={`w-full bg-space-dark/50 border ${
                errors.lastName ? 'border-red-500' : 'border-space-light/30'
              } rounded-md px-4 py-2 text-white focus:outline-none focus:border-space-accent`}
              required
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <FiAlertCircle className="mr-1" /> {errors.lastName}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-space-light mb-1 text-sm">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={passenger.email}
              onChange={handleChange}
              className={`w-full bg-space-dark/50 border ${
                errors.email ? 'border-red-500' : 'border-space-light/30'
              } rounded-md px-4 py-2 text-white focus:outline-none focus:border-space-accent`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <FiAlertCircle className="mr-1" /> {errors.email}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-space-light mb-1 text-sm">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={passenger.phone}
              onChange={handleChange}
              className={`w-full bg-space-dark/50 border ${
                errors.phone ? 'border-red-500' : 'border-space-light/30'
              } rounded-md px-4 py-2 text-white focus:outline-none focus:border-space-accent`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <FiAlertCircle className="mr-1" /> {errors.phone}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-space-light mb-1 text-sm">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={passenger.dateOfBirth}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              className={`w-full bg-space-dark/50 border ${
                errors.dateOfBirth ? 'border-red-500' : 'border-space-light/30'
              } rounded-md px-4 py-2 text-white focus:outline-none focus:border-space-accent`}
              required
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <FiAlertCircle className="mr-1" /> {errors.dateOfBirth}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-space-light mb-1 text-sm">
              Nationality
            </label>
            <input
              type="text"
              name="nationality"
              value={passenger.nationality}
              onChange={handleChange}
              className="w-full bg-space-dark/50 border border-space-light/30 rounded-md px-4 py-2 text-white focus:outline-none focus:border-space-accent"
            />
          </div>
        </div>
      </div>
      
      {/* Travel Documents */}
      <div>
        <h4 className="text-lg font-medium text-space-light mb-4">Travel Documents</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-space-light mb-1 text-sm">
              Passport Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="passportNumber"
              value={passenger.passportNumber}
              onChange={handleChange}
              className={`w-full bg-space-dark/50 border ${
                errors.passportNumber ? 'border-red-500' : 'border-space-light/30'
              } rounded-md px-4 py-2 text-white focus:outline-none focus:border-space-accent`}
              required
            />
            {errors.passportNumber && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <FiAlertCircle className="mr-1" /> {errors.passportNumber}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-space-light mb-1 text-sm">
              Passport Expiry Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="passportExpiry"
              value={passenger.passportExpiry}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full bg-space-dark/50 border ${
                errors.passportExpiry ? 'border-red-500' : 'border-space-light/30'
              } rounded-md px-4 py-2 text-white focus:outline-none focus:border-space-accent`}
              required
            />
            {errors.passportExpiry && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <FiAlertCircle className="mr-1" /> {errors.passportExpiry}
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Emergency Contact */}
      <div>
        <h4 className="text-lg font-medium text-space-light mb-4">Emergency Contact</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-space-light mb-1 text-sm">
              Emergency Contact Name
            </label>
            <input
              type="text"
              name="emergencyContactName"
              value={passenger.emergencyContactName}
              onChange={handleChange}
              className="w-full bg-space-dark/50 border border-space-light/30 rounded-md px-4 py-2 text-white focus:outline-none focus:border-space-accent"
            />
          </div>
          
          <div>
            <label className="block text-space-light mb-1 text-sm">
              Emergency Contact Phone
            </label>
            <input
              type="tel"
              name="emergencyContactPhone"
              value={passenger.emergencyContactPhone}
              onChange={handleChange}
              className="w-full bg-space-dark/50 border border-space-light/30 rounded-md px-4 py-2 text-white focus:outline-none focus:border-space-accent"
            />
          </div>
        </div>
      </div>
      
      {/* Additional Information */}
      <div>
        <h4 className="text-lg font-medium text-space-light mb-4">Additional Information</h4>
        <div>
          <label className="block text-space-light mb-1 text-sm">
            Special Requirements or Medical Conditions
          </label>
          <textarea
            name="specialRequirements"
            value={passenger.specialRequirements}
            onChange={handleChange}
            rows={3}
            className="w-full bg-space-dark/50 border border-space-light/30 rounded-md px-4 py-2 text-white focus:outline-none focus:border-space-accent"
            placeholder="Please list any special requirements, dietary restrictions, or medical conditions we should be aware of."
          />
        </div>
      </div>
      
      {/* Consent */}
      <div>
        <div className="flex items-start mt-4">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              name="spaceflightConsent"
              checked={passenger.spaceflightConsent}
              onChange={handleChange}
              className="w-4 h-4 text-space-accent bg-space-dark border-space-light/30 rounded focus:ring-space-accent"
              required
            />
          </div>
          <div className="ml-3 text-sm">
            <label className={`font-medium ${errors.spaceflightConsent ? 'text-red-500' : 'text-space-light'}`}>
              Spaceflight Consent <span className="text-red-500">*</span>
            </label>
            <p className="text-space-light/70 text-xs mt-1">
              I understand the risks associated with space travel and consent to all safety protocols and procedures.
              I acknowledge that space travel involves inherent risks and I am participating voluntarily.
            </p>
            {errors.spaceflightConsent && (
              <p className="text-red-500 text-xs mt-1 flex items-center">
                <FiAlertCircle className="mr-1" /> {errors.spaceflightConsent}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 