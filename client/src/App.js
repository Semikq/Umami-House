import { CreateDishPage } from "./pages/dish/dish";
import { CreateFavoritesPage } from "./pages/favorites/favorites";
import { CreateListDishesPage } from "./pages/listDishes/dishes";
import { CreateMainPage } from "./pages/main/main";
import { CreateOrderPage } from "./pages/order/order";
import { CreateRestaurantsPage } from "./pages/restaurants/restaurants";
import { CreateSalePage } from "./pages/sale/sale";
import { CreateContactPage } from "./pages/contact/contact"
import { CreateHeader } from "./components/header/header";
import { CreateFooter } from "./components/footer/footer";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import "./App.css"

import UploadForm from "./aaaa";

function App() {
  return (
    <Router>
      <div className="App">
        <CreateHeader/>
        <Routes>
          <Route path="/" element={<CreateMainPage/>}></Route>
          <Route path="/contact" element={<CreateContactPage/>}></Route>
          <Route path="/dishes/:id" element={<CreateListDishesPage/>}></Route>
          <Route path="/dish/:id" element={<CreateDishPage/>}></Route>
          {/* <Route path="/favorites" element={CreateFavoritesPage}></Route>
          <Route path="/order" element={CreateOrderPage}></Route>
          <Route path="/restaurants" element={CreateRestaurantsPage}></Route>
          <Route path="/sale" element={CreateSalePage}></Route> */}
        </Routes>
        <CreateFooter/>
      </div>
    </Router>
  )
}

export default App;
