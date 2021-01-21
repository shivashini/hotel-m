const express = require('express'),
	path = require('path'),
	 exphbs = require('express-handlebars'),
	 bodyparser = require('body-parser'),
	mongoose = require('mongoose'),
 config = require('./db');
let Room=require('./models/room_model');
let User = require('./models/user_model');
let Bill = require('./models/user_model');
let Admin = require('./models/admin_model');
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true)
    mongoose.connect(config.DB, { useNewUrlParser: true }).then(  
      () => {console.log('Database is connected') },  
      err => { console.log('Can not connect to the database'+ err)}  
    );
const roomController = require('./controllers/roomController');
const userController = require('./controllers/userController');
const app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('login', path.join(__dirname,'/login/'));
app.engine('hbs',exphbs({extname:'hbs', defaultLayout: 'mainLayout', layoutsDir:__dirname + '/login/layouts/'}));
app.set('view engine','hbs');


app.get('/',function(req,res)
{
	//res.end('Hello Node!\n');
	res.render('index');
});

app.get('/home',function(req,res)
{
	//res.end('Hello Node!\n');
	res.render('roomDetails');
})

app.get('/registration',function(req,res)
{
	res.render('registration');
})
app.get('/thank',function(req,res)
{
	res.render('thank');
})
app.post('/adminsignup1',function(req,res)
{
    let user1 = new Admin(req.body);
  user1.save()
    .then(user1 => {
      res.render('loginadmin');
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
    
    
})
app.get('/loginadmin',function(req,res)
{
	res.render('loginadmin');
})
app.get('/mode',function(req,res)
{
	res.render('adminsignup');
})
app.get('/menu',function(req,res)
{
	res.render('menu');
})
app.get('/about',function(req,res)
{
	res.render('about');
})
app.get('/feedback',function(req,res)
{
	res.render('feedback');
})
app.get('/adminroom',function(req,res)
{
	res.render('roomList');
})
app.get('/room1',function(req,res)
{
  res.render('room');  
})
app.get('/room2',function(req,res)
{
  res.render('rooms');  
})
app.get('/roomadmin',function(req,res)
{
  res.render('table');  
})
app.route('/bill').get(function (req, res) {  
  Bill.find(function (err, doctors){  
    if(err){  
      console.log(err);  
    }  
    else {  
      res.json(bill);  
    }  
  });  
});
app.get('/bill2',function(req,res)
{
    //res.end('Hello Node!\n');
	res.render('bill');
})
app.post('/user-reg',function(req,res)
{
    let user1 = new User(req.body);
  user1.save()
    .then(user1 => {
      res.render('index');
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});
app.post('/login',function(req,res)
{
    var email=req.body.email;
    var pswd=req.body.passid;
    User.findOne({ email: email, pswd: pswd }, function (err, user) {
      if (err) {
        res.json({ status: 0, message: err });
      }
      if (!user) {
        console.log("Not success");
        res.render('index');
      }
      else{
      console.log("success");
      res.render('roomDetails');
      }
    })
});
app.post('/room-add',function(req,res)
{
    var rn=req.body.rn;
    Room.findOne({rn:rn},function(err,room){
    if(err)
        {
            res.json({ status: 0, message: err });    
        }
    if(room)
        {
            res.render('roomDetails');
        }
    else{
        let room = new Room(req.body);
        room.save()
        .then(room => {
        res.render('menu');
        })
        .catch(err => {
        res.status(400).send("unable to save to database");
        });
    }
    })
});

app.set('views', path.join(__dirname,'/views/'));
app.engine('hbs',exphbs({extname:'hbs', defaultLayout: 'mainLayout', layoutsDir:__dirname + '/views/'}));
app.set('view engine','hbs');
app.listen(3000,() => {
    console.log('Express server started at port : 3000');
});

app.use('/room',roomController);
app.use('/user-reg',userController);