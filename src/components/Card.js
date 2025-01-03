import React from "react";

const Card = ({ title, content, onAction }) => {
  return (
    <div className="bg-white border-2 border-indigo-500 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 p-6">
      <h3 className="text-xl font-bold text-indigo-600 mb-3">{title}</h3>
      <p className="text-gray-700 mb-4">{content}</p>
      <button
        onClick={onAction}
        className="w-full py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition-colors duration-200"
      >
        Explore
      </button>
    </div>
  );
};

export default Card;
