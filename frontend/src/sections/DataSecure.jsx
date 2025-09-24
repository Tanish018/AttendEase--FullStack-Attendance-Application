import { Shield, Lock, Users, Eye, FileCheck } from "lucide-react";

const SecuritySection = () => {
  return (
    <section className="bg-transparent w-full min-h-screen flex flex-col items-center justify-center py-12 px-6 text-center gap-5">
      <div className="mb-4 px-4 py-1 flex items-center justify-center gap-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-full">
        <Shield size={15} className="text-black" />
        <p>Enterprise-Grade Security</p>
      </div>

      <h2 className="text-3xl font-bold mb-2">
        Your Data is <span className="text-blue-600">Completely Secure</span>
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        We take security seriously. Your institutional data and student privacy are protected with
        enterprise-grade security measures.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="p-6 border flex gap-3 rounded-2xl shadow-md cursor-pointer hover:scale-105 transition-all duration-150 text-left">
          <div className="text-2xl mb-3">
            <Lock size={30} className="text-black" />
          </div>
          <div classname="flex flex-col items-center justify-center">
            <h3 className="font-semibold text-lg mb-2">End-to-End Encryption</h3>
            <p className="text-gray-600 text-sm">
              All data is encrypted in transit and at rest using AES-256 encryption standards.
            </p>
          </div>
        </div>

        <div className="p-6 border flex gap-3 rounded-2xl shadow-md cursor-pointer hover:scale-105 transition-all duration-150 text-left">
          <div className="text-2xl mb-3">
            <Users size={30} className="text-black" />
          </div>
          <div classname="flex flex-col items-center justify-center">
            <h3 className="font-semibold text-lg mb-2">Role-Based Access Control</h3>
            <p className="text-gray-600 text-sm">
              Granular permissions ensure only authorized personnel can access sensitive data.
            </p>
          </div>
        </div>

        <div className="p-6 border flex gap-3 rounded-2xl shadow-md cursor-pointer hover:scale-105 transition-all duration-150 text-left">
          <div className="text-2xl mb-3">
            <Shield size={30} className="text-black" />
          </div>
          <div classname="flex flex-col items-center justify-center">
            <h3 className="font-semibold text-lg mb-2">Privacy by Design</h3>
            <p className="text-gray-600 text-sm">
              Biometric templates are hashed and never stored as actual images or data.
            </p>
          </div>
        </div>

        <div className="p-6 border flex gap-3 rounded-2xl shadow-md cursor-pointer hover:scale-105 transition-all duration-150 text-left">
          <div className="text-2xl mb-3">
            <FileCheck size={30} className="text-black" />
          </div>
          <div classname="flex flex-col items-center justify-center">
            <h3 className="font-semibold text-lg mb-2">Compliance Ready</h3>
            <p className="text-gray-600 text-sm">
              SOC 2, GDPR, and FERPA compliant with comprehensive audit trails.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-14 max-w-3xl mx-auto p-6 flex gap-3 border rounded-2xl shadow-md cursor-pointer hover:scale-105 transition-all duration-150 text-left bg-gray-50">
        <div>
          <Shield size={30} className="text-black" />
        </div>
        <div className="flec flec-col items-center">
          <h3 className="font-semibold text-lg mb-2">Biometric Data Privacy</h3>
          <p className="text-gray-600 text-sm">
            When using Face ID verification, we create mathematical templates from facial features. No
            actual images are stored, and all biometric data can be deleted at any time. Full transparency
            in our Privacy Policy.
          </p>
        </ div>
      </div>
    </section>
  );
}

export default SecuritySection;