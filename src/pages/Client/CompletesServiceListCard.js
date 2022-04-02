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
import axios from "axios";
import { toast } from "react-toastify";

export default function BookedServiceList({ itemData }) {
  const [showReviwModal, setshowReviwModal] = useState(false);
  const [showcomplaintModal, setshowcomplaintModal] = useState(false);

  const handleClose = () => {
    setshowReviwModal(false);
    setshowcomplaintModal(false);
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
      <ReviewModal
        handleClose={handleClose}
        open={showReviwModal}
        data={itemData}
      />
      <ComplaintModal
        handleClose={handleClose}
        data={itemData}
        open={showcomplaintModal}
      />
    </>
  );
}

const ReviewModal = ({ handleClose, open, data }) => {
  const [value, setValue] = useState(0);
  const [desc, setdesc] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const SubmitData = async () => {
    setisLoading(true);
    const obj = {
      desc,
      rating: value,
      date: new Date().toString(),
      appoId: data._id,
      empId: data.emp_appoint,
      userId: data.userid,
    };
    console.log(obj, data);
    await axios.post("http://localhost:8000/feedback/make", obj).then((res) => {
      if (res.data.status) {
        console.log(res.data.message);
        toast.success(res.data.message);
        setValue(0);
      } else {
        console.log(res.data.message);
      }
    });
    handleClose();
    setisLoading(false);
  };

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
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />

          <div className="form-group mt-3 ">
            <TextField
              label="Review"
              placeholder="Enter your Review"
              name="Review"
              multiline
              onChange={(e) => setdesc(e.target.value)}
              rows={3}
              className="w-100"
            />
          </div>
          <CustomButton
            label="submit"
            className="mt-2 w-100"
            onClick={SubmitData}
            isLoading={isLoading}
          />
        </Box>
      </Slide>
    </Modal>
  );
};

const ComplaintModal = ({ handleClose, data, open }) => {
  const [desc, setdesc] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const style = {
    width: 350,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const SubmitData = async () => {
    setisLoading(true);
    const obj = {
      desc,
      date: new Date().toString(),
      appoId: data._id,
      empId: data.emp_appoint,
      userId: data.userid,
    };
    await axios
      .post("http://localhost:8000/complaint/make", obj)
      .then((res) => {
        if (res.data.status) {
          console.log(res.data.message);
          toast.success(res.data.message);
          handleClose();
        } else {
          console.log(res.data.message);
        }
      });
    setisLoading(false);
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
              label="Complaint"
              placeholder="Enter your Complaint"
              name="Complaint"
              multiline
              onChange={(e) => setdesc(e.target.value)}
              rows={3}
              className="w-100"
            />
          </div>
          <CustomButton
            label="submit"
            className="mt-2 w-100"
            isLoading={isLoading}
            onClick={() => SubmitData()}
          />
        </Box>
      </Slide>
    </Modal>
  );
};
