import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, BarChart2, Calendar, Brain, FileText, Settings, PlusCircle, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function Appointments() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/signin');
    } catch (err) {
      console.error('Error signing out:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 z-50">
        <div className="flex items-center space-x-3 px-6 py-4 border-b border-gray-200">
          <Activity className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-gray-900">AI Predictor</span>
        </div>
        <nav className="p-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/dashboard')}>
            <BarChart2 className="h-5 w-5 mr-3" />
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/predictions')}>
            <Brain className="h-5 w-5 mr-3" />
            Predictions
          </Button>
          <Button variant="ghost" className="w-full justify-start" disabled>
            <Calendar className="h-5 w-5 mr-3" />
            Appointments
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/reports')}>
            <FileText className="h-5 w-5 mr-3" />
            Reports
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
            <p className="text-gray-600">Schedule and manage your medical appointments</p>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
            <Button onClick={handleSignOut} disabled={loading}>
              {loading ? 'Signing out...' : 'Sign Out'}
            </Button>
          </div>
        </div>

        {/* Actions Row */}
        <div className="flex justify-between items-center mb-6">
          <Button className="flex items-center">
            <PlusCircle className="h-5 w-5 mr-2" />
            Schedule Appointment
          </Button>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              Upcoming
            </Button>
            <Button variant="ghost" size="sm">
              Past
            </Button>
            <Button variant="ghost" size="sm">
              Cancelled
            </Button>
          </div>
        </div>

        {/* Calendar View */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">March 2023</h2>
          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
            {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
              <motion.div
                key={date}
                whileHover={{ scale: 1.05 }}
                className={`text-center py-3 rounded-md cursor-pointer ${
                  date === 15 ? 'bg-primary text-white' : 'hover:bg-gray-100'
                }`}
              >
                {date}
                {date === 15 && (
                  <div className="mt-1 mx-auto w-2 h-2 bg-white rounded-full"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {[
              { 
                date: 'Mar 15, 2023', 
                time: '10:30 AM', 
                doctor: 'Dr. Sarah Johnson', 
                type: 'Annual Checkup',
                location: 'Memorial Hospital'
              },
              { 
                date: 'Apr 02, 2023', 
                time: '2:15 PM', 
                doctor: 'Dr. Michael Chen', 
                type: 'Follow-up',
                location: 'City Medical Center'
              },
            ].map((appointment, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {appointment.type} with {appointment.doctor}
                      </p>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="mr-3">{appointment.time}</span>
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{appointment.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-4">{appointment.date}</span>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">Reschedule</Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">Cancel</Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}