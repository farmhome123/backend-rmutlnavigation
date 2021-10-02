import React, { Component } from "react";
import * as actions from "./../../actions/class.action";
import { connect } from "react-redux";
import { imageUrl } from "./../../constants";
import { Link } from "react-router-dom";
import _ from "lodash";
import Moment from "react-moment";
import "./class.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Menusystem from "./../menusystem";
import { getClassByBuildingId } from "./../../actions/class.action";
const MySwal = withReactContent(Swal);


class Class extends Component {

  componentDidMount() {
    this.debounceSearch = _.debounce(this.props.getClassByKeyword, 500);
    // this.props.getClass();
    let buildingid = this.props.match.params.id;
    let buildingname = this.props.name;
    // alert(buildingid)
    this.props.getClassByBuildingId(buildingid);
  }
  createRows = () => {
    try {
      const { result, isFetching } = this.props.classReducer;
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
                    onError={(e) => {
                      e.target.onError = null;
                      e.target.src =
                        "http://localhost:8085/images/defualclass.jpg";
                    }}
                  style={{ maxWidth: 250 }
                }
                />
              </span>
              {item.name}
            </td>
            <td>
              {item.detailclass}
            </td>
            <td>
              {item.floot}
            </td>
            {/* <td>
              {item.buildingid}
            </td> */}
            <td>
              {item.phone}
            </td>
            <td>
              {item.gotoclass}
            </td>
            {/* <td>{item.id}</td> */}
            <td style={{ textAlign: "center" }}>
              {/* <button
                onClick={() =>
                  this.props.history.push(`/class/${item.id}`)
                }
                type="button"
                className="btn btn-primary"
              >
                ดูข้อมูลในอาคาร
              </button>
              <span style={{ color: "grey" }}> | </span> */}
              <button
                onClick={() =>
                  this.props.history.push(`/class-edit/${item.id}`)
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
                      this.props.deleteClass(item.id);
                    }
                  });
                }}
                type="button"
                className="btn btn-danger"
              >
                ลบ
              </button>
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
                        disabled
                        type="search"
                        className="form-control input-lg"
                        // placeholder=""
                        // Enter search keyword
                        style={{ borderRadius: 10 }}
                      />
                    </div>
                    <div className="col-xs-6">
                      <div style={{ fontSize: 20 }}>ข้อมูลอาคาร</div>
                      {/* ID :{this.props.match.params.id} */}
                    </div>
                    <div className="col-xs-6 text-right">
                      <Link
                        onClick={() =>
                          this.props.history.push(`/class-create/${this.props.match.params.id}`)
                        }
                        // to="/class-create"
                        style={{ float: "right", margin: 0, width: 120 }}
                        className="btn btn-success btn-lg"
                      >
                        เพิ่มห้อง
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
                        <th style={{ width: "30%" }}>NameClass</th>
                        <th style={{ width: "9%" }}>Detailclass</th>
                        <th style={{ width: "9%" }}>Floot</th>
                        {/* <th style={{ width: "5%" }}>Buildingid</th> */}
                        <th style={{ width: "5%" }}>Phone</th>
                        <th style={{ width: "5%" }}>Gotoclass</th>
                        {/* <th style={{ width: "5%" }}>IDclass</th> */}
                        <th style={{ width: "8%", textAlign: "center" }}>
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

const mapStateToProps = ({ classReducer }) => ({
  classReducer,
});

const mapDispatchToProps = {
  // spreading
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Class);
