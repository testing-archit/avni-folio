import React, { useState } from 'react';
import { Mail, Linkedin, Instagram } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactSection = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    // Prepare data for backend API
    const contactData = {
      name: formData.get('name'),
      email: formData.get('sender_email'),
      message: formData.get('message')
    };

    try {
      // 1. Send to Web3Forms for email delivery (bypasses Cloudflare in browser)
      const web3FormData = new FormData();
      web3FormData.append('access_key', '9989c355-4719-4fdc-b62e-7509e83cb469');
      web3FormData.append('email', 'avnisixc13@gmail.com');
      web3FormData.append('name', contactData.name);
      web3FormData.append('sender_email', contactData.email);
      web3FormData.append('message', contactData.message);
      web3FormData.append('subject', `Portfolio Contact from ${contactData.name}`);

      const web3Promise = fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: web3FormData
      });

      // 2. Save to database via backend API
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const backendPromise = fetch(`${API_URL}/api/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData)
      });

      // Wait for both requests
      const [web3Response, backendResponse] = await Promise.all([web3Promise, backendPromise]);

      // Check backend response
      const backendData = await backendResponse.json();

      // Check Web3Forms response (optional - email is bonus)
      let emailSent = false;
      try {
        const web3Data = await web3Response.json();
        emailSent = web3Data.success;
      } catch (err) {
        console.warn('Web3Forms response parsing failed, but continuing');
      }

      if (backendData.success) {
        toast.success('Message sent successfully! I\'ll get back to you soon.');
        e.target.reset();
        console.log(`✅ Saved to database${emailSent ? ' and email sent' : ''}`);
      } else {
        // Handle validation errors
        if (backendData.errors && backendData.errors.length > 0) {
          toast.error(backendData.errors[0].message);
        } else {
          toast.error(backendData.message || 'Failed to send message. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Cannot connect to server. Please try emailing directly at avnisixc13@gmail.com');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-white/10">
          <div className="grid md:grid-cols-2">
            <div className="p-10 bg-gradient-to-br from-purple-600 to-indigo-700 text-white flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-4">Let's work together!</h2>
                <p className="text-purple-100 mb-8">
                  Have a project in mind? I'm available for freelance work and collaborations.
                </p>
              </div>
              <div className="space-y-4">
                <a
                  href="mailto: avnisixc13@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 hover:text-purple-100 transition-colors cursor-pointer"
                >
                  <Mail className="w-5 h-5 text-purple-200" />
                  <span>avnisixc13@gmail.com</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/avni-saini-0927a12b9/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 hover:text-purple-100 transition-colors cursor-pointer"
                >
                  <Linkedin className="w-5 h-5 text-purple-200" />
                  <span>linkedin.com/in/avni-saini</span>
                </a>
                <a
                  href="https://instagram.com/damnitavni"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 hover:text-purple-100 transition-colors cursor-pointer"
                >
                  <Instagram className="w-5 h-5 text-purple-200" />
                  <span>@damnitavni</span>
                </a>
              </div>
            </div>

            <div className="p-10 bg-slate-900">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="sender_email" className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                  <input
                    type="email"
                    id="sender_email"
                    name="sender_email"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-slate-900 font-bold py-3 rounded-lg hover:bg-purple-50 transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;