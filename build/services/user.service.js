"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
class UserService {
    async create(user) {
        const create = await user_model_1.UserCollection.create(user);
        return create;
    }
    async list() {
        const list = await user_model_1.UserCollection.find();
        return list;
    }
    async detail(id) {
        const user = await user_model_1.UserCollection.findById(id);
        if (!user) {
            throw new Error('User does not exists');
        }
        const result = {
            id: user.id,
            name: user.name,
            password: user.password,
            email: user.email,
        };
        return result;
    }
    async delete(id) {
        return user_model_1.UserCollection.deleteOne({ _id: id.id }).catch((error) => {
            if (error)
                return 'DELETE_ERROR';
            return 'DELETED_SUCCESS';
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map