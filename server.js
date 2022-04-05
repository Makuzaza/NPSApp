const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const bodyparser = require('body-parser');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');


const schema = require('./graphql/index');
const auth = require('./middlewares/auth');

const app = express();
const port = process.env.PORT || 4000;
const url =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/net_promoter_score';

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// tell Express where to find static content i.e. HTML files, stylesheets, and images
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.use(cors());


app.use(auth)

app.use(
  '/graphql',
  bodyparser.json(),
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
app.listen(port, () => {
  console.log(
    `Express server running on ${port}, GraphQL server running at '${port}/graphql'`
  );
});
