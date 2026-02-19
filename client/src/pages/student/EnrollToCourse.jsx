import React, { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useParams, Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const EnrollToCourse = () => {
  const { user, isSignedIn, isLoaded } = useUser()
  const { courseId } = useParams()

  const [isEnrolled, setIsEnrolled] = useState(false)

  const [paymentData, setPaymentData] = useState({
    userId: "",
    courseId: courseId,
    email: "",
    cardNo: "",
    expiryDate: "",
    cvc: "",
  })

  /* ✅ WAIT FOR CLERK TO LOAD USER */
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      setPaymentData(prev => ({
        ...prev,
        userId: user.id,
        email: user.primaryEmailAddress?.emailAddress || "",
      }))
    }
  }, [isLoaded, isSignedIn, user])

  /* 🔐 AUTH GUARDS */
  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center p-4 text-lg">Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-up" />
  }

  /* INPUT HANDLER */
  const handleChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    })
  }

  /* ENROLL HANDLER */
  const handleEnroll = async () => {
  try {
    const res = await fetch('http://localhost:8087/enrollCourse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });
    // Check if response is OK (status 200–299)
    if (!res.ok) {
      alert("already enrolled")
    }
    else{
      toast.success("Enrollment successful!");
      setIsEnrolled(true);
    }
    const backendResponse = await res.json();
    console.log("Backend response:", backendResponse);
  }catch (err) {
    console.error("Enrollment failed:", err.body);
  }


  /* SUCCESS SCREEN */
  if (isEnrolled) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center bg-white p-6 sm:p-10 rounded-xl shadow-lg border w-full max-w-md">
          <div className="text-5xl sm:text-6xl mb-4 text-green-500">✅</div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Enrollment Successful!</h2>
          <p className="text-gray-600 mb-6 text-base sm:text-lg">
            Welcome to the course. You can now start learning.
          </p>
          <button
            className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 text-base sm:text-lg"
            onClick={() => window.location.href = '/my-enrollement'}
          >
            Go to My Courses
          </button>
        </div>
      </div>
    );
  }

};


  /* MAIN UI */
  return (
    <div className="bg-gray-50 min-h-screen p-2 sm:p-4 md:p-8 lg:p-10">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 max-w-5xl mx-auto">
        {/* LEFT - PAYMENT FORM */}
        <div className="w-full lg:w-1/2 bg-white p-4 sm:p-6 rounded-lg shadow border mb-6 lg:mb-0">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Checkout</h2>
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 rounded text-sm sm:text-base">
            Enrolling as: <strong>{paymentData.email}</strong>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <input
              name="cardNo"
              onChange={handleChange}
              placeholder="Card Number"
              className="w-full p-2 sm:p-3 border rounded"
            />
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <input
                name="expiryDate"
                onChange={handleChange}
                placeholder="MM/YY"
                className="w-full sm:w-1/2 p-2 sm:p-3 border rounded"
              />
              <input
                name="cvc"
                onChange={handleChange}
                placeholder="CVC"
                className="w-full sm:w-1/2 p-2 sm:p-3 border rounded"
              />
            </div>
            <button
              onClick={handleEnroll}
              className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded font-bold hover:bg-blue-700 text-base sm:text-lg"
            >
              Complete Enrollment
            </button>
          </div>
        </div>
        {/* RIGHT - SUMMARY */}
        <div className="w-full lg:w-1/3 bg-white p-4 sm:p-6 rounded-lg shadow border h-fit">
          <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Order Summary</h3>
          <p className="text-xs sm:text-sm text-gray-600">Course ID: {courseId}</p>
          <div className="mt-3 sm:mt-4 border-t pt-3 sm:pt-4 flex justify-between font-bold text-base sm:text-lg">
            <span>Total</span>
            <span>$39.99</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnrollToCourse
