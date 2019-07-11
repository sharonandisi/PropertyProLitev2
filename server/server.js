import express from "express";
import routes from "../server/routes";



const app = express()


app.use(express.json());

routes(app);

app.get('/', (req, res) => {
    return res.status(200).send({'message':'YaY! first endpoint works'})
})

app.listen(5000)
console.log('app running on port', 5000);