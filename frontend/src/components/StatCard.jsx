import { FaWallet } from "react-icons/fa";

function StatCard({ title, amount }) {
  const getColor = () => {
    if (title.includes("Income"))
      return "#16a34a";             

    if (title.includes("Expense"))
      return "#dc2626";

    if (title.includes("Budget"))
      return "#7b406b";

    return "#2563eb";
  };

  return (
    <div className="stat-card"
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
        minWidth: "220px",
        borderLeft: `6px solid ${getColor()}`,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <h3
        
      ><FaWallet></FaWallet>
        {title}
      </h3>

      <h2
        style={{
          color: getColor(),
          fontSize: "32px",
          fontWeight: "700",
        }}
      >
        ₹{Number(amount || 0).toLocaleString()}
      </h2>
    </div>
  );
}

export default StatCard;