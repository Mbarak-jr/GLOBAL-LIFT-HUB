import React from 'react';

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'financial', label: 'Financial Literacy' },
  { value: 'career', label: 'Career Development' },
  { value: 'education', label: 'Education' },
  { value: 'technology', label: 'Technology' },
  { value: 'health', label: 'Health & Wellness' },
  // Add more categories as needed
];

const SkillCategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="w-full md:w-auto">
      <label htmlFor="category-filter" className="sr-only">Filter by category</label>
      <select
        id="category-filter"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 pl-3 pr-10 text-base sm:text-sm"
      >
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SkillCategoryFilter;