import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import HomePage from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import ApplyLoans from './pages/Loans/ApplyLoan';
import MyLoans from './pages/Loans/MyLoans';
import AllOpportunities from './pages/Opportunities/AllOpportunities';
import AvailableOpportunities from './pages/Opportunities/AvailableOpportunities';
import InvestmentOpportunities from './pages/Opportunities/InvestmentOpportunities';
import CreateOpportunity from './pages/Opportunities/CreateOpportunity';
import OpportunityDetails from './pages/Opportunities/OpportunityDetails';
import Dashboard from './pages/Dashboard/Dashboard';
import FinancialInstitutions from './pages/FinancialInstitution/FinancialInstitutions';
import ProtectedRoute from './components/route/ProtectedRoute';
import Unauthorized from './pages/Error/Unauthorized';
import SkillsPage from './pages/Skills/SkillsPage';
import SkillDetails from './pages/Skills/SkillDetails';
import CourseDetails from './pages/Skills/CourseDetails';
import UserProfile from './pages/User/UserProfile';
import MarketplacePage from './pages/Marketplace/MarketplacePage';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password/:token" element={<ResetPassword />} />

          <Route path="/opportunities" element={<AvailableOpportunities />} />
          <Route path="/opportunities/:id" element={<OpportunityDetails />} />
          <Route path="/investment-opportunities" element={<InvestmentOpportunities />} />
          <Route path="/financial-institutions" element={<FinancialInstitutions />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/skills/:id" element={<SkillDetails />} />
          <Route path="/skills/courses/:id" element={<CourseDetails />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/loans/apply" element={<ApplyLoans />} />
            <Route path="/loans/myloans" element={<MyLoans />} />
            <Route path="/profile" element={<UserProfile />} />
          </Route>

          {/* Admin-only routes */}
          <Route element={<ProtectedRoute roles={['admin']} />}>
            <Route path="/admin/opportunities" element={<AllOpportunities />} />
            <Route path="/opportunities/create" element={<CreateOpportunity />} />
            <Route path="/opportunities/edit/:id" element={<CreateOpportunity />} />
            <Route path="/admin/skills" element={<SkillsPage adminView />} />
          </Route>

          {/* Partner routes */}
          <Route element={<ProtectedRoute roles={['partner', 'admin']} />}>
            <Route path="/partner/courses/create" element={<CreateOpportunity />} />
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;