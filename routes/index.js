var express = require('express');
var router = express.Router();
var nodemailer = require ('nodemailer')
var beneficiosModels = require ('../models/beneficiosModels');
var cloudinary = require ('cloudinary').v2;

/* GET home page. */
router.get('/', async function(req, res, next) {

  var beneficios = await beneficiosModels.getNovedades()

  beneficios = beneficios.splice (0,15); //selecciona los primero 5 elemento del array

  beneficios = beneficios.map(beneficio =>{
    if(beneficio.img_id){
      const imagen = cloudinary.url(beneficio.img_id,{
        width: 250,
        crop: 'fill'
      });
      return{
        ...beneficio,
        imagen
      }
    } else{
      return{
        ...beneficio,
        imagen: '/images/noimagen.png'
      }
    }
   })

  res.render('index',{
    beneficios
  } );
});

router.post ('/', async(req,res,next) =>{

  console.log(req.body) //estoy capturando datos?

  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var telefono = req.body.telefono;
  var mensaje = req.body.mensaje;

  var obj = {
    to: 'cardenasmarianav.89@gmail.com',
    subject: 'Contacto desde la wed ENERGIA (proyecto final)',
    html: nombre + apellido + " Se contacto a traves de la pagina web, solicita mas info a este correo: " +
    email + " .<br> Ademas, hizo el siguiente comentario: " + mensaje + ".<br> Su telefono es " + telefono
  } // cierra var obj

  var transporter = nodemailer.createTransport ({
    host : process.env. SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }

  }) //cierra transporter

  var info = await transporter.sendMail(obj);
  res.render ('index', {message: 'MENSAJE ENVIADO',});
}
); //cierra peticion del POST

module.exports = router;
