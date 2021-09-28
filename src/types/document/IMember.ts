import { Document } from "mongoose";
import { BookIssueData } from "../Books.interface";

export interface IMember extends Document{
    _id:string;
    Name:string;
    Cell:string,
    Adress:string;
    Email:string;
    Password:string;
    IssueBooks:BookIssueData[];
    TotalBill:number;
    createdAt?: string;
    updatedAt?: string;
}