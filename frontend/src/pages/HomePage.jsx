import {motion} from 'framer-motion';
import { Link, useNavigate } from "react-router-dom";
import Socials from '../components/Socials';
import { useAuthStore } from '../store/auth.store';



const HomePage = () => {

    const {user, logout} = useAuthStore();

    const handleLogout = () => {
        logout();
    }
  return (
    <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.75, y: 0 }}
            transition={{ duration: 0.5 }}
            className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-4xl rounded-2xl shadow-xl overflow-hidden'
        >
            <div className='p-8'>
                <h2 className='text-2xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-500 to-teal-400 text-transparent bg-clip-text'>
                    Welcome to my Website!
                </h2>
                <h3 className='text-sm font-bold mb-6 text-center bg-gradient-to-r from-cyan-500 to-teal-400 text-transparent bg-clip-text'>
                    This Website is demonstration of Advanced Authentication using MERN stack with functional CI/CD pipeline from Frontend and Backend. <br/><br/>
                    Checkout my socials from below:
                </h3>
                
                {/* Social Links */}
                <div className="flex gap-8 justify-center">
                    {/* LinkedIn */}
                    <a 
                    href="https://www.linkedin.com/in/mihirkadam19" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-transform"
                    >
                    <img 
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" 
                        alt="LinkedIn" 
                        className="w-12 h-12"
                    />
                    </a>

                    {/* GitHub */}
                    <a 
                    href="https://github.com/mihirkadam19" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-transform"
                    >
                    <img 
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" 
                        alt="GitHub" 
                        className="w-12 h-12"
                    />
                    </a>
                </div>
                
            </div>

            <div className='px-4 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
                <motion.button
                    className='w-full py-3 px-3 bg-gradient-to-r from-cyan-600 to-teal-500 text-white 
                    font-bold rounded-lg shadow-lg hover:from-cyan-700
                    hover:to-teal-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2
                    focus:ring-offset-gray-900 transition duration-200'
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogout}
                >
                    Logout
                </motion.button>
            </div>
        </motion.div>
  )
}

export default HomePage
