class Application extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      arrProperties: []
    };
  }

  componentDidMount() {
    const json = fetch('/api/properties');
    json
      .then(data => data.json())
      .then(arr => {
        console.info(`Loaded ${arr.length} data items.`);
        this.setState({
          arrProperties: arr
        });
      })
      .catch(err => console.error(err));
  }

  render() {

    const rows = this.state.arrProperties
      .map((value, index) =>
        <tr key={index}>
          <td>{value.owner.split(/\s+/)
                .map( function(word) { 
                  //console.log( word );
                  return word.charAt(0).toUpperCase() + word.substr(1);
                })
                .join(' ')
          }</td>
          <td>
            {value.address.line1}<br/>
            {value.address.line2 && 
              <div>
                {value.address.line2}<br/>
              </div>
            }
            {value.address.line3 && 
              <div>
                {value.address.line3}<br/>
              </div>
            }
            {value.address.line4}<br/>
            {value.address.postCode}
            <br/>
            {value.address.city}
            <br/>
            {value.address.country}
          </td>
          <td>{parseFloat(value.incomeGenerated).toFixed(2)} £</td>
        </tr>
      );
    
    return (
      <div className="App">

        <div className="App-header">
          <h2>Properties List</h2>
        </div>

        <table>

          {/*<caption>
            Properties List
          </caption>*/}

          <colgroup>
            <col id="owner" />
            <col id="address" />
            <col id="income" />
          </colgroup>
          
          <thead>
            <tr>
              <th scope="col">Owner</th>
              <th scope="col">Address</th>
              <th scope="col">Generated Income</th>
            </tr>
          </thead>

          <tbody>
            {rows}
          </tbody>

        </table>

      </div>
    );
  }

}

ReactDOM.render(
  <Application />,
  document.getElementById('root')
);


