import React from 'react';

const SkillCard = ({ skill }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="p-3 bg-blue-100 rounded-full mr-4">
            {typeof skill.icon === 'string' ? (
              <div className="text-2xl">{skill.icon}</div>
            ) : (
              skill.icon && React.createElement(skill.icon, { className: 'h-6 w-6 text-blue-600' })
            )}
          </div>
          <h3 className="text-xl font-semibold text-gray-800">{skill.title}</h3>
        </div>
        <p className="text-gray-600 mb-4">{skill.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{skill.level} level</span>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Learn
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
