// imports the express npm module
const express = require("express");
// imports the cors npm module
const cors = require("cors");
const {Sequelize, Model, DataTypes} = require('sequelize');
const { init } = require("express/lib/application");
// Creates a new instance of express for our app
const app = express();

// Create Sequelize instance
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

// Define User model
class User extends Model {}
User.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    age: DataTypes.INTEGER,
    isAdmin: DataTypes.BOOLEAN,
    Gender: DataTypes.STRING,
    
}, { sequelize, modelName: 'user' });

// Sync models with database
sequelize.sync();

const users = [
    { firstname: "John" , lastname: "Doe", age: 40, Gender: "female", isAdmin: false },
    { firstname: "Jane" , lastname: "Smith", age: 42, Gender: "female", isAdmin: false },
    { firstname: "Mike" , lastname: "Johnson", age: 43, Gender: "male", isAdmin: false },
    { firstname: "Sarah" , lastname: "Williams", age: 40, Gender: "male", isAdmin: false },
    { firstname: "David" , lastname: "Brown", age: 40, Gender: "male", isAdmin: false }
];
// .use is middleware - something that occurs between the request and response cycle.
app.use(cors());
 // We will be using JSON objects to communcate with our backend, no HTML pages.
app.use(express.json());
// This will serve the React build when we deploy our app
app.use(express.static("react-frontend/dist"));

// This route will return 'Hello Ikea!' when you go to localhost:8080/ in the browser
app.get("/", (req, res) => {
    res.json('Hello Ikea!');
});

app.get('/api/seeds', async (req, res) => {
    users.forEach(u => User.create(u));
    res.json(users);
});

app.get('/api/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

app.get("/api/users/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.json(user);
});

app.post('/api/users', async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});

app.put("/api/users/:id", async (req, res) => {
    const { firstname, lastname, age, Gender, isAdmin } = req.body;

    const user = await User.findByPk(req.params.id);
    await user.update({ firstname, lastname, age, Gender, isAdmin });
    await user.save();
    res.json(user);
});

app.delete('/api/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.json({data: `The user with id of ${req.params.id} is removed.`});
});




// This tells the express application to listen for requests on port 8080
const port = process.env.PORT || 8080;
app.listen(port, async () => {
    console.log(`Server started at ${port}`);
});
