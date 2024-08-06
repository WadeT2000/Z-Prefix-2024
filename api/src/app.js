const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV || "development"]);

const SECRET_KEY = "my_secret_key"; 

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(bodyParser.json());
app.use(cookieParser());

app.post("/verify", async (req, res) => {
    const { fname, lname, user, pass, type } = req.body;
    let query = await knex('users').select("*").where("username", user);

    
    if (type === "login") {
        if (query.length === 1 && await bcrypt.compare(pass, query[0].password)) {
            const token = jwt.sign({ username: user }, SECRET_KEY, { expiresIn: '1d' });
            await knex('users').update({auth_token: token}).where("username", user);
            res.cookie('auth_token', token, { httpOnly: true, secure: false });
            res.status(200).json({ message: "Logging you in", token });
        } else {
            res.status(404).json({ message: "Incorrect username or password" });
        }
    } else if (type === "create") {
        if (query.length === 0) {
            const hashedPassword = await bcrypt.hash(pass, 10);
            await knex('users').insert({ first_name: fname, last_name: lname, username: user, password: hashedPassword, auth_token: ''});
            res.status(200).json({ message: "User created" });
        } else {
            res.status(401).json({ message: "User exists with that username already" });
        }
    } else {
        res.status(404).json({ message: "Invalid operation" });
    }
});


app.get('/users', (req, res) => {
    knex('users')
    .select('*')
    .then(data => res.status(200).json(data))
})

app.get(`/items`, (req, res) => {
    const { search } = req.query;
    let specificitem = knex('item').select('*')
    if (search) {
        specificitem = specificitem.where('item_name', 'like', `%${search}%`);
    } 
        specificitem.then(data => res.status(200).json(data))
        .catch(error => res.status(500).json({ error: error.message }))
})


app.get('/inventory', async (req, res) => {
    username = ''
    const token = req.cookies.auth_token;
    await knex('users').select('*').where('auth_token', token).then(data => username = data[0].username)
    await knex('item').select('*').where('user_name', username).then(data => res.status(200).json(data))
})


app.listen(port, () => console.log(`Express server listening on port ${port}`))

