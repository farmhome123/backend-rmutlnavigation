import React, { Component } from "react";
import * as actions from "./../../actions/building.action";
import { connect } from "react-redux";
import { imageUrl } from "./../../constants";
import { Link } from "react-router-dom";
import _ from "lodash";
import Moment from "react-moment";
import NumberFormat from "react-number-format";
import "./building.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Menusystem from "./../menusystem";
const MySwal = withReactContent(Swal);

class Building extends Component {
  componentDidMount() {
    this.debounceSearch = _.debounce(this.props.getBuildingByKeyword, 500);
    this.props.getBuilding();
  }

  createRows = () => {
    try {
      const { result, isFetching } = this.props.buildingReducer;
      return (
        !isFetching &&
        result != null &&
        result.map((item) => (
          <tr key={item.id}>
            <td>
              <Moment format="DD/MM/YYYY">{item.created}</Moment>
            </td>
            <td>
              <span style={{ marginRight: 10, minHe: 100 }}>
                <img
                  src={`${imageUrl}/images/${item.image
                    }?dummy=${Math.random()}`}
                  style={{ maxWidth: 250 }}
                />
              </span>
              {item.name}
            </td>
            <td>
              <NumberFormat
                value={item.buildinglatitude}
                displayType={"text"}
              />
            </td>
            <td>
              <NumberFormat
                value={item.buildinglongitude}
                displayType={"text"}
              />
            </td>
            <td>{item.id}</td>
            <td style={{ textAlign: "center" }}>
            <span style={{ color: "grey" }}> | </span>
              <button
                onClick={() =>
                  this.props.history.push(`/class/${item.id}`)
                }
                type="button"
                className="btn btn-primary"
              >
                ดูข้อมูลในอาคาร
              </button>
              <span style={{ color: "grey" }}> | </span>
              <button
                onClick={() =>
                  this.props.history.push(`/building-edit/${item.id}`)
                }
                type="button"
                className="btn btn-info"
              >
                แก้ไข
              </button>
              <span style={{ color: "grey" }}> | </span>
              <button
                onClick={() => {
                  MySwal.fire({
                    title: "ต้องการลบอาคารนี้หรือไม่",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonText: "ลบ",
                    cancelButtonText: "ยกเลิก",
                  }).then((result) => {
                    if (result.value) {
                      this.props.deleteBuilding(item.id);
                    }
                  });
                }}
                type="button"
                className="btn btn-danger"
              >
                ลบ
              </button>
              <span style={{ color: "grey" }}> | </span>
              <br/><br/>
              <span style={{ color: "grey" }}> | </span>
              <button
                onClick={() =>
                  {
                    window.open("https://maps.google.com?q="+(item.buildinglatitude)+","+(item.buildinglongitude));
                  }
                }
                type="button"
                className="btn btn-success"
              >
                นำทางไปยังอาคาร
              </button>
              <span style={{ color: "grey" }}> | </span>
            </td>
          </tr>
        ))
      );
    } catch (e) {
      console.log(e);
    }
  };

  onChange = (e) => {
    e.persist();
    this.debounceSearch(e);
  };


  render() {
    return (
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <h1>ระบบหลังบ้าน </h1>
          <ol className="breadcrumb">
            <li>
              <a href="/">
                <i className="fa fa-dashboard" /> Home
              </a>
            </li>
            <li>
              <a href="#/">Stock</a>
            </li>
          </ol>
        </section>
        {/* Main content */}
        <section className="content">
          <div className="row">
            <div className="col-xs-12">
              <Menusystem />
              <div className="box">
                <div className="box-body">
                  <div className="row" style={{ marginBottom: 40 }}>
                    <div className="col-xs-6">
                      <input
                        onChange={this.onChange}
                        type="search"
                        className="form-control input-lg"
                        placeholder="Enter search keyword"
                        style={{ borderRadius: 10 }}
                      />
                    </div>
                    <div className="col-xs-6 text-right">
                      <Link
                        to="/building-create"
                        style={{ float: "right", margin: 0, width: 120 }}
                        className="btn btn-success btn-lg"
                      >
                        เพิ่มอาคาร
                      </Link>
                    </div>
                  </div>

                  <table
                    id="stock_table"
                    className="table table-bordered table-striped table-hover"
                    style={{ height: 300, maxHeight: 300 }}
                  >
                    <thead>
                      <tr>
                        <th style={{ width: "7%", textAlign: "center" }}>
                          Created
                        </th>
                        <th style={{ width: "30%" }}>NameBuilding</th>
                        <th style={{ width: "9%" }}>Latitude</th>
                        <th style={{ width: "9%" }}>Longitude</th>
                        <th style={{ width: "5%" }}>ID</th>
                        <th style={{ width: "16%", textAlign: "center" }}>
                          Acttion
                        </th>
                      </tr>
                    </thead>
                    <tbody>{this.createRows()}</tbody>
                  </table>
                </div>
                {/* /.box-body */}
              </div>
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </section>
      </div>
    );
  }
}

const mapStateToProps = ({ buildingReducer }) => ({
  buildingReducer,
});

const mapDispatchToProps = {
  // spreading
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Building);
