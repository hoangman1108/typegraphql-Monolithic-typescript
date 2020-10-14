"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `mutation login{
  login(data:{
    email:"hoangman772@gmail.com"
    password:"man123"
  }){
    user{
      profile{
        id
        email
        password
        name
      }
      token{
        kind
        accessToken
        refreshToken
      }
    }
    errors{
      message
      field
    }
  }
}`;
//# sourceMappingURL=playground.js.map