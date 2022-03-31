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
  RadioGroup,
  FormControlLabel,
  Radio,
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

        <CardActions>
          <Button
            className="border-1 w-100"
            variant="outlined"
            color="error"
            onClick={() => setshowcomplaintModal(true)}
          >
            Cancel
          </Button>
        </CardActions>
      </Card>
      <ComplaintModal handleClose={handleClose} open={showcomplaintModal} />
    </>
  );
}

const ComplaintModal = ({ handleClose, open }) => {
  const [ShowTextArea, setShowTextArea] = useState(false);
  const [cancelReason, setcancelReason] = useState("");

  const style = {
    width: 350,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const cancelReasonList = ["Not sastisfied", "Not interesed"];

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
          <RadioGroup
            aria-label="gender"
            defaultValue="female"
            name="radio-buttons-group"
          >
            {cancelReasonList.map((item) => (
              <FormControlLabel
                value={item}
                control={<Radio />}
                label={item}
                onClick={() => {
                  setcancelReason(item);
                  setShowTextArea(false);
                }}
              />
            ))}
            <FormControlLabel
              value="other"
              control={<Radio />}
              label="Other"
              onClick={() => setShowTextArea(true)}
            />
          </RadioGroup>
          {ShowTextArea && (
            <div className="form-group mt-3 ">
              <TextField
                // error={touched.Address && errors.Address}
                label="Reason"
                placeholder="Enter your Reason"
                name="Complaint"
                // value={values.Address}
                multiline
                onChange={(e) => setcancelReason(e.target.value)}
                rows={3}
                className="w-100"
              />
            </div>
          )}
          <CustomButton
            label="submit"
            color="error"
            className="mt-2 w-100"
            onClick={() => console.log(cancelReason)}
          />
        </Box>
      </Slide>
    </Modal>
  );
};
