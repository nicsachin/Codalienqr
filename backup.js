const express = require('express');
const app = express();
const fetch = require('node-fetch');
const fs = require('fs');
let qrcode = require('qrcode');

app.set('view engine', 'ejs');

app.get('/qrdata', (req, res) => {
    fetch('http://e9e0fa38.ngrok.io/api')
        .then((response) => response.json())
        .then(async (data) => {

            const qrData = await Promise.all(
                data.data.map(element => {
                    console.log('>>>>', element);

                    return qrcode.toDataURL(`http://e9e0fa38.ngrok.io/api/${element._id}`);

                })
            );


            res.render('index', {qrData, data})

        })


});


app.listen(4000, () => console.log('server started'));