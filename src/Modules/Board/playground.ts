export default `mutation createBoard {
  createBoard(data: { title: "this is board 3" }) {
    board {
      id
      user
      title
      date
    }
    errors {
      field
      message
    }
  }
}

query listBoard {
  listBoard(data: {}) {
    boards {
      id
      title
      user
      date
    }
    errors {
      field
      message
    }
  }
}

mutation deleteBoard {
  deleteBoard(data: { id: "" }) {
    board
    errors {
      field
      message
    }
  }
}
`;
