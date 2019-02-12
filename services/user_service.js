const usersMocks = require('../utils/mocks/users');
const MongoLib = require('../lib/mongo');

class UserService {
    constructor() {
        this.collection = 'users';
        this.mongoDB = new MongoLib();
    }

    async getUsers({ tags }) {
        const query = tags && { tags: { $in: tags } };
        const users = await this.mongoDB.getAll(this.collection, query);
        return users || [];
    }

    async createUser({ user }) {
        const createUserId = await this.mongoDB.create(this.collection, user);
        return createUserId;
    }

}

module.exports = UserService;