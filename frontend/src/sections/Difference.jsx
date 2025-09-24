import { CheckCircle, XCircle, Clock, AlertTriangle, UserX } from "lucide-react";

const AttendanceComparison = () => {
  return (
    <section className="min-h-screen flex items-center py-16 px-6 max-w-6xl mx-auto">
      <div className="w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Stop Wrestling with <span className="text-blue-600">Attendance Chaos</span>
          </h2>
          <p className="mt-4 text-gray-600">
            Every minute spent on roll calls is a minute stolen from learning. Let's fix that.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-red-100 text-red-600 text-sm font-medium">
              <XCircle size={16} /> Current Problems
            </div>
            <h3 className="text-2xl font-semibold text-red-600 mb-10">
              The Traditional Way is Broken
            </h3>

            <div className="grid gap-10">
              <div className="p-6 rounded-lg border border-red-200 bg-red-50 flex items-start gap-3 h-full">
                <Clock className="text-red-500 mt-1" size={22} />
                <div>
                  <h4 className="font-semibold text-red-600">Time-Consuming Roll Calls</h4>
                  <p className="text-gray-700 text-sm">
                    Manual attendance takes 5–10 minutes of valuable class time every session.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-lg border border-red-200 bg-red-50 flex items-start gap-3 h-full">
                <AlertTriangle className="text-red-500 mt-1" size={22} />
                <div>
                  <h4 className="font-semibold text-red-600">Human Error & Inaccuracy</h4>
                  <p className="text-gray-700 text-sm">
                    Mistakes in manual logging lead to incorrect attendance records and reports.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-lg border border-red-200 bg-red-50 flex items-start gap-3 h-full">
                <UserX className="text-red-500 mt-1" size={22} />
                <div>
                  <h4 className="font-semibold text-red-600">Proxy Attendance Issues</h4>
                  <p className="text-gray-700 text-sm">
                    Students marking attendance for absent friends undermines system integrity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-green-100 text-green-600 text-sm font-medium">
              <CheckCircle size={16} /> Our Solution
            </div>
            <h3 className="text-2xl font-semibold text-green-600 mb-10">
              The AttendEase Way
            </h3>

            <div className="grid gap-10">
              <div className="p-6 rounded-lg border border-green-200 bg-green-50 flex items-start gap-3 h-full">
                <CheckCircle className="text-green-500 mt-1" size={22} />
                <div>
                  <h4 className="font-semibold text-green-600">Instant Verification</h4>
                  <p className="text-gray-700 text-sm">
                    , Face ID, or Geofencing verify attendance in under 3 seconds.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-lg border border-green-200 bg-green-50 flex items-start gap-3 h-full">
                <CheckCircle className="text-green-500 mt-1" size={22} />
                <div>
                  <h4 className="font-semibold text-green-600">99.9% Accuracy</h4>
                  <p className="text-gray-700 text-sm">
                    Automated systems eliminate human error and ensure precise record-keeping.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-lg border border-green-200 bg-green-50 flex items-start gap-3 h-full">
                <CheckCircle className="text-green-500 mt-1" size={22} />
                <div>
                  <h4 className="font-semibold text-green-600">Proxy Prevention</h4>
                  <p className="text-gray-700 text-sm">
                    Biometric and location verification makes proxy attendance impossible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AttendanceComparison;
