import axios from 'axios';

export async function fetchCategoryWithDishes(id){
    return await axios.get(`/dishes/category/${id}`)
}

export async function fetchAllSale(){
    return await axios.get(`/sales`)
}

export async function fetchAllCategories(){
    return await axios.get(`/dishes/categories`)
}

export async function fetchAllPartners() {
    return await axios.get(`/partners`)
}

export async function fetchDish(id){
    return await axios.get(`/dishes/${id}`)
}

// export const fetchAllDishesByCategory = async (id) => {
//     return await axios.get(`/dishes/categoryDishes/${id}`)
// }