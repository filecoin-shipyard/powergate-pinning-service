import types from "../constants";

export const login = (payload) => (dispatch) => {
  dispatch({
    type: types.LOGIN,
    payload: {
      address: payload.address,
    },
  });
};
