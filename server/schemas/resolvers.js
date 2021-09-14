const { User, Thought } = require('../models');

const resolvers = {
    Query: {
        thoughts: async (parent, { username }) => {
            const params = username ? { username } : {};//if username if true pass username as param, if not empty brackets are returned
            return Thought.find(params).sort({ createdAt: -1 });
        },
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        },
        // get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },
        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },
    }
};

module.exports = resolvers;

// A resolver can accept four arguments in the following order:
// parent, args, context, info