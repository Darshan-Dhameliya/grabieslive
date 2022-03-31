import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TableRow,
  Table,
  TableCell,
  TextField,
  Modal,
  Slide,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ErrorMesage from "../../component/ErrorMesage";
import { Box } from "@mui/system";
import CustomButton from "../../component/CustomButton";

export default function EmpHomepageList({ itemData }) {
  const [showOtpModal, setshowOtpModal] = useState(false);

  const handleClose = () => {
    setshowOtpModal(false);
  };

  const MArkAsDone = () => {
    setshowOtpModal(true);

    // setTaskList();
  };

  return (
    <>
      <Card
        className="mt-3"
        sx={{
          width: {
            md: "49%",
            xs: "100%",
          },
          height: "fit-content",
        }}
      >
        <CardContent>
          <Table>
            <TableRow>
              <TableCell style={{ fontSize: 15 }}>Name</TableCell>
              <TableCell style={{ fontSize: 15 }}>
                {itemData.username}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontSize: 15 }}>Address</TableCell>
              <TableCell style={{ fontSize: 15 }}>
                {itemData.userAddress}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontSize: 15 }}>Mobile no</TableCell>
              <TableCell style={{ fontSize: 15 }}>
                {itemData.userphone}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontSize: 15 }}>Area</TableCell>
              <TableCell style={{ fontSize: 15 }}>{itemData.area}</TableCell>
            </TableRow>
            <TableRow className="border-top">
              <TableCell style={{ fontSize: 15 }}>Date</TableCell>
              <TableCell style={{ fontSize: 15 }}>{itemData.date}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontSize: 15 }}>Time</TableCell>
              <TableCell style={{ fontSize: 15 }}>{itemData.time}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontSize: 15 }}>Work</TableCell>
              <TableCell style={{ fontSize: 15 }}>
                {itemData.sub_spec}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontSize: 15 }}>Charge</TableCell>
              <TableCell style={{ fontSize: 15 }}>₹{itemData.charge}</TableCell>
            </TableRow>
          </Table>
        </CardContent>
        <CardActions className="text-center">
          {/* <Box sx={{ flex: "1" }} /> */}
          <Button
            variant="contained"
            className="w-100"
            onClick={() => MArkAsDone()}
          >
            Mark As Done
          </Button>
        </CardActions>
      </Card>
      <OtpModal open={showOtpModal} handleClose={handleClose} />
    </>
  );
}

const OtpModal = ({ handleClose, open }) => {
  const [isLoading, setisLoading] = useState(false);

  const style = {
    width: 350,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const LoginData = async (values, { resetForm }) => {
    setisLoading(true);
    const data = {
      c_otp: values.otp,
    };

    setisLoading(false);
  };

  const LoginSchema = Yup.object().shape({
    otp: Yup.string()
      .required("Required")
      .matches(/^[0-9].{3}$/, "Otp is not valid"),
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="d-flex justify-content-center align-items-center"
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Slide direction="up" in={open}>
        <Box sx={style}>
          <Formik
            initialValues={{
              otp: "",
            }}
            onSubmit={LoginData}
            validationSchema={LoginSchema}
          >
            {({ errors, touched, handleChange, values }) => (
              <Form autoComplete="off">
                <div className="form-group mt-3 ">
                  <TextField
                    error={touched.otp && errors.otp}
                    id="otp"
                    label="Otp"
                    name="otp"
                    variant="outlined"
                    placeholder="Enter your Otp"
                    type="text"
                    value={values.otp}
                    onChange={handleChange}
                    className="w-100"
                  />
                  {errors.otp && touched.otp ? (
                    <ErrorMesage>{errors.otp}</ErrorMesage>
                  ) : null}
                </div>
                <div className="form-group text-center mt-3">
                  <CustomButton label="Submit" isLoading={isLoading} />
                </div>
              </Form>
            )}
          </Formik>
        </Box>
      </Slide>
    </Modal>
  );
};
