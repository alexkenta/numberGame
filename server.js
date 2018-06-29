const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const session = require("express-session")
// function number (){
//     return Math.floor(Math.random() * 100) + 1
// }

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.use(session({secret: 'supersecretpass'}));

app.get('/', function(request, response){
    // if(request.session.number){
    // console.log(request.session.number, "is in session from IF")
    // } else{
    //     request.session.number = number()
    //     console.log("from else", request.session.number);
    // }

    request.session.number = Math.floor(Math.random() * 100) + 1
    console.log(request.session.number, "is in session after loop")
    response.render("index", {number: request.session.number})
})

app.post('/check', function(request, response){
    console.log(request.body.number)
    if(request.body.number < request.session.number){
        console.log("Your guess was too low")
    } else if ( request.body.number > request.session.number){
        console.log("Your guess was too high")
    } else if(request.body.number == request.session.number){
        console.log("You win!")
    } else {
        console.log("Something has gone horribly wrong")
    }
    response.redirect("/")
})

app.listen(8000, function(){
    console.log("app listening on port 8000")
})

