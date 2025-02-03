from flask import Flask, request, jsonify, render_template

app = Flask(__name__, static_folder='static', template_folder='templates')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate_tax():
    data = request.get_json()
    if not data or 'income' not in data:
        return jsonify({'error': 'Invalid input'}), 400

    income = float(data['income'])

    old_tax, old_rebate = calculate_old_regime_tax(income)
    new_tax, new_rebate = calculate_new_regime_tax(income)

    # Apply rebate, then add 4% cess
    final_old_tax = max((old_tax - old_rebate), 0) * 1.04
    final_new_tax = max((new_tax - new_rebate), 0) * 1.04

    return jsonify({
        'final_old_tax': round(final_old_tax, 2),
        'final_new_tax': round(final_new_tax, 2),
        'old_rebate': old_rebate,
        'new_rebate': new_rebate
    })

def calculate_old_regime_tax(income):
    standard_deduction = 50000
    taxable_income = max(income - standard_deduction, 0)
    slabs = [(250000, 0.00), (500000, 0.05), (750000, 0.20), (1000000, 0.20), 
             (1250000, 0.30), (1500000, 0.30), (float('inf'), 0.30)]
    
    tax, prev_limit = 0, 0
    for limit, rate in slabs:
        if taxable_income > prev_limit:
            tax += (min(taxable_income, limit) - prev_limit) * rate
        prev_limit = limit

    rebate = 12500 if taxable_income <= 500000 else 0
    return tax, rebate

def calculate_new_regime_tax(income):
    standard_deduction = 75000
    taxable_income = max(income - standard_deduction, 0)
    slabs = [(400000, 0.00), (800000, 0.05), (1200000, 0.10), (1600000, 0.15), 
             (2000000, 0.20), (2400000, 0.25), (float('inf'), 0.30)]
    
    tax, prev_limit = 0, 0
    for limit, rate in slabs:
        if taxable_income > prev_limit:
            tax += (min(taxable_income, limit) - prev_limit) * rate
        prev_limit = limit

    rebate = 60000 if taxable_income <= 1200000 else 0
    return tax, rebate

if __name__ == '__main__':
    app.run(debug=True)


