import express from "express";
import '@babel/polyfill';
import routes from "./routes/userRoutes";



const app = express()


app.use(express.json());

app.use('/api/v1',routes);

app.get('/', (req, res) => {
    return res.status(200).send({'message':'YaY! first endpoint works'})
})

app.listen(5000)
console.log('app running on port', 5000);

export default app;