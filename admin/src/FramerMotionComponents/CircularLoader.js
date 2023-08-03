import { motion } from "framer-motion";

// const containerStyle = {
//   // position: "relative",
//   width: "40px",
//   height: "40px",
// };

const circleStyle = {
  display: "block",
  width: "25px",
  height: "25px",
  border: "0.2rem solid #e9e9e9",
  borderTop: "0.2rem solid #ff3e6c",
  borderRadius: "50%",
  // position: "absolute",
  // top: "0",
  // left: "0",
};
const spinTransition = {
  loop: Infinity,
  duration: 0.5,
  ease: "linear",
};

const CircularLoader = () => {
  return (
    <div>
      <motion.span
        style={circleStyle}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
    </div>
  );
};

export default CircularLoader;
