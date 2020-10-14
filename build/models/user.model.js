"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCollection = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
userSchema.pre('save', function save(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt_1.default.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt_1.default.hash(user.password, salt, (Err, hash) => {
            if (Err) {
                return next(Err);
            }
            user.password = hash;
            next();
        });
    });
});
// eslint-disable-next-line func-names
const comparePassword = async function (candidatePassword) {
    const result = await bcrypt_1.default.compare(candidatePassword, this.password);
    return result;
};
userSchema.methods.comparePassword = comparePassword;
exports.UserCollection = mongoose_1.model('user', userSchema);
//# sourceMappingURL=user.model.js.map