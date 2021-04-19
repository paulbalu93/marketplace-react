export default {
  fetchData: async (callback) => {
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/product/",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI2NjI5ZDk4MzViMDAwMTc1ODRlZTUiLCJpYXQiOjE2MDU3ODgzMTcsImV4cCI6MTYwNjk5NzkxN30.oP4BYUhxzJrIcZ0PWD68xETCimnePC7kIrswf4xirag",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        //this.setState({ products: data });

        callback(data);
      }

      //console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
};
