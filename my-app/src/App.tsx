import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 40vw;
  gap: 20px;

  margin-bottom: 50px;
`;

const Box = styled(motion.div)`
  height: 200px;

  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Circle = styled(motion.div)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: white;
`;

const Button = styled(motion.button)``;
const buttonVariants = {
  hover: {
    color: "rgb(255,150,100)",
  },
};

const boxVariants = {
  hover: { scaleY: 1.1, backgroundColor: "rgb(255, 204, 204)", opacity: 0.8 },
};

function App() {
  const [id, setId] = useState<null | string>(null);
  const [clicked, setClicked] = useState(false);
  return (
    <Wrapper>
      <Grid>
        <Box
          variants={boxVariants}
          whileHover="hover"
          onClick={() => setId("1")}
          layoutId="1"
        />
        <Box>
          {!clicked ? (
            <Circle
              layoutId="circle"
              style={{
                borderRadius: 0,
                backgroundColor: "rgb(126, 255, 245)",
                scale: 1,
              }}
            />
          ) : null}
        </Box>
        <Box>
          {clicked ? (
            <Circle
              layoutId="circle"
              style={{
                borderRadius: 0,
                backgroundColor: "rgb(24, 220, 255)",
                scale: 1.3,
              }}
            />
          ) : null}
        </Box>
        <Box
          variants={boxVariants}
          whileHover="hover"
          onClick={() => setId("2")}
          layoutId="2"
        />
      </Grid>
      <AnimatePresence>
        {id ? (
          <Overlay
            onClick={() => setId(null)}
            initial={{ backgroundColor: "rgba(0,0,0,0)" }}
            animate={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            exit={{ backgroundColor: "rgba(0,0,0,0)" }}
          >
            <Box layoutId={id} style={{ width: 400, height: 200 }} />
          </Overlay>
        ) : null}
      </AnimatePresence>
      <Button
        onClick={() => setClicked((prev) => !prev)}
        variants={buttonVariants}
        whileHover="hover"
      >
        Switch
      </Button>
    </Wrapper>
  );
}
export default App;

// drag="x" -> x축으로만 움직일 수 있음!
//  overflow: hidden; ->밖으로 나가면 안보임
