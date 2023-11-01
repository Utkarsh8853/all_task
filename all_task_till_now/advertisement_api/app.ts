import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { authRouter } from './src/routes/auth.route';
import { dashboardRouter } from './src/routes/user-dashboard.route';
import { productRouter } from './src/routes/product.route';

const app:Express = express();
app.use(express.json());
app.use(bodyParser.urlencoded( {extended: true} ));

const port = 6000;
const hostname = "127.0.0.1";

app.use("/auth", authRouter);
app.use("/dashboard", dashboardRouter);
app.use("/product", productRouter);

app.listen(port, hostname, () => {
  console.log(`Server started on port ${port}`);
});
