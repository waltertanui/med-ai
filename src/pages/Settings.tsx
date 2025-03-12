import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  BarChart2, 
  Calendar, 
  Brain, 
  FileText, 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  HelpCircle,
  Globe,
  Eye,
  Database
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
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
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/appointments')}>
            <Calendar className="h-5 w-5 mr-3" />
            Appointments
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/reports')}>
            <FileText className="h-5 w-5 mr-3" />
            Reports
          </Button>
          <Button variant="ghost" className="w-full justify-start" disabled>
            <SettingsIcon className="h-5 w-5 mr-3" />
            Settings
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Manage your account and preferences</p>
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

        {/* Settings Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-medium">Account</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Manage your personal information, email, and password
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Bell className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium">Notifications</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Configure how and when you receive alerts and reminders
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-lg font-medium">Privacy & Security</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Control your data sharing preferences and security settings
            </p>
          </motion.div>
        </div>

        {/* Additional Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">More Settings</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {[
              { title: 'Language', description: 'Change your preferred language', icon: <Globe className="h-5 w-5 text-gray-600" /> },
              { title: 'Accessibility', description: 'Adjust for better readability and navigation', icon: <Eye className="h-5 w-5 text-gray-600" /> },
              { title: 'Data Management', description: 'Export or delete your health data', icon: <Database className="h-5 w-5 text-gray-600" /> },
              { title: 'Help & Support', description: 'Get assistance or report an issue', icon: <HelpCircle className="h-5 w-5 text-gray-600" /> },
            ].map((setting, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                      {setting.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {setting.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        {setting.description}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Manage</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}