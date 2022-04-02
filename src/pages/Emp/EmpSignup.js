import React, { useState, useEffect } from "react";
// import { makeStyles } from "@mui/material/styles";
import {
  TextField,
  Paper,
  Container,
  Grid,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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
import NavLink from "../../component/NavLink";
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
    const empObj = {
      name: values.Name,
      email: values.email,
      phone: values.Number,
      area: values.Area,
      spec: values.profession,
      password: values.password,
    };
    await axios
      .post("http://localhost:8000/emp/register", empObj)
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
    profession: Yup.string().required("Required"),
    Area: Yup.string().required("Required"),
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
    c_password: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
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
        <Paper className="p-4 shadow glassy-container">
          <h1 className="text-center" data-aos="fade">
            Register
          </h1>
          <Formik
            initialValues={{
              Name: "",
              Number: "",
              profession: "",
              email: "",
              password: "",
              c_password: "",
              Area: "",
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
                  <Grid item lg={5} sm={8} md={5} xs={12} data-aos="fade-right">
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
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Choose profession
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="profession"
                          error={touched.profession && errors.profession}
                          // value={"profession"}
                          value={values.profession}
                          label="Choose profession"
                          onChange={handleChange}
                        >
                          <MenuItem value="Electrician">Electrician</MenuItem>
                          <MenuItem value="Plumber">Plumber</MenuItem>
                          <MenuItem value="Ro service & repair">
                            Ro service & repair
                          </MenuItem>
                          <MenuItem value="Ac service & repair">
                            Ac service & repair
                          </MenuItem>
                          <MenuItem value="Carpenter">Carpenter</MenuItem>
                        </Select>
                      </FormControl>
                      {errors.profession && touched.profession ? (
                        <ErrorMesage>{errors.profession}</ErrorMesage>
                      ) : null}
                    </div>
                    <div className="form-group mt-3 ">
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Choose Area
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="Area"
                          error={touched.Area && errors.Area}
                          // value={"Area"}
                          label="Choose Area"
                          value={values.Area}
                          onChange={handleChange}
                        >
                          {areaMenuItem.map((item, index) => (
                            <MenuItem value={item} key={index}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {errors.Area && touched.Area ? (
                        <ErrorMesage>{errors.Area}</ErrorMesage>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item lg={5} sm={8} md={5} xs={12} data-aos="fade-left">
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
                        value={values.c_password}
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
                  </Grid>
                </Grid>
                <div
                  className="form-group text-center mt-3 w-100"
                  data-aos="fade"
                >
                  <CustomButton label="Register" isLoading={isLoading} />
                </div>
              </Form>
            )}
          </Formik>
          <div className="text-center mt-2" data-aos="fade">
            Alredy have account ? &nbsp;
            <NavLink onClick={() => Navigate("/emp/login")} title="Login" />
          </div>
        </Paper>
      </Container>
    </Box>
  );
}
