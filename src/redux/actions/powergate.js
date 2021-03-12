import types from "../constants";
import {
  getPowergateInstance,
} from "../../utils/powergate";
import { addUser, getUser } from "../../utils/database";
import { powTypes } from "@textile/powergate-client"

export const createFFS = (payload) => async (dispatch) => {
  const pow = await getPowergateInstance();

  // Check for existing FFS token in database
  const user = await getUser(payload.address);

  let TOKEN;
  
  if (user.token) {
    // If user already has a FFS token, use that
    TOKEN = user.token;
    pow.setToken(TOKEN);

  } else {
    // If user does not have a FFS token, create one
    const response = await pow.admin.users.create();
    const user = response.user;
    pow.setToken(TOKEN);
    
    // Save new token
    await addUser({
      _id: payload.address,
      address: payload.address,
      token: user.token,
    });
    TOKEN = user.token;
    pow.setToken(TOKEN);
    
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log(TOKEN)

  dispatch({
    type: types.CREATE_FFS,
    payload: {
      address: payload.address,
      token: TOKEN,
    },
  });
};

export const getWalletAddresses = () => async (dispatch) => {
  const pow = await getPowergateInstance();

  const { addressesList } = await pow.wallet.addresses();

  dispatch({
    type: types.GET_WALLET_ADDRESSES,
    payload: {
      wallets: addressesList,
    },
  });
};

export const createWalletAddr = () => async (dispatch) => {
  const pow = await getPowergateInstance();

  const { addr } = await pow.ffs.newAddr("my wallet name", "bls", false);
  dispatch({
    type: types.CREATE_WALLET_ADDRESSES,
    payload: {
      wallets: addr,
    },
  });
};

export const getFFSInfo = () => async (dispatch) => {
  const pow = await getPowergateInstance();

  const { defaultStorageConfig } = await pow.storageConfig.default();
  console.log(defaultStorageConfig);
  dispatch({
    type: types.GET_FFS_INFO,
    payload: {
      defaultConfig: defaultStorageConfig,
    },
  });
};

export const getPinsList = () => async (dispatch) => {
  const pow = await getPowergateInstance();

  const { storageJobsList } = await pow.storageJobs.list();
  console.log(storageJobsList);
  dispatch({
    type: types.GET_PINS_LIST,
    payload: {
      pinsList: storageJobsList,
    },
  });
};

export const addFileToFFS = (payload) => async (dispatch) => {
  const pow = await getPowergateInstance();

  let jobId;

  // First, add the file to IPFS Network
  const { cid } = await pow.data.stage(payload.fileBuffer);
  delete payload["fileBuffer"];
  payload.cid = cid;
  payload.newConf.cid = cid;

  if (payload.withOverrideConfig) {
    // You want to override the default FFS config with new config
    jobId = (
      await pow.storageConfig.apply(
        payload.cid,
        {
          override: true,
          storageConfig: payload.newConf,
        }
      )
    ).jobId;
  } else {
    // You want to keep the default FFS config
    jobId = (await pow.storageConfig.apply(payload.cid)).jobId;
  }

  // watch the FFS job status to see the storage process progressing
  pow.storageJobs.watch((job) => {
    switch (job.status) {
      case powTypes.JobStatus.JOB_STATUS_CANCELED:
        dispatch({
          type: types.WATCH_JOBS,
          payload: job,
        });
        break;
      case powTypes.JobStatus.JOB_STATUS_FAILED:
        dispatch({
          type: types.WATCH_JOBS,
          payload: job,
        });
        break;
      case powTypes.JobStatus.JOB_STATUS_SUCCESS:
        dispatch({
          type: types.WATCH_JOBS,
          payload: job,
        });
        break;
      default:
        break;
    }
  }, jobId);

  // watch all FFS events for a cid
  pow.data.watchLogs((logEvent) => {
    console.log(logEvent)
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

export const getDataFromFFS = (payload) => async (dispatch) => {
  const pow = await getPowergateInstance();

  const bytes = await pow.data.get(payload.cid);
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
