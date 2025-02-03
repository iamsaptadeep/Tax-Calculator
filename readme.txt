/tax-calculator
│── app.py                  # Flask backend
│── /templates
│   ├── index.html          # Frontend UI
│── /static
│   ├── styles.css          # Styling
│   ├── script.js           # Client-side logic




* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
}

body {
    background-color: #f8f9fa;
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.container {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 90%;
    max-width: 400px;
}

h2 {
    color: #2c3e50;
    margin-bottom: 15px;
}

input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
    transition: 0.3s ease-in-out;
}

input:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.2);
}

button {
    width: 100%;
    background: #007bff;
    color: white;
    border: none;
    padding: 12px;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    transition: 0.3s ease-in-out;
}

button:hover {
    background: #0056b3;
}

#result {
    margin-top: 15px;
    padding: 10px;
    background: #f1f1f1;
    border-radius: 8px;
    font-size: 16px;
}

.info {
    font-size: small;
    color: #777;
}
.savings {
    font-size: 16px;
    font-weight: bold;
    margin-top: 10px;
}

.green {
    color: green;
}

.red {
    color: red;
}