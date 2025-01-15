import { Routes, Route } from "react-router";
import App from "../App";
import NYTimes from "./NYTimes";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="new-york-times" element={<NYTimes />} />
    </Routes>
  );
}

export default AppRoutes;
