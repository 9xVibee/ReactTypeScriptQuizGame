/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const languages = [
  {
    name: "Japanese",
    code: "ja",
  },
  {
    name: "Hindi",
    code: "hi",
  },
  {
    name: "Spanish",
    code: "es",
  },
  {
    name: "French",
    code: "fr",
  },
];

const styles = {
  fontStyle: "italic",
  fontFamily: "monospace",
  letterSpacing: "-2px",
  textDecoration: "underline",
};

const Home = () => {
  const navigate = useNavigate();

  const languageSelectHandler = (language: string): void => {
    navigate(`/learn?language=${language}`);
  };

  return (
    <Container maxWidth="sm" className="main-div">
      <Typography variant="h3" p={"2rem"} textAlign={"center"}>
        Welcome, Begin your <span style={styles}>journey</span> of{" "}
        <span style={styles}>learning</span>.
      </Typography>
      <Stack
        direction={"row"}
        spacing={"2rem"}
        p={"2rem"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {languages.map((ele) => {
          return (
            <Button
              variant="outlined"
              onClick={() => languageSelectHandler(ele.code)}
              key={ele.code}
            >
              {ele.name}
            </Button>
          );
        })}
      </Stack>
    </Container>
  );
};

export default Home;
