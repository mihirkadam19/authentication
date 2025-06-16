import {motion} from 'framer-motion';
import { Link, useNavigate } from "react-router-dom";
import Socials from '../components/Socials';
import { Linkedin } from 'lucide-react';

const HomePage = () => {
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

            <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
                <p className='text-sm text-gray-400'>
                    You can exit from here:{" "}
                    <Link to={"/login"} className='text-cyan-300 hover:underline'>
                        Logout
                    </Link>
                </p>
            </div>
        </motion.div>
  )
}

export default HomePage
