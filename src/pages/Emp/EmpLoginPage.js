import React, { useState, useEffect, useContext } from "react";
// import { makeStyles } from "@mui/material/styles";
import {
  TextField,
  Paper,
  Container,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { EmpLoginSvg } from "../Common/SvgProvide";
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
import { toast } from "react-toastify";
import { UserContext } from "../../provider/UserContext";
import axios from "axios";

export default function EmpLoginPage() {
  const { AuthDispatch } = useContext(UserContext);

  let Navigate = useNavigate();
  const theme = useTheme();
  const [isLoading, setisLoading] = useState(false);
  const [showPass, setShowpass] = useState(false);
  const LoginData = async (values, { resetForm }) => {
    setisLoading(true);
    await axios
      .post("https://grabieslive.herokuapp.com/emp/login", {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        if (res.data.status) {
          AuthDispatch({
            type: "isLoggedIn",
            userType: "emp",
            userData: res.data.Data,
          });
          toast.success(res.data.message);
          Navigate("/emp/homepage");
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
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(2, "Too Short!")
      .max(16, "Too Long!")
      .required("Required"),
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
              <h1 className="text-center">Emp Sign In</h1>
              <Paper color="primary"></Paper>
              <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={LoginData}
                validationSchema={LoginSchema}
              >
                {({ errors, touched, handleChange }) => (
                  <Form autoComplete="off">
                    <div className="form-group mt-3 ">
                      <TextField
                        error={touched.email && errors.email}
                        id="email"
                        label="Email"
                        name="email"
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
                    <div className="form-group my-4 position-relative">
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
                    <NavLink
                      onClick={() => Navigate("/emp/forgetpassword")}
                      title="Forget password ?"
                    />

                    <div className="form-group text-center mt-3">
                      <CustomButton label="Login" isLoading={isLoading} />
                    </div>
                  </Form>
                )}
              </Formik>
              <div className="text-center mt-2">
                Don't have account ? &nbsp;
                <NavLink
                  title="Sign up"
                  onClick={() => Navigate("/emp/register")}
                />
              </div>
            </Paper>
          </Grid>

          <Grid
            item
            lg={6}
            md={6}
            data-aos="fade-left"
            display={{ xs: "none", lg: "block", md: "block" }}
          >
            <div className="img-fluid">
              <EmpLoginSvg color={theme.palette.primary.main} />
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
