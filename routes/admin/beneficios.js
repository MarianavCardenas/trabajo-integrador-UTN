var express = require('express');
var router = express.Router();

var beneficiosModels = require ('../../models/beneficiosModels');
var util= require ('util');
var cloudinary = require ('cloudinary').v2;
const uploader = util.promisify (cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

// listar las novedades

router.get('/',async function(req, res, next) {

  var beneficios = await beneficiosModels.getNovedades();
 
   beneficios = beneficios.map(beneficio =>{
    if(beneficio.img_id){
      const imagen = cloudinary.image(beneficio.img_id,{
        width: 200,
        height:200,
        crop: 'fill'
      });
      return{
        ...beneficio,
        imagen
      }
    } else{
      return{
        ...beneficio,
        imagen: ''
      }
    }
   })



    // var beneficios = await beneficiosModels.getNovedades();
    res.render('admin/beneficios', {
        layout:'admin/layout',
        persona: req.session.nombre,
        beneficios

    });
  })

  // inicio del get eliminar

  router.get('/eliminar/:id', async (req,res,next) => {
    const id = req.params.id;
    
    let beneficio = await beneficiosModels.getNovedadById(id);
    if (beneficio.img_id){
      await (destroy(beneficio.img_id));
    }

    await beneficiosModels.deleteNovedadesById (id);
    res.redirect('/admin/beneficios')



  })

  //finaliza el get eliminar

  // inicia el diseño de la pagina agregar
   router.get('/agregar', (req, res, next)=>{
    res.render('admin/agregar',{
      layout: 'admin/layout'
    })
   })

   //inserta la novedad en la base de datos

router.post('/agregar', async (req, res, next) => {
  try {

    var img_id = '';
    if (req.files && Object.keys(req.files).length > 0) {
      imagen = req.files.imagen;
      img_id = (await uploader(imagen.tempFilePath)).public_id;
    }



    if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
      await beneficiosModels.insertNovedad({
        ...req.body, // spread titulo,subt y cuerpo
        img_id
      });
      res.redirect('/admin/beneficios')
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true,
        message: 'Todos los campos son requeridos'
      })
    }
  } catch (error) {
    console.log(error)
    res.render('admin/agregar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se cargo la novedad'
    })
  }
})

 // diseño de modificar +traer la novedad que yo seleccione
 router.get('/modificar/:id', async(req,res, next)=>{
  var id= req.params.id;
  var beneficios = await beneficiosModels.getNovedadById(id);
  res.render('admin/modificar', {
    layout:'admin/layout',
    beneficios
  })
 })

 // actualizar los beneficios

 router.post ('/modificar', async (req,res, next)=>{
  try{
    let img_id=req.body.img_original;
    let borrar_img_vieja =false;
    if(req.body.img_delete === "1"){
      img_id = null;
      borrar_img_vieja = true;
    } else{
      if(req.files && Object.keys(req.files).length>0){
        imagen =req.files.imagen;
        img_id=(await uploader(imagen.tempFilePath)).public_id;
        borrar_img_vieja=true;
      }
    }
    if(borrar_img_vieja && req.body.img_original){
      await(destroy(req.body.img_original));
    }
    var obj ={
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      cuerpo: req.body.cuerpo,
      img_id
    }
    console.log(obj) //para ver si trae los datos
    await beneficiosModels.modificarNovedadById (obj,req.body.id);
    res.redirect('/admin/beneficios');
  } catch (error){
    console.log(error)
    res.render('admin/modificar',{
      layout:'admin/layout',
      error: true,
      message:'No se modifico la novedad'
    })
  }
 })

  module.exports = router;