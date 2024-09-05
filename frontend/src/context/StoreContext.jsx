import { createContext, useEffect, useState } from "react";
import axios from "axios"; // Don't forget to import axios!

export const StoreContext = createContext({
    food_list: [],
    cartItems: {},
    setCartItems: () => {},
    addToCart: () => {},
    removeFromCart: () => {},
    getTotalCartAmount: () => 0,
    url: "",
    token: "",
    setToken: () => {}
});

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");

    const [food_list, setFoodList] = useState([]);

    const addToCart = async (itemId) => {
        const itemExists = food_list.some((product) => product._id === itemId);
        if (itemExists) {
            setCartItems((prev) => ({
                ...prev,
                [itemId]: (prev[itemId] || 0) + 1
            }));
        } else {
            console.warn(`Item with ID ${itemId} not found in food_list.`);
        }
        if (token) {
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
            
        }
    };

    const removeFromCart = async (itemId) =>  {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if (token) {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
            
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        console.log("Calculating total cart amount:", cartItems);

        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                let itemInfo = food_list.find((product) => product._id === itemId);
                if (itemInfo) {
                    console.log(`Item: ${itemInfo.name}, Quantity: ${cartItems[itemId]}, Price: ${itemInfo.price}`);
                    totalAmount += itemInfo.price * cartItems[itemId];
                } else {
                    console.warn(`Item with ID ${itemId} not found in food_list.`);
                }
            }
        }
        console.log("Total amount:", totalAmount);
        return totalAmount;
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    const loadCartData = async(token)=>{
        const response=await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData)
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
