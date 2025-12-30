import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { portfolioItems } from '../data/constants';

const ProjectDetails = () => {
    const { id } = useParams();
    const project = portfolioItems.find((item) => item.id === parseInt(id));
    const [selectedImage, setSelectedImage] = useState(null);

    if (!project) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
                    <Link to="/" className="text-purple-400 hover:text-purple-300">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    const images = project.gallery && project.gallery.length > 0
        ? project.gallery
        : project.image ? [project.image] : [];

    return (
        <div className="min-h-screen bg-slate-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <Link
                    to="/"
                    className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Portfolio
                </Link>

                {/* Header */}
                <div className="mb-12">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, idx) => (
                            <span key={idx} className="text-sm font-semibold px-3 py-1 bg-slate-800 text-purple-300 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {project.title}
                    </h1>
                    <p className="text-xl text-slate-300 max-w-3xl">
                        {project.description}
                    </p>
                </div>

                {/* Gallery Grid */}
                {images.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {images.map((img, idx) => (
                            <motion.div
                                key={idx}
                                layoutId={`image-${idx}`}
                                onClick={() => setSelectedImage(img)}
                                className="cursor-pointer group relative aspect-video rounded-xl overflow-hidden bg-slate-800"
                                whileHover={{ scale: 1.02 }}
                            >
                                <img
                                    src={img}
                                    alt={`${project.title} - ${idx + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-slate-800/50 rounded-xl border border-dashed border-slate-700">
                        <p className="text-slate-400">No images available for this project.</p>
                    </div>
                )}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <motion.img
                            src={selectedImage}
                            alt="Full screen view"
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectDetails;
