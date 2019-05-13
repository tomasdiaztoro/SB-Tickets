
const express = require('express'),
app = express(),
body_parser = require('body-parser'),
mongoose = require('mongoose');

const Ticket = require('./models/ticket.js').Ticket;

mongoose.connect('mongodb://localhost:27017/dark_tickets', {useNewUrlParser: true});

app.use("/assets",express.static('public'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));
app.set("view engine","pug");

app.get('/',function(req,res){
    Ticket.find(function(err,obj){
        res.render('index',{tickets:obj});
    })
});

app.get('/new',function(req,res){
    res.render('new',);
});

app.get('/view/:id',function(req,res){
    Ticket.findById(req.params.id,function(err,obj){
        res.render('view',{ticket:obj});
    });
});

app.get('/edit/:id',function(req,res){
    Ticket.findById(req.params.id,function(err,obj){
        res.render('edit',{ticket:obj});
    });
});

app.get('/delete/:id',function(req,res){
    Ticket.findByIdAndDelete(req.params.id,function(err,obj){
        res.redirect('/');
    });
});

app.post('/new',function(req,res){
    var ticket = new Ticket({title:req.body.title,description:req.body.description});
    ticket.save(function(err,obj){
        res.redirect('/');
    })
});

app.post('/edit',function(req,res){
    Ticket.findByIdAndUpdate(req.body.id, { title: req.body.title,description: req.body.description },function(err,obj){
        res.redirect('/view/'+obj._id);
    })
});

app.listen(3000,()=>console.log('App en puerto 3000'));