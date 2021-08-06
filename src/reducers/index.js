import { combineReducers } from "redux";
import registerReducer from "./register.reducer";
import loginReducer from "./login.reducer";
import appReducer from "./app.reducer";
import stockReducer from "./stock.reducer";
import newsReducer from "./news.reducer";
import evensReducer from "./evens.reducer";
import buildingReducer from "./building.reducer";
import classReducer from "./class.reducer";


export default combineReducers({
  registerReducer,
  loginReducer,
  appReducer,
  stockReducer,
  newsReducer,
  evensReducer,
  buildingReducer,
  classReducer,
});
