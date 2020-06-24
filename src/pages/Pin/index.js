import React, { Fragment } from "react";
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
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Pin(props) {
  const {
    user,
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

  return (
    <Fragment>
      <h1>Pin</h1>
      <h3>FFS Info</h3>
      {user.ffsInfo ? <p>{JSON.stringify(user.ffsInfo)}</p> : null}
      <button onClick={getFFSInfo}>Get FFS Config</button>
      <h3>Set Default Global Config</h3>
      <textarea id="globalDefaultConfig"></textarea>
      <button
        onClick={() => {
          setDefaultConfig({
            defaultConfig: JSON.parse(
              document.getElementById("globalDefaultConfig").value
            ),
          });
        }}
      >
        Set Global Default Config
      </button>
      <h3>Add File to IPFS</h3>
      <input type="file" id="uploadToIPFS" />
      <button
        onClick={async () => {
          const file = document.getElementById("uploadToIPFS").files[0];
          /* const fileBuffer = await new Response(file).arrayBuffer();
          addFileToIPFS({ fileBuffer: fileBuffer }); */
          var arrayBuffer, uint8Array;
          var fileReader = new FileReader();
          fileReader.onload = function () {
            arrayBuffer = this.result;
            uint8Array = new Uint8Array(arrayBuffer);
            addFileToIPFS({ fileBuffer: uint8Array });
          };
          fileReader.readAsArrayBuffer(file);
        }}
      >
        Upload to IPFS
      </button>
      {user.cids.map((cid, index) => {
        return <p key={index}>{JSON.stringify(cid)}</p>;
      })}
      <h3>Upload to FFS</h3>
      <input type="text" id="uploadToFFS" />
      <button
        onClick={async () => {
          const cid = document.getElementById("uploadToFFS").value;
          addFileToFFS({
            cid: cid,
            withOverrideConfig: true,
            newConf: {
              cid: cid,
              hot: {
                enabled: true,
                allowUnfreeze: false,
                ipfs: {
                  addTimeout: 15,
                },
              },
              cold: {
                enabled: true,
                filecoin: {
                  repFactor: 1,
                  dealMinDuration: 1000,
                  excludedMinersList: [],
                  trustedMinersList: [],
                  countryCodesList: [],
                  renew: {
                    enabled: false,
                    threshold: 0,
                  },
                  addr:
                    "t3ugwhdige2nvq4z3mdioishuojyjfqcx7ex547l7lzpstsr2mjfvlnmelvdt5ewrrf52vk7z2iljidx776hyq",
                  maxPrice: 0,
                },
              },
              repairable: false,
            },
          });
        }}
      >
        Upload to FFS
      </button>
      <h3>Get Desired CID Config</h3>
      <button
        onClick={() => {
          const cid = document.getElementById("uploadToFFS").value;
          getCidConfig({ cid: cid });
        }}
      >
        Get CID Config
      </button>
      <h3>Get Actual CID Config</h3>
      <button
        onClick={() => {
          const cid = document.getElementById("uploadToFFS").value;
          getActualCidConfig({ cid: cid });
        }}
      >
        Get Actual CID Config
      </button>
      <h3>Get Data from FFS</h3>
      <button
        onClick={() => {
          const cid = document.getElementById("uploadToFFS").value;
          getDataFromFFS({ cid: cid });
        }}
      >
        Get Data from FFS
      </button>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  user: state.app.user,
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
