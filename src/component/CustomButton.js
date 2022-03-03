import { Button, CircularProgress } from "@mui/material";

export default function CustomButton(props) {
  return (
    <>
      <Button
        variant="contained"
        color={props.color || "primary"}
        type="submit"
        onClick={props.onClick}
        disabled={props.isLoading}
        // style={{ border: "2px solid" }}
        className={`rounded-pill px-5 ${props.className}`}
      >
        {props.isLoading ? <CircularProgress size={24} /> : props.label}
      </Button>
    </>
  );
}
