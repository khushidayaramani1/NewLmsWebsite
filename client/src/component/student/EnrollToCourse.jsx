import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';

const EnrollToCourse = () => {
  const [isEnrolled, setIsEnrolled] = useState(false);

  const { user, isSignedIn, isLoaded }  = useUser();

  const handleEnroll = () => {
    // This is where you'd normally call your database/API
    setIsEnrolled(true);
  };

  if (isEnrolled) {
    return (
      <div className="  min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center bg-white p-10 rounded-xl shadow-lg border border-gray-200 max-w-md">
          <div className="text-6xl mb-4 text-green-500">✅</div>
          <h2 className="text-2xl font-bold mb-2">Enrollment Successful!</h2>
          <p className="text-gray-600 mb-6">Welcome to the course. You can now start learning JavaScript fundamentals.</p>
          <button 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            onClick={() => window.location.href = '/my-enrollement'} // Example redirect
          >
            Go to My Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-10 font-sans text-gray-800">
      <div className=" flex gap-30!">
        
        {/* LEFT COLUMN: Checkout Form */}
        <div className=" flex flex-col w-1/2 space-y-3! bg-white  p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Checkout</h2>
          
          <div className="mb-8 p-4 bg-blue-50 rounded-md border border-blue-100">
            <p className="text-sm text-blue-800 font-medium">Enrolling as: <strong>{user?.primaryEmailAddress?.emailAddress}</strong></p>
          </div>

          <h3 className="text-lg font-semibold mb-4 text-gray-700">Payment Method</h3>
          <div className="flex flex-col space-y-3!">
            <div>
              <label className="block text-sm font-medium mb-1">Card Number</label>
              <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition" />
            </div>
            
            <div className="flex gap-6">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Expiry Date</label>
                <input type="text" placeholder="MM/YY" className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">CVC</label>
                <input type="text" placeholder="123" className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <button 
            onClick={handleEnroll}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-md transition duration-200 shadow-md"
          >
            Complete Enrollment
          </button>
          <p className="text-center text-xs text-gray-400 mt-4 italic">This is a secure dummy transaction for testing purposes.</p>
        </div>

        {/* RIGHT COLUMN: Summary Card */}
        <div className="flex flex-col space-y-3! bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-fit sticky top-10">
          <h3 className="text-lg font-bold mb-4">Order Summary</h3>
          
          <div className="flex gap-4 mb-6">
            <img src="https://via.placeholder.com/80" alt="Course" className="rounded-md object-cover" />
            <div>
              <h4 className="font-bold text-sm leading-tight">Introduction to JavaScript</h4>
              <p className="text-xs text-gray-500 mt-1">1 hour, 5 minutes • 4 lessons</p>
            </div>
          </div>

          <hr className="mb-4 border-gray-100" />

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Original Price:</span>
              <span className="line-through">$49.99</span>
            </div>
            <div className="flex justify-between text-green-600 font-medium">
              <span>Discount:</span>
              <span>- $10.00</span>
            </div>
            <div className="flex justify-between text-xl font-bold pt-4 border-t border-gray-100 text-gray-900">
              <span>Total:</span>
              <span>$39.99</span>
            </div>
          </div>
          
          <div className="mt-6 p-3 bg-gray-50 rounded text-xs text-gray-500 leading-relaxed">
            * By completing your purchase, you agree to our Terms of Service.
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollToCourse;