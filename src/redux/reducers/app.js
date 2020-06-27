import types from "../constants";

const initialState = {
  user: {
    cids: [],
  },
  ffsFiles: [],
  stats: {},
  loaded: false,
  watchLogs: [],
  watchJobs: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return { ...state, user: { ...action.payload } };
    case types.STATS:
      return { ...state, stats: { ...action.payload } };
    case types.CREATE_FFS:
      return { ...state, user: { ...state.user, ...action.payload } };
    case types.GET_WALLET_ADDRESSES:
      return { ...state, user: { ...state.user, ...action.payload } };
    case types.CREATE_WALLET_ADDRESSES:
      return { ...state, user: { ...state.user, ...action.payload } };
    case types.GET_FFS_INFO:
      return { ...state, user: { ...state.user, ...action.payload } };
    case types.ADD_FILE_TO_IPFS:
      return {
        ...state,
        user: {
          ...state.user,
          cids: [...state.user.cids, action.payload],
        },
      };
    case types.ADD_FILE_TO_FFS:
      return {
        ...state,
        user: {
          ...state.user,
          cids: [...state.user.cids, action.payload],
        },
      };
    case types.WATCH_JOBS:
      return { ...state, watchJobs: action.payload };
    case types.WATCH_LOGS:
      return { ...state, watchLogs: [...state.watchLogs, action.payload] };
    case types.GET_DATA_FROM_FFS:
      return { ...state, ffsFiles: [...state.ffsFiles, action.payload] };
    default:
      return state;
  }
};
