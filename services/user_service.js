const MongoLib = require('../lib/mongo');
const CustomError = require('../utils/customError');

class UserService {
    constructor() {
        this.collection = 'users';
        this.mongoDB = new MongoLib();
    }

    async getUsers() {
        const query = '';
        const users = await this.mongoDB.getAll(this.collection, query);
        return users || [];
    }

    async getUserByUsername({ username }) {
        const query = { username };
        const user = await this.mongoDB.getOne(this.collection, query);
        return user || {};
    }

    async createUser({ newUser }) {
        const {username} = newUser;
        const user = await this.getUserByUsername({ username });
        if (user.username) {
            throw new CustomError(409,'El usuario ya esta tomado, ingresa uno diferente.');
        } else {
            return await this.mongoDB.create(this.collection, newUser);
        }
    }
}

module.exports = UserService;