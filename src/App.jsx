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
import ResultUnsafe from "./v1/ResultUnsafe/App";
function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/Detailsentry" element={<DetailsEntry />} />
        <Route exact path="/Detailsentry/resultsafe" element={<ResultSafe />} />
        <Route
          exact
          path="/Detailsentry/resultunsafe"
          element={<ResultUnsafe />}
        />
      </Routes>
    </>
  );
}

export default App;
