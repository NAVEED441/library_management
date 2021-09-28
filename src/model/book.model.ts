import { Schema,model } from "mongoose";
import { IBook } from "../types/document/IBook";

const IBookSchema = new Schema ({
    Title:{type:String},
    Quantity:{type:Number},
    Author:{type:String},
    Category:{type:String},
},
    {
        timestamps:true
    }
);
export const BookSchema = model<IBook>("BookSchema",IBookSchema);