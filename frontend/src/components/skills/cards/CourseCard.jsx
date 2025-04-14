import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="h-48 bg-gray-200 overflow-hidden">
        <img 
          src={course.image || '/images/course-placeholder.jpg'} 
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
            {course.category}
          </span>
          <span className="text-sm font-medium text-gray-900">
            {course.duration} hours
          </span>
        </div>
        
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {course.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">
            ${course.price || 'Free'}
          </span>
          <Link 
            to={`/skills/courses/${course._id}`}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;