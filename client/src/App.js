import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CreateHeader from "./components/header/header";
import CreateFooter from "./components/footer/footer";
import CreateCategoryWithDishes from "./pages/categoryWithDishes/CategoryWithDishes";
import CreateMainPage from "./pages/main/Main"

function App() {
  return (
      <Router>
        <div className="App">
            <CreateHeader/>
            <Routes>
                <Route path="/" element={<CreateMainPage/>}></Route>
                <Route path="category/:id" element={<CreateCategoryWithDishes/>}></Route>
            </Routes>
            <CreateFooter/>
        </div>
      </Router>
  );
}

export default App;
