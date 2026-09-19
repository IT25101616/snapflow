import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Camera, Calendar, ShieldCheck, HeartHandshake, ArrowRight, Award, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { PackageCatalogueView } from '../../components/packages/PackageCatalogueView';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-charcoal-950 text-white overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Lanka Moments &bull; Event Photography Excellence
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Timeless Moments, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-amber-200 to-gold-500">
              Captivating Visual Artistry.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed">
            From majestic weddings at Colombo’s heritage venues to intimate milestone celebrations, Lanka Moments centralizes booking, live scheduling, and private high-resolution photo deliveries in one seamless hub.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              icon={ArrowRight}
              onClick={() => navigate('/packages')}
            >
              Explore Packages
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-gray-700 bg-charcoal-900 text-white hover:bg-charcoal-800"
              onClick={() => navigate('/availability')}
            >
              Check Availability
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="text-gold-400 hover:text-gold-300 hover:bg-gold-500/10"
              onClick={() => navigate('/gallery-access')}
            >
              Access Client Gallery &rarr;
            </Button>
          </div>
        </div>
      </section>

      {/* Trust & Metrics Banner */}
      <section className="bg-charcoal-900 border-y border-gray-800 py-8 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-extrabold text-gold-400">12+</div>
            <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Years Experience</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-gold-400">1,500+</div>
            <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Weddings & Events</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-gold-400">100%</div>
            <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Verified High-Res Deliveries</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-gold-400">4.9 / 5.0</div>
            <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Client Satisfaction</div>
          </div>
        </div>
      </section>

      {/* Photography Packages Preview */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-2">Our Signature Collections</h2>
          <h3 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Curated Photography Packages</h3>
          <p className="mt-3 text-sm text-gray-500">
            Transparent pricing in Sri Lankan Rupees. Flexible add-ons including drone cinematography and luxury flush-mount albums.
          </p>
        </div>

        <PackageCatalogueView
          onSelectPackage={(pkg) => navigate(`/customer/book?packageId=${pkg.id}`)}
          actionLabel="Book This Package"
        />
      </section>

      {/* Why Choose Lanka Moments */}
      <section className="bg-white py-20 border-t border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-2">Why Lanka Moments</h2>
            <h3 className="text-3xl font-extrabold text-gray-900">Craftsmanship & Seamless Technology</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-[#F9F9FB] border border-gray-200/70">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 text-gold-600 flex items-center justify-center mb-5">
                <Calendar className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Real-Time Availability</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Check dates and request preferred lead photographers instantly without waiting days for email quotes or telephone calls.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F9F9FB] border border-gray-200/70">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 text-gold-600 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Transparent Finance</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Upload real bank slips, track verified receipts, and receive timely in-app balance reminders 14 days before your event.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F9F9FB] border border-gray-200/70">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 text-gold-600 flex items-center justify-center mb-5">
                <ImageIcon className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Private Proof Selection</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Review proofs online, select your album favorites, and download the entire final published gallery as a ZIP package.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-charcoal-950 text-white py-16 border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to secure photography for your special date?
          </h2>
          <p className="text-sm text-gray-400 mb-8 max-w-xl mx-auto">
            Book now with a verified advance deposit or contact our Customer Relations Officers for custom requests.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="primary" size="md" onClick={() => navigate('/packages')}>
              Browse All Packages
            </Button>
            <Button variant="outline" size="md" className="border-gray-700 text-white bg-charcoal-900" onClick={() => navigate('/contact')}>
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
