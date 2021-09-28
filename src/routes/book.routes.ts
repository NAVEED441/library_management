import express from 'express';
import { SaveUpdateResBook } from '../types/response/book.res';
import { SaveReqBook, UpdateReqBook, GetReqBook, GetByBookName } from '../types/request/book.req';
import { BookController } from '../controller/book.controller';
import { auth } from '../middleware/auth';

export class BookRoutes{
    router : express.Router;
    constructor(){
        this.router = express.Router();
        this.routes();
    }
    routes(){
        this.router.post('/savebook',auth,async(req,res,next)=>{
            try{
                const savereq:SaveReqBook = req.body;
                const new_book:SaveUpdateResBook = await new BookController().saveBook(savereq);
                res.status(200).json({
                    result:new_book
                });
            }catch(err){
                next(err)
            }
        });
        this.router.put('/updatebook', async(req,res,next)=>{
            try{
                const updatereq:UpdateReqBook = req.body;
                const update_book:SaveUpdateResBook = await new BookController().updateBook(updatereq);
                if(update_book!==null){
                res.status(200).json({
                    result:updatereq
                })
            }
            }catch(err){
                next(err);
            }
        });
        this.router.post('/getbookbyId', async(req,res,next)=>{
            try{
                const getbook:GetReqBook = req.body;
                const get_book:SaveUpdateResBook = await new BookController().GetBookById(getbook);
                res.status(200).json({
                    result:get_book
                })

            }catch(err){
                next(err)
            }
        });
        this.router.post('/getbookByname', async(req,res,next)=>{
         try{
             const getbook:GetByBookName = req.body;
             const get_book:SaveUpdateResBook = await new BookController().getBookByName(getbook);
             res.status(200).json({
                 result:get_book
            });

         }catch(err){
             next(err)
         }
        });
    }
}
export const BookRoutesApi = new BookRoutes().router;