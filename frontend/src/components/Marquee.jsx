import { motion } from 'framer-motion';

const Marquee = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 py-3 overflow-hidden">
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: "-100%" }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 30,
                        ease: "linear"
                    }
                }}
                className="whitespace-nowrap text-green-200"
            >
                Welcome to my Website • Advanced Authentication • Email Verification • Password Reset • JWT Security • MERN Stack • CI/CD Pipeline • Docker • Check out the code: github.com/mihirkadam19 • Please provide your feedback
            </motion.div>
        </div>
    )
}

export default Marquee
