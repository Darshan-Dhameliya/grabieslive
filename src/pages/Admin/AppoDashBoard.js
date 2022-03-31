import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import CustomDataGrid from "../Common/CustomDataGrid";

export default function EmpDashBoard() {
  const [useDemoData, setuseDemoData] = useState([]);
  const parmas = useLocation();
  const Navigate = useNavigate();

  const GetData = async () => {
    if (parmas.state) {
      await axios
        .post(`https://grabieslive.herokuapp.com/admin/${parmas.state}`)
        .then((result) => {
          setuseDemoData(result.data.data);
        })
        .catch((err) => {});
    } else {
      Navigate("/admin/homepage");
    }
  };

  useEffect(() => {
    GetData();
  }, [parmas.state]);

  return (
    <CustomDataGrid
      data={useDemoData}
      columns={[
        {
          field: "username",
          headerName: "Name",
          headerAlign: "center",
          align: "center",
          width: 180,
        },
        {
          field: "useremail",
          headerName: "email",
          headerAlign: "center",
          align: "center",
          width: 180,
        },
        {
          field: "userphone",
          width: 180,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "userAddress",
          width: 180,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "date",
          width: 180,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "time",
          width: 180,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "service",
          width: 180,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "sub_spec",
          width: 400,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "area",
          width: 180,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "charge",
          width: 180,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "isCompleted",
          headerAlign: "center",
          width: 100,
          headerName: "Completed",
          align: "center",
          renderCell: ({ row }) =>
            row.isCompleted ? (
              <IoMdCheckmarkCircleOutline size={28} />
            ) : (
              // <VscUnverified size={28} />
              <div style={{ fontSize: 28 }}>x</div>
            ),
        },
      ]}
    />
  );
}
