import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../provider/UserContext";
import CustomDataGrid from "../Common/CustomDataGrid";

export default function CompletedSerice() {
  const [useDemoData, setuseDemoData] = useState([]);
  const {
    AuthState: { userData },
  } = useContext(UserContext);

  const GetData = async () => {
    const id = userData._id;
    console.log(userData._id);
    await axios
      .post("http://localhost:8000/emp/completeAppo", { id })
      .then((result) => {
        setuseDemoData(result.data.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <div className="mt-3 container">
      <CustomDataGrid
        columns={[
          {
            field: "username",
            headerName: "Name",
            headerAlign: "center",
            align: "center",
            // flex: 1,
            width: 200,
          },
          {
            field: "sub_spec",
            width: 400,
            headerAlign: "center",
            align: "center",
          },
          {
            field: "date",
            width: 100,
            headerName: "Date",
            headerAlign: "center",
            align: "center",
          },
          {
            field: "time",
            headerAlign: "center",
            width: 100,
            headerName: "Time",
            align: "center",
          },
          {
            field: "charge",
            width: 100,
            headerAlign: "center",
            align: "center",
          },
        ]}
        data={useDemoData}
      />
    </div>
  );
}
