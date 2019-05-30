const express = require('express');
const app = express();
const fetch = require('node-fetch');
//const fs = require('fs');
let qrcode = require('qrcode');

app.set('view engine', 'ejs');
app.use( express.static('public'));

app.get('/qr', (req, res) => {
    fetch('http://057f0653.ngrok.io/api')
        .then((response) => response.json())
        .then(async (data) => {
            let x = []
            const qrData = await Promise.all(
                data.data.map(element => {
                    console.log('>>>>', element);
                    x.push(element)
                    return qrcode.toDataURL(`http://057f0653.ngrok.io/api/${element._id}`);

                })
            );
              // if(req.params.num > qrData.length)
              //      req.params.num = qrData.length


            res.render('final', {qrData,name:x})

        })


});


app.listen(5000, () => console.log('server started'));