import React, { useState } from "react";
import { Card, CardActions, CardContent, Button } from "@mui/material";
import { Box } from "@mui/system";

export default function EmpHomepageList() {
  const MArkAsDone = () => {
    // setTaskList();
  };

  return (
    <>
      <Card
        className="p-3 mt-3"
        sx={{
          width: {
            md: "49%",
            xs: "100%",
          },
        }}
      >
        <CardContent>
          <div>Name : Dhameliya Darshan</div>
          <div>address : 241,samrat society,punagam,surat</div>
          <div>Mobile no : 9409321445</div>
          <div>Work : A/c reparing</div>
          <div>Time : 10 to 11</div>
          <div>Work Description : A/c reparing because some reason ...</div>
        </CardContent>
        <CardActions className="d-flex">
          <Box sx={{ flex: "1" }} />
          <Button variant="contained" onClick={() => MArkAsDone()}>
            Mark As Done
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
