import React, { Component } from "react";
import Header from "./components/header/header";
import Menu from "./components/menu/menu";
import Footer from "./components/footer/footer";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Stock from "./components/stock/stock";
import StockEdit from "./components/stockEdit";
import StockCreate from "./components/stockCreate";

import News from "./components/news";
import NewsCreate from "./components/newsCreate";
import NewsEdit from "./components/newsEdit";

import Evens from "./components/evens";
import EvensCreate from "./components/evensCreate";
import EvensEdit from "./components/evensEdit";

import Building from "./components/building";
import BuildingCreate from "./components/buildingCreate";
import BuildingEdit from "./components/buildingEdit";

import Class from "./components/class";
import ClassCreate from "./components/classCreate";
import ClassEdit from "./components/classEdit";

import "./App.css";

import { server, YES } from "./constants";
import { setApp } from "./actions/app.action";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  HashRouter,
} from "react-router-dom";
import { connect } from "react-redux";

const isLoggedIn = () => {
  return localStorage.getItem(server.LOGIN_PASSED) == YES;
};

// Protected Route
const SecuredRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

class App extends Component {
  componentDidMount() {
    this.props.setApp(this);
  }

  redirectToLogin = () => {
    return <Redirect to="/login" />;
  };

  render() {
    return (
      <Router >
        <div>
          {isLoggedIn() && <Header />}
          {/* {isLoggedIn() && <Menu />} */}
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <SecuredRoute path="/stock" component={Stock} />
            <SecuredRoute path="/stock-create" component={StockCreate} />
            <SecuredRoute path="/stock-edit/:id" component={StockEdit} />
            <SecuredRoute path="/news" component={News} />
            <SecuredRoute path="/news-create" component={NewsCreate} />
            <SecuredRoute path="/news-edit/:id" component={NewsEdit} />
            <SecuredRoute path="/evens" component={Evens} />
            <SecuredRoute path="/evens-create" component={EvensCreate} />
            <SecuredRoute path="/evens-edit/:id" component={EvensEdit} />
            <SecuredRoute path="/building" component={Building} />
            <SecuredRoute path="/building-create" component={BuildingCreate} />
            <SecuredRoute path="/building-edit/:id" component={BuildingEdit} />
            <SecuredRoute path="/class/:id" component={Class} />
            <SecuredRoute path="/class-create/:id" component={ClassCreate} />
            <SecuredRoute path="/class-edit/:id" component={ClassEdit} />
            <Route exact={true} path="/" component={this.redirectToLogin} />
            <Route path="*" component={this.redirectToLogin} />
          </Switch>
          {isLoggedIn() && <Footer />}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  setApp,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
