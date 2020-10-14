"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventCollection = void 0;
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true });
exports.EventCollection = mongoose_1.model('event', eventSchema);
//# sourceMappingURL=event.model.js.map