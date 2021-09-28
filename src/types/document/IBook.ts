import { Document } from "mongoose";
export interface IBook extends Document{
    _id:string;
    Title:string;
    Quantity:number;
    Author:string;
    Category:string;
    createdAt?: string;
    updatedAt?: string;
}