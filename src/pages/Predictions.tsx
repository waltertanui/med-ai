import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, BarChart2, Calendar, Brain, FileText, Settings, PlusCircle, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function Predictions() {
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
          <Button variant="ghost" className="w-full justify-start" disabled>
            <Brain className="h-5 w-5 mr-3" />
            Predictions
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/appointments')}>
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
            <h1 className="text-2xl font-bold text-gray-900">Predictions</h1>
            <p className="text-gray-600">View and manage your health predictions</p>
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
            New Prediction
          </Button>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Predictions List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Your Predictions</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {[
              { date: 'Mar 10, 2023', result: 'Low Risk', condition: 'Cardiovascular Disease', accuracy: '92%' },
              { date: 'Feb 22, 2023', result: 'Medium Risk', condition: 'Diabetes Type 2', accuracy: '87%' },
              { date: 'Jan 15, 2023', result: 'Low Risk', condition: 'Respiratory Condition', accuracy: '94%' },
              { date: 'Dec 05, 2022', result: 'High Risk', condition: 'Hypertension', accuracy: '89%' },
            ].map((prediction, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      prediction.result === 'Low Risk' ? 'bg-green-100' : 
                      prediction.result === 'Medium Risk' ? 'bg-yellow-100' : 'bg-red-100'
                    }`}>
                      <Brain className={`h-5 w-5 ${
                        prediction.result === 'Low Risk' ? 'text-green-600' : 
                        prediction.result === 'Medium Risk' ? 'text-yellow-600' : 'text-red-600'
                      }`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {prediction.condition}
                      </p>
                      <p className="text-sm text-gray-600">
                        {prediction.result} • Accuracy: {prediction.accuracy}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-4">{prediction.date}</span>
                    <Button variant="ghost" size="sm">View Details</Button>
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