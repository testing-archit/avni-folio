import { Mail, Linkedin, Instagram } from 'lucide-react';

export function ContactSection() {
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
                  href="mailto:avnisixc13@gmail.com" 
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
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-1">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Your Name" 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="your@email.com" 
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Tell me about your project..." 
                  />
                </div>
                <button type="submit" className="w-full bg-white text-slate-900 font-bold py-3 rounded-lg hover:bg-purple-50 transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


