import React, { useState } from "react";
import { FaPlusCircle, FaEdit, FaTrash } from "react-icons/fa";
import EditModal from "./EditModal";

const TableComponent = ({
  tableData,
  handleAddAction,
  handleEditAction,
  handleDeleteAction,
  tableHeaders,
}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
            {tableData.map((item, index) => (
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
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    margin: "10px 0",
  },
  tableHeader: {
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "white",
    textAlign: "left",
    border: "1px solid #ddd",
  },
  tableRow: {
    ":hover": {
      backgroundColor: "#f2f2f2",
    },
  },
  tableCell: {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "left",
  },
  editButton: {
    backgroundColor: "#FFD700",
    border: "none",
    color: "#333",
    padding: "5px 10px",
    marginRight: "5px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  deleteButton: {
    backgroundColor: "#FF5733",
    border: "none",
    color: "white",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  icon: {
    marginRight: "5px",
  },
};

export default TableComponent;
