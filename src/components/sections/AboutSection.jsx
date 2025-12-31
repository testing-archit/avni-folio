import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-800/50 rounded-3xl p-8 md:p-12 border border-white/5"
        >
          <div className="md:flex items-center gap-12">
            <div className="md:w-1/3 mb-8 md:mb-0 relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center overflow-hidden shadow-2xl">
                {/* Profile image */}
                <img
                  src="/profile-image.jpeg"
                  alt="Avni Saini - Designer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to gradient if image fails to load
                    e.target.style.display = 'none';
                    e.target.parentElement.classList.add('bg-gradient-to-tr', 'from-purple-600', 'to-pink-600');
                  }}
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-pink-500/20 rounded-full blur-xl"></div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">About The Designer</h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                Hello! I'm <span className="text-purple-400 font-semibold">Avni Saini</span>,
                a Computer Science Engineering student with a specialization in blockchain
                and a strong passion for design. I specialize in creating visual identities
                for college events, clubs, and emerging brands. My projects range from
                minimalistic logos for apps like
                <span className="text-purple-400 font-semibold"> Smart Chef </span>
                to large-scale event branding for
                <span className="text-purple-400 font-semibold"> ResCon 4.0</span>
                and <span className="text-purple-400 font-semibold"> Mobile Next</span>,
                where I focused on building cohesive, memorable visuals.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                I believe design is not just about how things look, but how they work and feel.
                Every color, layout, and detail must add meaning. My goal is to create immersive
                visual experiences that leave a lasting impact — whether it's a subtle gradient-based
                logo, a bold event banner, or a complete brand system.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                Beyond designing, I actively participate in hackathons, communities, and
                creative tech projects that allow me to blend aesthetics with technology.
                With each project, I aim to tell a story that feels thoughtful, modern,
                and uniquely crafted.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-slate-900/50 rounded-xl">
                  <h3 className="text-3xl font-bold text-white mb-1">20+</h3>
                  <p className="text-slate-400 text-sm">Projects</p>
                </div>
                <div className="text-center p-4 bg-slate-900/50 rounded-xl">
                  <h3 className="text-3xl font-bold text-white mb-1">5+</h3>
                  <p className="text-slate-400 text-sm">Major Events</p>
                </div>
                <div className="text-center p-4 bg-slate-900/50 rounded-xl">
                  <h3 className="text-3xl font-bold text-white mb-1">100%</h3>
                  <p className="text-slate-400 text-sm">Concept to Creation</p>
                </div>
              </div>
              <Link
                to="/resume"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-purple-500/50"
              >
                View Full Resume
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;