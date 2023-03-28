var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require ('dotenv').config();
var session = require('express-session');
var fileUpload= require('express-fileupload')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var loginRouter = require ('./routes/admin/login')
var adminRouter = require ('./routes/admin/beneficios')



var calzadohombreRouter = require ('./routes/calzadohombre');
var camperahombreRouter = require ('./routes/camperahombre');
var pantalonhombreRouter = require ('./routes/pantalonhombre');
var remerashombreRouter = require ('./routes/remerashombre');

var calzadosmujerRouter = require ('./routes/calzadosmujer');
var camperasmujerRouter = require ('./routes/camperasmujer');
var pantalonesmujerRouter = require ('./routes/pantalonesmujer');
var remerasmujerRouter = require ('./routes/remerasmujer')

var bebesRouter = require ('./routes/bebes')
var nenaRouter = require ('./routes/nena')
var neneRouter = require ('./routes/nene')

var adidasRouter = require ('./routes/adidas')
var nikeRouter = require ('./routes/nike')
var pumaRouter = require ('./routes/puma')
var topperRouter = require ('./routes/topper')

var gorrasRouter = require ('./routes/gorras')
var bolsosRouter = require ('./routes/bolsos')
var mediasRouter = require ('./routes/medias')
var pelotasRouter = require ('./routes/pelotas')

var promocionesRouter = require ('./routes/promociones')
var outletRouter = require ('./routes/outlet')
var veranoRouter = require ('./routes/verano')

var nuevosingresosRouter = require ('./routes/nuevosingresos')
var marcasRouter = require ('./routes/marcas')



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: '782151239chocolate',
  resave:false,
  saveUninitialized: true
}))

secured = async (req,res,next)=>{
  try{
    console.log(req.session.id_usuario);
    if(req.session.id_usuario){
      next();
    }else {
      res.redirect('/admin/login')
    }
  }catch(error){
    console.log(error);
  }
}

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir:'/tmp/'
}))


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/admin/login', loginRouter);
app.use ('/admin/beneficios', secured, adminRouter);



app.use ('/calzadohombre', calzadohombreRouter);
app.use ('/camperahombre', camperahombreRouter);
app.use ('/pantalonhombre', pantalonhombreRouter);
app.use ('/remerashombre', remerashombreRouter);

app.use ('/calzadosmujer', calzadosmujerRouter);
app.use ('/camperasmujer', camperasmujerRouter);
app.use ('/pantalonesmujer', pantalonesmujerRouter);
app.use ('/remerasmujer', remerasmujerRouter);

app.use ('/bebes', bebesRouter);
app.use ('/nena', nenaRouter);
app.use ('/nene', neneRouter);

app.use ('/adidas', adidasRouter);
app.use ('/nike', nikeRouter);
app.use ('/puma', pumaRouter);
app.use ('/topper', topperRouter);

app.use ('/bolsos', bolsosRouter);
app.use ('/gorras', gorrasRouter);
app.use ('/medias', mediasRouter);
app.use ('/pelotas', pelotasRouter);

app.use ('/promociones', promocionesRouter);
app.use ('/outlet', outletRouter);
app.use ('/verano', veranoRouter);
 
app.use ('/nuevosingresos', nuevosingresosRouter);
app.use ('/marcas', marcasRouter);






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
