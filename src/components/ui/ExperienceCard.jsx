import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const ExperienceCard = ({ experience }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative bg-slate-800 rounded-xl overflow-hidden shadow-xl border border-white/5 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10"
    >
      <div className={`h-24 w-full bg-gradient-to-r ${experience.color} flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="z-10 px-6 w-full">
          <h3 className="text-xl font-bold text-white mb-1">{experience.title}</h3>
          <p className="text-white/90 text-sm">{experience.organization}</p>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-3 mb-4 text-sm text-slate-400">
          <span className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {experience.duration} ({experience.durationMonths})
          </span>
          <span>•</span>
          <span>{experience.location}</span>
          <span>•</span>
          <span>{experience.employmentType}</span>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed mb-4">{experience.description}</p>
        {experience.skills && experience.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {experience.skills.map((skill, idx) => (
              <span key={idx} className="text-xs font-semibold px-3 py-1 bg-slate-700 text-purple-300 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ExperienceCard;