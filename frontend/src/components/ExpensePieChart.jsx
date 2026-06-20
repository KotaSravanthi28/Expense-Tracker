import {
  Pie
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function ExpensePieChart({ chartData }) {
  return (
    <Pie
      data={chartData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      }}
    />
  );
}

export default ExpensePieChart;