import React, { Component } from "react";

class Menusystem extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-sm-6 col-xs-12">
          <div className="info-box">
            <span className="info-box-icon">
              <img
                src={`${process.env.PUBLIC_URL}/images/building.png`}
                className="logo"
              />
            </span>
            <a href="/building" className="content">
              <div className="info-box-content">
                <p className="p_custom">ระบบจัดการอาคาร</p>
              </div>
            </a>
          </div>
        </div>
        <div className="col-md-4 col-sm-6 col-xs-12">
          <div className="info-box">
            <span className="info-box-icon">
              <img
                src={`${process.env.PUBLIC_URL}/images/newspaper.png`}
                className="logo"
              />
            </span>
            <a href="/news" className="content">
              <div className="info-box-content">
                <p className="p_custom">ระบบจัดการข่าวสาร</p>
              </div>
            </a>
          </div>
        </div>
        <div className="col-md-4 col-sm-6 col-xs-12">
          <div className="info-box">
            <span className="info-box-icon">
              <img
                src={`${process.env.PUBLIC_URL}/images/puzzle.png`}
                className="logo"
              />
            </span>
            <a href="/evens" className="content">
              <div className="info-box-content">
                <p className="p_custom">ระบบจัดการกิจกรรม</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Menusystem;
