import React, { useState } from "react";
import { FaPlusCircle, FaEdit, FaTrash } from "react-icons/fa";
import EditModal from "./EditModal";

const TableComponent = ({
  tableData,
  handleAddAction,
  handleEditAction,
  handleDeleteAction,
  tableHeaders,
  rowsPerPage = 10, // Default rows per page
}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalRows = tableData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = tableData.slice(startIndex, startIndex + rowsPerPage);

  const handleEditClick = (item) => {
    setSelectedRow(item); // Set the row being edited
    setShowModal(true); // Show the modal
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRow(null);
  };

  const handleSaveChanges = (updatedItem) => {
    handleEditAction(updatedItem);
    closeModal();
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.actionContainer}>
        <button style={styles.addButton} onClick={handleAddAction}>
          <FaPlusCircle style={styles.icon} /> Add Item
        </button>
      </div>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              {tableHeaders.map((header, index) => (
                <th key={index} style={styles.tableHeader}>
                  {header}
                </th>
              ))}
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index} style={styles.tableRow}>
                {Object.values(item).map((value, i) => (
                  <td key={i} style={styles.tableCell}>
                    {value}
                  </td>
                ))}
                <td style={styles.tableCell}>
                  <button
                    style={styles.editButton}
                    onClick={() => handleEditClick(item)}
                  >
                    <FaEdit style={styles.icon} />
                  </button>
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDeleteAction(item)}
                  >
                    <FaTrash style={styles.icon} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div style={styles.pagination}>
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
      </div>

      {/* Edit Modal */}
      {showModal && (
        <EditModal
          show={showModal}
          onClose={closeModal}
          onSave={handleSaveChanges}
          data={selectedRow}
        />
      )}
    </div>
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
