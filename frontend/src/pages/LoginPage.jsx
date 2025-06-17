import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store.js";
import toast from "react-hot-toast";


const LoginPage = () => {

  const navigate = useNavigate();

  // state
  const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuthStore();

	const handleLogin = async (e) => {
		e.preventDefault();
		
    try {
      await login(email, password);
      navigate("/");
	  toast.success("User logged in ...")
  } catch(error) {
      console.log(error);
	  toast.error(error.response?.data?.message || "Something went wrong");
  }
	};

  return (
    <motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 0.75, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
		>
			<div className='p-8'>
				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-teal-500 text-transparent bg-clip-text'>
					Welcome Back
				</h2>

				<form onSubmit={handleLogin}>
					<Input
						icon={Mail}
						type='email'
						placeholder='Email Address'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<Input
						icon={Lock}
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					<div className='flex items-center mb-6'>
						<Link to='/forgot-password' className='text-sm text-cyan-400 hover:underline'>
							Forgot password?
						</Link>
					</div>

					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className='w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-bold rounded-lg shadow-lg hover:from-cyan-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
						type='submit'
						disabled={isLoading}
					>
						{isLoading ? <Loader className='w-6 h-6 animate-spin  mx-auto' /> : "Login"}
					</motion.button>
				</form>
			</div>
			<div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
				<p className='text-sm text-gray-400'>
					Don't have an account?{" "}
					<Link to='/signup' className='text-cyan-400 hover:underline'>
						Sign up
					</Link>
				</p>
			</div>
		</motion.div>
  );
}

export default LoginPage
