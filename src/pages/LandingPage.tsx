import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Activity, Brain, Heart, Shield, ChevronRight, Mail, Phone, MapPin,
  CheckCircle2, ArrowRight, Star, Users, Clock, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Activity className="h-8 w-8 text-primary" />
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">AI Disease Predictor</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="hidden md:inline-flex">About</Button>
              <Button variant="ghost" className="hidden md:inline-flex">Services</Button>
              <Button onClick={() => navigate('/signin')}>Sign In</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Medical Technology"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Advanced Disease Prediction<br />Using Artificial Intelligence
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Leverage the power of AI to predict and prevent diseases before they become serious.
              Get accurate insights based on your symptoms and medical history.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/signup')}
                className="text-lg px-8 py-6"
              >
                Get Started
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-4xl font-bold text-primary">98%</p>
              <p className="text-gray-600">Accuracy Rate</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <p className="text-4xl font-bold text-primary">50k+</p>
              <p className="text-gray-600">Users Worldwide</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <p className="text-4xl font-bold text-primary">200+</p>
              <p className="text-gray-600">Disease Patterns</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <p className="text-4xl font-bold text-primary">24/7</p>
              <p className="text-gray-600">Support Available</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started with our AI-powered disease prediction system in three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Users,
                title: "Create Your Profile",
                description: "Sign up and complete your health profile with relevant medical history"
              },
              {
                icon: Brain,
                title: "AI Analysis",
                description: "Our advanced AI analyzes your symptoms and medical data"
              },
              {
                icon: CheckCircle2,
                title: "Get Results",
                description: "Receive detailed predictions and recommended next steps"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-primary/5 rounded-lg p-8 text-center relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <step.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-primary" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">AI-Powered Analysis</h3>
              <p className="text-gray-600">
                Advanced machine learning algorithms analyze your symptoms and medical data for accurate predictions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Early Detection</h3>
              <p className="text-gray-600">
                Identify potential health issues early, enabling preventive measures and better outcomes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Secure & Private</h3>
              <p className="text-gray-600">
                Your health data is protected with enterprise-grade security and encryption.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600">Trusted by healthcare professionals and patients worldwide</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Johnson",
                role: "Cardiologist",
                image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80",
                quote: "This AI tool has revolutionized how I approach early disease detection. The accuracy is remarkable."
              },
              {
                name: "Michael Chen",
                role: "Patient",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80",
                quote: "The early warning system helped me identify a potential health issue months before it became serious."
              },
              {
                name: "Dr. Emily Williams",
                role: "Research Director",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80",
                quote: "The AI predictions have shown remarkable accuracy in our clinical trials. A game-changer in preventive care."
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-gray-50 rounded-lg p-8"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users who trust our AI-powered predictions
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/signup')}
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Activity className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">AI Disease Predictor</span>
              </div>
              <p className="text-gray-400">
                Revolutionizing healthcare with artificial intelligence.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Cookie Policy</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-400">
                  <Mail className="h-5 w-5 mr-2" />
                  info@aidiseasepredictor.com
                </li>
                <li className="flex items-center text-gray-400">
                  <Phone className="h-5 w-5 mr-2" />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center text-gray-400">
                  <MapPin className="h-5 w-5 mr-2" />
                  123 AI Street, Tech City
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} AI Disease Predictor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}