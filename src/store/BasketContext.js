import { createContext, useEffect, useState } from "react";
import { fetchApi } from "../link/fetchApi";

export const BasketContext = createContext({
  items: [],
});

export const BasketProvider = ({ children }) => {
  const [isBasketVisible, setBasketVisible] = useState(false);
  const [items, setItems] = useState([]);

  const getBasket = async () => {
    try {
      const { data } = await fetchApi("basket");
      setItems(data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBasket();
  }, []);

  const showBasketHandler = () => {
    setBasketVisible((prevState) => !prevState);
  };
  const addToBasket = async (newItem) => {
    try {
      const response = await fetchApi(`foods/${newItem.id}/addToBasket`, {
        method: "POST",
        body: { amount: newItem.amount },
      });
      setItems(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };
  const updateBasketItem = async ({ id, amount }) => {
    try {
      const { data } = await fetchApi(`basketItem/${id}/update`, {
        method: "PUT",
        body: { amount },
      });

      setItems(data.items);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteBasketItem = async (id) => {
    try {
      const { data } = await fetchApi(`basketItem/${id}/delete`, {
        method: "DELETE",
      });
      setItems(data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const state = {
    isBasketVisible,
    items,
    addToBasket,
    updateBasketItem,
    deleteBasketItem,
    showBasketHandler,
  };
  return (
    <BasketContext.Provider value={state}>{children}</BasketContext.Provider>
  );
};
