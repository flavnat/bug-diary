import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Diary from "./pages/Diary";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} index />
      <Route path="/diary" element={<Diary />} />
    </Routes>
  );
}

export default App;
