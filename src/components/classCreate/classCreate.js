import React, { Component } from "react";
import { Formik } from "formik";
import "./classCreate.css";
import { httpClient } from "./../../utils/HttpClient";
import { server } from "./../../constants";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
class ClassCreate extends Component {
  showForm = ({
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  }) => {
    return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="name">
            ชื่อห้อง
          </label>
          <div className="col-sm-10">
            <input
              name="name"
              onChange={handleChange}
              value={values.name}
              placeholder="โปรดระบุชื่อชื่อห้อง"
              className="form-control"
              type="text"
              id="name"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="name">
            ข้อมูลห้อง
          </label>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="name">
            รายละเอียดห้อง
          </label>
          <div className="col-sm-10">
            <textarea
              onChange={handleChange}
              name="detailclass"
              value={values.detailclass}
              placeholder="โปรดระบุรายละเอียดห้อง"
              className="form-control"
              type="text"
              id="detailclass"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="name">
            ชั้น
          </label>
          <div className="col-sm-10">
            <input
              name="floot"
              onChange={handleChange}
              value={values.floot}
              placeholder="โปรดระบุชั้น"
              className="form-control"
              type="text"
              id="floot"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="name">
            เบอร์โทรติดต่อ
          </label>
          <div className="col-sm-10">
            <input
              name="phone"
              onChange={handleChange}
              value={values.phone}
              placeholder="เบอร์โทรติดต่อ(ถ้ามี)"
              className="form-control"
              type="text"
              id="phone"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="name">
            วิธีการเดินทางไปยังห้อง
          </label>
          <div className="col-sm-10">
            <textarea
              onChange={handleChange}
              name="gotoclass"
              value={values.gotoclass}
              placeholder="โปรดระบุรายละเอียดวิธีการเดินทางไปยังห้อง"
              className="form-control"
              type="text"
              id="gotoclass"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="name">
            buildingid
          </label>
          <div className="col-sm-10">
            <input
              name="buildingid"
              onChange={handleChange}
              value={(values.buildingid = this.props.match.params.id)}
              className="form-control"
              type="text"
              id="buildingid"
            />
          </div>
        </div>
        <div className="form-group" style={{ marginTop: 15 }}>
          <div className="col-sm-12 col-sm-offset-2">
            {this.showPreviewImage(values)}

            <div className="wrap-upload-buttons control-label">
              <ul className="btn-nav row" id="rcorners">
                <li>
                  <span style={{ marginLeft: 2 }}>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/ic_photo.png`}
                      style={{ width: 25, height: 20 }}
                    />
                    <span style={{ color: "#00B0CD", marginLeft: 0 }}>
                      {" "}
                      เพิ่มรูปห้อง{" "}
                    </span>
                    <input
                      onChange={(e) => {
                        e.preventDefault();
                        setFieldValue("file", e.target.files[0]); // for upload
                        setFieldValue(
                          "file_obj",
                          URL.createObjectURL(e.target.files[0])
                        ); // for preview image
                      }}
                      type="file"
                      name="image"
                      className="picupload"
                      multiple
                      accept="image/*"
                      style={{ padding: "20px 0" }}
                    />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="box-footer" style={{ marginTop: 50 }}>
          <button
            onClick={(e) => {
              if (values.file == undefined) {
                //alert("กรุณาเพิ่มรูปภาพห้อง");
                MySwal.fire({
                  title: "กรุณาเพิ่มรูปภาพห้อง",
                  type: "warning",
                  showCancelButton: false,
                  confirmButtonText: "ตกลง",
               
                })
                e.preventDefault();
              }
            }}
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary pull-right"
          >
            Submit
          </button>
          <a
            onClick={() => {
              this.props.history.goBack();
            }}
            type="Button"
            className="btn btn-default pull-right"
            style={{ marginRight: 10 }}
          >
            Cancel
          </a>
        </div>
      </form>
    );
  };

  showPreviewImage = (values) => {
    if (values.file_obj) {
      return <img src={values.file_obj} style={{ height: 250 }} />;
    }
  };

  render() {
    return (
      <div className="content-wrapper">
        {/* Main content */}
        <section className="content" style={{ maxWidth: "80%" }}>
          <div className="box box-primary" style={{ marginTop: 70 }}>
            <div className="box-header with-border">
              <p className="box-title" style={{ fontSize: 30 }}>
                เพิ่มห้อง
              </p>
            </div>
            <div className="box-body" style={{ marginTop: 30 }}>
              <Formik
                initialValues={{ name: "", stock: 10, price: 100 }}
                onSubmit={async (values, { setSubmitting }) => {
                  let formData = new FormData();
                  formData.append("name", values.name);
                  formData.append("detailclass", values.detailclass);
                  formData.append("floot", values.floot);
                  formData.append("buildingid", values.buildingid);
                  formData.append("phone", values.phone);
                  formData.append("gotoclass", values.gotoclass);
                  formData.append("image", values.file);
                  await httpClient.post(server.CLASS_URL, formData);
                  setSubmitting(false);
                  this.props.history.goBack();
                }}
              >
                {(props) => this.showForm(props)}
              </Formik>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default ClassCreate;
