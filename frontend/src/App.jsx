import "./App.css";
import AboutMovie from "./compoents/AboutMovie";
import AddMovie from "./compoents/AddMovie";
import AddReview from "./compoents/AddReview";
import EditMovie from "./compoents/EditMovie";
import EditReview from "./compoents/EditReview";
import Header from "./compoents/Header";
import MoviesSection from "./compoents/MoviesSection";
import {Routes, Route} from "react-router-dom";

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<MoviesSection />} />
        <Route path="/review/:id" element={<AboutMovie />} />
        <Route path="/addmovie" element={<AddMovie/>} />
        <Route path="/addmoviereview" element={<AddReview/>} />
        <Route path="/edit/:id" element={<EditMovie/>} />
        <Route path="/editreview/:id" element={<EditReview/>} />
      </Routes>
    </>
  );
}

export default App;
