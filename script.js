const dataCodes = {
    '666666': [
        { month: 'Janeiro', value: 15 },
        { month: 'Fevereiro', value: 19 },
        { month: 'Março', value: 20 }
    ],
    '777777': [
        { month: 'Janeiro', value: 10 },
        { month: 'Fevereiro', value: 20 },
        { month: 'Março', value: 25 },
        { month: 'April', value: 20 },
        { month: 'Maio', value: 25}
    ],
    '888888': [
        { month: 'Janeiro', value: 5 },
        { month: 'Fevereiro', value: 12 },
        { month: 'Março', value: 19 },
        { month: 'Abril', value: 21},
        { month: 'Maio', value: 25}
    ]
};
const filterIncreasedProductivity = (data) => {
    return data.filter((entry, index, array) => {
        if (index === 0) return false;
        return entry.value > array[index - 1].value;
    });
};

const updateChart = (chart, data) => {
    const labels = data.map(d => d.month);
    const dataValues = data.map(d => d.value);

    chart.data.labels = labels;
    chart.data.datasets[0].data = dataValues;
    chart.update();
};

const ctx = document.getElementById('productivityChart').getContext('2d');
const productivityChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Produtividade',
            data: [],
            backgroundColor: '#F9AD50',
            borderColor: '#F9AD50',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            x: {
                ticks: {
                    color: 'white'
                }
            },
            y: {
                ticks: {
                    color: 'white'
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: 'white'
                }
            }
        }
    }
});

document.getElementById('dataSelect').addEventListener('change', (event) => {
    const selectedCode = event.target.value;
    const rawData = dataCodes[selectedCode] || [];
    const filteredData = filterIncreasedProductivity(rawData);
    updateChart(productivityChart, filteredData);
});

const initialCode = '666666';
const initialData = filterIncreasedProductivity(dataCodes[initialCode]);
updateChart(productivityChart, initialData);