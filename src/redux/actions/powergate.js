import types from "../constants";
import {
  getPowergateInstance,
  ffsOptions,
  ffsTypes,
} from "../../utils/powergate";
import { addUser, getUser } from "../../utils/database";
const pow = getPowergateInstance();

export const getNetworkStats = () => async (dispatch) => {
  const [respPeers, respAddr, respHealth, respMiners] = await Promise.all([
    pow.net.peers(),
    pow.net.listenAddr(),
    pow.health.check(),
    pow.miners.get(),
  ]);
  dispatch({
    type: types.STATS,
    payload: {
      peers: respPeers,
      address: respAddr,
      health: respHealth,
      miners: respMiners,
    },
  });
};

export const createFFS = (payload) => async (dispatch) => {
  // Check for existing FFS token in database
  const user = await getUser(payload.address);
  let TOKEN;
  if (user.token) {
    // If user already has a FFS token, use that
    pow.setToken(user.token);
    TOKEN = user.token;
  } else {
    // If user does not have a FFS token, create one
    const { token } = await pow.ffs.create(); // save this token for later use!
    pow.setToken(token);
    // Save new token
    await addUser({
      _id: payload.address,
      address: payload.address,
      token: token,
    });
    TOKEN = token;
  }

  dispatch({
    type: types.CREATE_FFS,
    payload: {
      address: payload.address,
      token: TOKEN,
    },
  });
};

export const getWalletAddresses = () => async (dispatch) => {
  const { addrsList } = await pow.ffs.addrs();
  dispatch({
    type: types.GET_WALLET_ADDRESSES,
    payload: {
      wallets: addrsList,
    },
  });
};

export const createWalletAddr = () => async (dispatch) => {
  const { addr } = await pow.ffs.newAddr("my new addr");
  dispatch({
    type: types.CREATE_WALLET_ADDRESSES,
    payload: {
      wallets: addr,
    },
  });
};

export const getFFSInfo = () => async (dispatch) => {
  const { info } = await pow.ffs.info();
  dispatch({
    type: types.GET_FFS_INFO,
    payload: {
      ffsInfo: info,
    },
  });
};

export const setDefaultConfig = (payload) => async (dispatch) => {
  console.log(payload.defaultConfig);
  await pow.ffs.setDefaultConfig(payload.defaultConfig);
};

export const getDefaultCidConfig = (payload) => async (dispatch) => {
  await pow.ffs.getDefaultCidConfig(payload.cid);
};

export const addFileToIPFS = (payload) => async (dispatch) => {
  console.log(payload.fileBuffer);
  const { cid } = await pow.ffs.addToHot(payload.fileBuffer);
  dispatch({
    type: types.ADD_FILE_TO_IPFS,
    payload: {
      cid: cid,
      status: ["hot"],
    },
  });
};

export const addFileToFFS = (payload) => async (dispatch) => {
  let jobId;

  // First, add the file to IPFS Network
  const { cid } = await pow.ffs.addToHot(payload.fileBuffer);
  delete payload["fileBuffer"];
  payload.cid = cid;
  payload.newConf.cid = cid;

  if (payload.withOverrideConfig) {
    // You want to override the default FFS config with new config
    jobId = (
      await pow.ffs.pushConfig(
        payload.cid,
        ffsOptions.withOverrideConfig(true),
        ffsOptions.withConfig(payload.newConf)
      )
    ).jobId;
  } else {
    // You want to keep the default FFS config
    jobId = (await pow.ffs.pushConfig(payload.cid)).jobId;
  }

  // watch the FFS job status to see the storage process progressing
  const cancelJob = pow.ffs.watchJobs((job) => {
    switch (job.status) {
      case ffsTypes.JobStatus.JOB_STATUS_CANCELED:
        dispatch({
          type: types.WATCH_LOGS,
          payload: job,
        });
        break;
      case ffsTypes.JobStatus.JOB_STATUS_FAILED:
        dispatch({
          type: types.WATCH_LOGS,
          payload: job,
        });
        break;
      case ffsTypes.JobStatus.JOB_STATUS_SUCCESS:
        dispatch({
          type: types.WATCH_LOGS,
          payload: job,
        });
        break;
      default:
        break;
    }
  }, jobId);

  // watch all FFS events for a cid
  const cancelWatch = pow.ffs.watchLogs((logEvent) => {
    dispatch({
      type: types.WATCH_LOGS,
      payload: logEvent,
    });
  }, payload.cid);

  dispatch({
    type: types.ADD_FILE_TO_FFS,
    payload: {
      cid: payload.cid,
      status: ["cold"],
      jobId: jobId,
    },
  });
};

export const getCidConfig = (payload) => async (dispatch) => {
  const { config } = await pow.ffs.getCidConfig(payload.cid);
  console.log({ getCidConfig: config });
  dispatch({
    type: types.GET_CID_CONFIG,
    payload: {
      cid: payload.cid,
      desiredConfig: config,
    },
  });
};

export const getActualCidConfig = (payload) => async (dispatch) => {
  const { cidInfo } = await pow.ffs.show(payload.cid);
  console.log({ getActualCidConfig: cidInfo });
  dispatch({
    type: types.GET_ACTUAL_CID_CONFIG,
    payload: {
      cid: payload.cid,
      cidInfo: cidInfo,
    },
  });
};

export const getDataFromFFS = (payload) => async (dispatch) => {
  const bytes = await pow.ffs.get(payload.cid);
  console.log(bytes);

  let blob = new Blob([bytes], { type: "octet/stream" });
  let url = window.URL.createObjectURL(blob);

  dispatch({
    type: types.GET_DATA_FROM_FFS,
    payload: {
      cid: payload.cid,
      url: url,
    },
  });
};

export const sendFIL = (payload) => async (dispatch) => {
  await pow.ffs.sendFil(
    payload.addrsList[0].addr,
    "<some other address>",
    1000
  );
  dispatch({
    type: types.GET_DATA_FROM_FFS,
    payload: {
      from: payload.addrsList[0].addr,
      to: "<some other address>",
      amount: 1000,
    },
  });
};
