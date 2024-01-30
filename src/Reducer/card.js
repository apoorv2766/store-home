function reducer(state, action) {
  switch (action.type) {
    case "cart":
      let { tittle, img, Price, id } = action.payload;

      let cartValue = { tittle, img, Price, id };
      return { ...state, cartData: [...state.cartData, cartValue] };
    case "removeItem":
      let removeId = action.payload;
      let data = [...state.cartData];
      let update = data.filter((e) => {
        return e.id != removeId;
      });
      return { ...state, cartData: update };
    case "removeAll":
      let emptyIt = [];
      return { ...state, cartData: emptyIt };

    default:
      return state;
  }
}

export default reducer;
