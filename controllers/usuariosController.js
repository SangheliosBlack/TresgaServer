const s3 = require("../config/s3.config.js");
const User = require('../models/user.js');
const mongoose = require('mongoose');
const path = require('path');
const fs = require("fs");

const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/appError');
const RequestUtil = require('../utils/requestUtils');

 var controller = {
    guardarFotoPerfil : async(req,res)=>{

        const usuario = await User.findById(req.uid);
        const ext = path.extname(req.file.path);
        const s3Client = s3.s3Client;
        var paramsDelete= {  Bucket:process.env.Bucket , Key: usuario.profilePhotoKey};
        const params = s3.uploadParams;
        
        fs.readFile(req.file.path,async function( err, data)  {
            
            params.Bucket      = process.env.Bucket,
            params.Key         = `storage/${usuario._id}/`+`profile_image_${Date.now()}`+ext,
            params.Body        = data,
            params.ContentType = req.file.mimetype
    
            const complete = new Promise((resolve)=>{

                s3Client.upload(params,(err,data)=>{

                     resolve(data);
                
                });
            
            });
        
            complete.then( async (newData)=>{
    
                if(usuario.profilePhotoKey){
    
                    const deleteComplete = new Promise((resolve)=>{

                        s3Client.deleteObject(paramsDelete,(err,data)=>{
                            resolve(data);
                        });

                    });
    
                    deleteComplete.then(async(deleteObject)=>{
    
                        await User.findByIdAndUpdate(req.uid,{$set:{profile_photo_key:newData.Key}});
    
                        return res.json({ok:true,url:newData.Key});
    
                    });
                    
                }else{
                    
                    await User.findByIdAndUpdate(req.uid,{$set:{profile_photo_key:newData.Key}});
        
                    return res.json({ok:true,url:newData.Key});
                    
                }
    
            });
    
        });
    
    },
    getUsers: catchAsync(async (req, res, next) => {
        try {
            const users = await User.find();
            res.status(200).json(RequestUtil.prepareSingleResponse('success', users, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    getUserById: catchAsync(async (req, res, next) => {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json(RequestUtil.prepareSingleResponse('success', user, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    createUser: catchAsync(async (req, res, next) => {
        try {
            const newUser = new User(req.body);
            await newUser.save();
            res.status(200).json(RequestUtil.prepareSingleResponse('success', { user: newUser }, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    updateUser: catchAsync(async (req, res, next) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(RequestUtil.prepareSingleResponse('success', user, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    }),

    deleteUser: catchAsync(async (req, res, next) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json(RequestUtil.prepareSingleResponse('success', { ok: true }, 'data'));
        } catch (error) {
            next(new AppError(500, 'Ocurrió un error en esta operación', 'APP_00', 'data', [{ message: error.message }]));
        }
    })
}

module.exports = controller 