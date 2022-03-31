import React, { useEffect, useContext } from "react";
import {
  Button,
  TextField,
  Paper,
  Grid,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ErrorMesage from "../../../component/ErrorMesage";
import { DisableAOS } from "../../../provider/DisableAmination";
import { UserContext } from "../../../provider/UserContext";

const serviceProviceLandmark = [
  "Punagam",
  "Katargam",
  "Kapodara",
  "Yogi Chowk",
  "Sarthana",
];

export default function PersonInfo({ handleNext, setappoimentData }) {
  const {
    AuthDispatch,
    AuthState: { appoiMentdata },
  } = useContext(UserContext);

  const LoginData = (values) => {
    AuthDispatch({ type: "setAppoData", item: values });
    handleNext();
    setappoimentData(values);
  };

  const LoginSchema = Yup.object().shape({
    Name: Yup.string().required("Required"),
    Number: Yup.string()
      .required("Required")
      .matches(/^[0-9].{9}$/, "Number is not valid"),
    Address: Yup.string()
      .required("Required")
      .matches(/^[a-zA-Z0-9\s,'-]*$/, "Address is not valid"),
    landmark: Yup.string().required("Required"),
  });

  useEffect(() => {
    DisableAOS();
  }, []);

  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item lg={6} sm={10} xs={12}>
          <Paper className="shadow glassy-container" sx={{ padding: "20px" }}>
            <Formik
              initialValues={{
                Name: appoiMentdata.Name || "",
                Number: appoiMentdata.Number || "",
                Address: appoiMentdata.Address || "",
                landmark: appoiMentdata.landmark || "",
              }}
              onSubmit={LoginData}
              validationSchema={LoginSchema}
            >
              {({ errors, touched, handleChange, values }) => (
                <Form autoComplete="off">
                  <div className="form-group mt-3 ">
                    <TextField
                      error={touched.Name && errors.Name}
                      id="Name"
                      label="Name"
                      name="Name"
                      variant="outlined"
                      placeholder="Enter your Name"
                      type="text"
                      value={values.Name}
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
                      variant="outlined"
                      placeholder="Enter your Number"
                      type="number"
                      value={values.Number}
                      onChange={handleChange}
                      className="w-100"
                    />
                    {errors.Number && touched.Number ? (
                      <ErrorMesage>{errors.Number}</ErrorMesage>
                    ) : null}
                  </div>
                  <div className="form-group mt-3 ">
                    <TextField
                      error={touched.Address && errors.Address}
                      id="Address"
                      label="Address"
                      placeholder="Enter your Address"
                      name="Address"
                      value={values.Address}
                      multiline
                      onChange={handleChange}
                      rows={3}
                      className="w-100"
                    />
                    {errors.Address && touched.Address ? (
                      <ErrorMesage>{errors.Address}</ErrorMesage>
                    ) : null}
                  </div>
                  <div className="form-group mt-3 ">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Choose Landmark
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="landmark"
                        error={touched.landmark && errors.landmark}
                        // value={"landmark"}
                        label="Choose landmark"
                        onChange={handleChange}
                        value={values.landmark}
                      >
                        {serviceProviceLandmark.map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {errors.landmark && touched.landmark ? (
                      <ErrorMesage>{errors.landmark}</ErrorMesage>
                    ) : null}
                  </div>
                  <div className="form-group text-center mt-3">
                    <Button
                      variant="outlined"
                      color="primary"
                      type="submit"
                      style={{ border: "2px solid" }}
                      className="rounded-pill px-5"
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
