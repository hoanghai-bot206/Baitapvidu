const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', './views');

// Import calculatorController
const calculatorController = require('./controllers/calculatorController');

// Dang ky route
app.use('/calculator', calculatorController);

// Trang chu
app.get('/', (req, res) => {
    res.render('index');
});

// Middleware nhan loi tu calculatorController
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(err.status || 500).send(`
        <p>Thong bao: ${err.message}</p>
    `);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});