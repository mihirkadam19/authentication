import FloatingShape from "./components/FloatingShape";
import LoadingSpinner from "./components/LoadingSpinner";
import {Routes, Route, Navigate} from 'react-router-dom';
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import EmailVerifyPage from "./pages/EmailVerifyPage";
import { useAuthStore } from "./store/auth.store";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Marquee from "./components/Marquee";



// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};

// redirect authenticated users to home page
const RedirectAuthenticatedUser = ({children}) => {
  const { isAuthenticated, user } = useAuthStore(); 
  if (isAuthenticated && user.isVerified){

    return <Navigate to="/" replace />
  }
  return children;
}

// redirect if authenticated and verified
const RedirectIfVerifiedUser = ({children}) => {
  const {isAuthenticated, user} = useAuthStore();
  if (!isAuthenticated){
    return <Navigate to="/login" replace/>
  }

  if (user.isVerified){
    return <Navigate to="/" replace/>
  }
  return children;
}


function App() {

  const {isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br 
    from-blue-900 via-cyan-800 to-teal-900
    flex items-center justify-center relative overflow-hidden">
      <FloatingShape color="bg-green-300" size="w-48 h-48" top="-5%" left="10%" delay={0}/>
      <FloatingShape color="bg-green-100" size="w-32 h-32" top="70%" left="80%" delay={5}/>
      <FloatingShape color="bg-green-200" size="w-24 h-24" top="40%" left="10%" delay={4}/>


      <Routes>
        <Route path='/' element={<ProtectedRoute>
            <HomePage />
          </ProtectedRoute>} />



        <Route path='/verify-email' element={<RedirectIfVerifiedUser>
            <EmailVerifyPage/>
          </RedirectIfVerifiedUser>} />


          
        <Route path='/signup' element={<RedirectAuthenticatedUser>
            <SignUpPage/>
          </RedirectAuthenticatedUser>} />
    
        <Route path='/login' element={<RedirectAuthenticatedUser>
            <LoginPage/>
          </RedirectAuthenticatedUser>} />
        
        <Route path='/forgot-password' element={<RedirectAuthenticatedUser>
            <ForgotPassword/>
          </RedirectAuthenticatedUser>} />
        
        <Route path='/reset-password/:token' element={<RedirectAuthenticatedUser>
            <ResetPassword/>
          </RedirectAuthenticatedUser>} />

      </Routes>
      <Marquee/>
      <Toaster/>
    </div>
  )
}

export default App;
