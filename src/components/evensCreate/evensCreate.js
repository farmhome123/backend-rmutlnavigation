import React, { Component } from "react";
import { Formik } from "formik";
import "./evensCreate.css";
import { httpClient } from "./../../utils/HttpClient";
import { server } from "./../../constants";
class EvensCreate extends Component {
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
            ชื่อกิจกรรม
          </label>
          <div className="col-sm-10">
            <input
              name="name"
              onChange={handleChange}
              value={values.name}
              placeholder="โปรดระบุชื่อกิจกรรม"
              className="form-control"
              type="text"
              id="name"
            />
          </div>
        </div>
        <div className="form-group" style={{ marginBottom: 10 }}>
          <label className="col-sm-2 control-label" htmlFor="stock">
            สถานที่จัดกิจกรรม
          </label>
          <div className="col-sm-10">
            <input
              name="buildingevens"
              onChange={handleChange}
              value={values.buildingevens}
              placeholder="โปรดระบุสถานที่จัดกิจกรรม"
              className="form-control"
              type="text"
              id="buildingevens"
            />
          </div>
        </div>
        <div className="form-group" style={{ marginBottom: 10 }}>
          <label className="col-sm-2 control-label" htmlFor="stock">
            รายละเอียดกิจกรรม
          </label>
          <div className="col-sm-10">
            <textarea
              onChange={handleChange}
              name="detailevens"
              value={values.detailevens}
              placeholder="โปรดระบุรายละเอียดกิจกรรม"
              className="form-control"
              type="text"
              id="detailevens"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="name">
            พิกัดสถานที่จัดกิจกรรม
          </label>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="name">
            Latitude
          </label>
          <div className="col-sm-10">
            <input
              name="evenslatitude"
              onChange={handleChange}
              value={values.evenslatitude}
              placeholder="โปรดระบุlatitude"
              className="form-control"
              type="text"
              id="evenslatitude"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label" htmlFor="name">
            Longitude
          </label>
          <div className="col-sm-10">
            <input
              name="evenslongitude"
              onChange={handleChange}
              value={values.evenslongitude}
              placeholder="โปรดระบุlongitude"
              className="form-control"
              type="text"
              id="evenslongitude"
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
                      เพิ่มรูปข่าวสาร{" "}
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
                เพิ่มข่าวสาร
              </p>
            </div>
            <div className="box-body" style={{ marginTop: 30 }}>
              <Formik
                initialValues={{ name: "", stock: 10, price: 100 }}
                onSubmit={async (values, { setSubmitting }) => {
                  let formData = new FormData();
                  formData.append("name", values.name);
                  formData.append("buildingevens", values.buildingevens);
                  formData.append("detailevens", values.detailevens);
                  formData.append("evenslatitude", values.evenslatitude);
                  formData.append("evenslongitude", values.evenslongitude);
                  formData.append("image", values.file);
                  await httpClient.post(server.EVENS_URL, formData);
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

export default EvensCreate;
