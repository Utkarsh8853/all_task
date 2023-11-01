import express, { Express } from 'express';
import { serverConfig } from './envConfig';
import connect from './src/database/mongo.db';
import swaggerUi from 'swagger-ui-express';
import * as YAML from "yamljs"
import * as path from "path"
import { adminAuthRouter, adminRouter, authRouter, chatbotRouter, dashboardRouter, deliveryRouter, productRouter } from './src/routes/router'
import { adminContext, buyerContext, chatbotContext, context, sellerContext, userContext } from './src/constant/constant';

class App {
    private app: Express;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.listen();
    }

    private config(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }
    

    private routes(): void {

        const swaggerDocument = YAML.load(path.join(__dirname, './swagger.yaml'));
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        this.app.use(sellerContext, authRouter);
        this.app.use(buyerContext, authRouter);
        this.app.use(adminContext, adminAuthRouter);
        this.app.use(adminContext, adminRouter);
        this.app.use(userContext, dashboardRouter);
        this.app.use(context, productRouter);
        this.app.use(chatbotContext, chatbotRouter);
        this.app.use(context, deliveryRouter);
    }

    private listen(): void {
        const port = serverConfig.PORT;
        const hostname = serverConfig.HOST;
        this.app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    }
}

connect;
new App();
