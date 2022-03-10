import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";
import { useRef } from "react";
import React from "react";
import { useEffect } from "react";

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
    scale: 1.2,
    rotateZ: 90,
  },
  tap: {
    borderRadius: " 100px",
    scale: 1,
  },
};

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

function App() {
  const x = useMotionValue(0); //tract value
  useEffect(() => {
    x.onChange(() => console.log(x.get()));
  }, [x]);
  return (
    <Wrapper>
      <button onClick={() => x.set(200)}>Click me</button>
      <Box style={{ x }} drag="x" dragSnapToOrigin />
    </Wrapper>
  );
}
export default App;

// drag="x" -> x축으로만 움직일 수 있음!
//  overflow: hidden; ->밖으로 나가면 안보임
