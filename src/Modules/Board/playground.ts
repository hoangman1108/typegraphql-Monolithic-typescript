export default `mutation createBoard {
  createBoard(data: { title: "this is board 3" }) {
    board {
      id
      user
      title
      joined
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

mutation joinedBoard {
  joinedBoard(
    data: {
      board: "5f9d15b09bbf86002a4928de"
      user: "5f946b9f4b00553f0cd80f4e"
    }
  ) {
    board
    errors {
      field
      message
    }
  }
}
`;
