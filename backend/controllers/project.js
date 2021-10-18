'use strict'
const { off } = require('../app');
var Project = require('../models/project');
var fs = require('fs');
var path = require('path');
var controller = {

    home: function(req, res){

        return res.status(200).send({
            message:"Soy la home"
        });
    },

    test: function(req, res){

        return res.status(200).send({
            message:"Soy el metodo test"
        });
    },

    saveProject: function(req, res){
        var _project = new Project();

        var params = req.body;
        _project.name = params.name;
        _project.description = params.description;
        _project.category = params.category;
        _project.langs =  params.langs;
        _project.year = params.year;
        _project.image = null;

        _project.save((err, projectStored) =>{
            if(err) return res.status(500).send({message:"Error al guardar"});

            if(!projectStored) return res.status(404).send({message:"No se ha podido guardar"});

            return res.status(200).send({
                project: projectStored
            });
        });
    },

    getProject:function(req, res){

        let id = req.params.id;

        if(id == null) return res.status(404).send({message:"El project not exist"});


        Project.findById(id,(err, project)=>{
            if(err) return res.status(500).send({message:"Not found"});

            if(!project) return res.status(404).send({message:"El project not exist"});

            return res.status(200).send({
                project
            });
        });
    },

    listProjects: function(req, res){

        Project.find({}).sort('-year').exec((err, projects)=>{
            if(err) return res.status(500).send({message:"Not found"});

            if(!projects) return res.status(404).send({message:"no  hay projectos para mostrar"});

            return res.status(200).send({
                projects
            });
        });
    },

    updateProject:function(req, res){

        let id = req.params.id;
        var update = req.body;
        Project.findByIdAndUpdate(id,update, {new : true},(err, projectUpdated) =>{
            if(err) return res.status(500).send({message:"Error al actualizar"});

            if(!projectUpdated) return res.status(404).send({message:"No se ha podido actualizar el proyecto"});


            return res.status(200).send({project:projectUpdated});

        });
    },

    deleteProject : function(req, res){
        let id = req.params.id;

        Project.findByIdAndRemove(id, (err, projectDelete)=>{
            if(err) return res.status(500).send({message:"Error al eliminar"});

            if(!projectDelete) return res.status(404).send({message:"No se ha podido elminar el proyecto"});

            return res.status(200).send({project:projectDelete,message:"Project eliminado!"});
        });
    },

    uploadImage: function(req, res){
        let id = req.params.id;
        var filename = 'Imagen no subida';

        if(req.files){

            var filepath = req.files.image.path;
            var filesplit = filepath.split('\\');
            var _filename= filesplit[1];
            var extSplit = _filename.split('\.');
            var fileExt = extSplit[1];

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt =='gif'){

                Project.findByIdAndUpdate(id, {image: _filename}, {new: true}, (err, projectUpdated) =>{
                    if(err) return res.status(500).send({message:"El archivo no se ha subido"});
        
                    if(!projectUpdated) return res.status(404).send({message:"El proyecto no existe"});
        
        
                    return res.status(200).send({project:projectUpdated});
        
                });
            }else{
                fs.unlink(filepath, (err)=>{
                    return res.status(200).send({message:"la extension no es valida"});
                });
            }


             
        }
        else{
            return res.status(200).send({message: filename});
        }

    },

    getImageFile: function(req, res){
        var file = req.params.image;
        console.log(req.params);
        var path_file = './uploads/'+ file;

        fs.exists(path_file, function(exist){
            if(exist){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(200).send({
                    message:'No exise la ruta'
                });
            }
        });
    }
}

module.exports = controller;