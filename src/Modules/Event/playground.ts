export default `mutation createEvent{
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
