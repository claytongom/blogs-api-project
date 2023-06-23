const express = require('express');

// ...init

const app = express();

const userController = require('./controllers/User-Controller');
const categoryController = require('./controllers/Category-Controller');
const postController = require('./controllers/Post-Controller');
const validateNewUser = require('./middlewares/newUserValidate');
const jwtValidate = require('./middlewares/jwtValidate');

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.post('/login', userController.userLogin);
app.post('/user', validateNewUser, userController.userValidate);
app.get('/user', jwtValidate, userController.getAll);
app.get('/user/:id', jwtValidate, userController.getById);
app.post('/categories', jwtValidate, categoryController.create);
app.get('/categories', jwtValidate, categoryController.getAll);
app.get('/post', jwtValidate, postController.getAll);
app.get('/', jwtValidate, categoryController.findAll);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
