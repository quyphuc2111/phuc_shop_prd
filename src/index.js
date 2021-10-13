import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import "normalize.css";
import { GlobalStyles } from "./global-styles";

ReactDOM.render(
    <Provider store={store}>
      <GlobalStyles />
      <App />
    </Provider>
,
  document.getElementById("root")
);
