import React, { Fragment } from "react";
import { connect } from "react-redux";
import { createFFS } from "../../redux/actions/powergate";
import { useHistory } from "react-router-dom";
import Footer from "../Footer";

function Login(props) {
  const { user, createFFS } = props;
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

  if (user.address) {
    console.log(user.address);
    // Go to profile page after user is logged in
    history.push("/profile");
  }

  return (
    <Fragment>
      <h1>Login</h1>
      <br />
      <br />
      <br />
      <button
        className="btn btn-primary mb-2"
        onClick={() => loginWithMetamask(createFFS)}
      >
        Login With Metamask
      </button>
      <div style={{ position: "absolute", bottom: "30px", width: "100%" }}>
        <Footer />
      </div>
    </Fragment>
  );
}

const loginWithMetamask = async (createFFS) => {
  const accounts = await window.ethereum.enable();
  const address = accounts[0];
  createFFS({ address: address });
};

const mapStateToProps = (state) => ({
  user: state.app.user,
});

const mapDispatchToProps = (dispatch) => ({
  createFFS: (payload) => dispatch(createFFS(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
