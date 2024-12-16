import RNFetchBlob from "react-native-blob-util";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import FilesystemStorage from "redux-persist-filesystem-storage";
import createSagaMiddleware from "redux-saga";
import IndexSagas from "../../Saga/index-sagas";
import rootReducer from "../Reducers/index";

const sagaMiddleware = createSagaMiddleware();

FilesystemStorage.config({
  storagePath: `${RNFetchBlob.fs.dirs.DocumentDir}/.persistStore`,
  encoding: "utf8",
  toFileName: (name) => name.split(":").join("-"),
  fromFileName: (name) => name.split("-").join(":"),
});

export const persistConfig = {
  key: "root",
  keyPrefix: "",
  storage: FilesystemStorage,
  toFileName: (name) => name.split(":").join("-"),
  fromFileName: (name) => name.split("-").join(":"),
  blacklist: ["authState"],
  timeout: 10000,
};

const pReducer = persistReducer(persistConfig, rootReducer);
export const store = createNadiswaraStore();

function createNadiswaraStore() {
  const middleware = [sagaMiddleware];
  return createStore(pReducer, applyMiddleware(...middleware));
}

sagaMiddleware.run(IndexSagas);
export const persistor = persistStore(store);

export default { store, persistor };
