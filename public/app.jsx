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

        //  firing geocoding
        arr.forEach((element, index) => {
          //console.log(element);

          geocodeAddress(element.address, (results, status) => {
            
            let newObj = Object.assign({}, element);
            newObj.geocodingStatus = status;
            
            if (status === 'OK') {
              let res = results[0].geometry.location; // object LatLng
              console.log(`geocoding result: ${res}`);
              newObj.coordinates = res;
            } else {
              const msg = 'Geocode was not successful for the following reason: ' + status;
              //alert( msg );
              console.error(msg);
            }

            arr[index] = newObj;
            this.setState({
              arrProperties: arr
            });

          });
        });

      })
      .catch(err => console.error(err));
  }

  render() {

    const rows = this.state.arrProperties
      .map((value, index) =>
        <tr key={index}>
          <td>{value.owner.split(/\s+/)
            .map(function (word) {
              //console.log( word );
              return word.charAt(0).toUpperCase() + word.substr(1);
            })
            .join(' ')
          }</td>
          <td>
            {value.address.line1}<br />
            {value.address.line2 &&
              <div>
                {value.address.line2}<br />
              </div>
            }
            {value.address.line3 &&
              <div>
                {value.address.line3}<br />
              </div>
            }
            {value.address.line4}<br />
            {value.address.postCode}
            <br />
            {value.address.city}
            <br />
            {value.address.country}
          </td>
          <td>{parseFloat(value.incomeGenerated).toFixed(2)} £</td>

          <td>
            Geocoding status: {value.geocodingStatus}
            <br />
            {value.coordinates &&
              <div>
                {`${value.coordinates}`}
                <br />
                <a target="_blank" href={`/public/map.html?lat=${value.coordinates.lat()}&lng=${value.coordinates.lng()}`}>show on map</a>
              </div>
            }
          </td>

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
            <col id="coordinates" />
          </colgroup>

          <thead>
            <tr>
              <th scope="col">Owner</th>
              <th scope="col">Address</th>
              <th scope="col">Generated Income</th>
              <th scope="col">Within service area?</th>
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

const geocoder = new google.maps.Geocoder();

function geocodeAddress(objAddress, callback) {
  let address = getFullAddress(objAddress);
  console.log(`geocoding address: ${address}`);
  geocoder.geocode(
    {
      'address': address,
      'region': 'GB'
    },
    callback
  );
}

function getFullAddress(objAddress) {
  return `
    ${objAddress.line1} 
    ${!objAddress.line2 ? '' : objAddress.line2} 
    ${!objAddress.line3 ? '' : objAddress.line3} 
    ${objAddress.line4} 
    ${objAddress.postCode} 
    ${objAddress.city} 
    ${objAddress.country}`
}
