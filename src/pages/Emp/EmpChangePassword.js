import React, { useState } from "react";
// import { makeStyles } from "@mui/material/styles";
import {
  TextField,
  Paper,
  Container,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { PassAuthSvg } from "../Common/SvgProvide";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useNavigate } from "react-router-dom";
import ErrorMesage from "../../component/ErrorMesage";
import { useTheme } from "@mui/styles";
import CustomButton from "../../component/CustomButton";
import { DisableAOS } from "../../provider/DisableAmination";
import { useEffect } from "react";

export default function PassAuth() {
  let Navigate = useNavigate();
  const theme = useTheme();

  const [showPass, setShowpass] = useState(false);
  const LoginData = (values) => {
    console.log(values);
  };

  const LoginSchema = Yup.object().shape({
    o_password: Yup.string().required("Required"),
    password: Yup.string()
      .required("Required")
      .matches(
        /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/,
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
    c_password: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  useEffect(() => {
    DisableAOS();
  }, []);

  return (
    <>
      <Container style={{ height: "calc(100% - 64px)" }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          className="h-100"
        >
          <Grid
            item
            lg={6}
            md={6}
            data-aos="fade-right"
            display={{ xs: "none", lg: "block", md: "block" }}
          >
            <div className="img-fluid">
              <PassAuthSvg color={theme.palette.primary.main} />
            </div>
          </Grid>
          <Grid item lg={6} sm={8} md={6} xs={12} data-aos="fade-left">
            <Paper className="p-5 shadow glassy-container">
              <h1 className="text-center">Change Password</h1>
              <Formik
                initialValues={{ o_password: "", password: "", c_password: "" }}
                onSubmit={LoginData}
                validationSchema={LoginSchema}
              >
                {({ errors, touched, handleChange }) => (
                  <Form autoComplete="off">
                    <div className="form-group mt-3 ">
                      <TextField
                        error={touched.o_password && errors.o_password}
                        label="Old Password"
                        placeholder="Enter your Old Password"
                        name="o_password"
                        variant="outlined"
                        type="text"
                        onChange={handleChange}
                        className="w-100"
                      />
                      {errors.o_password && touched.o_password ? (
                        <ErrorMesage>{errors.o_password}</ErrorMesage>
                      ) : null}
                    </div>
                    <div className="form-group mt-3 position-relative">
                      <TextField
                        error={touched.password && errors.password}
                        label="Password"
                        type={showPass ? "text" : "password"}
                        name="password"
                        variant="outlined"
                        className="w-100"
                        placeholder="Enter Your Password"
                        onChange={handleChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                // onMouseDown={() => setShowpass(true)}
                                // onMouseUp={() => setShowpass(false)}
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

                    <div className="form-group my-3 position-relative">
                      <TextField
                        error={touched.c_password && errors.c_password}
                        label="confirm password"
                        type={showPass ? "text" : "password"}
                        name="c_password"
                        variant="outlined"
                        className="w-100"
                        placeholder="Enter Your confirm password"
                        onChange={handleChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                // onMouseDown={() => setShowpass(true)}
                                // onMouseUp={() => setShowpass(false)}
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
                      {errors.c_password && touched.c_password ? (
                        <ErrorMesage>{errors.c_password}</ErrorMesage>
                      ) : null}
                    </div>

                    <div className="form-group text-center mt-3">
                      <CustomButton label="Change Password" />
                    </div>
                  </Form>
                )}
              </Formik>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}