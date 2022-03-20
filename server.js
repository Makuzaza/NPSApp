const cors = require('cors');
const graphql = require('graphql');
const { graphqlHTTP } = require('express-graphql');
const bodyparser = require('body-parser');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const { Submission, User } = require('./models');

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

const {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
} = graphql;

const SubmissionType = new GraphQLObjectType({
  name: 'SubmissionType',
  fields: {
    _id: {
      type: GraphQLID,
    },
    score: {
      type: GraphQLInt,
    },
    created_at: {
      type: GraphQLString,
    },
  },
});

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    username: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
  },
});

const queryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getAllSubmissions: {
      type: GraphQLList(SubmissionType),
      resolve: () => {
        return Submission.find();
      },
    },
    getAllUsers: {
      type: GraphQLList(UserType),
      resolve: () => {
        return User.find();
      },
    },
  },
});

const mutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    createSubmission: {
      type: SubmissionType,
      args: {
        score: {
          type: new GraphQLNonNull(GraphQLInt),
        },
      },
      resolve(parent, args) {
        const newSubmission = new Submission({
          score: args.score,
        });
        return newSubmission.save();
      },
    },
    createUser: {
      type: UserType,
      args: {
        username: {
          type: new GraphQLNonNull(GraphQLString),
        },
        password: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parent, args) {
        const newUser = new User({
          username: args.username,
          password: args.password,
        });
        return newUser.save();
      },
    },
    authenticateUser: {
      type: GraphQLBoolean,
      args: {
        username: {
          type: new GraphQLNonNull(GraphQLString),
        },
        password: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parent, args) {
        return User.findOne({
          username: args.username,
          password: args.password,
        })
          .then((user) => {
            if (user) {
              return true;
            } else {
              return false;
            }
          })
          .catch((error) => {
            console.log('ERROR: ', error);
            return false;
          });
      },
    },
  },
});

const schema = new GraphQLSchema({ query: queryType, mutation: mutationType });

app.use(
  '/graphql',
  bodyparser.json(),
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
app.listen(port, () => {
  console.log(
    `Express server running on ${port}, GraphQL server running at '${port}/graphql'`
  );
});
