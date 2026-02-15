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
    return <div className="p-10">Loading...</div>
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
        <div className="text-center bg-white p-10 rounded-xl shadow-lg border max-w-md">
          <div className="text-6xl mb-4 text-green-500">✅</div>
          <h2 className="text-2xl font-bold mb-2">Enrollment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Welcome to the course. You can now start learning.
          </p>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
            onClick={() => window.location.href = '/my-enrollement'}
          >
            Go to My Courses
          </button>
        </div>
      </div>
    )
  }

};


  /* MAIN UI */
  return (
    <div className="bg-gray-50 min-h-screen p-10">
      <div className="flex gap-10">

        {/* LEFT - PAYMENT FORM */}
        <div className="w-1/2 bg-white p-6 rounded-lg shadow border">
          <h2 className="text-2xl font-bold mb-6">Checkout</h2>

          <div className="mb-6 p-4 bg-blue-50 rounded">
            Enrolling as: <strong>{paymentData.email}</strong>
          </div>

          <div className="space-y-4">
            <input
              name="cardNo"
              onChange={handleChange}
              placeholder="Card Number"
              className="w-full p-3 border rounded"
            />

            <div className="flex gap-4">
              <input
                name="expiryDate"
                onChange={handleChange}
                placeholder="MM/YY"
                className="w-1/2 p-3 border rounded"
              />
              <input
                name="cvc"
                onChange={handleChange}
                placeholder="CVC"
                className="w-1/2 p-3 border rounded"
              />
            </div>

            <button
              onClick={handleEnroll}
              className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700"
            >
              Complete Enrollment
            </button>
          </div>
        </div>

        {/* RIGHT - SUMMARY */}
        <div className="w-1/3 bg-white p-6 rounded-lg shadow border h-fit">
          <h3 className="text-lg font-bold mb-4">Order Summary</h3>
          <p className="text-sm text-gray-600">Course ID: {courseId}</p>

          <div className="mt-4 border-t pt-4 flex justify-between font-bold">
            <span>Total</span>
            <span>$39.99</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default EnrollToCourse
