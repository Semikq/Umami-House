import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CreateHeader from "./components/header/header";
import CreateFooter from "./components/footer/footer";
import CreateCategoryWithDishes from "./pages/categoryWithDishes/CategoryWithDishes";
import CreateMainPage from "./pages/main/Main"
import CreateDish from "./pages/dish/Dish";
import CreateContactPage from "./pages/contact/Contact";
import {useSelector} from "react-redux";
import useDetectUserCity from "./hooks/useDetectUserCity";
import useCheckRefresh from "./hooks/useCheckRefresh";
import CreateRestaurantPages from "./pages/restaurant/Restaurant";
import CreateAuthFrom from "./pages/auth/Auth";
import CreateCartBloc from "./pages/cart/Cart";
import CreateMobileCart from "./components/mobileCart/MobileCart";
import CreateUserPage from "./pages/user/User";
import './App.css';

function App() {
    const showAuth = useSelector((state) => state.ui.showAuth)
    const showCart = useSelector((state) => state.ui.showCart)
    const cart = useSelector(state => state.cart.dishes)
    useCheckRefresh()
    useDetectUserCity()

    return (
      <Router>
        <div className="App">
            <CreateHeader/>
            { showAuth  && <CreateAuthFrom/> }
            { showCart && <CreateCartBloc/> }
            { cart.length > 0 && <CreateMobileCart/> }
            <Routes>
                <Route path="/" element={<CreateMainPage/>}></Route>
                <Route path="category/:id" element={<CreateCategoryWithDishes/>}></Route>
                <Route path="dish/:id" element={<CreateDish/>}></Route>
                <Route path="contact" element={<CreateContactPage/>}></Route>
                <Route path="restaurants/city/:name" element={<CreateRestaurantPages/>}></Route>
                <Route path="user" element={<CreateUserPage/>}></Route>
            </Routes>
            <CreateFooter/>
        </div>
      </Router>
    );
}

export default App;
