const Submission = require("../../models/Submission");

module.exports = {
  getAllSubmission: async (req) => {
    if (!req.isAuth) {
      return [{ message: "unauthorized", success: false }];
    }
    return Submission.find({});
  },
};
