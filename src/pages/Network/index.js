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
    setInterval(getNetworkStats, 3000);
  }

  console.log(stats);

  return (
    <Fragment>
      <NavBar />
      <h1>Network Stats</h1>

      <div className="card" style={{ width: "42rem" }}>
        <div className="card-body">
          <h5 className="card-title">Node Health</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Health status of the powergate node
          </h6>
          <div className="card-text">
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
          </div>
        </div>
      </div>

      <div className="card" style={{ width: "42rem" }}>
        <div className="card-body">
          <h5 className="card-title">Node Address</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Node id and supported multiAddresses
          </h6>
          <div className="card-text">
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
          </div>
        </div>
      </div>

      <div className="card" style={{ width: "42rem" }}>
        <div className="card-body">
          <h5 className="card-title">Peers</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            List of powergate node peers
          </h6>
          <div className="card-text">
            {stats.peers ? (
              <div>
                {stats.peers.peersList.map((peer, index) => (
                  <div key={index}>
                    <h5>Peer {` ${index + 1}`} </h5>
                    <b>ID: </b> {peer.addrInfo.id} <br />
                    <b>Supported MultiAddrs: </b>{" "}
                    <ul>
                      {peer.addrInfo.addrsList.map((addr, index) => (
                        <li key={index}>{addr}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>

      <div className="card" style={{ width: "42rem" }}>
        <div className="card-body">
          <h5 className="card-title">Miners</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Miners details of our powergate setup
          </h6>
          <div className="card-text">
            {stats.miners ? (
              <div>
                <p>
                  <b>Block Height: </b> {stats.miners.index.chain.lastUpdated}{" "}
                  <br />
                  <b>Online: </b> {stats.miners.index.meta.online} <br />
                  <b>Offline: </b> {stats.miners.index.meta.offline}
                </p>
                <div>
                  <h5>List of Miners</h5>
                  {stats.miners.index.chain.minersMap.map((miner, index) => (
                    <p key={index}>
                      <b>Miner {index + 1}</b>
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
          </div>
        </div>
      </div>
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
