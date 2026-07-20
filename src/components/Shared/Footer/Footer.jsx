import React from "react";
import { Link } from "react-router";
import {
  FaFacebook,
  FaEnvelope,
  FaPhoneAlt,
  FaStripe,
  FaCcVisa,
  FaCcMastercard,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Logo & Desc */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-white tracking-tighter">
              JUR<span className="text-lime-500">NEXT</span>
            </h2>
            <p className="text-sm leading-relaxed text-gray-400">
              Your ultimate travel partner. Book bus, train, launch & flight
              tickets easily with our secure and fast platform.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-lime-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/all-tickets"
                  className="hover:text-lime-500 transition-colors"
                >
                  All Tickets
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-lime-500 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-lime-500 transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">
              Contact Info
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-lime-500" />
                <span>support@jurnext.com</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-lime-500" />
                <span>+880 1234 567 890</span>
              </li>
              <li className="flex items-center gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 hover:text-lime-500"
                >
                  <FaFacebook className="text-lime-500 text-lg" />
                  <span>Jurnext Official</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Payment Methods */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">
              Payment Methods
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              We accept secure payments via:
            </p>
            <div className="flex flex-wrap gap-4 text-4xl text-gray-400">
              <FaStripe
                className="hover:text-white transition-colors cursor-pointer"
                title="Stripe"
              />
              <FaCcVisa
                className="hover:text-white transition-colors cursor-pointer"
                title="Visa"
              />
              <FaCcMastercard
                className="hover:text-white transition-colors cursor-pointer"
                title="Mastercard"
              />
            </div>
            <div className="mt-4 inline-block bg-gray-800 px-3 py-1 rounded text-[10px] font-bold text-gray-400 border border-gray-700">
              SSL SECURED
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-widest">
            © {new Date().getFullYear()}{" "}
            <span className="text-lime-500 font-bold">Jurnext</span>. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
