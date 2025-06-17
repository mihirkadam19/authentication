import {motion} from 'framer-motion';
import Input from "../components/Input";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import { useAuthStore } from '../store/auth.store';
import toast from 'react-hot-toast';

const SignUpPage = () => {
    
    // state
    const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    
    const {signup, error, isLoading} = useAuthStore();
    
    const navigate = useNavigate();

    // exec when form submitted
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await signup(email, password, name);
            navigate("/verify-email");
            toast.success("User signed up")
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
            className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-4xl rounded-2xl shadow-xl overflow-hidden'
        >
            <div className='p-8'>
                    <h2 className='text-2xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-500 to-teal-400 text-transparent bg-clip-text'>
                        Create Account
                    </h2>

                    <form onSubmit={handleSignUp}>
                        <Input
                            icon={User}
                            type='text'
                            placeholder='Full Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
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

                        {<PasswordStrengthMeter password={password} />}

                        <motion.button
                            className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-cyan-600 to-teal-500 text-white 
                            font-bold rounded-lg shadow-lg hover:from-cyan-700
                            hover:to-teal-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2
                            focus:ring-offset-gray-900 transition duration-200'
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type='submit'
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader className=' animate-spin mx-auto' size={24} /> : "Sign Up"}
                        </motion.button>
                    </form>
                </div>
                <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
                    <p className='text-sm text-gray-400'>
                        Already have an account?{" "}
                        <Link to={"/login"} className='text-cyan-300 hover:underline'>
                            Login
                        </Link>
                    </p>
                </div>
        </motion.div>
    )
}

export default SignUpPage
