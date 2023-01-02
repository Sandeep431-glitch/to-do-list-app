// required the mongoose library
const mongoose = require('mongoose');
// required  the express library
const express = require('express');

main().then(()=> console.log("Successfully Connected to Database!!")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://sandeep431:cyoXnd7x6RONbYAS@cluster0.rwzqurv.mongodb.net/todolist?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}


