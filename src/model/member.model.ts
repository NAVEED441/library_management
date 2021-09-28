import { Schema,model, Mongoose } from "mongoose";
import { IMember } from "../types/document/IMember";
const IMemberSchema = new Schema({
    Name:{type:String},
    Cell:{type:String},
    Adress:{type:String},
    Email:{type:String},
    Password:{type:String},
    IssueBooks:
    [
        
        {
            BookId:{type:Schema.Types.ObjectId,
                ref:'BookSchema'},
            IssueDate:{type:Date, default:Date.now},
            returnDate:{type:String},
            Bill:{type:Number},
        }
    ],
    TotalBill:{type:Number},},
    {
        timestamps:true

    });
    export const MemberSchema = model<IMember>('MemberSchema',IMemberSchema);