import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { Navbar } from './components/ui';
import { Footer } from './components/sections';
import { Home, Resume, ProjectDetails } from './pages';

export default function App() {
    return (
        <div className="bg-slate-900 min-h-screen text-slate-100 font-sans selection:bg-purple-500 selection:text-white">
            <Router>
                <Toaster />
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/resume" element={<Resume />} />
                    <Route path="/project/:id" element={<ProjectDetails />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}
