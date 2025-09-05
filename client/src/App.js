import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CreateHeader from "./components/header/header";
import CreateFooter from "./components/footer/footer";
import CreateCategoryWithDishes from "./pages/categoryWithDishes/CategoryWithDishes";
import CreateMainPage from "./pages/main/Main"
import CreateDish from "./pages/dish/Dish";
import CreateContactPage from "./pages/contact/Contact";
import {useSelector} from "react-redux";
import useDetectUserCity from "./hooks/useDetectUserCity";
import CreateRestaurantPages from "./pages/restaurant/Restaurant";
import CreateAuthFrom from "./pages/auth/Auth";import CreateCartBloc from "./pages/cart/Cart";
import './App.css';

function App() {
    const showAuth = useSelector((state) => state.ui.showAuth)
    const showCart = useSelector((state) => state.ui.showCart)
    useDetectUserCity()
    return (
      <Router>
        <div className="App">
            <CreateHeader/>
            { showAuth  && <CreateAuthFrom/> }
            { showCart && <CreateCartBloc/> }
            <Routes>
                <Route path="/" element={<CreateMainPage/>}></Route>
                <Route path="category/:id" element={<CreateCategoryWithDishes/>}></Route>
                <Route path="dish/:id" element={<CreateDish/>}></Route>
                <Route path="contact" element={<CreateContactPage/>}></Route>
                <Route path="restaurants/city/:name" element={<CreateRestaurantPages/>}></Route>
            </Routes>
            <CreateFooter/>
        </div>
      </Router>
    );
}

export default App;
