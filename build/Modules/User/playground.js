"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `mutation createUser {
  createUser(data: { email: "hoangman123@gmail.com",
    name: "hoang man"
    password: "man13" }) {
    user {
      id
      name
      email
      password
    }
    errors {
      field
      message
    }
  }
}

query listUser{
  listUsers{
    users{
      id
      name
      email
      password
    }
    errors{
      field
      message
    }
  }
}
`;
//# sourceMappingURL=playground.js.map