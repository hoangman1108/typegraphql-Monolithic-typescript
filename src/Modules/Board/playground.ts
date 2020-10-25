export default `mutation createBoard{
  createBoard(data:{
    name: "this is board 3"
  }){
    board{
      id
      user
      name
    }
    errors{
      field
      message
    }
  }
}

query listBoard{
  listBoard(data:{
    
  }){
    boards{
      id
      name
      user
    }
    errors{
      field
      message
    }
  }
}`;
