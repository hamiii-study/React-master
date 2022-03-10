import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: purple;
`;
const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);

  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);

  /* display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center; */
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const Circle = styled(motion.div)`
  width: 70%;
  height: 70%;
  background-color: white;
  border-radius: 50%;
  place-self: center;
`;

const boxVariants = {
  hover: {
    scale: 1.5,
    rotateZ: 90,
  },
  tap: {
    borderRadius: " 100px",
    scale: 1,
  },
};

function App() {
  return (
    <Wrapper>
      <Box variants={boxVariants} whileHover="hover" whileTap="tap" />
    </Wrapper>
  );
}
export default App;
