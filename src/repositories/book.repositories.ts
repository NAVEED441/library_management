
import { BookSchema } from "../model/book.model";
import { SaveReqBook,UpdateReqBook,GetReqBook } from "../types/request/book.req";
export class MainBook{
    constructor(){}
    saveBook(savereq:SaveReqBook){
        return new BookSchema(savereq).save();
    };
    updateBook(updatereq:UpdateReqBook){
        return BookSchema.findByIdAndUpdate(updatereq._id,updatereq,{

            new:true
        });
    };
    getBookById(_id:string){
        return BookSchema.findById(_id)
    }
    getBookByName(getbook:string){
        return BookSchema.find({
            Title:getbook
        })
    }
}