import { AdminSchema } from "../model/admin.model";
import { SaveReqAdmin, UpdateReqAdmin,LoginAdmin } from "../types/request/admin.req";
export class MainAdmin{
    constructor(){}
    saveAdmin(savereq:SaveReqAdmin){
        return new AdminSchema(savereq).save();
    };
    updateAdmin(updatereq:UpdateReqAdmin){
        return AdminSchema.findByIdAndUpdate(updatereq._id,updatereq,{

            new:true
        });
    };
    loginAdmin(loginadmin:LoginAdmin){
       
        return  AdminSchema.findOne({Email:loginadmin.Email, Password: loginadmin.Password})
        
        }
}