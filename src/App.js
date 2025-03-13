import "./App.css";
import AddButton from "./components/AddButton";
import Navbar from "./components/Navbar";
import Tutorials from "./components/Tutorials";
import TutorialInput from "./components/TutorialInput";
import { BrowserRouter, Routes, Route } from "react-router";
import Searchbar from "./components/Searchbar";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Searchbar />
                <Tutorials />
                <AddButton />
              </>
            }
          />
          <Route
            path="/tutorial/add-new"
            element={
              <>
                <TutorialInput type={"new"} />
              </>
            }
          />
          <Route
            path="/tutorial/edit/:id"
            element={
              <>
                <TutorialInput type={"edit"} />
              </>
            }
          />
          <Route
            path="/tutorial"
            element={
              <>
                <Searchbar />
                <Tutorials />
                <AddButton />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
