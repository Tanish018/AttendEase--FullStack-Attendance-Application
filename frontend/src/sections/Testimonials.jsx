import { Star, User } from "lucide-react";

const Testimonials = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="text-center max-w-3xl mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
          Loved by Educators Worldwide
        </h2>
        <p className="text-gray-600 mt-2">
          See what educators are saying about their experience with AttendEase.
        </p>
      </div>

      <div className="flex justify-center items-center md:grid-cols-2 gap-6 mb-12 max-w-4xl w-full">
        <div className="bg-transparent border w-[20vh] h-[10vh] rounded-2xl cursor-pointer hover:scale-105 transition-all duration-150 shadow-md p-6 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 text-yellow-500 mb-2">
            {[...Array(5)].map((_, idx) => (
              <Star key={idx} className="fill-yellow-500" size={22} />
            ))}
          </div>
          <h3 className="text-2xl font-bold text-gray-800">4.9</h3>
        </div>

        <div className="bg-transparent border w-[20vh] h-[10vh] cursor-pointer hover:scale-105 transition-all duration-150 rounded-2xl shadow-md p-6 flex flex-col items-center justify-center">
          <h3 className="text-2xl font-bold text-green-600">98%</h3>
          <p className="text-gray-500">Satisfaction rate</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl w-full ">
        {[
          {
            quote:
              "AttendEase has completely transformed how we manage attendance. What used to take 10 minutes of class time now happens instantly. My students love the QR code system!",
            name: "Dr. Sarah Chen",
            role: "Professor of Computer Science",
            org: "Stanford University",
          },
          {
            quote:
              "The face recognition feature is a game-changer for our large lecture halls. No more buddy punching, and the analytics help us identify at-risk students early.",
            name: "Michael Rodriguez",
            role: "Academic Director",
            org: "University of Texas",
          },
          {
            quote:
              "Integration with our existing LMS was seamless. The time savings alone have paid for the system ten times over. Highly recommend for any educational institution.",
            name: "Emma Thompson",
            role: "IT Administrator",
            org: "Oxford College",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-transparent border rounded-2xl shadow-md p-6 flex flex-col justify-between cursor-pointer hover:scale-105 transition-all duration-150"
          >
            <div className="flex items-center gap-3 mb-4 ">
              <div className="bg-blue-100 p-2 rounded-full">
                <User className="text-blue-600" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{item.name}</h4>
                <p className="text-gray-600 text-sm">{item.role}</p>
                <p className="text-blue-600 text-sm">{item.org}</p>
              </div>
            </div>

            <p className="text-gray-700 italic mb-6 flex-grow">"{item.quote}"</p>

            <div className="flex flex-col items-start justify-center gap-1 text-yellow-500">
              <div className="flex gap-1">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="fill-yellow-500" size={18} />
                ))}
              </div>
              <p className="text-black font-semibold">5.0</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border rounded-2xl shadow-md p-6 mt-16 max-w-[28vw] w-full cursor-pointer hover:scale-105 transition-all duration-150">
        <div className="grid grid-cols-3 text-center divide-x divide-gray-200">
          {[
            { value: "10K+", label: "Active Educators" },
            { value: "500K+", label: "Students Tracked" },
            { value: "2M+", label: "Hours Saved" },
          ].map((stat, i) => (
            <div key={i} className="px-4">
              <h3 className="text-xl font-bold text-blue-900">{stat.value}</h3>
              <p className="text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;