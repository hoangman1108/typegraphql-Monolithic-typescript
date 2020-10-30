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
      history
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

query listTask {
  listTask(data: { board: "5f9ad6c55e17e9317462c276" }) {
    tasks {
      id
      name
      like
      board
      history
      createdBy
      updatedBy
    }
    errors {
      field
      message
    }
  }
}

mutation updateTask{
  updateTask(data:{
    id:"5f9bc9571854a70ee0e9a867",
    status:"wentWell"
  }){
    task{
      id
      name
      like
      board
      history
      createdBy
      updatedBy
    }
    errors{
      message
      field
    }
  }
}

mutation deleteTask{
  deleteTask(data:{
    id:""
  }){
    task
    errors{
      field
      message
    }
  }
}`;
