import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongosse from 'mongoose';
import dotenv from 'dotenv';

// initializing the app
const app  = express();
dotenv.config();
// ---------------------------------
// routes
import postRoutes from './routes/posts.js';


// cross origin resource sharing
app.use(cors());

// for images and posting data
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));


app.use('/posts', postRoutes); 
//every route inside posts will start with /post

app.get('/', (req, res)=>{
    res.send("Home Page");
})


const PORT = process.env.PORT || 5000

mongosse.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, ()=>console.log(`running on PORT ${PORT}`)))
.catch((error)=>console.log(error));

// mongosse.set('useFindAndModify', false);

