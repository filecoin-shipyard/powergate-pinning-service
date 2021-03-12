import React, { Fragment } from "react";
import * as System from "../../components/system";
import {
  getPinsList,
  addFileToFFS,
  getDataFromFFS,
  setDefaultConfig,
  getCidConfig,
  getActualCidConfig,
} from "../../redux/actions/powergate";
import NavBar from "../../components/NavBar";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import FilecoinGIF from "../../assets/filecoin.gif";

function Gallery(props) {
  const {
    user,
    ffsFiles,
    getDataFromFFS,
    getPinsList,
    /* getDataFromFFS,
    addFileToFFS,
    setDefaultConfig,
    getCidConfig,
    getActualCidConfig, */
  } = props;
  const history = useHistory();

  if (!user || !user.address) {
    history.push("/");

  }
  
  if (!user.pinsList) {
    setInterval(getPinsList, 3000);
  } else {
    if (user.pinsList.length === 0) {
      setInterval(getPinsList, 3000);
    }
  }
  return (
    <Fragment>
      <NavBar />
      <h1>Gallery</h1>
      <h3>Get data from IPFS</h3>
      {user && user.pinsList ? (
        user.pinsList.length > 0 ? (
          <div>
            {user.pinsList.map((pin, index) => (
              <div key={index} className="card" style={{ width: "48rem" }}>
                <div className="card-body">
                  <h5 className="card-title">File {index + 1}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{pin.cid}</h6>
                  {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                  <a
                    href={`http://localhost:8080/ipfs/${pin.cid}`}
                    className="card-link"
                    target="_blank"
                    download
                  >
                    Download file from IPFS
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h6>
            No files stored! Try <Link to="/pin">adding a file</Link>
          </h6>
        )
      ) : (
        <img src={FilecoinGIF} />
      )}
      <br /> <br />
      <h3>Get Data from Filecoin File System (FFS)</h3>
      <input type="text" id="getFromFFS" placeholder="Add CID here" />
      <button
        className="btn btn-primary mb-2"
        onClick={() => {
          const cid = document.getElementById("getFromFFS").value;
          getDataFromFFS({ cid: cid });
        }}
      >
        Get Data from FFS
      </button>
      <br />
      {ffsFiles ? (
        <div>
          {ffsFiles.map((file, index) => (
            <p key={index}>
              <a href={file.url} target="_blank">
                Download {file.cid} from Filecoin
              </a>
              <br />
              <br />
            </p>
          ))}
        </div>
      ) : null}
      <br />
      <br />
      <br />
      <br />
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  user: state.app.user,
  ffsFiles: state.app.ffsFiles,
});

const mapDispatchToProps = (dispatch) => ({
  getPinsList: () => dispatch(getPinsList()),
  getDataFromFFS: (payload) => dispatch(getDataFromFFS(payload)),
  addFileToFFS: (payload) => dispatch(addFileToFFS(payload)),
  setDefaultConfig: (payload) => dispatch(setDefaultConfig(payload)),
  getCidConfig: (payload) => dispatch(getCidConfig(payload)),
  getActualCidConfig: (payload) => dispatch(getActualCidConfig(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
