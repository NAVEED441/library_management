export interface SaveReqBook{
    Title:string;
    Quantity:number;
    Author:string;
    Category:string;
}
export interface UpdateReqBook{
    _id:string;
    Title:string;
    Quantity:number;
    Author:string;
    Category:string;
}
export interface GetReqBook
{
    _id:string;
}
export interface GetByBookName{
    Title:string
}

