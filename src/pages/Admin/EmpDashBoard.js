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
        .post(`http://localhost:8000/admin/${parmas.state}`)
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
          field: "_id",
          headerName: "empid",
          headerAlign: "center",
          align: "center",
          width: 220,
          hide: true,
        },
        {
          field: "empName",
          headerName: "Name",
          headerAlign: "center",
          align: "center",
          width: 180,
        },
        {
          field: "email",
          width: 180,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "isVerified",
          headerAlign: "center",
          width: 100,
          headerName: "Verified",
          align: "center",
          renderCell: ({ row }) =>
            row.isVerified ? (
              <IoMdCheckmarkCircleOutline size={28} />
            ) : (
              <div style={{ fontSize: 28 }}>x</div>
            ),
        },
        {
          field: "phone",
          width: 180,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "service_Area",
          width: 180,
          headerAlign: "center",
          align: "center",
        },
        {
          field: "service_Spec",
          width: 180,
          headerAlign: "center",
          align: "center",
        },
      ]}
    />
  );
}
