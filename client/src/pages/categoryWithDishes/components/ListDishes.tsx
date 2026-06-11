import DishCardList from "../../../components/dishCard/DishCardList.tsx";

export default function ListDishes({sub_category}){
    return <DishCardList dishes={sub_category.dishes}/>;
}