export default `mutation createTask {
  createTask(
    data: {
      name: "this is new task 1"
      status: "run"
      like: 0
      board: "5f9ad6c55e17e9317462c276"
    }
  ) {
    task {
      id
      name
      status
      like
      board
      createdBy
      updatedBy
    }
    errors {
      field
      message
    }
  }
}

query listTask{
  listTask(data:{
    board: "5f9ad6c55e17e9317462c276"
  }){
    tasks{
      id
      name
      like
      board
      createdBy
      updatedBy
    }
    errors{
      field
      message
    }
  }
}`;
