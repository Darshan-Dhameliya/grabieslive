import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../provider/UserContext";

export default function AdminHomepage({ allData, setAllData, setactiveIndex }) {
  const Navigate = useNavigate();
  const {
    AuthState: { userData },
  } = useContext(UserContext);

  const [localAlldata, setlocalAlldata] = useState(
    allData.slice(1, allData.length - 2)
  );

  const GetCountData = async () => {
    await axios.get("http://localhost:8000/admin/totalcount").then((res) => {
      const countdata = res.data;

      localAlldata[0].totalcount = countdata.ToatalEmp;
      localAlldata[1].totalcount = countdata.ToatalVerifiedEmp;
      localAlldata[2].totalcount = countdata.ToatalUnVerifiedEmp;
      localAlldata[3].totalcount = countdata.ToatalAppoiment;
      localAlldata[4].totalcount = countdata.ToatalCompletedAppoiment;
      localAlldata[5].totalcount = countdata.ToatalUnCompletedAppoiment;
      localAlldata[6].totalcount = countdata.TotalUser;

      setlocalAlldata([...localAlldata]);
    });
  };

  useEffect(() => {
    GetCountData();
  }, []);

  return (
    <div>
      <Typography variant="h5" color="text.primary" gutterBottom>
        Hey, {userData?.name}
      </Typography>

      <div className="row card-wraper d-flex flex-wrap">
        {localAlldata.map((item, index) => (
          <div className="col-md-6 col-lg-3 p-2">
            <Card className="h-100">
              <CardContent>
                <Typography
                  variant="h4"
                  className="text-center"
                  color="text.primary"
                  gutterBottom
                >
                  {item.totalcount}
                  <br />
                </Typography>

                <Typography
                  variant="h6"
                  className="text-center"
                  color="text.primary"
                  gutterBottom
                >
                  {item.title}
                </Typography>
              </CardContent>
              <CardActions className="text-center w-100">
                <Button
                  variant="contained"
                  className="m-auto"
                  size="small"
                  onClick={() => {
                    setactiveIndex(index + 1);
                    Navigate(`/admin/${item.navigate}`, {
                      state: item.apiRoute,
                    });
                  }}
                >
                  View
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
