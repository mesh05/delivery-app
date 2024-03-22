import { atom, selector } from "recoil";

const stallDetailState = atom({
  key: "stallDetailState", // unique ID (with respect to other atoms/selectors)
  default: [
    { id: 1, Name: "Chicken Pizza", image: "/1.png", Price: 200.0 },
    { id: 2, Name: "Margherita Pizza", image: "/2.png", Price: 140.0 },
    {
      id: 3,
      Name: "Paneer Tikka Pizza",
      image: "/3.png",
      Price: 200.0,
    },
    { id: 4, Name: "Chicken Burger", image: "/4.png", Price: 140.0 },
    { id: 5, Name: "Veg Popular", image: "/veg-popular.jpeg", Price: 130.0 },
    { id: 6, Name: "Salted Fries", image: "/6.png", Price: 100.0 },
    { id: 7, Name: "Peri Peri Fries", image: "/7.png", Price: 120.0 },
    {
      id: 8,
      Name: "Chicken Loaded Cheese Fries",
      image: "/8.png",
      Price: 180.0,
    },
    {
      id: 9,
      Name: "Chicken Strips Supreme (4-pieces)",
      image: "/9.png",
      Price: 120.0,
    },
    {
      id: 9,
      Name: "Backlog Combo (Chicken/Veg Pizza + Salted Fries + Coke)",
      image: "/backlog-combo.jpeg",
      Price: 320.0,
    },
    {
      id: 10,
      Name: "Bunk Combo (Chicken/Veg Burger + Salted Fries + Coke)",
      image: "/bunk-combo.jpeg",
      Price: 270.0,
    },
    {
      id: 11,
      Name: "Stress Combo (Chicken Strips + Burger + Coke)",
      image: "/stress-combo.jpg",
      Price: 290.0,
    },
  ],
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
const totalState = atom({
  key: "totalState", // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});
export { totalState, stallDetailState, cartState, stallItemState };
