import React, { Fragment, useState } from "react";
import * as System from "../../components/system";
import {
  getFFSInfo,
  addFileToFFS,
  addFileToIPFS,
  getDataFromFFS,
  setDefaultConfig,
  getCidConfig,
  getActualCidConfig,
} from "../../redux/actions/powergate";
import NavBar from "../../components/NavBar";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Pin(props) {
  const {
    user,
    watchJobs,
    watchLogs,
    getFFSInfo,
    getDataFromFFS,
    addFileToFFS,
    addFileToIPFS,
    setDefaultConfig,
    getCidConfig,
    getActualCidConfig,
  } = props;
  const history = useHistory();

  if (!user.address) {
    history.push("/");
  }

  if (!user.ffsInfo) {
    getFFSInfo();
  }

  // Check box States
  // const [enablePublicIPFS, setEnablePublicIPFS] = useState(true);
  // const [allowUnfreeze, setAllowUnfreeze] = useState(false);
  // const [enableFilecoinStorage, setEnableFilecoinStorage] = useState(true);
  // const [renew, setRenew] = useState(false);
  // const [repairable, setRepairable] = useState(false);

  // Input States
  // const [timeout, setTimeout] = useState(30);
  // const [replicationFactor, setReplicationFactor] = useState(1);
  // const [minDealDuration, setMinDealDuration] = useState(1000);
  // const [excludedMinersList, setExcludedMinersList] = useState("");
  // const [trustedMinersList, setTrustedMinersList] = useState("");
  // const [countryCodesList, setCountryCodesList] = useState("");
  // const [threshold, setThreshold] = useState(0);
  // const [maxPrice, setMaxPrice] = useState(0);

  return (
    <Fragment>
      <NavBar />
      <h1>Pinning Service</h1>
      <h3>1. Select File</h3>
      <input id="fileToUpload" type="file" /> <br />
      <br />
      <h3>2. Configure Storage Options</h3>
      <div className="card" style={{ width: "48rem" }}>
        <div className="card-body">
          <div className="card-text">
            <input
              type="checkbox"
              id="enablePublicIPFS"
              name="Add to Public IPFS Network"
              value="Yes"
            />{" "}
            <label for="enablePublicIPFS"> Add to Public IPFS Network</label>
            <br></br>
            <div id="ipfsOptions">
              <input
                type="checkbox"
                id="allowUnfreeze"
                name="Allow Un-Freeze"
                value="Yes"
              />{" "}
              <label for="allowUnfreeze"> Allow Un-Freeze</label>
              <br></br>
              <label for="addTimeout"> Timeout (in seconds): </label> {"  "}
              <input
                type="text"
                class="form-control"
                id="addTimeout"
                name="addTimeout"
                value="30"
                placeholder="Timeout"
              />
            </div>
            <br></br>
            <input
              type="checkbox"
              id="enableFilecoinStorage"
              name="Add to Filecoin Network"
              value="Yes"
            />
            <label for="enableFilecoinStorage"> Add to Filecoin Network</label>
            <br></br>
            <div id="filecoinOptions">
              <label for="replicationFactor"> Replication Factor: </label>{" "}
              {"  "}
              <input
                type="text"
                class="form-control"
                id="replicationFactor"
                name="repFactor"
                value="1"
                placeholder="Replication Factor"
              />
              <br />
              <br />
              <label for="minDealDuration">
                {" "}
                Minimum Deal Duration (in seconds):{" "}
              </label>{" "}
              {"  "}
              <input
                type="text"
                class="form-control"
                id="minDealDuration"
                name="repFactor"
                value="1000"
                placeholder="Minimum Deal Duration"
              />
              <br />
              <br />
              <label for="excludedMinersList">
                {" "}
                Excluded Miners List:{" "}
              </label>{" "}
              {"  "}
              <input
                type="text"
                class="form-control"
                id="excludedMinersList"
                name="addTimeout"
                value=""
                placeholder="Excluded Miners List"
              />
              <br />
              <br />
              <label for="trustedMinersList"> Trusted Miners List: </label>{" "}
              {"  "}
              <input
                type="text"
                class="form-control"
                id="trustedMinersList"
                name="trustedMinersList"
                value=""
                placeholder="Trusted Miners List"
              />
              <br />
              <br />
              <label for="countryCodesList"> Country Codes List: </label> {"  "}
              <input
                type="text"
                class="form-control"
                id="countryCodesList"
                name="countryCodesList"
                value=""
                placeholder="Country Codes List"
              />
              <br />
              <br />
              <input type="checkbox" id="renew" name="renew" value="Yes" />{" "}
              <label for="renew"> Renew</label>
              <br />
              <br />
              <div id="renewOptions">
                <label for="threshold"> Threshold: </label> {"  "}
                <input
                  type="text"
                  class="form-control"
                  id="threshold"
                  name="threshold"
                  value="0"
                  placeholder="Threshold"
                />
              </div>
              <br />
              <br />
              <label for="maxPrice"> Max Price: </label> {"  "}
              <input
                type="text"
                class="form-control"
                id="maxPrice"
                name="maxPrice"
                value="0"
                placeholder="maxPrice"
              />
            </div>
            <br />
            <br />
            <input
              type="checkbox"
              id="repairable"
              name="repairable"
              value="Yes"
            />{" "}
            <label for="repairable"> Repairable</label>
          </div>
        </div>
      </div>
      <br />
      <br />
      <h3>3. Add to Filecoin</h3>
      <button
        className="btn btn-primary mb-2"
        onClick={() => {
          const file = document.getElementById("fileToUpload").files[0];
          const enablePublicIPFS = document.getElementById("enablePublicIPFS")
            .checked;
          const allowUnfreeze = document.getElementById("allowUnfreeze")
            .checked;
          const enableFilecoinStorage = document.getElementById(
            "enableFilecoinStorage"
          ).checked;
          const renew = document.getElementById("renew").checked;
          const repairable = document.getElementById("repairable").checked;

          const addTimeout = document.getElementById("addTimeout").value;
          const replicationFactor = document.getElementById("replicationFactor")
            .value;
          const minDealDuration = document.getElementById("minDealDuration")
            .value;
          const excludedMinersString = document.getElementById(
            "excludedMinersList"
          ).value;
          const trustedMinersString = document.getElementById(
            "trustedMinersList"
          ).value;
          const countryCodesString = document.getElementById("countryCodesList")
            .value;
          const threshold = document.getElementById("threshold").value;
          const maxPrice = document.getElementById("maxPrice").value;

          let excludedMinersList = excludedMinersString.split(",");
          let trustedMinersList = trustedMinersString.split(",");
          let countryCodesList = countryCodesString.split(",");

          removeItem(excludedMinersList, "");
          removeItem(trustedMinersList, "");
          removeItem(countryCodesList, "");

          var arrayBuffer, uint8Array;
          var fileReader = new FileReader();
          fileReader.onload = function () {
            arrayBuffer = this.result;
            uint8Array = new Uint8Array(arrayBuffer);
            addFileToFFS({
              fileBuffer: uint8Array,
              withOverrideConfig: true,
              newConf: {
                hot: {
                  enabled: enablePublicIPFS,
                  allowUnfreeze: allowUnfreeze,
                  ipfs: {
                    addTimeout: parseInt(addTimeout),
                  },
                },
                cold: {
                  enabled: enableFilecoinStorage,
                  filecoin: {
                    repFactor: parseInt(replicationFactor),
                    dealMinDuration: parseInt(minDealDuration),
                    excludedMinersList: excludedMinersList,
                    trustedMinersList: trustedMinersList,
                    countryCodesList: countryCodesList,
                    renew: {
                      enabled: renew,
                      threshold: parseInt(threshold),
                    },
                    addr: user.ffsInfo.defaultConfig.cold.filecoin.addr,
                    maxPrice: parseInt(maxPrice),
                  },
                },
                repairable: repairable,
              },
            });
          };
          fileReader.readAsArrayBuffer(file);
        }}
      >
        Upload
      </button>
      <br />
      <br />
      <h3>4. Deal Status</h3>
      {watchLogs.length > 0 ? (
        <div>
          {watchLogs.map((log, index) => (
            <div key={index} className="card" style={{ width: "48rem" }}>
              <div className="card-body">
                <h5 className="card-title">{log.msg}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {new Date(log.time * 1000).toUTCString()}
                </h6>
                <p className="card-text">
                  <b>Job ID: </b> {log.jid} <br />
                  <b>CID: </b>{" "}
                  <a
                    href={`http://localhost:8080/ipfs/${log.cid}`}
                    target="_blank"
                  >
                    {log.cid}
                  </a>{" "}
                  <br />
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>
          No Recent Deals. Upload something to Filecoin Network to see
          sweet-sweet deals :)
        </p>
      )}
    </Fragment>
  );
}

const removeItem = (array, item) => {
  var i = array.length;

  while (i--) {
    if (array[i] === item) {
      array.splice(array.indexOf(item), 1);
    }
  }
};

const mapStateToProps = (state) => ({
  user: state.app.user,
  watchJobs: state.app.watchJobs,
  watchLogs: state.app.watchLogs,
});

const mapDispatchToProps = (dispatch) => ({
  getFFSInfo: () => dispatch(getFFSInfo()),
  getDataFromFFS: (payload) => dispatch(getDataFromFFS(payload)),
  addFileToFFS: (payload) => dispatch(addFileToFFS(payload)),
  addFileToIPFS: (payload) => dispatch(addFileToIPFS(payload)),
  setDefaultConfig: (payload) => dispatch(setDefaultConfig(payload)),
  getCidConfig: (payload) => dispatch(getCidConfig(payload)),
  getActualCidConfig: (payload) => dispatch(getActualCidConfig(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pin);
