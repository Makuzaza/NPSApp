const graphql = require("graphql");
const Submission = require("../models/Submission");
const User = require("../models/User");
const { signup, login } = require("./resolvers/user");
const { UserType, SubmissionType, successLoginType } = require("./types");
const { GraphQLInt, GraphQLObjectType, GraphQLNonNull, GraphQLString } =
  graphql;

const mutation = new GraphQLObjectType({
  name: "RootMutationType",
  fields: {
    createSubmission: {
      type: SubmissionType,
      args: {
        score: {
          type: new GraphQLNonNull(GraphQLInt),
        },
        feedback: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(_, args) {
        const newSubmission = new Submission({
          score: args.score,
          feedback: args.feedback,
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
        secret: {
          type: new GraphQLNonNull(GraphQLString),
          defaultValue: "",
          
        },
      },
      async resolve(_, args) {
        return signup(args);
      },
    },
    authenticateUser: {
      type: successLoginType,
      args: {
        username: {
          type: new GraphQLNonNull(GraphQLString),
        },
        password: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      async resolve(_, args) {
        return login(args);
      },
    },
  },
});

module.exports = mutation;
