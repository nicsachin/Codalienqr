const express = require('express');
const app = express();
const fetch = require('node-fetch');
let qrcode = require('qrcode');

//// express configuration//
app.set('view engine', 'ejs');
app.use( express.static('public'));

//route for handling qr code request//
app.get('/', (req, res) => {
    fetch('https://codalien.com/api')
        .then((response) => response.json())
        .then(async (data) => {
            let x = []
            const qrData = await Promise.all(
                data.data.map(element => {
                    x.push(element)
                    return qrcode.toDataURL(`https://codalien.com/api/${element._id}`);
                }));
            res.render('final', {qrData,name:x})
        })


});

const port  = 5000 || process.env.PORT
app.listen(5000, () => console.log('server started'))