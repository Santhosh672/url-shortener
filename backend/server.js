import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import Url from './models/url.model.js';
import { hashUrl, to_base_62 } from './config/generator.js';
import cors from 'cors';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("<h1>Hello World!!!</h1>");
});

app.post('/api/shorten', async function (req, res) {
    const originalURL = req.body.originalURL;

    if (!originalURL) {
        return res.status(400).json({success: false, message: "Please provide all fields"});
    }

    try {
        new URL(originalURL);
    } catch (_) {
        return res.status(400).json({ success: false, message: "Invalid URL format" });
    }

    try {
        const existing = await Url.findOne({originalURL});
        if (existing) {
            return res.status(200).json({success: true, data: {originalURL: existing.originalURL, shortId: existing.shortId}});
        }

        const hashNum = hashUrl(originalURL);
        const shortId = to_base_62(hashNum);
        console.log(shortId);

        const newURL = new Url({ originalURL: originalURL, shortId: shortId });
        await newURL.save();
        res.status(201).json({ success: true, data: newURL });
    } catch (error) {
        console.error("Error in create url: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

app.get('/:shortId', async (req, res) => {
    const urlEntry = await Url.findOne({shortId: req.params.shortId});

    if (!urlEntry) {
        res.status(404).json({success: false, message: "Url does not exist"});
    }

    try {
        urlEntry.clicks++;
        await urlEntry.save();

        res.redirect(urlEntry.originalURL);
    } catch (error) {
        res.status(500).json({success: false, message: "Server error: " + error.message});
    }
});

app.listen(5000, function() {
    connectDB();
    console.log("Server initiated!");
});