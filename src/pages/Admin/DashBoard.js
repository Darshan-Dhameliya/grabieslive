import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  DataGrid,
  useGridApiContext,
  useGridState,
  GridToolbar,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import CustomButton from "../../component/CustomButton";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { VscUnverified } from "react-icons/vsc";

export default function DashBoard() {
  const [useDemoData, setuseDemoData] = useState([]);

  function CustomPagination() {
    const apiRef = useGridApiContext();
    const [state] = useGridState(apiRef);

    return (
      <Pagination
        color="primary"
        count={state.pagination.pageCount}
        page={state.pagination.page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    );
  }

  const GetData = async () => {
    await axios
      .post("http://localhost:8000/admin/emplist")
      .then((result) => {
        setuseDemoData(result.data.Empdata);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <div
      style={{ height: `${window.innerHeight - 85}px` }}
      className="mt-3 container"
    >
      <DataGrid
        pageSize={10}
        rowsPerPageOptions={[10]}
        rows={useDemoData}
        loading={useDemoData.length === 0}
        onSelectionModelChange={(ids) => {
          // console.log;
          const selectedIDs = new Set(ids);
          const selectedRowData = useDemoData.filter((row) =>
            selectedIDs.has(row._id)
          );
          console.log(selectedRowData);
        }}
        // checkboxSelection
        // disableMultipleSelection={true}
        // disableSelectionOnClick={true}
        // disableExtendRowFullWidth={true}
        // autoHeight
        getRowId={(row) => row._id}
        columns={[
          {
            field: "empName",
            // width: "auto",
            headerName: "Name",
            headerAlign: "center",
            align: "center",
            flex: 1,
          },
          { field: "email", flex: 1, headerAlign: "center", align: "center" },
          {
            field: "isVerified",
            headerAlign: "center",
            width: 100,
            headerName: "Verified",
            align: "center",
            renderCell: ({ row }) =>
              row.isVerified ? (
                <MdOutlineVerifiedUser size={28} />
              ) : (
                <VscUnverified size={28} />
              ),
          },
          {
            field: "phone",
            flex: 1,
            headerAlign: "center",
            align: "center",
          },
          {
            field: "service_Area",
            flex: 1,
            headerAlign: "center",
            align: "center",
          },
          {
            field: "service_Spec",
            flex: 1,
            headerAlign: "center",
            align: "center",
          },
        ]}
        components={{
          Toolbar: GridToolbar,
          Pagination: CustomPagination,
        }}
      />
    </div>
  );
}
