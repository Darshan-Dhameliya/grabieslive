import React, { useState, useEffect } from "react";
import { TextField, Paper, Container, Grid } from "@mui/material";
import { ForgetPassSvg } from "../Common/SvgProvide";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import ErrorMesage from "../../component/ErrorMesage";
import PassAuth from "./EmpPassAuth";
import { useTheme } from "@mui/styles";
import NavLink from "../../component/NavLink";
import CustomButton from "../../component/CustomButton";
import { DisableAOS } from "../../provider/DisableAmination";
import { toast } from "react-toastify";
import axios from "axios";

export default function EmpForgetPass() {
  let Navigate = useNavigate();
  const theme = useTheme();
  const [isLoading, setisLoading] = useState(false);

  const [showNext, setshowNext] = useState(true);
  const [EmailValue, setEmailValue] = useState("");
  const ForgetPassData = async (values, { resetForm }) => {
    setisLoading(true);

    await axios
      .post("http://localhost:8000/emp/forgetpass", {
        email: values.email,
      })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message);
          setEmailValue(values.email);
          setshowNext(false);
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

  const ForgetSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });

  useEffect(() => {
    DisableAOS();
  }, []);

  return (
    <>
      {showNext ? (
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
                <ForgetPassSvg color={theme.palette.primary.main} />
              </div>
            </Grid>
            <Grid item lg={6} sm={8} md={6} xs={12} data-aos="fade-left">
              <Paper className="p-5 shadow glassy-container">
                <h1 className="text-center">Forget Password</h1>
                <Formik
                  initialValues={{ email: "" }}
                  onSubmit={ForgetPassData}
                  validationSchema={ForgetSchema}
                >
                  {({ errors, touched, handleChange, values }) => (
                    <Form autoComplete="off">
                      <div className="form-group my-4 ">
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
                      <div className="form-group text-center mt-3">
                        <CustomButton label="Send Otp" isLoading={isLoading} />
                      </div>
                    </Form>
                  )}
                </Formik>
                <div className="text-center mt-2">
                  Alredy have account ? &nbsp;
                  <NavLink
                    onClick={() => Navigate("/emp/login")}
                    title="Login"
                  />
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <PassAuth email={EmailValue} />
      )}
    </>
  );
}
