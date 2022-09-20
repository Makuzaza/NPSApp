const { SubmissionType } = require("./types");
const graphql = require("graphql");
const { getAllSubmission } = require("./resolvers/submission");
const { GraphQLList, GraphQLObjectType } = graphql;

const query = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllSubmissions: {
      type: GraphQLList(SubmissionType),
      resolve: async (_, __, req) => {
        return getAllSubmission(req);
      },
    },
  },
});

module.exports = query;
