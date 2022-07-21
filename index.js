import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import multer from './libs/multer.js'
import parseKMZ from 'parse2-kmz'


const app = express();


app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }))

app.use('/uploads', express.static(path.resolve('uploads')))
app.post('/upload', multer.single('archivo'), (req, res) => {
    const { filename } = req.file;

    parseKMZ.toJson('./uploads/' + filename)
        .then((r) => {
            const { coordinates } = r.features[0].geometry
            res.json(coordinates).end();
        })
        .catch((e) => {
            console.error(e);
            res.send('no ok').end();
        });
});

app.listen(5000, () => {
    console.log('server on port 5000')
})