'use client';

import React, { useState } from 'react';
import { 
  FiCreditCard, 
  FiPlus, 
  FiTrash2, 
  FiEdit2, 
  FiCheck, 
  FiX, 
  FiLock 
} from 'react-icons/fi';

// Mock payment methods
const initialPaymentMethods = [
  {
    id: '1',
    type: 'visa',
    cardNumber: '**** **** **** 1234',
    expiryDate: '12/25',
    cardholderName: 'John Doe',
    isDefault: true
  },
  {
    id: '2',
    type: 'mastercard',
    cardNumber: '**** **** **** 5678',
    expiryDate: '06/24',
    cardholderName: 'John Doe',
    isDefault: false
  }
];

interface PaymentMethod {
  id: string;
  type: string;
  cardNumber: string;
  expiryDate: string;
  cardholderName: string;
  isDefault: boolean;
}

interface PaymentFormData {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  setAsDefault: boolean;
}

const PaymentMethodsPage = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(initialPaymentMethods);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<PaymentFormData>({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    setAsDefault: false
  });
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.cardholderName || !formData.cardNumber || !formData.expiryDate || !formData.cvv) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Determine card type based on first digit (simplified)
    let cardType = 'other';
    if (formData.cardNumber.startsWith('4')) {
      cardType = 'visa';
    } else if (formData.cardNumber.startsWith('5')) {
      cardType = 'mastercard';
    } else if (formData.cardNumber.startsWith('3')) {
      cardType = 'amex';
    }
    
    // Create new payment method
    const newPaymentMethod: PaymentMethod = {
      id: String(Date.now()),
      type: cardType,
      cardNumber: `**** **** **** ${formData.cardNumber.slice(-4)}`,
      expiryDate: formData.expiryDate,
      cardholderName: formData.cardholderName,
      isDefault: formData.setAsDefault
    };
    
    // Update default status if needed
    let updatedPaymentMethods = paymentMethods.map(method => 
      formData.setAsDefault ? { ...method, isDefault: false } : method
    );
    
    // Add new payment method
    setPaymentMethods([...updatedPaymentMethods, newPaymentMethod]);
    
    // Reset form and hide it
    setFormData({
      cardholderName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      setAsDefault: false
    });
    setShowAddForm(false);
  };
  
  // Set a payment method as default
  const setAsDefault = (id: string) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
  };
  
  // Delete a payment method
  const deletePaymentMethod = (id: string) => {
    // Cannot delete default payment method
    const method = paymentMethods.find(m => m.id === id);
    if (method && method.isDefault) {
      alert('Cannot delete default payment method. Please set another method as default first.');
      return;
    }
    
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
  };
  
  // Get card logo based on type
  const getCardLogo = (type: string) => {
    switch (type) {
      case 'visa':
        return 'bg-blue-600 text-white font-bold px-2 py-1 rounded text-xs';
      case 'mastercard':
        return 'bg-red-600 text-white font-bold px-2 py-1 rounded text-xs';
      case 'amex':
        return 'bg-green-600 text-white font-bold px-2 py-1 rounded text-xs';
      default:
        return 'bg-gray-600 text-white font-bold px-2 py-1 rounded text-xs';
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-white">Payment Methods</h1>
      
      {/* Payment Methods List */}
      <div className="bg-space-dark border border-space-light/20 rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Saved Payment Methods</h2>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-space-dark hover:bg-space-dark/80 text-white py-2 px-4 rounded-md border border-space-gold transition-colors"
          >
            {showAddForm ? <FiX /> : <FiPlus />}
            {showAddForm ? 'Cancel' : 'Add Payment Method'}
          </button>
        </div>
        
        {paymentMethods.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-space-light mb-4">You don't have any saved payment methods.</p>
            <button 
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 bg-space-gold hover:bg-space-gold/80 text-space-dark font-medium py-2 px-6 rounded-md transition-colors mx-auto"
            >
              <FiPlus /> Add Payment Method
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="bg-space-dark/50 border border-space-light/10 rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="mr-4">
                      <span className={getCardLogo(method.type)}>
                        {method.type.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <p className="text-white font-medium">{method.cardNumber}</p>
                        {method.isDefault && (
                          <span className="ml-2 bg-space-dark text-space-gold text-xs font-medium px-2 py-1 rounded-full border border-space-gold">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="text-space-light text-sm mt-1">
                        <span>{method.cardholderName}</span>
                        <span className="mx-2">•</span>
                        <span>Expires {method.expiryDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {!method.isDefault && (
                      <button 
                        onClick={() => setAsDefault(method.id)}
                        className="text-white hover:text-space-gold transition-colors p-2"
                        title="Set as default"
                      >
                        <FiCheck />
                      </button>
                    )}
                    <button 
                      onClick={() => deletePaymentMethod(method.id)}
                      className="text-white hover:text-red-500 transition-colors p-2"
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Add Payment Method Form */}
        {showAddForm && (
          <div className="mt-6 pt-6 border-t border-space-light/20">
            <h3 className="text-lg font-medium text-white mb-4">Add New Payment Method</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cardholderName" className="block text-space-light mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    id="cardholderName"
                    name="cardholderName"
                    value={formData.cardholderName}
                    onChange={handleChange}
                    className="w-full p-2 bg-space-dark border border-space-light/30 rounded text-white focus:border-space-gold focus:outline-none"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="cardNumber" className="block text-space-light mb-1">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className="w-full p-2 bg-space-dark border border-space-light/30 rounded text-white focus:border-space-gold focus:outline-none"
                      placeholder="1234 5678 9012 3456"
                      maxLength={16}
                      required
                    />
                    <FiLock className="absolute right-3 top-3 text-space-light" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="expiryDate" className="block text-space-light mb-1">Expiry Date</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="w-full p-2 bg-space-dark border border-space-light/30 rounded text-white focus:border-space-gold focus:outline-none"
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="cvv" className="block text-space-light mb-1">CVV</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      className="w-full p-2 bg-space-dark border border-space-light/30 rounded text-white focus:border-space-gold focus:outline-none"
                      placeholder="123"
                      maxLength={4}
                      required
                    />
                    <FiLock className="absolute right-3 top-3 text-space-light" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="setAsDefault"
                  name="setAsDefault"
                  checked={formData.setAsDefault}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="setAsDefault" className="text-space-light">Set as default payment method</label>
              </div>
              
              <div className="text-xs text-space-light border-t border-space-light/10 pt-4 mt-4">
                <p className="flex items-center">
                  <FiLock className="mr-1" /> Your payment information is encrypted and securely stored
                </p>
              </div>
              
              <div className="flex gap-4 pt-4">
                <button 
                  type="submit" 
                  className="flex items-center gap-2 bg-space-gold hover:bg-space-gold/80 text-space-dark font-medium py-2 px-6 rounded-md transition-colors"
                >
                  <FiCreditCard /> Save Payment Method
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setFormData({
                      cardholderName: '',
                      cardNumber: '',
                      expiryDate: '',
                      cvv: '',
                      setAsDefault: false
                    });
                    setShowAddForm(false);
                  }}
                  className="flex items-center gap-2 bg-transparent hover:bg-space-light/10 text-white py-2 px-6 rounded-md border border-space-light/30 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      
      {/* Security Information */}
      <div className="bg-space-dark border border-space-light/20 rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-4">
          <FiLock className="text-space-gold mr-2" />
          <h2 className="text-xl font-bold text-white">Payment Security</h2>
        </div>
        
        <div className="text-space-light">
          <p className="mb-3">Your payment information is securely stored and processed following the highest security standards:</p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>All payment data is encrypted end-to-end</li>
            <li>We comply with PCI DSS (Payment Card Industry Data Security Standard)</li>
            <li>Your full card details are never stored on our servers</li>
            <li>Advanced fraud detection systems are in place to protect your account</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsPage; 