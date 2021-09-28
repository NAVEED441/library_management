import { Post,Route,Put,Tags,Body,Security } from "tsoa";
import CustomError from '../utills/error';
import { IMember } from "../types/document/IMember";
import { SaveReqMember,GetMember,OldMember, MemberReturnBook } from "../types/request/member.req";
import { MainMember } from "../repositories/member.repositories";
import { SaveUpdateResMember } from "../types/response/member.res";
@Route('member')
@Tags('member')
export class MemberController{
    constructor(){}
    @Post('/saveMember')
    async saveMember(@Body() savereq:SaveReqMember):Promise<SaveUpdateResMember>{
        const new_book:IMember = await new MainMember().saveMember(savereq);
        return <SaveUpdateResMember>new_book;
    };
    @Post('/getmember')
    async getMember(@Body() getreq:GetMember):Promise<SaveUpdateResMember>{
        const getmember:IMember =<any> await new MainMember().getMember(getreq.id);
        return <SaveUpdateResMember>getmember;
    }
    @Post('/IssuetooldMember')
    async saveOldMember(@Body() savereq:OldMember):Promise<SaveUpdateResMember>{
        const new_book:IMember =<any> await new MainMember().saveoldMember(savereq);
        return <SaveUpdateResMember>new_book;
    };
    @Post('/returnBook')
    async returnBook(@Body() savereq:MemberReturnBook):Promise<SaveUpdateResMember>{
        const new_book:IMember =<any> await new MainMember().returnBook(savereq);
        return <SaveUpdateResMember>new_book;
    };
    
    
    }
