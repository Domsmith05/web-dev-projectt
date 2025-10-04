const express = require("express"); 
const ejs = require('ejs');
const app = express(); 
const port = 3000; 

app.use(express.json());
app.use(express.urlencoded( {
    extended: true
}));

app.get(['/', '/city', '/energy', '/water', '/team', '/form'], (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`, (err) => { 
        if (err) 
            console.log(err); 
    }); 
});

app.listen(port, () => { 
    console.log(`myapp is listening on port ${port}!`); 
});

app.post("/submit", (req, res) => {
    console.log(req.body);
    let firstName= req.body.firstName;
    let secondName = req.body.secondName
    let email = req.body.email;
    let message = req.body.message;
    res.json({
        firstName:firstName, 
        secondName:secondName,
        email:email,
        message:message
    });
});

app.use(express.static('public'));