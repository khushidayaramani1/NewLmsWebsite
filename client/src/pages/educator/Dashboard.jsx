import React from "react";
import { User, BookOpen, DollarSign } from "lucide-react";
import StudentEnrolled from "../../pages/educator/StudentEnrolled.jsx";
import SideBar from "./SideBar.jsx";
import Navbar from "../../component/student/Navbar.jsx";
import { Outlet } from "react-router-dom";

const stats = [
  {
    id: 1,
    title: "Total Enrollments",
    value: 14,
    icon: <User size={22} />,
  },
  {
    id: 2,
    title: "Total Courses",
    value: 8,
    icon: <BookOpen size={22} />,
  },
  {
    id: 3,
    title: "Total Earnings",
    value: "$245",
    icon: <DollarSign size={22} />,
  },
];

const Dashboard = () => {
  return (
    <>
     

    <div className="flex h-screen">
 

      {/* Right side content */}
      <div className="flex-1 flex flex-col gap-8">
         

        {/* Top stats */}
        <div className="flex gap-6 p-6">
          {stats.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border border-blue-500 rounded-lg px-6 py-4 w-72"
            >
              <div className="text-blue-600 bg-blue-100 p-2 rounded-md">
                {item.icon}
              </div>

              <div>
                <div className="text-xl font-semibold">{item.value}</div>
                <div className="text-gray-500 text-sm">{item.title}</div>
              </div>
            </div>
          ))}
        </div>

        <StudentEnrolled />
      </div>
    </div>
     </>
  );
};

export default Dashboard;
