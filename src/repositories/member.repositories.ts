import { MemberSchema } from "../model/member.model";
import { SaveReqMember,GetMember, OldMember, MemberReturnBook } from "../types/request/member.req";
export class MainMember{
    constructor(){}
    saveMember(savereq:SaveReqMember){
        return new MemberSchema(savereq).save();
    };
    getMember(Id:string){
        return MemberSchema.findById(Id);
    };
    saveoldMember(savereq:OldMember){
        return MemberSchema.findOne({
            Email:savereq.Email
        })
    };
    returnBook(savereq:MemberReturnBook){
        return MemberSchema.findOne({
            Email:savereq.Email
        })
    };
    
    

}