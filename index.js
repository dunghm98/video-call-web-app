const port = 3000
const express = require('express')
const app = express()
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => res.render('home'));
app.listen(port, () => console.log(`Example app listening on port port!`))