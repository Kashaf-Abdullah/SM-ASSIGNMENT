// const newsdayData = [
//     { type: 'Good', probability: 0.35, randomDigits: '01-35' },
//     { type: 'Fair', probability: 0.45, randomDigits: '36-80' },
//     { type: 'Poor', probability: 0.20, randomDigits: '81-100' } // Corrected range
// ];

// const demandData = [
//     { demand: 40, goodProbability: 0.03, fairProbability: 0.10, poorProbability: 0.44, randomDigits: '01-03' },
//     { demand: 50, goodProbability: 0.05, fairProbability: 0.18, poorProbability: 0.22, randomDigits: '04-08' },
//     { demand: 60, goodProbability: 0.15, fairProbability: 0.40, poorProbability: 0.16, randomDigits: '09-23' },
//     { demand: 70, goodProbability: 0.20, fairProbability: 0.20, poorProbability: 0.12, randomDigits: '24-43' },
//     { demand: 80, goodProbability: 0.35, fairProbability: 0.08, poorProbability: 0.06, randomDigits: '44-78' },
//     { demand: 90, goodProbability: 0.15, fairProbability: 0.04, poorProbability: 0.00, randomDigits: '79-93' },
//     { demand: 100, goodProbability: 0.07, fairProbability: 0.00, poorProbability: 0.00, randomDigits: '94-100' } // Corrected range
// ];

// function getDemand(randomDigit) {
//     for (const demand of demandData) {
//         const [start, end] = demand.randomDigits.split('-').map(Number);
//         if (randomDigit >= start && randomDigit <= end) {
//             return demand.demand;
//         }
//     }
//     return 0; // This should never be reached if input is valid
// }

// function runSimulation() {
//     const simulationResults = document.getElementById('simulation-results');
//     simulationResults.innerHTML = ''; // Clear previous results

//     for (let day = 1; day <= 15; day++) {
//         const randomDigitForNewsday = Math.floor(Math.random() * 100) + 1;
//         let typeOfNewsday;

//         // Ensure a valid type of newsday
//         for (const newsday of newsdayData) {
//             const [start, end] = newsday.randomDigits.split('-').map(Number);
//             if (randomDigitForNewsday >= start && randomDigitForNewsday <= end) {
//                 typeOfNewsday = newsday.type;
//                 break;
//             }
//         }

//         // Default value handling
//         typeOfNewsday = typeOfNewsday || 'Unknown'; // Handle if no valid type found

//         const randomDigitForDemand = Math.floor(Math.random() * 100) + 1;
//         let demand = getDemand(randomDigitForDemand);
        
//         // Ensure demand is not zero
//         while (demand === 0) {
//             const newRandomDigitForDemand = Math.floor(Math.random() * 100) + 1;
//             demand = getDemand(newRandomDigitForDemand);
//         }

//         const revenue = demand * 30;
//         const lostProfit = demand > 60 ? (demand - 60) * 10 : 0;
//         const salvage = demand < 60 ? (60 - demand) * 5 : 0;
//         const dailyProfit = revenue - lostProfit + salvage;

//         const row = `
//             <tr>
//                 <td>${day}</td>
//                 <td>${randomDigitForNewsday}</td>
//                 <td>${typeOfNewsday}</td>
//                 <td>${randomDigitForDemand}</td>
//                 <td>${demand}</td>
//                 <td>${revenue}</td>
//                 <td>${lostProfit}</td>
//                 <td>${salvage}</td>
//                 <td>${dailyProfit}</td>
//             </tr>
//         `;
//         simulationResults.insertAdjacentHTML('beforeend', row);
//     }
// }

// // Event listener for the Run Simulation button
// document.getElementById('simulate-btn').addEventListener('click', runSimulation);


















const newsdayData = [
    { type: 'Good', probability: 0.35, randomDigits: '01-35' },
    { type: 'Fair', probability: 0.45, randomDigits: '36-80' },
    { type: 'Poor', probability: 0.20, randomDigits: '81-100' }
];

const demandData = [
    { demand: 40, goodProbability: 0.03, fairProbability: 0.10, poorProbability: 0.44, randomDigits: '01-03' },
    { demand: 50, goodProbability: 0.05, fairProbability: 0.18, poorProbability: 0.22, randomDigits: '04-08' },
    { demand: 60, goodProbability: 0.15, fairProbability: 0.40, poorProbability: 0.16, randomDigits: '09-23' },
    { demand: 70, goodProbability: 0.20, fairProbability: 0.20, poorProbability: 0.12, randomDigits: '24-43' },
    { demand: 80, goodProbability: 0.35, fairProbability: 0.08, poorProbability: 0.06, randomDigits: '44-78' },
    { demand: 90, goodProbability: 0.15, fairProbability: 0.04, poorProbability: 0.00, randomDigits: '79-93' },
    { demand: 100, goodProbability: 0.07, fairProbability: 0.00, poorProbability: 0.00, randomDigits: '94-100' }
];


document.getElementById('add-entry').addEventListener('click', function() {
    const demand = parseInt(document.getElementById('demand').value);
    const goodProb = parseFloat(document.getElementById('good-prob').value);
    const fairProb = parseFloat(document.getElementById('fair-prob').value);
    const poorProb = parseFloat(document.getElementById('poor-prob').value);

    // Ensure the probabilities are valid (i.e., between 0 and 1)
    if (goodProb < 0 || goodProb > 1 || fairProb < 0 || fairProb > 1 || poorProb < 0 || poorProb > 1) {
        alert('Probabilities must be between 0 and 1');
        return;
    }

    const tableBody = document.getElementById('table-body');

    // Calculate individual cumulative probabilities for Good, Fair, and Poor
    let lastGoodCumulative = tableBody.lastElementChild ? parseFloat(tableBody.lastElementChild.cells[4].textContent) : 0;
    let lastFairCumulative = tableBody.lastElementChild ? parseFloat(tableBody.lastElementChild.cells[5].textContent) : 0;
    let lastPoorCumulative = tableBody.lastElementChild ? parseFloat(tableBody.lastElementChild.cells[6].textContent) : 0;

    const newGoodCumulative = Math.min((lastGoodCumulative + goodProb), 1).toFixed(2);
    const newFairCumulative = Math.min((lastFairCumulative + fairProb), 1).toFixed(2);
    const newPoorCumulative = Math.min((lastPoorCumulative + poorProb), 1).toFixed(2);

    // Calculate random digit ranges, wrapping around at 100
    const goodDigitStart = Math.floor(lastGoodCumulative * 100) + 1;
    const goodDigitEnd = Math.floor(newGoodCumulative * 100);
    const goodDigits = goodDigitEnd >= 100 
        ? `${goodDigitStart}-99, 00-${goodDigitEnd % 100}` 
        : `${goodDigitStart <= goodDigitEnd ? `${goodDigitStart}-${goodDigitEnd}` : '-'}`;

    const fairDigitStart = Math.floor(lastFairCumulative * 100) + 1;
    const fairDigitEnd = Math.floor(newFairCumulative * 100);
    const fairDigits = fairDigitEnd >= 100 
        ? `${fairDigitStart}-99, 00-${fairDigitEnd % 100}` 
        : `${fairDigitStart <= fairDigitEnd ? `${fairDigitStart}-${fairDigitEnd}` : '-'}`;

    const poorDigitStart = Math.floor(lastPoorCumulative * 100) + 1;
    const poorDigitEnd = Math.floor(newPoorCumulative * 100);
    const poorDigits = poorDigitEnd >= 100 
        ? `${poorDigitStart}-99, 00-${poorDigitEnd % 100}` 
        : `${poorDigitStart <= poorDigitEnd ? `${poorDigitStart}-${poorDigitEnd}` : '-'}`;

    // Insert new row into the table
    const newRow = `
        <tr>
            <td>${demand}</td>
            <td>${goodProb.toFixed(2)}</td>
            <td>${fairProb.toFixed(2)}</td>
            <td>${poorProb.toFixed(2)}</td>
            <td>${newGoodCumulative}</td>
            <td>${newFairCumulative}</td>
            <td>${newPoorCumulative}</td>
            <td>${goodDigits}</td>
            <td>${fairDigits}</td>
            <td>${poorDigits}</td>
        </tr>
    `;
    tableBody.insertAdjacentHTML('beforeend', newRow);

    // Clear the form inputs
    document.getElementById('demand-form').reset();
});

// ----


// 2nd table


document.getElementById('add-newsday-entry').addEventListener('click', function() {
    const goodProb = parseFloat(document.getElementById('good-prob-news').value);
    const fairProb = parseFloat(document.getElementById('fair-prob-news').value);
    const poorProb = parseFloat(document.getElementById('poor-prob-news').value);

    // Check if the sum of probabilities is 1
    if ((goodProb + fairProb + poorProb).toFixed(2) != 1) {
        alert('The sum of probabilities must be equal to 1.');
        return;
    }

    const newsdayBody = document.getElementById('newsday-body');
    newsdayBody.innerHTML = ''; // Clear the table for new entries

    // Types of newsdays and their probabilities
    const newsdayTypes = [
        { type: 'Good', prob: goodProb },
        { type: 'Fair', prob: fairProb },
        { type: 'Poor', prob: poorProb }
    ];

    let cumulativeProb = 0;
    let lastDigit = 1;

    newsdayTypes.forEach((newsday, index) => {
        cumulativeProb += newsday.prob;
        const cumulativeProbFixed = cumulativeProb.toFixed(2);

        // Calculate random digit range
        const startDigit = lastDigit;
        const endDigit = Math.floor(cumulativeProb * 100);
        let randomDigits;

        if (endDigit >= 100) {
            randomDigits = `${startDigit}-99, 00-${endDigit % 100}`;
        } else {
            randomDigits = `${startDigit}-${endDigit}`;
        }

        // Create a new row for the table
        const newRow = `
            <tr>
                <td>${newsday.type}</td>
                <td>${newsday.prob.toFixed(2)}</td>
                <td>${cumulativeProbFixed}</td>
                <td>${randomDigits}</td>
            </tr>
        `;
        newsdayBody.insertAdjacentHTML('beforeend', newRow);

        lastDigit = (endDigit + 1) % 100;
    });

    // Clear the form inputs
    document.getElementById('newsday-form').reset();
});
// ............
function getDemand(randomDigit) {
    for (const demand of demandData) {
        const [start, end] = demand.randomDigits.split('-').map(Number);
        if (randomDigit >= start && randomDigit <= end) {
            return demand.demand;
        }
    }
    return 0;
}

function runSimulation() {
    const simulationResults = document.getElementById('simulation-results');
    simulationResults.innerHTML = ''; // Clear previous results

    const dailyProfits = [];
    const days = [];

    // Get the quantity of newspapers and number of days from user input
    const quantityInput = document.getElementById('newspaper-quantity').value;
    const newspaperQuantity = parseInt(quantityInput, 10);

    const numDaysInput = document.getElementById('num-days').value;
    const numDays = parseInt(numDaysInput, 10);

    for (let day = 1; day <= numDays; day++) {
        const randomDigitForNewsday = Math.floor(Math.random() * 100) + 1;
        let typeOfNewsday;

        for (const newsday of newsdayData) {
            const [start, end] = newsday.randomDigits.split('-').map(Number);
            if (randomDigitForNewsday >= start && randomDigitForNewsday <= end) {
                typeOfNewsday = newsday.type;
                break;
            }
        }

        const randomDigitForDemand = Math.floor(Math.random() * 100) + 1;
        let demand = getDemand(randomDigitForDemand);
        
        while (demand === 0) {
            const newRandomDigitForDemand = Math.floor(Math.random() * 100) + 1;
            demand = getDemand(newRandomDigitForDemand);
        }

        // Calculate revenue based on the number of newspapers purchased
        const revenue = Math.min(demand, newspaperQuantity) * 30; // Max revenue if demand exceeds quantity
        const lostProfit = demand > newspaperQuantity ? (demand - newspaperQuantity) * 10 : 0;
        const salvage = demand < newspaperQuantity ? (newspaperQuantity - demand) * 5 : 0;
        const dailyProfit = revenue - lostProfit + salvage;

        dailyProfits.push(dailyProfit);
        days.push(`Day ${day}`);

        const row = `
            <tr>
                <td>${day}</td>
                <td>${randomDigitForNewsday}</td>
                <td>${typeOfNewsday}</td>
                <td>${randomDigitForDemand}</td>
                <td>${demand}</td>
                <td>${revenue}</td>
                <td>${lostProfit}</td>
                <td>${salvage}</td>
                <td>${dailyProfit}</td>
            </tr>
        `;
        simulationResults.insertAdjacentHTML('beforeend', row);
    }

    // Calculate the average daily profit
    const totalProfit = dailyProfits.reduce((acc, profit) => acc + profit, 0);
    const averageProfit = (totalProfit / dailyProfits.length).toFixed(2);

    // Display the average daily profit
    document.getElementById('average-profit').textContent = `Average Daily Profit: Rs ${averageProfit}`;

    // Generate the chart with daily profit data
    const ctx = document.getElementById('profitChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: days,
            datasets: [{
                label: 'Daily Profit (Rs)',
                data: dailyProfits,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}





// Event listener for the Run Simulation button
document.getElementById('simulate-btn').addEventListener('click', runSimulation);
