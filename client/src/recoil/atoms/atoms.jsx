import { atom, selector } from "recoil";

const stallDetailState = atom({
  key: "stallDetailState", // unique ID (with respect to other atoms/selectors)
  default: [{"id":1,"Name":"Chicken Pizza","image":"src/assets/1.png","Price":"Rs. 200.00"},
  {"id":2,"Name":"Margherita","image":"src/assets/2.png","Price":"Rs. 180.00"},
  {"id":3,"Name":"Paneer Tikka Pizza","image":"src/assets/3.png","Price":"Rs. 200.00"},
  {"id":4,"Name":"Chicken Burger","image":"src/assets/4.png","Price":"Rs. 140.00"},
  {"id":5,"Name":"Veg Popular","image":"src/assets/5.png","Price":"Rs. 130.00"},
  {"id":6,"Name":"Salted Fries","image":"src/assets/6.png","Price":"Rs. 100.00"},
  {"id":7,"Name":"Peri Peri Fries","image":"src/assets/7.png","Price":"Rs. 110.00"},
  {"id":8,"Name":"Chicken Loaded Cheese Fries","image":"src/assets/8.png","Price":"Rs. 180.00",},
  {"id":9,"Name":"Chicken Strips Supreme","image":"src/assets/9.png","Price":"Rs. 120.00"}]
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
