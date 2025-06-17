import {motion} from 'framer-motion';
import { Link, useNavigate } from "react-router-dom";
import Socials from '../components/Socials';
import { useAuthStore } from '../store/auth.store';
import toast from "react-hot-toast";
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const HomePage = () => {

    const {user, logout} = useAuthStore();

    const handleLogout = () => {
        logout();
        toast.success("User Logged out")
    }
  return (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.75, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className='max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800'
    >
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-teal-600 text-transparent bg-clip-text'>
            Dashboard
        </h2>

        <div className='space-y-6'>
            <motion.div
                className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h3 className='text-xl font-semibold text-cyan-400 mb-3'>Profile Information</h3>
                <p className='text-gray-300'>Name: {user.name}</p>
                <p className='text-gray-300'>Email: {user.email}</p>
            </motion.div>
            <motion.div
                className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <h3 className='text-xl font-semibold text-cyan-400 mb-3'>Account Activity</h3>
                <p className='text-gray-300'>
                    <span className='font-bold'>Joined: </span>
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
                <p className='text-gray-300'>
                    <span className='font-bold'>Last Login: </span>

                    {formatDate(user.lastLogin)}
                </p>
            </motion.div>
        
        
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className='mt-6 p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
            >
                <h3 className='text-xl font-semibold text-cyan-400 mb-3'>Contact Me</h3>
                <div className='flex flex-row justify-left gap-6'>
                    <div className='text-gray-300 flex items-center gap-2'>
                        <FaGithub className="text-green-200 text-xl" />
                        <Link to="https://github.com/mihirkadam19" target="_blank" rel="noopener noreferrer" className='text-green-200 hover:text-green-400 transition-colors'>
                            GitHub
                        </Link>
                    </div>
                    <div className='text-gray-300 flex items-center gap-2'>
                        <FaLinkedin className="text-green-200 text-xl" />
                        <Link to="https://linkedin.com/in/mihir-kadam-447a8421a" target="_blank" rel="noopener noreferrer" className='text-green-200 hover:text-green-400 transition-colors'>
                            LinkedIn
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className='mt-4'
        >
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className='w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-teal-600 text-white 
            font-bold rounded-lg shadow-lg hover:from-cyan-600 hover:to-teal-700
                focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900'
            >
                Logout
            </motion.button>
        </motion.div>

    </motion.div>
  )
}

export default HomePage
