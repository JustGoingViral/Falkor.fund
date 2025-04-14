import Chart from 'chart.js/auto';

export const createFlowChart = (
  canvas: HTMLCanvasElement,
  data: number[],
  labels: string[],
  label: string,
  color: string
) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: data,
        borderColor: color,
        backgroundColor: `rgba(${parseInt(color.substring(1,3),16)}, ${parseInt(color.substring(3,5),16)}, ${parseInt(color.substring(5,7),16)}, 0.1)`,
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)'
          }
        },
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)'
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
};

export const createMarketCapChart = (canvas: HTMLCanvasElement, data: number[]) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Current', '3 Mo', '6 Mo', '1 Yr'],
      datasets: [{
        label: 'Market Cap Projection (Millions $)',
        data: data,
        backgroundColor: [
          'rgba(30, 41, 59, 1)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(16, 185, 129, 0.7)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
};