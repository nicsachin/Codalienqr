const express = require('express')
const app = express()
const fetch = require('node-fetch')
const fs = require('fs')
let qrcode = require('qrcode');

app.set('view engine' , 'ejs')

app.get('/qrdata' ,(req,res)=>{ 
    fetch('http://e7e4f7bd.ngrok.io/api')
    .then((response)=>response.json())
    .then(async (data)=>{
         
      const qrData = await Promise.all(
               
        data.data.map(element => {
          console.log('>>>>' , element) 
                         
               return qrcode.toDataURL(`http://e7e4f7bd.ngrok.io/api/${element._id}`);
              
      })

      )

  // console.log('>>>>>' , qrData[0])
  //   qrData[0].forEach(element => {
  //         element.then((data) => {console.log('@@@@@' , data)})
  //   });
  
  // console.log('####' , qrData[1])
  // qrData[0].then((data) =>{
  //         console.log('$$$$ ' , data)
  // })

  res.render('index' , { qrData } )
            
        })


        
       
        
})


// app.get('/final' , async(req,res)=>{
//   await addData()
//   res.sendFile('./public/qr.html')
// })



// function addData()
// { 
//     fs.writeFile('./qr.html','<center><h1>Codalien Inventories</h1></center>',()=>{
//         console.log('done removind the data')
       
//     })
   
//     fetch('http://localhost:3000/api')
//     .then((response)=>response.json())
//     .then((data)=>{
//           data.data.forEach(element => {
//                let name = JSON.stringify(element.name)
//                console.log('>>>> ' , name ,' @@@@@' , typeof name)
//                qr =   qrcode.toDataURL(`http://localhost:3000/api/${element._id}`);
//                qr.then((data)=>{
//                fs.appendFileSync('./qr.html' , `<center> <br><h3>${element._id}(${element.name})</h5><img src=${data}/></center><br>`) 
                 
//             })  
            
//             });  
           
//         })
//   }


//   app.get('/file' , (req,res)=>{
//     res.render('index')
//   })
// app.get('/file' , (req,res)=>{
 
//     fs.writeFile('./qr.html','<center><h1>Codalien Inventories</h1></center>',()=>{
//         console.log('done removind the data')
       
//     })
   
//     fetch('http://localhost:3000/api')
//     .then((response)=>response.json())
//     .then((data)=>{
//           data.data.forEach(element => {
//                let name = JSON.stringify(element.name)
//                console.log('>>>> ' , name ,' @@@@@' , typeof name)
//                qr =   qrcode.toDataURL(`http://localhost:3000/api/${element._id}`);
//                qr.then((data)=>{
//                fs.appendFileSync('./views/index.ejs' , `<center> <br><h3>${element._id}(${element.name})</h5><img src=${data}/></center><br>`)   
//             })  
//             res.render('index')
              
//             });  
            
//         })

// })





// async function addData(req,res,next)
// {   let stream = fs.createWriteStream('./qr.html',{flags:'a'})
    
//     console.log('>>>>')
//     fetch('http://localhost:3000/api')
//     .then((response)=>response.json())
//     .then((data)=>{
//           data.forEach(element => {
//               stream.write(`<br>${element.name} <br>`)
//             });    
//         });
           
       
        
 
//         next()
// }

// function removeData(req,res,next)
// {
//     fs.writeFile('./qr.html','<center><h1>Codalien Inventories</h1></center>',()=>{
//         console.log('done removind the data')
//         next()
//     })
// }


app.listen(4000,()=>console.log('server started'))