import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Home/Navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Card 1</h2>
            <p className="text-gray-600">Some content goes here...</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Card 2</h2>
            <p className="text-gray-600">Some content goes here...</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Card 3</h2>
            <p className="text-gray-600">Some content goes here...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
