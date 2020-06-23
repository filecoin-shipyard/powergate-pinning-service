import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../redux/actions/login";
import { useHistory } from "react-router-dom";
import * as System from "../../components/system";

function Login(props) {
  const { user, login } = props;
  const history = useHistory();

  // Web3 Browser Detection
  // To verify if the browser is running MetaMask, copy and paste the code snippet
  // below in the developer console of your web browser:
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
  } else {
    alert(
      "Metamask is not installed. Get Metamask Plugin https://https://metamask.io/"
    );
  }

  if (user.email) {
    history.push("/network");
  }

  return (
    <Fragment>
      <System.H1>Login</System.H1>
      <br />
      <br />
      <br />
      <System.ButtonPrimary onClick={loginWithMetamask}>
        Login With Metamask
      </System.ButtonPrimary>
    </Fragment>
  );
}

const loginWithMetamask = async () => {
  const accounts = await window.ethereum.enable();
  const account = accounts[0];
};

const mapStateToProps = (state) => ({
  user: state.app.user,
});

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(login(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
