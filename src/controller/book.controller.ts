import { IBook } from "../types/document/IBook";
import { MainBook } from "../repositories/book.repositories";
import { Post,Route,Put,Tags,Body,Security } from "tsoa";
import CustomError from '../utills/error'
import { SaveReqBook,UpdateReqBook,GetReqBook, GetByBookName } from "../types/request/book.req";
import { SaveUpdateResBook } from "../types/response/book.res";
@Route('book')
@Tags('book')
export class BookController{
    constructor(){}
    @Security('api_key')
    @Post('/savebook')
    async saveBook(@Body() savreq:SaveReqBook): Promise<SaveUpdateResBook>{
        const new_book:IBook = await new MainBook().saveBook(savreq);
        return <SaveUpdateResBook>new_book;
    }
    @Put('/updatebook')
    async updateBook(@Body() updatereq:UpdateReqBook): Promise<SaveUpdateResBook>{
        const updated_book:IBook = await new MainBook().updateBook(updatereq);
        if(updated_book===null) { 
            throw new CustomError('404',"book not found")}
        else{
            return <SaveUpdateResBook>updated_book;
        }

    };
    @Post('/getbookbyId')
    async GetBookById(@Body() getreq:GetReqBook):Promise<SaveUpdateResBook>{
        const getbook:IBook =<any> await new MainBook().getBookById(getreq._id)
        if(getbook===null) { 
            throw new CustomError('404',"book not found")}
        else{
            return <SaveUpdateResBook>getbook;
        }
    }
    @Post('/getbookByname')
    async getBookByName(@Body() getreq:GetByBookName):Promise<SaveUpdateResBook>{
        const getbook:IBook =<any> await new MainBook().getBookByName(getreq.Title)
        if(getbook===null) { 
            throw new CustomError('404',"book not found")}
        else{
            return <SaveUpdateResBook>getbook;
        }
    }
}