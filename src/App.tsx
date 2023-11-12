import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/Header";
import Loader from "./components/Loader";

const Home = lazy(() => import("./components/Home"));
const Result = lazy(() => import("./components/Result"));
const Learning = lazy(() => import("./components/Learning"));
const Quiz = lazy(() => import("./components/Quiz"));
const Login = lazy(() => import("./components/Login"));

function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
          <Route path="/learn" element={<Learning />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
