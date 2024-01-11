/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArrowBack, VolumeUp } from "@mui/icons-material";
import { Button, Container, Typography, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { translateWords } from "../utils/feature";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  getWordsFail,
  getWordsRequest,
  getWordsSuccess,
} from "../redux/slices";
import Loader from "./Loader";

const Learning = () => {
  const dispatch = useDispatch();

  const { loading, words, error } = useSelector(
    (state: { root: StateType }) => state.root
  );

  const [count, setCount] = useState<number>(0);

  const params = useSearchParams()[0].get("language") as LangType;
  const navigate = useNavigate();

  const nextHanlder = (): void => {
    setCount((prev) => prev + 1);
  };

  useEffect(() => {
    dispatch(getWordsRequest());

    translateWords(params)
      .then((arr) => {
        dispatch(getWordsSuccess(arr));
      })
      .catch((err) => {
        dispatch(getWordsFail(err));
      });

    if (error) {
      alert(error);
      dispatch(clearState());
    }
  }, []);

  if (loading) return <Loader />;

  return (
    <Container
      maxWidth="sm"
      sx={{
        padding: "1rem",
      }}
    >
      <Button
        onClick={
          count === 0 ? () => navigate("/") : () => setCount((prev) => prev - 1)
        }
      >
        <ArrowBack />
      </Button>
      <Typography m={"2rem 0"}>Learning Mode Easy</Typography>

      <Stack direction={"row"} spacing={"1rem"}>
        <Typography variant="h4">
          {count + 1} - {words[count]?.word}
        </Typography>
        <Typography color={"blue"} variant="h4">
          : {words[count]?.meaning}
        </Typography>
      </Stack>
      <Button
        sx={{
          margin: "3rem 0",
        }}
        variant="text"
        fullWidth
        onClick={count === 7 ? () => navigate("/quiz") : nextHanlder}
      >
        {count === 7 ? "Text" : "Next"}
      </Button>
    </Container>
  );
};

export default Learning;
