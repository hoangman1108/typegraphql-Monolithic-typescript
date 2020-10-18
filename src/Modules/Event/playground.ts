export default `mutation createEvent {
  createEvent(data: { title: "hoang man", description: "description man",
  image:"D:/write/topic.png"}) {
    event {
      id
      description
      title
      image
    }
    errors {
      field
      message
    }
  }
}

mutation deleteEvent {
  deleteEvent(data: { id: "5f87d66b9f644a9aac35fdfc" }) {
    event
    errors {
      field
      message
    }
  }
}
`;
