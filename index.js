const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors())

const mongourl = 'mongodb+srv://reigns:reigns@cluster0.jcmx0zk.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database Connected'))
    .catch(err => console.error('Database Connection Error:', err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    task: {
        type: String,
        required: true
    },
    email: {
        type: String,
    }
});

const User = mongoose.model('User', userSchema);

app.get("/", (req, res) => {
    User.find({}).then(r => res.json(r));
});

app.get('/users', (req, res) => {
    User.find({}, '').then(users => res.json({ users: users })).catch(e => {
        res.send(e);
    });
});

app.post('/users', (req, res) => {
    const { username, email, task } = req.body;

    console.log(req.body);

    new User({
        username,
        task,
        email
    }).save().then(user => res.json({ data: user })).catch(e => {
        res.status(400).send(e);
    });
});


app.listen(3000, () => console.log('Server Started at port 3000'));