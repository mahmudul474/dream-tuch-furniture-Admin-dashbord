import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { Input } from "antd";

let schema = yup.object().shape({
  name: yup.string().required("Category Name is Required"),
  icon: yup.string().required("Category icon is Required"),
  slug: yup.string().required("Category slug is Required"),
});

const initialValues = {
  name: "",
  slug: "",
  icon: "",
};

const Addcat = () => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: schema,
      onSubmit: (values) => {
        console.log(values);
      },
    });

  return (
    <div>
      <h3 className="mb-4  title">Category</h3>
      <div>
        <form action="" onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label
              for="name"
              style={{
                fontSize: "16px",
                textTransform: "capitalize",
                fontFamily: "bold",
              }}
            >
              Category Name
            </label>
            <Input
              type="name"
              label="Enter Product Category"
              id="name"
              name="name"
              placeholder="Example:  All Door"
              style={{ width: "100%", padding: "15px" }}
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
            />

            {errors.name && touched.name ? (
              <p className="error">{errors.name}</p>
            ) : null}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              for="icon"
              style={{
                fontSize: "16px",
                textTransform: "capitalize",
                fontFamily: "bold",
              }}
            >
              Icon link
            </label>
            <Input
              type="icon"
              label="Enter Category icon"
              id="icon"
              name="icon"
              style={{ width: "100%", padding: "15px" }}
              value={values.icon}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Example: https:icons8.com/icon"
            />
            {errors.icon && touched.icon ? (
              <p className="error">{errors.icon}</p>
            ) : null}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              for="slug"
              style={{
                fontSize: "16px",
                textTransform: "capitalize",
                fontFamily: "bold",
              }}
            >
              slug name
            </label>
            <Input
              type="slug"
              label="Enter Product slug"
              id="slug"
              name="slug"
              placeholder=" Example: service "
              style={{ width: "100%", padding: "15px" }}
              value={values.slug}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.slug && touched.slug ? (
              <p className="error">{errors.slug}</p>
            ) : null}
          </div>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add-Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcat;



 