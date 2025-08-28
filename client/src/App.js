import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CreateHeader from "./components/header/header";
import CreateFooter from "./components/footer/footer";
import CreateCategoryWithDishes from "./pages/categoryWithDishes/CategoryWithDishes";
import CreateMainPage from "./pages/main/Main"
import CreateDish from "./pages/dish/Dish";
import CreateContactPage from "./pages/contact/Contact";
import CreateRestaurantPages from "./pages/restaurant/Restaurant";
import CreateAuthFrom from "./pages/auth/Auth";
import './App.css';
import {useSelector} from "react-redux";
import {useEffect} from "react";

function App() {
    const uiSlice = useSelector((state) => state.ui.showAuth)

    const time = new Date().getTime() + 5000

    setInterval(() => {
        if (new Date().getTime() > time){
            console.log("DASDAS")
        }
    }, 1000)

    // setInterval(function () {element.innerHTML += "Hello"}, 1000);


    return (
      <Router>
        <div className="App">
            <CreateHeader/>
            { uiSlice  && <CreateAuthFrom/> }
            <Routes>
                <Route path="/" element={<CreateMainPage/>}></Route>
                <Route path="category/:id" element={<CreateCategoryWithDishes/>}></Route>
                <Route path="dish/:id" element={<CreateDish/>}></Route>
                <Route path="contact" element={<CreateContactPage/>}></Route>
                <Route path="restaurants/city/:id" element={<CreateRestaurantPages/>}></Route>
            </Routes>
            <CreateFooter/>
        </div>
      </Router>
    );
}

export default App;
