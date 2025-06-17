import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import {motion} from 'framer-motion';
import { useAuthStore } from "../store/auth.store";
import toast from "react-hot-toast";
import Input from "../components/Input";
import { Lock } from "lucide-react";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";


const ResetPassword = () => {

    // getting token from the url
    const { token } = useParams();

    // to redirect
    const navigate = useNavigate();

    // loading zustand store
    const {isLoading, resetPassword } = useAuthStore();

    // states for two entries of the new password so we can compare them
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword){
            toast.error("Passwords do not match", { duration: 4000 })
            setNewPassword("");
            setConfirmNewPassword("");
        }
        try{
            await resetPassword(confirmNewPassword, token);
            toast.success("Password reset successfully, redirecting to login page...");
			setTimeout(() => {
				navigate("/login");
			}, 2000);

        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }
    
    return (
        <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 0.75, y: 0 }}
                transition={{ duration: 0.9 }}
                className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md'
        >
            <div className='p-4'>
                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-teal-500 text-transparent bg-clip-text'>
                    Reset Password
                </h2>

                <form onSubmit={handleSubmit}>
                    <Input
                        icon={Lock}
                        type='password'
                        placeholder='New Password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />

                    <Input
                        icon={Lock}
                        type='password'
                        placeholder='Confirm New Password'
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                    />

                    {<PasswordStrengthMeter password={newPassword} />}

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type='submit'
                        disabled={isLoading}
                        className='mt-5 w-full bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-cyan-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 disabled:opacity-50'
                    >
                        {isLoading ? "Resetting..." : "Reset Password"}
                    </motion.button>
                </form>

            </div>
        </motion.div>
  )
}

export default ResetPassword
