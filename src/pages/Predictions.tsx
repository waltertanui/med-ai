import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, BarChart2, Calendar, Brain, FileText, Settings, PlusCircle, Filter, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/lib/useUser';

// Define the prediction type
interface Prediction {
  id: string;
  user_id: string;
  symptoms: string;
  prediction: string;
  created_at: string;
}

export default function Predictions() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [fetchingPredictions, setFetchingPredictions] = useState(true);

  // Fetch predictions when component mounts
  useEffect(() => {
    if (user) {
      fetchPredictions();
    }
  }, [user]);

  const fetchPredictions = async () => {
    setFetchingPredictions(true);
    try {
      const { data, error } = await supabase
        .from('predictions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPredictions(data || []);
    } catch (err) {
      console.error('Error fetching predictions:', err);
    } finally {
      setFetchingPredictions(false);
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

  // Function to determine risk level based on prediction text
  const determineRiskLevel = (predictionText: string) => {
    const lowerCasePrediction = predictionText.toLowerCase();
    if (lowerCasePrediction.includes('high risk') || lowerCasePrediction.includes('severe')) {
      return 'High Risk';
    } else if (lowerCasePrediction.includes('medium risk') || lowerCasePrediction.includes('moderate')) {
      return 'Medium Risk';
    } else {
      return 'Low Risk';
    }
  };

  // Function to extract condition from prediction text (simplified)
  const extractCondition = (predictionText: string) => {
    // This is a simplified approach - in a real app, you might want more sophisticated parsing
    const conditions = [
      'Cardiovascular Disease', 'Diabetes', 'Respiratory Condition', 
      'Hypertension', 'Flu', 'Common Cold', 'Allergies'
    ];
    
    for (const condition of conditions) {
      if (predictionText.toLowerCase().includes(condition.toLowerCase())) {
        return condition;
      }
    }
    
    return 'General Health Assessment';
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
          <Button className="flex items-center" onClick={() => navigate('/dashboard')}>
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
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Brain className="h-5 w-5 mr-2 text-primary" />
              Your Predictions
            </h2>
          </div>
          
          {fetchingPredictions ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">Loading predictions...</p>
            </div>
          ) : predictions.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {predictions.map((prediction, index) => {
                const riskLevel = determineRiskLevel(prediction.prediction);
                const condition = extractCondition(prediction.prediction);
                const date = new Date(prediction.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                });
                
                return (
                  <motion.div 
                    key={prediction.id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/prediction/${prediction.id}`)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          riskLevel === 'Low Risk' ? 'bg-green-100' : 
                          riskLevel === 'Medium Risk' ? 'bg-yellow-100' : 'bg-red-100'
                        }`}>
                          <AlertCircle className={`h-5 w-5 ${
                            riskLevel === 'Low Risk' ? 'text-green-600' : 
                            riskLevel === 'Medium Risk' ? 'text-yellow-600' : 'text-red-600'
                          }`} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {condition}
                          </p>
                          <p className="text-sm text-gray-600">
                            {riskLevel} • Based on symptoms
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-4">{date}</span>
                        <Button variant="ghost" size="sm">View Details</Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500">No predictions found. Create your first prediction from the Dashboard.</p>
              <Button 
                className="mt-4" 
                variant="outline" 
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}