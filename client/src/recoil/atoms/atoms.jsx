import { atom, selector } from "recoil";

const stallDetailState = atom({
  key: "stallDetailState", // unique ID (with respect to other atoms/selectors)
  default: [
    { name: "Chicken Pizza", image: "/src/assets/1.png", price: 200.0 },
    { name: "Margherita", image: "/src/assets/2.png", price: 180.0 },
    { name: "Paneer Tikka Pizza", image: "src/assets/3.png", price: 200.0 },
    { name: "Chicken Burger", image: "src/assets/4.png", price: 200.0 },
    { name: "Veg Popular", image: "src/assets/5.png", price: 200.0 },
    { name: "Salted Fries", image: "src/assets/6.png", price: 200.0 },
    { name: "Peri Peri Fries", image: "src/assets/7.png", price: 200.0 },
    {
      name: "Chicken Loaded Cheese Fries",
      image: "src/assets/8.png",
      price: 200.0,
    },
    {
      name: "Chicken Strips Supreme (4pcs)",
      image: "src/assets/9.png",
      price: 200.0,
    },
    {
      name: "Backlog Combo (Chicken/Paneer Pizza + Fries + Coke)",
      image: "src/assets/11.png",
      price: 200.0,
    },
    {
      name: "Bunk Combo (Chicken/Veg Burger + Fries + Coke)",
      image: "src/assets/12.png",
      price: 200.0,
    },
    {
      name: "Stress Combo (Strips Supreme + Chicken cluckers)",
      image: "src/assets/13.png",
      price: 200.0,
    },
  ], // default value (aka initial value)
});

const stallItemState = selector({
  key: "stallItemsState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(stallDetailState);

    return text[1];
  },
});

const cartState = atom({
  key: "cartState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export { stallDetailState, cartState, stallItemState };
