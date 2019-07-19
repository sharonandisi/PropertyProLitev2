
import express from "express";
import "@babel/polyfill";
import router from "./usingDB/routes/index";
import bodyParser from "body-parser";




const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));


// app.use('*', cloudinaryConfig);
app.use(express.json());



app.use('/', router);


app.get('/', (req, res) => {
    return res.status(200).send({"message":"YaY! first endpoint works"});
});

app.listen(port, () => console.log(`Server started on port ${port}`));


export default app;

