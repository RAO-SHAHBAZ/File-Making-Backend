const express  = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

app.set('view engine','ejs')  //Set View Engine
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,"public")))


app.get('/',(req,res)=>{
    fs.readdir(`./files`,(err,files)=>{
        res.render("index" ,{files:files})
    })
})

app.get('/file/:filename',(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf-8",(err,filedata)=>{
            res.render('show', {filename :req.params.filename , filedata: filedata} )
            
    })
} )

app.post('/create',(req,res,next)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details , (err)=>{
        res.redirect('/')
    })
})

app.post('/delete/:filename', (req, res) => {
  const filepath = path.join(__dirname, 'files', req.params.filename);
  fs.unlink(filepath, (err) => {
    if (err) {
      console.error("Deletion error:", err);
      return res.status(500).send("Error deleting the file.");
    }
    res.redirect('/');
  });
});


app.listen(3000, ()=>{
    console.log("Server IS  Running");
    
})

