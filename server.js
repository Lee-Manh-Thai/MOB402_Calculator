const express = require('express');
const expressHbs = require('express-handlebars');
const bodyParser = require('body-parser');
const calculator = require('./calculator');

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`The Web server on port ${PORT}`);
});

// #config
app.engine('hbs',expressHbs.engine({
    extname:'hbs',
    defaultLayout:'page_2',
    showContentTinhToan : false,
    showTitle:true
}))
app.set('view engine','hbs');
app.use(bodyParser.urlencoded({extended:true}));

// #Example
app.get('/',(req,res)=>{
    // res.render('home');
    res.render("home",{
        layout:'main'
    });
});

app.get("/tinh_toan", (req, res) => {
  // res.render('home');
  res.render("default_view", {
    layout: "main",
    soA:15,
    soB:7,
    phepTinh:'cong',
    kq:22,
    showContentTinhToan:true,
    showTitle:false
  });
});

// #Bai tap: Calculator
app.get('/calculator',(req,res) => {
    res.render('calculator',{
        layout:'main'
    })
})

app.post('/result',(req,res)=>{
    console.log(req.body);
    let a = Number(req.body.number_a);
    let b = Number(req.body.number_b);
    let isAdd ,isSub,isMulti,isDivide;
    let result = 0;
    switch (req.body.operator) {
      case "add":
        isAdd = true;
        result = calculator.addition(a, b);
        break;
      case "sub":
        isSub = true;
        result = calculator.subtraction(a, b);
        break;
      case "multi":
        isMulti = true;
        result = calculator.multiplication(a, b);
        break;
      case "divide":
        isDivide = true;
        result = calculator.division(a, b);
        break;
    }
    res.render('calculator',{
        layout:'main',
        a:a,
        b:b,
        isAdd:isAdd,
        isSub:isSub,
        isMulti:isMulti,
        isDivide:isDivide,
        result:`Kết quả: ${result.toFixed(2)}`
    })
});