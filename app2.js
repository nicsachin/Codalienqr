const express = require('express');
const app = express();
const fetch = require('node-fetch');
const fs = require('fs');
// const easyqr = require('easyqrcodejs')

let qrcode = require('qrcode');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/qrdata', (req, res) => {

    fetch('http://localhost:3000/api')
        .then((response) => response.json())
        .then(async (data) => {
            let qrlink = []
            let x = []
            const qrData = await Promise.all(

                data.data.map(element => {
                  x.push(element)
                    qrlink.push(`http://localhost:3000/api/${element._id}`)
                })
            );
            res.render('index', {qrlink,name:x})
        })



});




app.listen(4000, () => console.log('server started'));