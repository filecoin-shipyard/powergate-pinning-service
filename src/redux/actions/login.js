import types from "../constants";

export const login = (payload) => (dispatch) => {
  /* const { email, password } = payload;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((data) => {
      dispatch({
        type: types.LOGIN,
        payload: {
          email: data.user.email,
          uid: data.user.uid,
        },
      });
    })
    .catch(function (error) {
      // Handle Errors here.
      console.error(error);
      alert(error.message);
    }); */
};
