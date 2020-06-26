import React, { Fragment } from "react";
import * as System from "../../components/system";
import { getNetworkStats } from "../../redux/actions/powergate";
import NavBar from "../../components/NavBar";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Network(props) {
  const { user, stats, getNetworkStats } = props;
  const history = useHistory();

  if (!user.address) {
    history.push("/");
  }

  if (Object.keys(stats).length === 0) {
    getNetworkStats();
  }

  console.log(stats);

  return (
    <Fragment>
      <NavBar />
      <h1>Network Stats</h1>

      <table style={{ margin: "32px" }}>
        <tr>
          <td>
            <h3>Node Health</h3>
            {/* // Add tooltip */}
            {/* <System.TooltipAnchor tooltip="Hello friends!!" /> */}
            {stats.health ? (
              stats.health.status === 1 ? (
                <b>
                  <font color="green">HEALTHY</font>
                </b>
              ) : (
                <b>
                  <font color="red">UNHEALTHY</font>
                </b>
              )
            ) : (
              <p>Loading...</p>
            )}
          </td>
          <td>
            <h3>Address</h3>
            {/* // Add tooltip */}
            {/* <System.TooltipAnchor tooltip="Hello friends!!" /> */}
            {stats.address ? (
              <div>
                <b>ID: </b> {stats.address.addrInfo.id} <br />
                <b>Supported MultiAddrs: </b>{" "}
                <ul>
                  {stats.address.addrInfo.addrsList.map((addr, index) => (
                    <li key={index}>{addr}</li>
                  ))}{" "}
                </ul>
                <br />
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </td>
        </tr>
        <tr>
          <td>
            <h3>Peers</h3>
            {/* // Add tooltip */}
            {/* <System.TooltipAnchor tooltip="Hello friends!!" /> */}
            {stats.peers ? (
              <div>
                {stats.peers.peersList.map((peer, index) => (
                  <p>
                    <h4>Peer {` ${index + 1}`} </h4>
                    <b>ID: </b> {peer.addrInfo.id} <br />
                    <b>Supported MultiAddrs: </b>{" "}
                    <ul>
                      {peer.addrInfo.addrsList.map((addr, index) => (
                        <li key={index}>{addr}</li>
                      ))}
                    </ul>
                  </p>
                ))}
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </td>
          <td>
            <h3>Miners</h3>
            {/* // Add tooltip */}
            {/* <System.TooltipAnchor tooltip="Hello friends!!" /> */}
            {stats.miners ? (
              <div>
                <p>
                  <b>Block Height: </b> {stats.miners.index.chain.lastUpdated}
                  <b>Online: </b> {stats.miners.index.meta.online} <br />
                  <b>Offline: </b> {stats.miners.index.meta.offline}
                </p>
                <div>
                  <h4>List of Miners</h4>
                  {stats.miners.index.chain.minersMap.map((miner, index) => (
                    <p key={index}>
                      <h5>Miner {index + 1}</h5>
                      <b>Name: </b> {miner[0]} <br />
                      <b>Power: </b> {miner[1].power} <br />
                      <b>Sector Size: </b> {miner[1].sectorSize} <br />
                      <b>Active Deals: </b> {miner[1].activeDeals}
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </td>
        </tr>
      </table>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  user: state.app.user,
  stats: state.app.stats,
});

const mapDispatchToProps = (dispatch) => ({
  getNetworkStats: () => dispatch(getNetworkStats()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Network);
