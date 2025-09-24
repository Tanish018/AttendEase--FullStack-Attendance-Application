import { Mail, Phone, MapPin, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <img src="/logo.png" width={50} alt="" />
            <span className="text-xl font-semibold">AttendEase</span>
          </div>
          <p className="text-gray-300 mb-6">
            Automate attendance in seconds with , Face ID, or Geofencing.
            Trusted by educators worldwide.
          </p>

          <div className="space-y-2 text-gray-300 text-sm">
            <p className="flex items-center gap-2">
              <Mail size={16} /> hello@AttendEase.app
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} /> +91 8815264857
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={16} /> IIIT Ranchi, Jharkhand
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Product</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Features</li>
            <li>Pricing</li>
            <li>Integrations</li>
            <li>Security</li>
            <li>API Documentation</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>Help Center</li>
            <li>Contact Support</li>
            <li>Setup Guide</li>
            <li>Video Tutorials</li>
            <li>System Status</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>About Us</li>
            <li>Careers</li>
            <li>Press Kit</li>
            <li>Partner Program</li>
            <li>Blog</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
        <p className="text-gray-400 text-sm">
          © 2025 AttendEase. All rights reserved.
        </p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20">
            <Linkedin size={18} />
          </a>
          <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20">
            <Github size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;