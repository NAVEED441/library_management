import express,{Application,Request,Response,NextFunction} from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { MainApi } from './routes/routes.index';
import { DbMongo } from './config/mongodb.con';
import { Server } from 'http';
const health = require('@cloudnative/health-connect');
let healthCheck = new health.HealthChecker();
import { MongoCluster, MongoDbName} from './utills/Constant';
let server:Server | null= null;
const PORT = process.env.PORT || 3000;
function initApplication():Application{
    new DbMongo().connect(MongoCluster,MongoDbName);
    const app = express();
    app.use(express.json());
    app.use(morgan('tiny'));
    app.use(express.static('public'));
    app.use("/swagger", swaggerUi.serve, swaggerUi.setup(undefined,{
        swaggerOptions:{
            url: "/swagger.json",
        }
    }) );
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(MainApi);
    app.use((err:any, req:Request, res:Response, next:NextFunction)=>{
        res.locals.message = err.message;
        const status = err.statusCode ||500;
        res.locals.status = status ;
        res.locals.error = req.app.get('env') === 'development' ?err:{};
        res.status(status);
        return res.json({
            error:{
                message:err.message
            }
        });
    });
    app.use('/health', health.LivenessEndpoint(healthCheck))
    app.use('/ready', health.ReadinessEndpoint(healthCheck));
    return app;
}
function start(){
    const app = initApplication();
    server = app.listen(process.env.PORT||PORT, ()=>{
             console.log('Server is started on PORT:'+PORT);
    });
}
start();