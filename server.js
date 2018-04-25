const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, resp, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  })

  console.log(log)
  next();
});

app.use((req, resp, next) => {
  resp.render('maintenance.hbs')
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
});

app.get('/', (req, res) => {
  // res.send('Hello Express!');
  // res.send({
  //   name: 'Gianpaul',
  //   likes: ['dogs', 'cats', 'biking']
  // })
  res.render('home.hbs', {
    pageTitle: "Home Page",
    welcomeMessage: "Welcome"
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: "About Page"
  });
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: "unable to handle this request"
  })
})
app.listen(3000, () => {
  console.log('Server is up on port 3000')
});
