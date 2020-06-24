import React, { Fragment } from "react";
import * as System from "../../components/system";
import { getNetworkStats } from "../../redux/actions/powergate";
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
      <h1>Network Stats</h1>

      <table>
        <tr>
          <td>
            <h3>Node Health</h3>
            {/* // Add tooltip */}
            {/* <System.TooltipAnchor tooltip="Hello friends!!" /> */}
            {stats.health ? <p>{JSON.stringify(stats.health)}</p> : null}
          </td>
          <td>
            <h3>Address</h3>
            {/* // Add tooltip */}
            {/* <System.TooltipAnchor tooltip="Hello friends!!" /> */}
            {stats.address ? <p>{JSON.stringify(stats.address)}</p> : null}
          </td>
        </tr>
        <tr>
          <td>
            <h3>Peers</h3>
            {/* // Add tooltip */}
            {/* <System.TooltipAnchor tooltip="Hello friends!!" /> */}
            {stats.peers ? <p>{JSON.stringify(stats.peers)}</p> : null}
          </td>
          <td>
            <h3>Miners</h3>
            {/* // Add tooltip */}
            {/* <System.TooltipAnchor tooltip="Hello friends!!" /> */}
            {stats.miners ? <p>{JSON.stringify(stats.miners)}</p> : null}
          </td>
        </tr>
      </table>
      <Link to="/pin">PIN</Link>
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
