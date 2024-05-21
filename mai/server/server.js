const app = require("express")();
const bodyParser = require("body-parser");
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

var video = [
    {
        id: 1,
        title: "Card 1",
        text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
        videoUrl: "https://www.youtube.com/embed/kJMDjXf-3bE"
    },
];

app.post("/add", async (req, res) => {
    console.log(req.body);
    try {
        const id = video[video.length - 1].id + 1
        const newVideo = {
            id: id,
            title: req.body.title,
            text: req.body.content,
            videoUrl: req.body.video,
        }
        video.push(newVideo);
        console.log(video)
    } catch (err) {
        res.send({ error: true });
    }
});

app.get("/video", async (req, res) => {
    try {
        res.send({ video: video });
    } catch (err) {
        res.send({ error: true });
    }
});

app.put("/edit", async (req, res) => {
    try {
        const videoIndex = video.findIndex(item => item.id === req.body.id);
        if (videoIndex !== -1) {
            const updatePost = {
                id: req.body.id,
                title: req.body.title,
                text: req.body.content,
                videoUrl: req.body.video,
            };
            video[videoIndex] = updatePost;
            res.send({ error: false });
        }
    } catch (err) {
        res.send({ error: true });
    }
});

app.post("/delete", (req, res) => {
    try {
        console.log(req.body)
        video = video.filter(item => item.id !== req.body.id);
        res.send({ error: false });
    } catch (err) {
        res.send({ error: true });
    }
});


const port = 5000
app.listen(port, () => {
    console.log("app is running on port : ", port);
});