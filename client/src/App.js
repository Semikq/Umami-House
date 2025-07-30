import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CreateHeader from "./components/header/header";
import CreateFooter from "./components/footer/footer";
import CreatePageCategories from "./pages/categoryWithDishes/CategoryWithDishes";
import CreateMainPage from "./pages/main/Main"

function App() {
  return (
      <Router>
        <CreateHeader/>
        <Routes>
            <Route path="/" element={<CreateMainPage/>}></Route>
            <Route path="category/:id" element={<CreatePageCategories/>}></Route>
        </Routes>
        <CreateFooter/>
      </Router>
  );
}

export default App;
