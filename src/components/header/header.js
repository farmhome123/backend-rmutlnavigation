import React, { Component } from "react";
import { server } from "../../constants";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {
  render() {
    return (
      <header className="main-header">
        {/* Logo */}
        <a href="/building" className="logo">
          {/* mini logo for sidebar mini 50x50 pixels */}
          <span className="logo-mini">
            <b>A</b>LT
          </span>
          {/* logo for regular state and mobile devices */}
          <span className="logo-lg">
            <b>Admin</b>
          </span>
        </a>
        {/* Header Navbar: style can be found in header.less */}
        <nav className="navbar navbar-static-top">
          {/* Sidebar toggle button*/}
          <a

            href="#"
            className="sidebar-toggle"
            data-toggle="push-menu"
            role="button"
          >
            <span className="sr-only">Toggle navigation</span>
          </a>
          {/* Navbar Right Menu */}
         
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <li className="dropdown user user-menu">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/admin.png`}
                    className="user-image"
                    alt="User Image"
                  />
                  <span className="hidden-xs">Admin ระบบหลังบ้าน</span>
                </a>
                <ul className="dropdown-menu">
                  {/* User image */}
                  <li className="user-header">
                    <img
                      src="dist/img/user2-160x160.jpg"
                      className="img-circle"
                      alt="User Image"
                    />
                    <p>Admin Web Developer</p>
                  </li>
                  {/* Menu Body */}
                  <li className="user-body">
                    <div className="row">
                      <div className="col-xs-4 text-center">
                        <a href="#">Followers</a>
                      </div>
                      <div className="col-xs-4 text-center">
                        <a href="#">Sales</a>
                      </div>
                      <div className="col-xs-4 text-center">
                        <a href="#">Friends</a>
                      </div>
                    </div>
                    {/* /.row */}
                  </li>
                  {/* Menu Footer*/}
                  <li className="user-footer">
                    <div className="pull-left">
                      <a href="#" className="btn btn-default btn-flat">
                        Profile
                      </a>
                    </div>
                    <div
                      className="pull-right"
                      onClick={() => {
                        this.props.history.push("/login");
                        localStorage.removeItem(server.LOGIN_PASSED);
                        this.props.appReducer.app.forceUpdate();
                      }}
                    >
                      <a href="#" className="btn btn-default btn-flat">
                        Sign out
                      </a>
                    </div>
                  </li>
                </ul>
              </li>
              {/* Control Sidebar Toggle Button */}
              <li>
                <a href="#" data-toggle="control-sidebar">
                  <i className="fa fa-gears" />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = ({ appReducer }) => ({
  appReducer,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
