import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Banner from "./components/Banner";
import ProductCate from "./components/ProductCate";

function App() {
  return (
    <div
      className="container"
      style={{ backgroundColor: "#f5f8fd"}}
    >
      <div className="header-overlay" onClick={() => {document.querySelector(".header-overlay").classList.remove("active")}}></div>
      <Router>
      <Header />
        <Switch>
          <Route path="/" exact>
            <Banner />
            <ProductList />
          </Route>
          <Route path="/api/products/:name" exact component={ProductDetail} />
          <Route path="/product/:category" exact component={ProductCate} />
          <Route>404 Not Found!</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
