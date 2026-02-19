import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CreditCard, BookOpen, CheckCircle, Lock } from 'lucide-react'; // Optional: Install lucide-react

const EnrollToCourse = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [isEnrolled, setIsEnrolled] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [loadingChapters, setLoadingChapters] = useState(true);
  
  const [paymentData, setPaymentData] = useState({
    userId: "",
    courseId: courseId,
    email: "",
    cardNo: "",
    expiryDate: "",
    cvc: "",
  });

  // Fetch Chapters & Set User Data
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      setPaymentData(prev => ({
        ...prev,
        userId: user.id,
        email: user.primaryEmailAddress?.emailAddress || "",
      }));
    }

    const fetchChapters = async () => {
      try {
        const res = await fetch(`http://localhost:8087/get-chapters/${courseId}`);
        const data = await res.json();
        // Sort by chapter_order ascending
        const sorted = data.sort((a, b) => a.chapter_order - b.chapter_order);
        setChapters(sorted);
      } catch (err) {
        console.error("Failed to fetch chapters", err);
      } finally {
        setLoadingChapters(false);
      }
    };

    fetchChapters();
  }, [isLoaded, isSignedIn, user, courseId]);

  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center animate-pulse text-gray-500">Loading Secure Checkout...</div>;
  if (!isSignedIn) return <Navigate to="/sign-up" />;

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleEnroll = async () => {
    try {
      const res = await fetch('http://localhost:8087/enrollCourse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });

      if (!res.ok) {
        toast.error("You are already enrolled in this course");
      } else {
        toast.success("Enrollment successful!");
        setIsEnrolled(true);
      }
    } catch (err) {
      toast.error("Connection error. Please try again.");
    }
  };

  if (isEnrolled) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="text-center bg-white p-10 rounded-2xl shadow-xl border border-green-100 max-w-md w-full transition-all">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">You're In!</h2>
          <p className="text-gray-600 mb-8">Success! Your enrollment is confirmed. Start your journey into cybersecurity today.</p>
          <button
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg transition-all"
            onClick={() => navigate('/my-enrollement')}
          >
            Go to My Learning Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white border-b py-6 mb-8">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-2 text-gray-500 text-sm">
          <span>Courses</span> <span>/</span> <span className="text-indigo-600 font-medium">Checkout</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: PAYMENT */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                <CreditCard size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Payment Details</h2>
            </div>

            <div className="mb-8 p-4 bg-indigo-50 rounded-xl border border-indigo-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wider">Account</p>
                <p className="text-gray-700 font-medium">{paymentData.email}</p>
              </div>
              <Lock size={18} className="text-indigo-400" />
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input
                  name="cardNo"
                  onChange={handleChange}
                  placeholder="0000 0000 0000 0000"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input
                    name="expiryDate"
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                  <input
                    name="cvc"
                    onChange={handleChange}
                    placeholder="123"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>

              <button
                onClick={handleEnroll}
                className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-all mt-4 shadow-lg flex items-center justify-center gap-2"
              >
                Complete Enrollment — $39.99
              </button>
              <p className="text-center text-xs text-gray-400 mt-4 italic">
                Secure 256-bit SSL Encrypted Payment
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SUMMARY & CURRICULUM */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 h-fit">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Course ID</span>
                <span className="font-mono">{courseId}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Service Fee</span>
                <span>$0.00</span>
              </div>
              <div className="pt-4 border-t flex justify-between items-center">
                <span className="font-bold text-gray-800 text-xl">Total</span>
                <span className="font-extrabold text-indigo-600 text-2xl">$39.99</span>
              </div>
            </div>
          </div>

          {/* Curriculum Preview */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={20} className="text-indigo-500" />
              <h3 className="font-bold text-gray-800">Course Curriculum</h3>
            </div>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {loadingChapters ? (
                <p className="text-gray-400 text-sm">Loading curriculum...</p>
              ) : chapters.map((chapter) => (
                <div key={chapter.chapter_id} className="group border-l-2 border-gray-100 pl-4 py-1 hover:border-indigo-500 transition-colors">
                  <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
                    Chapter {chapter.chapter_order}
                  </p>
                  <h4 className="text-sm font-semibold text-gray-700 group-hover:text-indigo-600 transition-colors">
                    {chapter.chapter_tilte}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EnrollToCourse;