import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, BarChart2, Calendar, Users, AlertCircle, Brain, FileText, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { getHealthPrediction } from '@/lib/groq';
import { useEffect } from 'react';
import { useUser } from '@/lib/useUser'; // Assuming you have a user hook

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useUser(); // Get the current user
  const [loading, setLoading] = useState(false);
  const [symptoms, setSymptoms] = useState('');
  const [prediction, setPrediction] = useState('');
  const [isPredicting, setIsPredicting] = useState(false);
  const [recentPredictions, setRecentPredictions] = useState([]);
  const [savingPrediction, setSavingPrediction] = useState(false);
  // Add these new state variables
  const [riskLevel, setRiskLevel] = useState({ level: 'Low', percentage: 25 });
  const [nextCheckup, setNextCheckup] = useState({ date: null, daysUntil: 0 });
  const [statsLoading, setStatsLoading] = useState(true);

  // Add this function after fetchRecentPredictions
  const fetchUserStats = async () => {
    if (!user) return;
    
    try {
      // Fetch risk level from recent predictions
      const { data: predictions } = await supabase
        .from('predictions')
        .select('created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1);
  
      // Fetch next appointment
      const { data: appointments } = await supabase
        .from('appointments')
        .select('date')
        .eq('user_id', user.id)
        .gte('date', new Date().toISOString())
        .order('date', { ascending: true })
        .limit(1);
  
      if (appointments?.[0]) {
        const checkupDate = new Date(appointments[0].date);
        const today = new Date();
        const daysUntil = Math.ceil((checkupDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        
        setNextCheckup({
          date: checkupDate,
          daysUntil: daysUntil
        });
      }
    } catch (err) {
      console.error('Error fetching user stats:', err);
    } finally {
      setStatsLoading(false);
    }
  };

  // Add fetchUserStats to useEffect
  useEffect(() => {
    if (user) {
      fetchRecentPredictions();
      fetchUserStats();
    }
  }, [user]);

  const fetchRecentPredictions = async () => {
    try {
      const { data, error } = await supabase
        .from('predictions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setRecentPredictions(data || []);
    } catch (err) {
      console.error('Error fetching predictions:', err);
    }
  };

  const savePrediction = async () => {
    if (!user || !prediction) {
      console.log("Cannot save: user or prediction missing", { user, prediction }); // Debug log
      return;
    }
    
    setSavingPrediction(true);
    try {
      console.log("Saving prediction for user:", user.id); // Debug log
      
      const { data, error } = await supabase
        .from('predictions')
        .insert({
          user_id: user.id,
          symptoms,
          prediction,
          created_at: new Date().toISOString(),
        })
        .select();
  
      if (error) {
        console.error("Supabase error:", error); // More detailed error
        throw error;
      }
      
      console.log("Prediction saved successfully:", data); // Confirm save
  
      // Refresh the recent predictions list
      await fetchRecentPredictions();
    } catch (err) {
      console.error('Error saving prediction:', err);
    } finally {
      setSavingPrediction(false);
    }
  };

  const handleGetPrediction = async () => {
    if (!symptoms.trim()) return;
    
    setIsPredicting(true);
    try {
      const result = await getHealthPrediction(symptoms);
      if (result) {
        setPrediction(result);
        // Only save if we have a valid result
        if (user) {
          await savePrediction();
        }
      }
    } catch (error) {
      console.error('Error getting prediction:', error);
      setPrediction('Error getting prediction. Please try again.');
    } finally {
      setIsPredicting(false);
    }
  };

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
          <Button variant="ghost" className="w-full justify-start" disabled>
            <BarChart2 className="h-5 w-5 mr-3" />
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/predictions')}>
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
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's your health overview.</p>
          </div>
          <Button onClick={handleSignOut} disabled={loading}>
            {loading ? 'Signing out...' : 'Sign Out'}
          </Button>
        </div>

        {/* Health Assessment */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Health Assessment</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-1">
                Describe your symptoms
              </label>
              <textarea
                id="symptoms"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="E.g., headache, fever, sore throat..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleGetPrediction} 
              disabled={isPredicting || !symptoms.trim()}
              className="w-full"
            >
              {isPredicting ? 'Analyzing...' : 'Get Assessment'}
            </Button>
            {prediction && (
              <div className="mt-4 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 shadow-sm">
                <h3 className="text-md font-semibold text-gray-900 mb-3 flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-primary" />
                  Assessment Results
                </h3>
                <div className="text-gray-700 whitespace-pre-line bg-white p-4 rounded-md border border-gray-100">
                  {prediction}
                </div>
                <div className="mt-3 p-3 bg-yellow-50 rounded-md border border-yellow-100 flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600">
                    This is an AI-generated assessment and should not replace professional medical advice.
                    Please consult with a healthcare provider for proper diagnosis.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Risk Level</p>
                <p className="text-2xl font-bold text-gray-900">{riskLevel.level}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-500 h-2.5 rounded-full" 
                  style={{ width: `${riskLevel.percentage}%` }} 
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Next Checkup</p>
                <p className="text-2xl font-bold text-gray-900">
                  {nextCheckup.date 
                    ? new Date(nextCheckup.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    : 'No upcoming'}
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              {nextCheckup.date 
                ? `In ${nextCheckup.daysUntil} days`
                : 'No appointments scheduled'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Predictions Made</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Brain className="h-6 w-6 text-primary" />
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              12 predictions this month
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Next Checkup</p>
                <p className="text-2xl font-bold text-gray-900">Mar 15</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              In 12 days
            </p>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Activity className="h-5 w-5 mr-2 text-primary" />
              Recent Activity
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentPredictions.length > 0 ? (
              recentPredictions.map((pred, index) => (
                <div key={pred.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Brain className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Health Assessment
                        </p>
                        <p className="text-sm text-gray-600">
                          {pred.symptoms.length > 50 
                            ? `${pred.symptoms.substring(0, 50)}...` 
                            : pred.symptoms}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {new Date(pred.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                No recent predictions found
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}