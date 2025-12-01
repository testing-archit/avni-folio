import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export function ProjectCard({ item }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-slate-800 rounded-xl overflow-hidden shadow-xl border border-white/5 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10"
    >
      <div className={`h-48 w-full bg-gradient-to-br ${item.color} flex items-center justify-center relative overflow-hidden`}>
        {/* Abstract Pattern Overlay */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="z-10 transform group-hover:scale-110 transition-transform duration-500">
          {item.icon}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900/90 to-transparent">
          <h3 className="text-xl font-bold text-white">{item.title}</h3>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {item.tags.map((tag, idx) => (
            <span key={idx} className="text-xs font-semibold px-2 py-1 bg-slate-700 text-purple-300 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-slate-400 text-sm mb-4">{item.description}</p>
        <button className="flex items-center text-sm font-medium text-white group-hover:text-purple-400 transition-colors">
          View Project <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </motion.div>
  );
}


