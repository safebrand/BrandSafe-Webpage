import "./App.css";
import DetailsEntry from "./v1/DetailsEntry/App";
import Landing from "./v1/Landing/App";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ResultSafe from "./v1/ResultSafe/App";
function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/Detailsentry" element={<DetailsEntry />} />
        <Route exact path="/Detailsentry/resultsafe" element={<ResultSafe />} />
      </Routes>
    </>
  );
}

export default App;
