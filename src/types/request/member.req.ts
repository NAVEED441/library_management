import { BookIssueData } from "../Books.interface";

export interface SaveReqMember{
    Name:string;
    Cell:string,
    Adress:string;
    Email:string;
    Password:string;
    IssueBooks:BookIssueData[];
    TotalBill:number;
}
export interface UpdateReqMember{
    _id:string;
    Name:string;
    Cell:string,
    Adress:string;
    Email:string;
    Password:string;
    IssueBooks:BookIssueData[];
    TotalBill:number;
}
export interface GetMember{
    id:string;
}
export interface MemberReturnBook{
    Email:string;
   BookId:string;
    
}
export interface OldMember{
    Email:string;
    IssueBooks:BookIssueData[];
}