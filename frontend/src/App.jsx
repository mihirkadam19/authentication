import FloatingShape from "./components/FloatingShape";
import {Routes, Route} from 'react-router-dom';
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

function App() {
    return (
    <div className="min-h-screen bg-gradient-to-br 
    from-blue-900 via-cyan-800 to-teal-900
    flex items-center justify-center relative overflow-hidden">
      <FloatingShape color="bg-green-300" size="w-48 h-48" top="-5%" left="10%" delay={0}/>
      <FloatingShape color="bg-green-100" size="w-32 h-32" top="70%" left="80%" delay={5}/>
      <FloatingShape color="bg-green-200" size="w-24 h-24" top="40%" left="10%" delay={4}/>


      <Routes>
        <Route path='/' element={'Home'} />
        <Route path='/signup' element={<SignUpPage/>} />
        <Route path='/login' element={<LoginPage/>} />
      </Routes>
    </div>
  )
}

export default App;
