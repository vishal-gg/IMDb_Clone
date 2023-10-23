import "./App.css";
import Navbar from "./Navbar";
import Carousel from "./Carousel";
import QueryDetails from "./queryDetails";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Carousel />
            </>
          }
        />
        <Route path="/title/:id" element={<QueryDetails />} />
        <Route path="/:id" element={<div className="text-white text-center text-3xl font-bold mt-40">page not found</div>} />
      </Routes>
    </div>
  );
}

export default App;
