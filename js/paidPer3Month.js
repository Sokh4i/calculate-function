let btnShow = document.getElementById("btnShow");
btnShow.addEventListener("click", show);

function show() {
    let getProduct = document.getElementById("product").value;
    let getPrice = Number(document.getElementById("price").value);
    let getDuration = Number(document.getElementById("duration").value);
    let getInterest = Number(document.getElementById("interest").value);
    let getPrincipal = Number(document.getElementById("principal").value);
    let amount = getPrice - getPrincipal;
    let getDate = document.getElementById("date").value;
    let monthlist = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    function fnDate(start_dt, i) {
        let [year, month, day] = start_dt.split("-").map(Number);
        let date = new Date(year, month - 1, day);

        date.setMonth(date.getMonth() + i);

        return date;
    }

    const tableContainer = document.getElementById("tbl");

    let tbl = `
        <div class="card">
            <div class="head">
                <div>
                    <h1>${getProduct}</h1>
                    <div class="kh">តារាងបង់ប្រាក់ប្រចាំខែ</div>
                    <div class="sub">Monthly Payment Schedule</div>
                </div>
                <div class="price">
                    <small>Product Price</small>
                    <b>$${Number(getPrice).toFixed(2)}</b>
                </div>
            </div>

            <div class="info">
                <div>
                    <small>Duration</small>
                    <b>${getDuration} Months</b>
                </div>
                <div>
                    <small>Interest Rate</small>
                    <b class="red">${getInterest}%</b>
                </div>
                <div>
                    <small>Monthly Principal</small>
                    <b>$${Number(getPrincipal).toFixed(2)}</b>
                </div>
            </div>

            <div class="hist">
                <div>
                    <b>Payment History</b><br>
                    <small>Starting date: ${getDate}</small>
                </div>
                <span class="pill">${getDuration} Payments</span>
            </div>

            <div class="wrap">
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Date Paid</th>
                            <th>Principal</th>
                            <th>Interest</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
    `;

    let totalAmount = 0;
    let totalInterest = 0;
    let monthlyPrinciple = amount / getDuration;
    let paid = 0;

    for (let i = 1; i <= getDuration; i++) {
        let a = fnDate(getDate, i);

        let b = a.getDate() + "-" + monthlist[a.getMonth()] + "-" + a.getFullYear();

        let monthlyInterest = amount * getInterest / 100;
        let subtotalAmount = 0;

        if(i % 3 == 0){
            paid = monthlyPrinciple * 3;
            subtotalAmount = paid + monthlyInterest;
            amount -= paid;

            tbl += `
                <tr>
                    <td>${i}</td>
                    <td>${b}</td>
                    <td>${paid.toFixed(2)} $</td>
                    <td>${monthlyInterest.toFixed(2)} $</td>
                    <td>${subtotalAmount.toFixed(2)} $</td>
                </tr>
            `;
        }
        else if(i == getDuration){
            paid = amount;
            subtotalAmount = monthlyInterest + paid;

            tbl += `
                <tr>
                    <td>${i}</td>
                    <td>${b}</td>
                    <td>${monthlyPrinciple.toFixed(2)} $</td>
                    <td>${monthlyInterest.toFixed(2)} $</td>
                    <td>${subtotalAmount.toFixed(2)} $</td>
                </tr>
            `;
        }
        else {
            subtotalAmount = monthlyInterest;

            tbl += `
                <tr>
                    <td>${i}</td>
                    <td>${b}</td>
                    <td>0 $</td>
                    <td>${monthlyInterest.toFixed(2)} $</td>
                    <td>${subtotalAmount.toFixed(2)} $</td>
                </tr>
            `;
        }

        totalAmount += subtotalAmount;
        totalInterest += monthlyInterest;
    }

    tbl += `
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colspan="3">Total</th>
                            <th>${totalInterest.toFixed(2)} $</th>
                            <th>${totalAmount.toFixed(2)} $</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <button class="noprint" onclick="window.print()">Print</button>
        </div>
    `;

    tableContainer.innerHTML = tbl;
}