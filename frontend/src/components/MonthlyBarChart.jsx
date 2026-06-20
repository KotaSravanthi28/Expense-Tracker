import {
  Bar
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function MonthlyBarChart({
  chartData,
}) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "900px",
        margin: "auto",
      }}
    >
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
        }}
      />
    </div>
  );
}

export default MonthlyBarChart;