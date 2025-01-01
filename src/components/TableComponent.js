import React, { useEffect, useState } from "react";
import { FaPlusCircle, FaEdit, FaTrash } from "react-icons/fa";
import EditModal from "./EditModal";

const TableComponent = ({
  fetchData,
  tableData,
  isPagination,
  showAddItemButton,
  handleAddAction,
  addButtonText,
  handleEditAction,
  handleDeleteAction,
  tableHeaders,
  showEditAction,
  showDeleteAction
}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]); // Current page data
  const [totalRows, setTotalRows] = useState(0); // Total rows count from backend
  const [loading, setLoading] = useState(false); // Loading state
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page
  const [totalPages, setTotalPages] = useState(1); // total Pages
  const [fromRecord, setFromRecord] = useState(1); // total Pages
  const [toRecord, setToRecord] = useState(1); // total Pages


  useEffect(() => {
    if(!tableData) {
        loadData(currentPage, rowsPerPage);
    }
    else {
        setData(tableData);
    }
  }, [currentPage, rowsPerPage, tableData]);

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEditClick = (item) => {
    setSelectedRow(item); // Set the row being edited
    setShowModal(true); // Show the modal
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRow(null);
  };

  const handleSaveChanges = (updatedItem) => {
    const isUpdated = handleEditAction(updatedItem);
    if(isUpdated) {
        loadData(currentPage, rowsPerPage)
    }
    closeModal();
  };


  const loadData = async (page, size) => {
    setLoading(true);
    try {
      const response = await fetchData(page-1, size); // API call
      const data = await response.json();
      setData(data.content); // Table data
      setTotalRows(data.totalElements); // Total rows
      setTotalPages(data.totalPages)
      console.log("Data ::", data)
      setFromRecord((data.number * data.size) + 1);
      setToRecord((data.number * data.size) + data.numberOfElements);
      console.log(fromRecord,toRecord);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        { !loading && (<div style={styles.container}>
      {showAddItemButton && (<div style={styles.actionContainer}>
        <button style={styles.addButton} onClick={handleAddAction}>
          <FaPlusCircle style={styles.icon} /> {addButtonText}
        </button>
      </div>)}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              {tableHeaders.map((header, index) => (
                <th key={index} style={styles.tableHeader}>
                  {header}
                </th>
              ))}
              {(showEditAction || showDeleteAction) && (<th style={styles.tableHeader}>Actions</th>)}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} style={styles.tableRow}>
                {Object.values(item).map((value, i) => (
                  <td key={i} style={styles.tableCell}>
                    {value}
                  </td>
                ))}
                {(showEditAction || showDeleteAction) && (<td style={styles.tableCell}>
                  {showEditAction && (<button
                    style={styles.editButton}
                    onClick={() => handleEditClick(item)}
                  >
                    <FaEdit style={styles.icon} />
                  </button>)}
                  {showDeleteAction && (<button
                    style={styles.deleteButton}
                    onClick={() => handleDeleteAction(item)}
                  >
                    <FaTrash style={styles.icon} />
                  </button>)}
                </td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isPagination && (<div>Showing {fromRecord} to {toRecord} of {totalRows}</div>)}

      {/* Pagination Controls */}
      {isPagination && (<div style={styles.pagination}>
        <button
          style={styles.pageButton}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            style={{
              ...styles.pageButton,
              ...(currentPage === i + 1 && styles.activePage),
            }}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          style={styles.pageButton}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>)}

      {/* Edit Modal */}
      {showModal && (
        <EditModal
          show={showModal}
          onClose={closeModal}
          onSave={handleSaveChanges}
          data={selectedRow}
        />
      )}
    </div>)}</div>
  );
};

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "20px auto",
    padding: "10px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  actionContainer: {
    textAlign: "right",
    marginBottom: "10px",
  },
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    border: "none",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  tableContainer: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "10px",
  },
  tableHeader: {
    backgroundColor: "#f5f5f5",
    fontWeight: "bold",
    borderBottom: "1px solid #ddd",
    padding: "10px",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
  },
  tableCell: {
    padding: "10px",
    textAlign: "center",
  },
  editButton: {
    backgroundColor: "#28A745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
    marginRight: "5px",
  },
  deleteButton: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    marginTop: "10px",
  },
  pageButton: {
    padding: "5px 10px",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ddd",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
  activePage: {
    backgroundColor: "#007BFF",
    color: "white",
    fontWeight: "bold",
  },
};

export default TableComponent;
