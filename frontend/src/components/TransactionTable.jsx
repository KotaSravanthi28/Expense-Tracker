import api from "../services/api";

function TransactionTable({
  transactions,
  refreshTransactions,
  setEditingTransaction,
}) {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this transaction?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(
        `/transactions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      refreshTransactions();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {transactions.length > 0 ? (
            transactions.map((item) => (
              <tr key={item.id}>
                <td>
                  {new Date(
                    item.transaction_date
                  ).toLocaleDateString()}
                </td>

                <td>{item.type}</td>

                <td>{item.category}</td>

                <td
                  style={{
                    color:
                      item.type === "income"
                        ? "green"
                        : "red",
                    fontWeight: "bold",
                  }}
                >
                  ₹{item.amount}
                </td>

                <td>{item.description}</td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() =>
                      setEditingTransaction(item)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(item.id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                No Transactions Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;