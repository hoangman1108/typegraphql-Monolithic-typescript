"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `mutation createEvent{
  createEvent(data:{
    title:"hoang man",
    description:"description man"
  }){
    event{
      id
      description
      title
    }
    errors{
      field
      message
    }
  }
}`;
//# sourceMappingURL=playground.js.map