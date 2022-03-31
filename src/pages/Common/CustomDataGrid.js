import React, { useState } from "react";
import {
  DataGrid,
  useGridApiContext,
  useGridState,
  GridToolbar,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import { Paper } from "@mui/material";

export default function CustomDataGrid(props) {
  const useDemoData = props.data;

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

  return (
    <Paper style={{ height: `${window.innerHeight - 120}px` }}>
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
        // sx={{
        //   background: "pallete.primary",
        // }}
        // className=""
        // checkboxSelection
        // disableMultipleSelection={true}
        // disableSelectionOnClick={true}
        // disableExtendRowFullWidth={true}
        // autoHeight
        componentsProps={{
          toolbar: { printOptions: { disableToolbarButton: true } },
        }}
        getRowId={(row) => row._id}
        components={{
          Toolbar: GridToolbar,
          Pagination: CustomPagination,
        }}
        columns={props.columns}
      />
    </Paper>
  );
}
