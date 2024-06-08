import { URL } from "../model/urlModel.js";
import shortid from "shortid";
import QRcode from 'qrcode'

export async function handleFindAllURLs (req, res) {
    try {
        const urls = await URL.find({});
        if (urls.length === 0) {
            return res.status(404).send("No URLs found");
        }
        return res.send(urls);
    } catch (error) {
        return res.status(500).send("Error fetching URLs: " + error.message);
    }
}


export async function handleCreateNewShortId(req, res) {
    const { url } = req.body;
    // console.log(url);
    if (!url) return res.status(400).send("URL required");

    try {
        const shortId = shortid.generate();
        const qrCodeURL = await QRcode.toDataURL(url);

        const newURL = {
            shortId: shortId,
            redirectURL: url,
            qrCode: qrCodeURL,
            visitHistory: []
        };

        const result = await URL.create(newURL);


        return res.send({ id: shortId, qrCode: qrCodeURL });
    } catch (error) {
        return res.status(500).send("Error creating URL: " + error.message);
    }
}


export async function handleGetVisitHistory(req, res) {
    const { shortId } = req.params
    const result = await URL.findOneAndUpdate({ shortId }, {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            },
        },
    })

    res.redirect(result?.redirectURL)
}


export async function handleGetAnalytics (req, res) {
    const { shortId } = req.params

    const result = await URL.findOne({ shortId })
    if (!result) return res.send("ID not found")
    res.json({
        views: result.visitHistory.length,
        analytics: result.visitHistory
    })
}
