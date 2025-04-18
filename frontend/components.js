// MentorMind Frontend Components

// This file will organize reusable components for the frontend.
// Components include UI elements for authentication, course progress, rewards, and blockchain interactions.

import React from "react";

export const Button = ({ text, onClick }) => {
  return (
    <button className="px-4 py-2 bg-blue-600 text-white rounded-md" onClick={onClick}>
      {text}
    </button>
  );
};

export const Card = ({ title, description }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="text-lg font-bold">{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export const InputField = ({ label, type, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input 
        type={type} 
        value={value} 
        onChange={onChange} 
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
      />
    </div>
  );
};

// More components can be added here like Modals, Toast Notifications, and Blockchain Interaction Elements.

export default { Button, Card, InputField };
