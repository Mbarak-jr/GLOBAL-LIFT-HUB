import React from 'react';
import { FiGlobe, FiTwitter, FiLinkedin, FiGithub } from 'react-icons/fi';

const DashboardFooter = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 px-6 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="text-xl font-bold mb-4">Community Empowerment Platform</h3>
            <p className="text-blue-100 mb-4">
              Bridging the gap between resources and those who need them most.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-blue-200">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-blue-200">
                <FiLinkedin size={20} />
              </a>
              <a href="#" className="text-white hover:text-blue-200">
                <FiGithub size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-100 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white">Our Impact</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white">Get Involved</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-100 hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-500 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <FiGlobe className="mr-2" />
            <span className="text-sm text-blue-100">Global Impact Initiative</span>
          </div>
          <div className="text-sm text-blue-100">
            © {new Date().getFullYear()} Community Empowerment Platform. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;