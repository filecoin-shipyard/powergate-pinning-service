import React, { Fragment } from "react";
import NavBar from "../../components/NavBar";
import { getFFSInfo } from "../../redux/actions/powergate";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
//import ReactJson from "react-json-view";
import FilecoinGIF from "../../assets/filecoin.gif";

function Profile(props) {
  const { user, getFFSInfo } = props;
  const history = useHistory();

  if (!user.address) {
    history.push("/");
  }

  if (!user.ffsInfo) {
    getFFSInfo();
  }

  return (
    <Fragment>
      <NavBar />
      {user.ffsInfo ? (
        user.ffsInfo.balancesList.map((wallet, index) => (
          <div key={index} className="card" style={{ width: "52rem" }}>
            <div className="card-body">
              <h5 className="card-title">Wallet {index + 1}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Your details as a powergate FFS user
              </h6>
              <div className="card-text">
                <b>Wallet Name: </b> {wallet.addr.name} <br />
                <b>Wallet Address: </b> {wallet.addr.addr} <br />
                <b>Wallet Type: </b> {wallet.addr.type} <br />
                <b>Wallet Balance: </b> {wallet.balance} FIL <br />
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
  getFFSInfo: () => dispatch(getFFSInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
