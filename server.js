const express = require("express");
const hbs = require("hbs");
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use(express.static(__dirname + "/public"));

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err)
        {
            console.log('Unable to write to file');
        }
    })
    next();
})

// app.use((req, res, next)=>{
//     res.render('maintenance.hbs');
// })

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
})

app.get("/", (req, res) => {
  //res.send('<h1>Hello Express</h1>');
  //   res.send({
  //     name: "Lieven",
  //     likes: ["biking", "gaming"]
  //   });
  res.render("home.hbs", {
    pageTitle: "About Page",
    welcomeMessage: "Hi there!"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.get("/projects", (req, res) =>{
    res.render('projects.hbs', {
        pageTitle: "Projects Page"
    });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "there be errors, mon"
  });
});

app.listen(port, () => {
  console.log("Server is listening on port ", port);
});
