export default `mutation pushMes {
  pushMessage(data: { title: "title 3", description: "description 3" }) {
    message
    errors {
      field
      message
    }
  }
}

query listRabbit{
  listMessage{
    rabbits{
      title
      description
    }
    errors{
      message
      field
    }
  }
}`;
