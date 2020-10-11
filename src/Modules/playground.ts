export default `mutation createUser{
  createUser(data: {
    email:"hoangman123@gmail.com"
    password: "man123"
  }){
    user{
      id
      email
      password
    }
    errors{
      field
      message
    }
  }
}`;
