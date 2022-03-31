import React, { useState } from "react";
import {
  Card,
  CardActions,
  Button,
  TableRow,
  Table,
  TableCell,
  Modal,
  Typography,
  Rating,
  TextField,
  Box,
  Slide,
} from "@mui/material";
import CustomButton from "../../component/CustomButton";

export default function BookedServiceList({ itemData }) {
  const [showReviwModal, setshowReviwModal] = useState(false);
  const [showcomplaintModal, setshowcomplaintModal] = useState(false);

  const handleClose = () => {
    setshowReviwModal(false);
    setshowcomplaintModal(false);
  };

  const MArkAsDone = () => {
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
          padding: 1,
        }}
      >
        <Table>
          <TableRow>
            <TableCell className="py-1" style={{ fontSize: 15 }}>
              Date
            </TableCell>
            <TableCell className="py-1" style={{ fontSize: 15 }}>
              {itemData.date}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="py-1" style={{ fontSize: 15 }}>
              Time
            </TableCell>
            <TableCell className="py-1" style={{ fontSize: 15 }}>
              {itemData.time}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="py-1" style={{ fontSize: 15 }}>
              Work
            </TableCell>
            <TableCell className="py-1" style={{ fontSize: 15 }}>
              {itemData.sub_spec}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="py-1" style={{ fontSize: 15 }}>
              Charge
            </TableCell>
            <TableCell className="py-1" style={{ fontSize: 15 }}>
              ₹{itemData.charge}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="py-1" style={{ fontSize: 15 }}>
              Name
            </TableCell>
            <TableCell className="py-1" style={{ fontSize: 15 }}>
              {itemData.username}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="py-1" style={{ fontSize: 15 }}>
              Address
            </TableCell>
            <TableCell className="py-1" style={{ fontSize: 15 }}>
              {itemData.userAddress}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="py-1" style={{ fontSize: 15 }}>
              Status
            </TableCell>
            <TableCell
              className="py-1"
              style={{ fontSize: 15, fontWeight: 900 }}
            >
              {itemData.isCompleted ? "Done" : "inProgress"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="py-1" style={{ fontSize: 15 }}>
              Mobile no
            </TableCell>
            <TableCell className="py-1" style={{ fontSize: 15 }}>
              {itemData.userphone}
            </TableCell>
          </TableRow>
        </Table>

        <CardActions className="justify-content-between">
          <Button
            className="border-1 w-100"
            variant="outlined"
            color="primary"
            onClick={() => setshowReviwModal(true)}
          >
            Add Feedback
          </Button>
          <Button
            className="border-1 w-100"
            variant="outlined"
            color="error"
            onClick={() => setshowcomplaintModal(true)}
          >
            Make complaint
          </Button>
        </CardActions>
      </Card>
      <ReviewModal handleClose={handleClose} open={showReviwModal} />
      <ComplaintModal handleClose={handleClose} open={showcomplaintModal} />
    </>
  );
}

const ReviewModal = ({ handleClose, open }) => {
  const [value, setValue] = React.useState(0);

  const style = {
    width: 350,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

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
          <Rating
            name="simple-controlled"
            value={value}
            // size={34}
            // style={{ justifyContent: "center" }}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />

          <div className="form-group mt-3 ">
            <TextField
              // error={touched.Address && errors.Address}
              label="Review"
              placeholder="Enter your Review"
              name="Review"
              // value={values.Address}
              multiline
              // onChange={handleChange}
              rows={3}
              className="w-100"
            />
          </div>
          <CustomButton label="submit" className="mt-2 w-100" />
        </Box>
      </Slide>
    </Modal>
  );
};

const ComplaintModal = ({ handleClose, open }) => {
  const style = {
    width: 350,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      className="d-flex justify-content-center align-items-center"
      aria-describedby="modal-modal-description"
    >
      <Slide direction="up" in={open}>
        <Box sx={style} data-aos="slide-up">
          <div className="form-group mt-3 ">
            <TextField
              // error={touched.Address && errors.Address}
              label="Complaint"
              placeholder="Enter your Complaint"
              name="Complaint"
              // value={values.Address}
              multiline
              // onChange={handleChange}
              rows={3}
              className="w-100"
            />
          </div>
          <CustomButton label="submit" className="mt-2 w-100" />
        </Box>
      </Slide>
    </Modal>
  );
};
