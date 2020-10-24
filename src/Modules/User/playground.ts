export default `mutation createUser {
  createUser(data: { email: "hoangman772@gmail.com",
    name: "Hoàng Mẫn"
    password: "man123" }) {
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

mutation deleteUser{
  userDelete(data: {
    id: "5f8e5d11565221002a2edbf4"
  }){
    user
    errors{
      field
      message
    }
  }
}
`;
