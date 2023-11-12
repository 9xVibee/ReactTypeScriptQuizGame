import React from "react";
import { CircularProgress, Container, Stack } from "@mui/material";

const Loader = () => {
  return (
    <Container maxWidth="sm">
      <Stack alignItems={"center"} justifyContent={"center"} height={"80vh"}>
        <CircularProgress />
      </Stack>
    </Container>
  );
};

export default Loader;
