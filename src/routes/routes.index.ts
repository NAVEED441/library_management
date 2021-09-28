import express from 'express';
import { BookRoutesApi } from './book.routes';
import { AdminRoutesApi } from './admin.routes';
import {MemberRoutesApi} from './member.routes'
export class MainRoutes{
    router:express.Router;
    constructor(){
        this.router = express.Router();
        this.routes()
    }
     routes(){
         this.router.use('/book', BookRoutesApi);
         this.router.use('/admin', AdminRoutesApi);
         this.router.use('/member', MemberRoutesApi)
       
     }
}
export const MainApi = new MainRoutes().router;