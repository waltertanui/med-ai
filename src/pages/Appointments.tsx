import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, BarChart2, Calendar, Brain, FileText, Settings, PlusCircle, Clock, MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/lib/useUser';

// Define appointment interface
interface Appointment {
  id: string;
  user_id: string;
  date: string;
  time: string;
  doctor: string;
  type: string;
  location: string;
  status: 'upcoming' | 'past' | 'cancelled';
}

// After the Appointment interface and before the component
interface Appointment {
  id: string;
  user_id: string;
  date: string;
  time: string;
  doctor: string;
  type: string;
  location: string;
  status: 'upcoming' | 'past' | 'cancelled';
}

const AVAILABLE_DOCTORS = [
  { id: '1', name: 'Dr. Sarah Smith', specialty: 'General Practice' },
  { id: '2', name: 'Dr. Michael Chen', specialty: 'Cardiology' },
  { id: '3', name: 'Dr. Emily Brown', specialty: 'Pediatrics' },
  { id: '4', name: 'Dr. James Wilson', specialty: 'Neurology' },
  { id: '5', name: 'Dr. Maria Garcia', specialty: 'Dermatology' },
];

export default function Appointments() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [fetchingAppointments, setFetchingAppointments] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'cancelled'>('upcoming');
  
  // New state for appointment scheduling
  const [showScheduler, setShowScheduler] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    date: '',
    time: '',
    doctor: '',
    type: '',
    location: ''
  });
  const [schedulingAppointment, setSchedulingAppointment] = useState(false);

  // Fetch appointments when component mounts
  useEffect(() => {
    if (user) {
      fetchAppointments();
    }
  }, [user, activeTab]);

  const fetchAppointments = async () => {
    setFetchingAppointments(true);
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', activeTab)
        .order('date', { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    } finally {
      setFetchingAppointments(false);
    }
  };

  const handleStatusChange = async (appointmentId: string, status: 'upcoming' | 'past' | 'cancelled') => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', appointmentId);

      if (error) throw error;
      
      // Refresh appointments
      fetchAppointments();
    } catch (err) {
      console.error('Error updating appointment status:', err);
    }
  };

  // New function to handle appointment scheduling
  const handleScheduleAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setSchedulingAppointment(true);
    try {
      const { error } = await supabase
        .from('appointments')
        .insert({
          user_id: user.id,
          date: newAppointment.date,
          time: newAppointment.time,
          doctor: newAppointment.doctor,
          type: newAppointment.type,
          location: newAppointment.location,
          status: 'upcoming'
        });

      if (error) throw error;
      
      // Reset form and hide scheduler
      setNewAppointment({
        date: '',
        time: '',
        doctor: '',
        type: '',
        location: ''
      });
      setShowScheduler(false);
      
      // Refresh appointments
      fetchAppointments();
    } catch (err) {
      console.error('Error scheduling appointment:', err);
    } finally {
      setSchedulingAppointment(false);
    }
  };

  const handleSignOut = async () => {
    // Existing sign out code
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
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/settings')}>
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
            <p className="text-gray-600">Schedule and manage your appointments</p>
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
          <Button 
            className="flex items-center" 
            onClick={() => setShowScheduler(true)}
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Schedule Appointment
          </Button>
          <div className="flex items-center space-x-3">
            <Button 
              variant={activeTab === 'upcoming' ? 'outline' : 'ghost'} 
              size="sm"
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming
            </Button>
            <Button 
              variant={activeTab === 'past' ? 'outline' : 'ghost'} 
              size="sm"
              onClick={() => setActiveTab('past')}
            >
              Past
            </Button>
            <Button 
              variant={activeTab === 'cancelled' ? 'outline' : 'ghost'} 
              size="sm"
              onClick={() => setActiveTab('cancelled')}
            >
              Cancelled
            </Button>
          </div>
        </div>

        {/* Appointment Scheduler */}
        {showScheduler && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Schedule New Appointment</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0" 
                onClick={() => setShowScheduler(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <form onSubmit={handleScheduleAppointment} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                  />
                </div>
                
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                  />
                </div>
                
                <div>
                  <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 mb-1">
                    Doctor
                  </label>
                  <select
                    id="doctor"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={newAppointment.doctor}
                    onChange={(e) => setNewAppointment({...newAppointment, doctor: e.target.value})}
                  >
                    <option value="">Select doctor</option>
                    {AVAILABLE_DOCTORS.map((doctor) => (
                      <option key={doctor.id} value={doctor.name}>
                        {doctor.name} - {doctor.specialty}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    Appointment Type
                  </label>
                  <select
                    id="type"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={newAppointment.type}
                    onChange={(e) => setNewAppointment({...newAppointment, type: e.target.value})}
                  >
                    <option value="">Select type</option>
                    <option value="Check-up">Check-up</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Specialist">Specialist</option>
                    <option value="Vaccination">Vaccination</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    required
                    placeholder="123 Medical Center, Suite 456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={newAppointment.location}
                    onChange={(e) => setNewAppointment({...newAppointment, location: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowScheduler(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={schedulingAppointment}
                >
                  {schedulingAppointment ? 'Scheduling...' : 'Schedule Appointment'}
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Appointments List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              {activeTab === 'upcoming' ? 'Upcoming' : activeTab === 'past' ? 'Past' : 'Cancelled'} Appointments
            </h2>
          </div>
          
          {fetchingAppointments ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">Loading appointments...</p>
            </div>
          ) : appointments.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {appointments.map((appointment, index) => (
                <motion.div 
                  key={appointment.id} 
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
                      {activeTab === 'upcoming' && (
                        <div className="space-x-2">
                          <Button variant="outline" size="sm">Reschedule</Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                      {activeTab === 'cancelled' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleStatusChange(appointment.id, 'upcoming')}
                        >
                          Restore
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500">No {activeTab} appointments found.</p>
              {activeTab === 'upcoming' && (
                <Button 
                  className="mt-4" 
                  variant="outline" 
                  onClick={() => setShowScheduler(true)}
                >
                  Schedule an Appointment
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}