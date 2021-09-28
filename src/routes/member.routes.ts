import express from 'express';
import { MemberController } from '../controller/member.controller';
import { SaveReqMember,GetMember, OldMember, MemberReturnBook } from '../types/request/member.req';
import { SaveUpdateResMember } from '../types/response/member.res';
import { MemberSchema } from '../model/member.model';
import { IMember } from '../types/document/IMember';
import { BookIssueData } from '../types/Books.interface';
import e from 'express';
export class MemberRoutes{
    router : express.Router;
    constructor(){
        this.router = express.Router();
        this.routes();
    }
    routes(){
        this.router.post('/saveMember',async(req,res,next)=>{
            try{
                const savereq:SaveReqMember = req.body;
                console.log(savereq.IssueBooks , "checking")
                const updated_data:IMember =<any> await MemberSchema.findOne({Email:savereq.Email})
               
                var totalbill = 0;
                 if(updated_data){
                     
                    savereq.IssueBooks.forEach(i => {
                         totalbill += i.Bill
                     });
                    
                    savereq.IssueBooks.map(e=>{
                        
                    updated_data.IssueBooks.push({
                        BookId:e.BookId,
                        IssueDate:e.IssueDate,
                        returnDate:e.returnDate,
                        Bill:e.Bill
                      } )
                       })

                       updated_data.TotalBill +=totalbill;
                  console.log(updated_data.IssueBooks)
                   
                
                const new_book:SaveUpdateResMember = await new MemberController().saveMember(updated_data);
                res.status(200).json({
                    result:new_book
                });
            }else{
                savereq.IssueBooks.forEach(i => {
                    totalbill += i.Bill
                });
                savereq.TotalBill = totalbill;
                const new_book:SaveUpdateResMember = await new MemberController().saveMember(savereq);
                res.status(200).json({
                    result:new_book
                });
            }
           }
            catch(err){
                next(err)
            }
        });
        this.router.post('/getmember', async(req,res,next)=>{
            try{
                const getreq:GetMember = await req.body;
                const getmember:SaveUpdateResMember = await new MemberController().getMember(getreq)
                res.status(200).json({
                    result:getmember
                });

            }catch(err){
                next(err)
            }
        });
        this.router.post('/IssuetooldMember',async(req,res,next)=>{
            try{
                const savereq:OldMember = req.body;
              
                const updated_data:IMember =<any> await MemberSchema.findOne({Email:savereq.Email})
               
                var totalbill = 0;
                 if(updated_data){
                     
                    savereq.IssueBooks.forEach(i => {
                         totalbill += i.Bill
                     });
                    
                    savereq.IssueBooks.map(e=>{
                        
                    updated_data.IssueBooks.push({
                        BookId:e.BookId,
                        IssueDate:e.IssueDate,
                        returnDate:e.returnDate,
                        Bill:e.Bill
                      } )
                       })

                       updated_data.TotalBill +=totalbill;
                  console.log(updated_data.IssueBooks)
                   
                
                const new_book:SaveUpdateResMember = await new MemberController().saveMember(updated_data);
                res.status(200).json({
                    result:new_book
                });
            }
           }
            catch(err){
                next(err)
            }
        });
        this.router.post('/returnBook',async(req,res,next)=>{
           try{
               const returnreq:MemberReturnBook = req.body;
               const updated_data:IMember =<any> await new MemberController().returnBook(returnreq)
               
               if(updated_data){
                updated_data.IssueBooks.map(e=>{
                 
                  if(e.BookId.toString() === returnreq.BookId){
                    e.returnDate = new Date().toString();
                 
                   
                  }      
                    
               })
               const new_book:SaveUpdateResMember = await new MemberController().saveMember(updated_data);
               res.status(200).json({
                result:new_book
            });
           }}catch(err){
               next(err)
           }
        })
}

}
export const MemberRoutesApi = new MemberRoutes().router;