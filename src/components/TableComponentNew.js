import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

const TableComponentNew = ({
  fetchData, // Function to fetch data from backend
  showAddItemButton,
  handleAddAction,
  addButtonText,
  handleEditAction,
  handleDeleteAction,
}) => {
  const [data, setData] = useState([]); // Current page data
  const [totalRows, setTotalRows] = useState(0); // Total rows count from backend
  const [loading, setLoading] = useState(false); // Loading state
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page

  // Fetch data from backend
  const loadData = async (page, size) => {
    setLoading(true);
    try {
      const response = await fetchData(page, size); // API call
      setData(response.data); // Table data
      setTotalRows(response.totalRows); // Total rows
      console.log(data);
      console.log(totalRows);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(currentPage, rowsPerPage);
  }, [currentPage, rowsPerPage]);

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newRowsPerPage, page) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(page);
    loadData(page, newRowsPerPage);
  };

  // Columns for DataTable
  const columns = [
    {
      name: "Column 1",
      selector: (row) => row.column1,
      sortable: true,
    },
    {
      name: "Column 2",
      selector: (row) => row.column2,
      sortable: true,
    },
    // Add more columns as required
    {
      name: "Actions",
      cell: (row) => (
        <>
          <button onClick={() => handleEditAction(row)}>Edit</button>
          <button onClick={() => handleDeleteAction(row)}>Delete</button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      {showAddItemButton && (
        <button onClick={handleAddAction} style={{ marginBottom: "10px" }}>
          {addButtonText}
        </button>
      )}
      <DataTable
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handlePerRowsChange}
        paginationRowsPerPageOptions={[10, 20, 50]}
      />
    </div>
  );
};

export default TableComponentNew;
