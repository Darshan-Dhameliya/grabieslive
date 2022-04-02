import React, { useState, useEffect } from "react";
// import { makeStyles } from "@mui/material/styles";
import {
  TextField,
  Paper,
  Container,
  Grid,
  InputAdornment,
  Box,
  IconButton,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ErrorMesage from "../../component/ErrorMesage";
import CustomButton from "../../component/CustomButton";
import { DisableAOS } from "../../provider/DisableAmination";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const areaMenuItem = [
  "Punagam",
  "Katargam",
  "Kapodara",
  "Yogi Chowk",
  "Sarthana",
];

export default function EmpSignup() {
  const Navigate = useNavigate();
  const [showPass, setShowpass] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const EmpSignUpData = async (values, { resetForm }) => {
    setisLoading(true);
    const Obj = {
      name: values.Name,
      email: values.email,
      number: values.Number,
      password: values.password,
    };
    await axios
      .post("http://localhost:8000/admin/register", Obj)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message);
          // Navigate("/client/homepage");
          resetForm();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
    setisLoading(false);
  };

  const LoginSchema = Yup.object().shape({
    Name: Yup.string()
      .required("Required")
      .matches(/^[A-Za-z\s]+$/, "Enter Valid Name"),
    Number: Yup.string()
      .required("Required")
      .matches(/^[0-9]+.{9}$/, "Enter Valid Number"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("Required")
      .matches(
        /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/,
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
  });

  useEffect(() => {
    DisableAOS();
  }, []);

  return (
    <Box
      className="d-flex justify-content-center align-items-center  "
      sx={{
        height: {
          sm: "calc(100% - 64px)",
        },
      }}
    >
      <Container>
        {/* <Paper className="p-4 shadow glassy-container"> */}
        <Formik
          initialValues={{
            Name: "",
            Number: "",
            email: "",
            password: "",
          }}
          onSubmit={EmpSignUpData}
          validationSchema={LoginSchema}
        >
          {({ errors, values, touched, setFieldValue, handleChange }) => (
            <Form autoComplete="off">
              <Grid
                container
                className="h-100"
                style={{ justifyContent: "space-around" }}
              >
                <Grid item lg={6} sm={11} md={7} xs={12}>
                  <Paper className="shadow glassy-container p-4">
                    <div className="form-group mt-3 ">
                      <TextField
                        error={touched.Name && errors.Name}
                        id="Name"
                        label="Name"
                        name="Name"
                        variant="outlined"
                        value={values.Name}
                        placeholder="Enter your Name"
                        type="text"
                        onChange={handleChange}
                        className="w-100"
                      />
                      {errors.Name && touched.Name ? (
                        <ErrorMesage>{errors.Name}</ErrorMesage>
                      ) : null}
                    </div>
                    <div className="form-group mt-3 ">
                      <TextField
                        error={touched.Number && errors.Number}
                        id="Number"
                        label="Number"
                        name="Number"
                        value={values.Number}
                        variant="outlined"
                        placeholder="Enter your Number"
                        type="text"
                        onChange={handleChange}
                        className="w-100"
                      />
                      {errors.Number && touched.Number ? (
                        <ErrorMesage>{errors.Number}</ErrorMesage>
                      ) : null}
                    </div>

                    <div className="form-group mt-3 ">
                      <TextField
                        error={touched.email && errors.email}
                        id="email"
                        label="Email"
                        name="email"
                        variant="outlined"
                        placeholder="Enter your email"
                        type="text"
                        value={values.email}
                        onChange={handleChange}
                        className="w-100"
                      />
                      {errors.email && touched.email ? (
                        <ErrorMesage>{errors.email}</ErrorMesage>
                      ) : null}
                    </div>
                    <div className="form-group mt-3 position-relative">
                      <TextField
                        error={touched.password && errors.password}
                        label="Password"
                        type={showPass ? "text" : "password"}
                        name="password"
                        value={values.password}
                        variant="outlined"
                        className="w-100"
                        placeholder="Enter Your Password"
                        onChange={handleChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowpass(!showPass)}
                              >
                                {showPass ? (
                                  <VisibilityOutlinedIcon />
                                ) : (
                                  <VisibilityOffOutlinedIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      {errors.password && touched.password ? (
                        <ErrorMesage>{errors.password}</ErrorMesage>
                      ) : null}
                    </div>
                    <div
                      className="form-group text-center mt-3 w-100"
                      data-aos="fade"
                    >
                      <CustomButton label="Add" isLoading={isLoading} />
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Container>
    </Box>
  );
}
