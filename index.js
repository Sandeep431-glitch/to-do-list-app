// required express to run express server
const express = require('express');

// port number
const port = process.env.PORT || 8000;

// importing the DataBase
const db = require('./config/mongoose');

// importng the Schema For tasks
const  Task  = require('./models/task');

// created app costant to use express functions
const app = express();

// using middleware to use local static files
app.use(express.static("./views"));

// sing middleware to use url encoder
app.use(express.urlencoded());

// setting up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// rendering home Page
app.get('/', function(req, res){
    Task.find({}, function(err, task){
        if(err){
            console.log('Error in fetching tasks from db');
            return;
        }

        return res.render('home', {
            tittle: "Home",
            task: task
        });
    }
)});


// creating tasks
app.post('/create-task', function(req, res){
    
    Task.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
        }, function(err, newtask){
    
            if(err)
            {
                console.log('error in creating task', err); 
                return;
            }
        
        return res.redirect('back');//to go back to previous page

    });
});


// deleting Tasks
app.get('/delete-task', function(req, res){
    
    // get the id from query
    var id = req.query;

    // checking the number of tasks selected to delete
    var count = Object.keys(id).length;
    for(let i=0; i < count ; i++){
        
        // finding and deleting tasks from the DB one by one using id
        Task.findByIdAndDelete(Object.keys(id)[i], function(err){
        if(err)
        {
            console.log('error in deleting task');
            }
        });
    }
    return res.redirect('back'); 
});

// making the app to listen on asigned port number
app.listen(port, function(err){
    if(err)
    {
        console.log(`Error in running the server : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
});