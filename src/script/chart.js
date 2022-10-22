import Chart from "chart.js"

const labels = [
  "1° rodada",
  "2° rodada",
  "3° rodada",
  "4° rodada",
  "5° rodada",
  "6° rodada",
  "7° rodada",
  "8° rodada",
  "9° rodada",
  "10° rodada",
]

const data = {
  labels: labels,
  datasets: [
    {
      label: "",
      backgroundColor: "rgb(8, 18, 58, .10)",
      borderColor: "rgb(8, 18, 58)",
      borderWidth: 3,
      categoryPercentage: 0.3,
      data: [1, 1, 5, 2, 0, 3, 4, 0, 2, 5],
    },
  ],
}

const config = {
  type: "bar",
  data: data,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          drawBorder: false,
        },
        min: 0,
        ticks: {
          stepSize: 1,
        },
      },
    },
  },
}

const myChart = new Chart(document.getElementById("chart-t1"), config)

export default graphc
