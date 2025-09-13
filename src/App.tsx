import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Layout } from '@/components/layout/Layout';
import { Login } from '@/pages/Login';
import { Dashboard } from '@/pages/Dashboard';
import { StudentProfile } from '@/pages/StudentProfile';
import { EvolutionDashboard } from '@/pages/EvolutionDashboard';
import { GoalsPlanning } from '@/pages/GoalsPlanning';
import { OpportunitiesCalendar } from '@/pages/OpportunitiesCalendar';
import { FinancialTools } from '@/pages/FinancialTools';
import { ComplianceMonitoring } from '@/pages/ComplianceMonitoring';
import { Gamification } from '@/pages/Gamification';
import { CommunicationTools } from '@/pages/CommunicationTools';
import { Settings } from '@/pages/Settings';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Layout>{children}</Layout>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <StudentProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/evolution"
        element={
          <ProtectedRoute>
            <EvolutionDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/opportunities"
        element={
          <ProtectedRoute>
            <OpportunitiesCalendar />
          </ProtectedRoute>
        }
      />
      <Route
        path="/communication"
        element={
          <ProtectedRoute>
            <CommunicationTools />
          </ProtectedRoute>
        }
      />
      <Route
        path="/goals"
        element={
          <ProtectedRoute>
            <GoalsPlanning />
          </ProtectedRoute>
        }
      />
      <Route
        path="/finance"
        element={
          <ProtectedRoute>
            <FinancialTools />
          </ProtectedRoute>
        }
      />
      <Route
        path="/compliance"
        element={
          <ProtectedRoute>
            <ComplianceMonitoring />
          </ProtectedRoute>
        }
      />
      <Route
        path="/gamification"
        element={
          <ProtectedRoute>
            <Gamification />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;