import {motion} from 'framer-motion';

const FloatingShape = ({color, size, top, left, delay}) => {
  return (
    <motion.div
        // className is dynamic because it is taking values from prop-type
        className={`absolute rounded-tr-2xl  ${color} ${size} opacity-30 blur-xl`}
        
        // takes an obejct
        style={{top, left}}

        // object
        animate={{
            y: ["0%", "100%", "0%"],
			      x: ["0%", "100%", "0%"],
      			rotate: [0, 360],
        }}

        // transition
        transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
            delay,              // directly from the prop-type
        }}

        aria-hidden='true'      // best practice
    />
  )
}

export default FloatingShape
