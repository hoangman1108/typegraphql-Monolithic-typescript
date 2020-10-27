/* eslint-disable max-len */
export default `mutation login {
  login(data: { email: "hoangman772@gmail.com", password: "man123" }) {
    user {
      profile {
        id
        email
        password
        name
      }
      token {
        accessToken
      }
    }
    errors {
      message
      field
    }
  }
}
query newToken{
  getNewAccessToken(data:{
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpVCJ9.eyJ1c2VyIjoiaG9hbmdtYW43NzJAZ21haWwuY29tIiwiaWF0IjoxNjAzNzc2OTc0LCJleHAiOjE2MDM3NzY5OTQsImF1ZCI6IkI1NUVGNDE1MThBRUQiLCJpc3MiOiI2QUMzRTlBNzhFMzE2Iiwic3ViIjoiNWY5NDZiOWY0YjAwNTUzZjBjZDgwZjRlIn0.hERgxj36_brX09soAfzUUwvqg7J1Su84foTq3p6uU2E"
  }){
    token
    errors{
      field
      message
    }
  }
}
`;
