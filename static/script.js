document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('calculateBtn').addEventListener('click', calculateTax);
});

let taxChart = null; // Store chart instance globally

function calculateTax() {
    const income = parseFloat(document.getElementById('income').value);

    if (isNaN(income) || income <= 0) {
        alert("Please enter a valid income.");
        return;
    }

    fetch('/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ income: income }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById('result').innerHTML = `<p style="color:red;">Error: ${data.error}</p>`;
            } else {
                document.getElementById('oldTax').textContent = data.final_old_tax.toFixed(2);
                document.getElementById('newTax').textContent = data.final_new_tax.toFixed(2);

                // Calculate savings
                let savings = data.final_old_tax - data.final_new_tax;
                let savingsText = savings > 0
                    ? `<p class="savings green">You save ₹${savings.toFixed(2)} in the new regime! 🎉</p>`
                    : `<p class="savings red">You pay ₹${Math.abs(savings).toFixed(2)} more in the new regime. ❌</p>`;

                document.getElementById('savings').innerHTML = savingsText;

                // Update or create the chart
                updateChart(income, data.final_old_tax, data.final_new_tax);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById('result').innerHTML = `<p style="color:red;">An error occurred. Please try again.</p>`;
        });
}

function updateChart(income, oldTax, newTax) {
    const ctx = document.getElementById('taxChart').getContext('2d');

    if (taxChart) {
        taxChart.destroy(); // Destroy existing chart before creating a new one
    }

    taxChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Total Income', 'Old Regime Tax', 'New Regime Tax'],
            datasets: [{
                label: 'Amount (₹)',
                data: [income, oldTax, newTax],
                backgroundColor: ['#4CAF50', '#ff4d4d', '#4da6ff'],
                borderColor: ['#2E7D32', '#cc0000', '#0059b3'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


