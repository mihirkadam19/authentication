import FloatingShape from "./components/FloatingShape";
import LoadingSpinner from "./components/LoadingSpinner";
import {Routes, Route, Navigate} from 'react-router-dom';
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useAuthStore } from "./store/auth.store";
import { useEffect } from "react";



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


function App() {

  const {isCheckingAuth, checkAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  console.log("isAuthenticated", isAuthenticated);


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

          
        <Route path='/signup' element={<RedirectAuthenticatedUser>
            <SignUpPage/>
          </RedirectAuthenticatedUser>} />


        <Route path='/login' element={<RedirectAuthenticatedUser>
            <LoginPage/>
          </RedirectAuthenticatedUser>} />

      </Routes>
      
    </div>
  )
}

export default App;
