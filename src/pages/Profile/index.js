import React, { Fragment } from "react";
import NavBar from "../../components/NavBar";
import { getWalletAddresses } from "../../redux/actions/powergate";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactJson from "react-json-view";
import FilecoinGIF from "../../assets/filecoin.gif";

function Profile(props) {
  const { user, getWalletAddresses } = props;
  const history = useHistory();

  if (!user || !user.address) {
    history.push("/");
  }

  if (!user.wallets) {
    getWalletAddresses();
  }

  return (
    <Fragment>
      <NavBar />
      {user && user.wallets ? (
        user.wallets.map((wallet, index) => (
          <div key={index} className="card" style={{ width: "52rem" }}>
            <div className="card-body">
              <h5 className="card-title">Wallet {index + 1}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Your details as a powergate FFS user
              </h6>
              <div className="card-text">
                <b>Wallet Name: </b> {wallet.name} <br />
                <b>Wallet Address: </b> {wallet.address} <br />
                <b>Wallet Type: </b> {wallet.type} <br />
                <b>Wallet Balance: </b> {wallet.balance} attoFIL <br />
              </div>
              <br />
              <div className="card-link">
                <ReactJson
                  src={user.ffsInfo}
                  collapsed={true}
                  name="FFS JSON"
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <img src={FilecoinGIF} />
      )}
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  user: state.app.user,
});

const mapDispatchToProps = (dispatch) => ({
  getWalletAddresses: () => dispatch(getWalletAddresses()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
