
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Su dung body-parser de phan tich du lieu tu form
app.use(bodyParser.urlencoded({ extended: true }));

// Trang giao dien
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Express Error Handling</title>
        </head>
        <body>
            <h1>Chuong trinh phep chia</h1>

            <form action="/divide" method="post">
                <label for="dividend">Dividend (So bi chia):</label>
                <input type="number" id="dividend"
                       name="dividend" step="any" required>
                <br><br>

                <label for="divisor">Divisor (So chia):</label>
                <input type="number" id="divisor"
                       name="divisor" step="any" required>
                <br><br>

                <input type="submit" value="Submit">
            </form>
        </body>
        </html>
    `);
});

// Xu ly yeu cau POST
app.post('/divide', (req, res, next) => {
    const dividend = parseFloat(req.body.dividend);
    const divisor = parseFloat(req.body.divisor);

    // Kiem tra du lieu dau vao
    if (
        !Number.isFinite(dividend) ||
        !Number.isFinite(divisor) ||
        divisor === 0
    ) {
        const error = new Error('Invalid input');
        error.status = 400;

        // Chuyen loi den middleware xu ly loi
        return next(error);
    }

    // Thuc hien phep chia
    const result = dividend / divisor;

    res.send(`
        <h1>Ket qua phep chia</h1>
        <p>${dividend} / ${divisor} = ${result}</p>
        <a href="/">Quay lai</a>
    `);
});

// Middleware xu ly loi
app.use((err, req, res, next) => {
    console.error(err.message);

    res.status(err.status || 500).send(`
        <p>Thong bao: ${err.message}</p>
        <a href="/">Quay lai trang chu</a>
    `);
});

// Khoi dong server
app.listen(3000, () => {
    console.log('Server dang chay tai cong 3000');
});
