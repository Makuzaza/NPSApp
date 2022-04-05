const graphql = require("graphql");

const {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} = graphql;

const SubmissionType = new GraphQLObjectType({
  name: "SubmissionType",
  fields: {
    _id: {
      type: GraphQLID,
    },
    score: {
      type: GraphQLInt,
    },
    feedback: {
      type: GraphQLString,
    },
    created_at: {
      type: GraphQLString,
    },
    message: {
      type: GraphQLString,
    },
    error: {
      type: GraphQLString,
    },
    success: {
      type: GraphQLBoolean,
    },
  },
});

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    username: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
  },
});

const successLoginType = new GraphQLObjectType({
  name: "successLoginType",
  fields: {
    access_token: {
      type: GraphQLString,
    },
    message: {
      type: GraphQLString,
    },
    error: {
      type: GraphQLString,
    },
    success: {
      type: GraphQLBoolean,
    },
  },
});

module.exports = { UserType, SubmissionType, successLoginType };
