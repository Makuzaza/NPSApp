const graphql = require("graphql");
const Submission  = require("../models/Submission");
const User = require("../models/User");
const mutation = require("./mutations");
const query = require("./queries");



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





const schema = new GraphQLSchema({ query, mutation });

module.exports = schema