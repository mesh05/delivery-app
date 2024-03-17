import { atom, selector } from "recoil";

const stallDetailState = atom({
  key: "stallDetailState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
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
