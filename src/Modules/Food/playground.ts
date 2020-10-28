export default `mutation createFood{
    createFood(data:{
      title: "Watermelon",
      icon:"🍉",
      body:"Fusce sagittis, nisl commodo bibendum tempor, lacus ex vulputate nisi, in iaculis nulla lorem ac urna."
    }){
      food{
        id
        title
        body
        icon
      }
      errors{
        field
        message
      }
    }
  }
  
  query listFood{
    listFood{
      foods{
        id
        title
        icon
        body
      }
      errors{
        field
        message
      }
    }
  }`;
