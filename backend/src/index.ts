import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes';
import contentRoutes from './routes/content.routes';
import inviteRoutes from './routes/invite.routes'

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRoutes);
app.use("/content", contentRoutes);
app.use("/invite", inviteRoutes);


app.listen(3000, () => {
    console.log('Server is listening on the port 3000');
});