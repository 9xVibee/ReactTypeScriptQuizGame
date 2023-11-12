/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  FormControl,
  Button,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./Loader";
import { saveResult } from "../redux/slices";

const Quiz = () => {
  const dispatch = useDispatch();
  const [result, setResult] = useState<string[]>([]);
  const [count, setCount] = useState<number>(0);
  const [ans, setAns] = useState<string>("");
  const navigate = useNavigate();

  const { loading, words, error } = useSelector(
    (state: { root: StateType }) => state.root
  );

  const nextHandler = (): void => {
    setResult((prev) => [...prev, ans]);
    setCount((prev) => prev + 1);
    setAns("");
  };

  useEffect(() => {
    if (count + 1 > words.length) navigate("/result");
    dispatch(saveResult(result));
  });

  if (loading) return <Loader />;
  return (
    <Container
      sx={{
        padding: "1rem",
      }}
    >
      <Typography m="2rem 0">Quiz</Typography>

      <Typography variant="h3">
        {count + 1} - {words[count]?.word}
      </Typography>
      <FormControl>
        <FormLabel
          sx={{
            mt: "2rem",
            mb: "1rem",
          }}
        >
          Meaning
        </FormLabel>
        <RadioGroup value={ans} onChange={(e) => setAns(e.target.value)}>
          {words[count]?.options.map((item, idx) => (
            <FormControlLabel
              value={item}
              control={<Radio />}
              label={item}
              key={idx}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <Button
        sx={{
          margin: "3rem 0",
        }}
        variant="contained"
        fullWidth
        onClick={nextHandler}
        disabled={ans === ""}
      >
        {count === 7 ? "Submit" : "Next"}
      </Button>
    </Container>
  );
};

export default Quiz;
