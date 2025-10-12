import { useState } from 'react';
import { Instagram, Youtube, Music2, Mail, ChevronDown } from 'lucide-react';
import { supabase } from './lib/supabase';

function App() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const { error } = await supabase
        .from('email_subscribers')
        .insert([
          {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            source: 'main_form'
          }
        ]);

      if (error) {
        if (error.code === '23505') {
          setSubmitMessage('You\'re already subscribed! Check your inbox.');
        } else {
          setSubmitMessage('Something went wrong. Please try again.');
          console.error('Subscription error:', error);
        }
      } else {
        setSubmitMessage('Thanks for joining! Check your email soon.');
        setEmail('');
        setName('');
      }
    } catch (err) {
      setSubmitMessage('Something went wrong. Please try again.');
      console.error('Unexpected error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=1920')",
          }}
        ></div>

        <div className="relative z-20 text-center px-6 max-w-5xl">
          <div className="mb-8">
            <h1 className="text-7xl md:text-8xl font-bold tracking-tight mb-2 font-sans">STRATA</h1>
            <p className="text-gold text-lg md:text-xl tracking-widest font-light">MADE FOR PEAK PERFORMANCE</p>
          </div>

          <h2 className="text-3xl md:text-5xl font-semibold mb-6 leading-tight font-sans">
            Helping Busy Professionals, Entrepreneurs,<br />and Athletes Achieve Peak Performance.
          </h2>

          <p className="text-xl md:text-2xl mb-10 font-light font-body">
            Train smarter. Build discipline. Transform your body and mind.
          </p>

          <button
            onClick={() => scrollToSection('coaching')}
            className="bg-gold text-black px-12 py-4 rounded-full text-lg font-semibold hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            I'm Ready
          </button>
        </div>

        <button
          onClick={() => scrollToSection('about')}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce"
        >
          <ChevronDown className="w-10 h-10 text-gold" />
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4 font-sans">About The Hybrid Trainer</h2>
            <div className="w-24 h-1 bg-gold mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 font-body text-lg leading-relaxed">
              <p>
                For High Performers who refuse to settle. Whether you're building a business,
                crushing it in your career, or competing at the highest level, your body is your foundation.
              </p>

              <p>
                Through a proven system of structured training, precise nutrition, and relentless accountability,
                I help you build strength, lose fat, and develop the discipline that separates the good from the great.
              </p>

              <p>
                This isn't about quick fixes. It's about sustainable transformation that compounds over time.
                Let's build something legendary.
              </p>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Trainer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 border-4 border-gold rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Coaching Section */}
      <section id="coaching" className="py-24 px-6 bg-black text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 font-sans">1:1 Online Coaching</h2>
            <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 font-body">
              Elite coaching for those ready to commit to their transformation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/5 p-8 rounded-lg border border-white/10 hover:border-gold transition-all duration-300">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center font-sans">Weekly Check-Ins</h3>
              <p className="text-gray-300 text-center font-body">
                Direct access via app for consistent progress tracking and real-time adjustments
              </p>
            </div>

            <div className="bg-white/5 p-8 rounded-lg border border-white/10 hover:border-gold transition-all duration-300">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center font-sans">Custom Plans</h3>
              <p className="text-gray-300 text-center font-body">
                Personalized training and nutrition tailored to your goals, schedule, and lifestyle
              </p>
            </div>

            <div className="bg-white/5 p-8 rounded-lg border border-white/10 hover:border-gold transition-all duration-300">
              <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center font-sans">Accountability</h3>
              <p className="text-gray-300 text-center font-body">
                Performance tracking and support to keep you consistent when motivation fades
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => scrollToSection('email')}
              className="bg-gold text-black px-12 py-4 rounded-full text-lg font-semibold hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              I'm Ready
            </button>
          </div>
        </div>
      </section>

      {/* Digital Products Section */}
      <section id="products" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 font-sans">Digital Products & Fitness Challenges</h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-8"></div>

          <p className="text-xl text-gray-700 mb-8 font-body leading-relaxed">
            Coming soon — programs and challenges designed for busy high achievers who want structure and results.
          </p>

          <div className="bg-black text-white p-12 rounded-lg shadow-2xl">
            <p className="text-2xl mb-6 font-sans">Get Early Access</p>
            <p className="text-gray-300 mb-8 font-body">
              Join the email list to be first in line for exclusive programs, challenges, and performance content.
            </p>
            <button
              onClick={() => scrollToSection('email')}
              className="bg-gold text-black px-10 py-3 rounded-full text-lg font-semibold hover:bg-white transition-all duration-300"
            >
              Join the List
            </button>
          </div>
        </div>
      </section>

      {/* Email Capture Section */}
      <section id="email" className="py-24 px-6 bg-gradient-to-b from-black to-gray-900 text-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4 font-sans">Join My Fitness Community</h2>
            <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 font-body">
              Get my weekly insights on training, mindset, and performance.
            </p>
          </div>

          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-all"
            />

            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-all"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gold text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Joining...' : 'Join Now'}
            </button>

            {submitMessage && (
              <p className="text-center text-gold font-semibold">{submitMessage}</p>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-bold mb-2 font-sans">STRATA</h3>
              <p className="text-gold text-sm tracking-wider">MADE FOR PEAK PERFORMANCE</p>
            </div>

            <div className="flex gap-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-black transition-all duration-300"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-black transition-all duration-300"
              >
                <Music2 className="w-6 h-6" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-black transition-all duration-300"
              >
                <Youtube className="w-6 h-6" />
              </a>
              <a
                href="mailto:addrianolsonnn@gmail.com"
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-black transition-all duration-300"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-gray-400 font-body italic">To Him belongs all the glory.</p>
            <p className="text-gray-500 text-sm mt-4">© 2025 Strata. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
