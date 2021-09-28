import express from 'express';
import { SaveReqAdmin,UpdateReqAdmin,LoginAdmin } from '../types/request/admin.req';
import { SaveUpdateResAdmin } from '../types/response/admin.res';
import { AdminController } from '../controller/admin.controller';
import Jwt from 'jsonwebtoken';
import { auth } from '../middleware/auth';
export class AdminRoutes{
    router : express.Router;
    constructor(){
        this.router = express.Router();
        this.routes();
    }
    routes(){
        this.router.post('/saveadmin',auth,async(req,res,next)=>{
            try{
                const savereq:SaveReqAdmin = req.body;
                const new_admin:SaveUpdateResAdmin = await new AdminController().saveAdmin(savereq);
                res.status(200).json({
                    result:new_admin
                });
            }catch(err){
                next(err)
            }
        });
        this.router.put('/updateadmin', async(req,res,next)=>{
            try{
                const updatereq:UpdateReqAdmin = req.body;
                const update_admin:SaveUpdateResAdmin = await new AdminController().updateAdmin(updatereq);
                if(update_admin!==null){
                res.status(200).json({
                    result:update_admin
                })
            }
            }catch(err){
                next(err);
            }
        });
        this.router.post('/loginadmin', async(req,res,next)=>{
            try{
                const authReq: SaveUpdateResAdmin = req.body;
            const authUser = await new AdminController().loginAdmin(authReq);
            if (authUser) {
                console.log(authReq)
                if (authReq.Email === authUser.Email && authReq.Password===authUser.Password) {
                    console.log(authUser)
                    return res.json({
                        token: Jwt.sign({ _id: authUser._id }, 'this is the key'),
                    });
                }
            } else {
                return res.status(400).json({ 
                    message: 'User NOt Found',
                });
            }

            }catch(err){

            }
        })
    }}
    export const AdminRoutesApi = new AdminRoutes().router;