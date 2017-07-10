class Application extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>UI goes here</h2>
        </div>

        { /*<Autocomplete />*/ }

      </div>
    );
  }

}

ReactDOM.render(
    <Application />,
    document.getElementById('root')
);

