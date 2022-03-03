import React, { useState, useEffect } from "react";
import {
  TextField,
  Paper,
  Container,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { SignUpsvg } from "./SvgProvide";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useNavigate } from "react-router-dom";
import ErrorMesage from "../../component/ErrorMesage";
import { useTheme } from "@mui/styles";
import NavLink from "../../component/NavLink";
import CustomButton from "../../component/CustomButton";
import { DisableAOS } from "../../provider/DisableAmination";
import axios from "axios";
import { toast } from "react-toastify";

export default function SignUp() {
  let Navigate = useNavigate();
  const theme = useTheme();
  const [isLoading, setisLoading] = useState(false);
  const [showPass, setShowpass] = useState(false);
  const SignUpData = async (values, { resetForm }) => {
    setisLoading(true);

    await axios
      .post("http://localhost:8000/signup", {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message);
          Navigate("/client/homepage");
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

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
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
          <Grid item lg={6} sm={8} md={6} xs={12} data-aos="fade-right">
            <Paper className="p-5 shadow glassy-container">
              <h1 className="text-center">SignUp</h1>
              <Formik
                enableReinitialize
                initialValues={{ email: "", password: "", c_password: "" }}
                onSubmit={SignUpData}
                validationSchema={SignupSchema}
              >
                {({ errors, touched, handleChange, values }) => (
                  <Form autoComplete="off">
                    <div className="form-group mt-3 ">
                      <TextField
                        error={touched.email && errors.email}
                        id="email"
                        label="Email"
                        name="email"
                        value={values.email}
                        variant="outlined"
                        placeholder="Enter your email"
                        type="text"
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
                        value={values.c_password}
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
                    <NavLink
                      onClick={() => Navigate("/forgetpassword")}
                      title="Forget password ?"
                    />

                    <div className="form-group text-center mt-3">
                      <CustomButton label="Sign Up" isLoading={isLoading} />
                    </div>
                  </Form>
                )}
              </Formik>
              <div className="text-center mt-2">
                Alredy have account ? &nbsp;
                <NavLink onClick={() => Navigate("/login")} title="Login" />
              </div>
            </Paper>
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            data-aos="fade-left"
            isEmpty
            display={{ xs: "none", lg: "block", md: "block" }}
          >
            <div className="img-fluid">
              <SignUpsvg color={theme.palette.primary.main} />
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
