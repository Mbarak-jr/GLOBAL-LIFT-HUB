const SkillsHero = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        {activeTab === 'skills' ? 'Develop In-Demand Skills' : 'Explore Courses'}
      </h1>
      <p className="max-w-2xl mx-auto text-xl mb-8">
        {activeTab === 'skills' 
          ? 'Master the skills that will drive your career forward' 
          : 'Find the perfect course to boost your learning journey'}
      </p>
      
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => onTabChange('skills')}
          className={`px-6 py-2 rounded-full font-medium transition ${activeTab === 'skills' ? 'bg-white text-blue-600 shadow-lg' : 'bg-white bg-opacity-10 hover:bg-opacity-20'}`}
        >
          Browse Skills
        </button>
        <button
          onClick={() => onTabChange('courses')}
          className={`px-6 py-2 rounded-full font-medium transition ${activeTab === 'courses' ? 'bg-white text-blue-600 shadow-lg' : 'bg-white bg-opacity-10 hover:bg-opacity-20'}`}
        >
          View Courses
        </button>
      </div>
    </div>
  );
};

export default SkillsHero;