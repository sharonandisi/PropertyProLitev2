import express from "express";
import "@babel/polyfill";
import router from "./routes";
import { urlencoded, json } from "body-parser";
import { cloudinaryConfig } from "./config/cloudinaryConfig";



const app = express();


app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use("*", cloudinaryConfig);
// eslint-disable-next-line quotes
app.use('/', router);

// eslint-disable-next-line quotes
app.get('/', (req, res) => {
    return res.status(200).send({"message":"YaY! first endpoint works"});
});

app.listen(5000);
console.log("app running on port", 5000);

export default app;

