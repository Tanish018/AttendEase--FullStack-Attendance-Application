import { CheckCircle, Plus, Smartphone, ChartColumnIncreasing } from "lucide-react";

function ProcessFlow() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900">How It Works</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Three simple steps to transform your attendance tracking from chaos to
          clarity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        <div className="relative rounded-xl border border-gray-200 bg-white p-8 shadow-sm cursor-pointer hover:scale-105 transition-all duration-150">
          <div className="absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-black text-white font-bold shadow-md">
            01
          </div>
          <div className="text-4xl mb-4">
            <Plus size={40} className="text-black" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Create Class</h3>
          <p className="mt-3 text-gray-600">
            Set up your class in seconds. Add Students, their details with their photograph.
          </p>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-blue-600" />
              Add students via CSV or manual entry
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-blue-600" />
              Set attendance policies
            </li>
          </ul>
        </div>

        <div className="relative rounded-xl border border-gray-200 bg-white p-8 shadow-sm cursor-pointer hover:scale-105 transition-all duration-150">
          <div className="absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-black text-white font-bold shadow-md">
            02
          </div>
          <div className="text-4xl mb-4">
            <Smartphone size={40} className="text-black" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Verify Students</h3>
          <p className="mt-3 text-gray-600">
            Students check in using their Face ID. Done in Seconds.
            Quick, secure, and foolproof.
          </p>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-blue-600" />
              Face ID verification
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-blue-600" />
              Automatic geofencing
            </li>
          </ul>
        </div>

        <div className="relative rounded-xl border border-gray-200 bg-white p-8 shadow-sm cursor-pointer hover:scale-105 transition-all duration-150">
          <div className="absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-black text-white font-bold shadow-md">
            03
          </div>
          <div className="text-4xl mb-4">
            <ChartColumnIncreasing size={40} className="text-black" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Auto-Sync Reports
          </h3>
          <p className="mt-3 text-gray-600">
            Attendance data syncs instantly to your LMS. Generate reports, track
            patterns, and stay compliant.
          </p>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-blue-600" />
              Real-time sync to LMS
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-blue-600" />
              Automated reports
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={18} className="text-blue-600" />
              Analytics dashboard
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-16 text-center ">
        <div className="inline-block rounded-xl border border-gray-200 bg-white px-6 py-4 shadow-md cursor-pointer hover:scale-105 transition-all duration-150">
          <p className="text-red-600 font-bold text-lg inline-block mr-2">10 min</p>
          <span className="text-gray-500">Traditional Roll Call</span>
          <span className="mx-3 text-gray-400">→</span>
          <p className="text-green-600 font-bold text-lg inline-block mr-2">
            30 sec
          </p>
          <span className="text-gray-500">AttendEase</span>
        </div>
        <p className="mt-4 text-gray-500">
          Get back 95% of your time for what matters: teaching
        </p>
      </div>
    </section>
  );
}

export default ProcessFlow;
