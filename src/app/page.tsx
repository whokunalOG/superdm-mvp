'use client';

import { useState, FormEvent } from 'react';

// Icons
const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const MessageIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);

const ZapIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const TargetIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

// Features data
const features = [
  {
    icon: <MessageIcon />,
    title: 'Auto-Reply to Comments',
    description: 'Automatically respond to comments with personalized messages that drive engagement.'
  },
  {
    icon: <ZapIcon />,
    title: 'DM Automation',
    description: 'Send links, offers, and resources to interested prospects without manual work.'
  },
  {
    icon: <TargetIcon />,
    title: 'Lead Capture',
    description: 'Collect emails and build your list directly from Instagram interactions.'
  }
];

// How it works steps
const steps = [
  { num: '01', title: 'Connect Instagram', desc: 'Link your Instagram account in 30 seconds' },
  { num: '02', title: 'Set Keywords', desc: 'Choose trigger words that activate auto-responses' },
  { num: '03', title: 'Watch Sales Grow', desc: 'Sit back as comments convert to customers' }
];

// Testimonials
const testimonials = [
  { name: 'Sarah K.', role: 'Fitness Coach', text: 'Went from 50 manual DMs daily to zero. My conversion rate actually increased!' },
  { name: 'Mike T.', role: 'E-commerce Owner', text: 'Captured 300+ leads in the first week. Game changer for my business.' },
  { name: 'Jessica L.', role: 'Content Creator', text: 'Finally I can focus on creating while SuperDM handles my sales funnel.' }
];

// FAQ data
const faqs = [
  { q: 'Is this compliant with Instagram?', a: 'Yes! We use official Instagram APIs and follow all platform guidelines.' },
  { q: 'How quickly can I get started?', a: 'Setup takes less than 5 minutes. Just connect your account and set your keywords.' },
  { q: 'Can I customize the messages?', a: 'Absolutely. Personalize every auto-response to match your brand voice.' },
  { q: 'What happens after I join the waitlist?', a: 'You\'ll get early access and a special discount when we launch.' }
];

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setStatus('error');
      setMessage('Please enter your email');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setStatus('error');
      setMessage(errorMessage);
    }
  };

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <InstagramIcon />
              </div>
              <span className="font-bold text-xl">SuperDM</span>
            </div>
            <button 
              onClick={scrollToWaitlist}
              className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm font-medium transition-colors"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-pink-600/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                Launching Soon — Join 500+ creators
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Turn Instagram Comments Into{' '}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Sales Automatically
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0">
                Auto-reply to comments, send links in DMs, and capture leads on autopilot. 
                Save 10+ hours every week.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={scrollToWaitlist}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                >
                  Get Early Access
                </button>
                <button 
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-semibold transition-all"
                >
                  See How It Works
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-6 justify-center lg:justify-start mt-8 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <CheckIcon />
                  No credit card required
                </span>
                <span className="flex items-center gap-2">
                  <CheckIcon />
                  Free during beta
                </span>
              </div>
            </div>

            {/* Right - Visual */}
            <div className="relative hidden lg:block">
              <div className="relative bg-gray-900/50 backdrop-blur rounded-2xl border border-gray-800 p-6 shadow-2xl">
                {/* Mock Instagram UI */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                    <div>
                      <div className="font-semibold">your_brand</div>
                      <div className="text-xs text-gray-500">2m ago</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-lg p-4 space-y-3">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0" />
                      <div className="flex-1">
                        <span className="font-semibold text-sm">sarah_fit</span>
                        <span className="text-gray-400 text-sm ml-2">How do I get the workout plan? 🔥</span>
                      </div>
                    </div>
                    <div className="flex gap-3 ml-8">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex-shrink-0" />
                      <div className="flex-1 bg-purple-500/10 rounded-lg p-3">
                        <span className="text-purple-300 text-sm">Hey Sarah! Check your DMs 💪</span>
                        <span className="text-xs text-gray-500 block mt-1">Sent automatically by SuperDM</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 text-gray-500 text-sm">
                    <span>❤️ 234 likes</span>
                    <span>💬 45 comments</span>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-bounce">
                  +1 Lead Captured!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="border-y border-gray-800 bg-gray-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 border-2 border-gray-900 flex items-center justify-center text-xs font-medium"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div>
              <p className="text-white font-semibold">Join 500+ creators & businesses</p>
              <p className="text-gray-500 text-sm">Already on the waitlist for early access</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to{' '}
              <span className="text-purple-400">Convert Followers</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Stop losing sales in your comments. Automate your Instagram engagement and watch your business grow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="group p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-purple-500/50 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-32 bg-gray-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg">Get started in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="text-6xl font-bold text-gray-800 mb-4">{step.num}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 right-0 translate-x-1/2 w-24 h-px bg-gradient-to-r from-gray-700 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Loved by Early Users</h2>
            <p className="text-gray-400 text-lg">See what beta testers are saying</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-yellow-500">★</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-6">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500" />
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-32 bg-gray-900/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-800/50 transition-colors"
                >
                  <span className="font-semibold">{faq.q}</span>
                  <span className={`transform transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-gray-400">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist CTA Section */}
      <section id="waitlist" className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Automate Your Instagram?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Join the waitlist today and get 50% off when we launch.
          </p>

          <div className="max-w-md mx-auto">
            {status === 'success' ? (
              <div className="text-center p-8 rounded-2xl bg-green-500/10 border border-green-500/20">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-green-400 mb-2">You&apos;re on the list!</h3>
                <p className="text-gray-400">We&apos;ll notify you when SuperDM launches with your exclusive discount.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-5 py-4 rounded-xl bg-gray-800/80 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    disabled={status === 'loading'}
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap hover:scale-105"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Joining...
                      </span>
                    ) : (
                      'Join Waitlist'
                    )}
                  </button>
                </div>
                
                {status === 'error' && (
                  <p className="text-red-400 text-sm text-center">{message}</p>
                )}

                <p className="text-gray-500 text-sm">
                  🔒 We respect your privacy. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <InstagramIcon />
              </div>
              <span className="font-bold text-xl">SuperDM</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="mailto:hello@superdm.io" className="hover:text-white transition-colors">
                hello@superdm.io
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            © 2026 SuperDM. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
