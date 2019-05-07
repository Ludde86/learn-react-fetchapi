import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // the data we gonna fetch from the API.
      items: [],
      // to know if the data is fetched or not.
      isLoaded: false
    };
  }

  // here we create our API call
  // this method runs after the render method (when did mount), then updates the render method,
  // so we can output the result here
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      // then we get the result from the API, and convert it to JASON.
      .then(res => res.json())
      // then take the JSON.
      // use arrow function to not lose context of this, witch we will be using to set the
      // state.
      .then(json => {
        this.setState({
          // true because we will get the data from the API (the data has benn loaded).
          isLoaded: true,
          // json is the data we got from the API.
          // we're saving it inside our app component, inside the state so we can reuse it
          // inside the component.
          items: json
        });
      });
  }

  render() {
    // now we can access isLoaded and the items (from the constructor)
    let { isLoaded, items } = this.state;

    // if NOT isLoaded, return a div that tell the user is loading
    if (!isLoaded) {
      return <div>Loading...</div>;
    }

    // if it isLoaded, we want to loop our data and output it.
    // and create a li-element for each object, with the JavaScript map function.
    // we use the map function on our items, witch belongs to the state (items).
    // the map function creates a new array with the results of calling a function for every
    // array element witch lets us loop each object from the API result.
    else {
      return (
        <div className="App">
          <ul>
            {items.map(item => (
              // the key attribute is used by React to be able to know witch items have been
              // modified or updated/removed.
              // we want to output the name and email.
              <li key={item.id}>
                Name: {item.name} | Email: {item.email}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default App;
