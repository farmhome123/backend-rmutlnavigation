import React, { Component } from "react";
import "./classEdit.css"; // Tell Webpack that Button.js uses these styles
import { imageUrl } from "./../../constants";
import { Formik } from "formik";
import { httpClient } from "./../../utils/HttpClient";
import { server } from "./../../constants";
import { getClassById } from "./../../actions/class.action";
import { connect } from "react-redux";

class ClassEdit extends Component {
  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.getClassById(id);
    // alert(id)
  }

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
            buildingid
        </label>
          <div className="col-sm-10">
            <input
              name="buildingid"
              onChange={handleChange}
              value={values.buildingid = this.props.match.params.id}

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
            disabled={isSubmitting}
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
      return <img src={values.file_obj} style={{ height: 100 }} />;
    } else if (values.image) {
      return (
        <img
          src={`${imageUrl}/images/${values.image}`}
          style={{ height: 100 }}
        />
      );
    }
  };

  render() {
    const { result } = this.props.classReducer;
    return (
      <div className="content-wrapper">
        {/* Main content */}
        <section className="content" style={{ maxWidth: "80%" }}>
          <div className="box box-primary" style={{ marginTop: 70 }}>
            <div className="box-header with-border">
              <p className="box-title" style={{ fontSize: 30 }}>
                แก้ไขอาคาร
              </p>
            </div>
            <div className="box-body" style={{ marginTop: 30 }}>
              <Formik
                enableReinitialize
                initialValues={result ? result : {}}
                onSubmit={async (values, { setSubmitting }) => {
                  let formData = new FormData();
                  formData.append("id", values.id);
                  formData.append("name", values.name);
                  formData.append("detailclass", values.detailclass);
                  formData.append("floot", values.floot);
                  formData.append("building", values.building);

                  if (values.file) {
                    formData.append("image", values.file);
                  }
                  await httpClient.put(server.CLASS_URL, formData);
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

const mapStateToProps = ({ classReducer }) => ({ classReducer });

const mapDispatchToProps = {
  getClassById,
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassEdit);
