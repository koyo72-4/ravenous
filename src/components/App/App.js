import React from 'react';
import './App.css';
import BusinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';
import Yelp from '../../util/Yelp';
import Autocomplete from '../../util/Autocomplete';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      datalist: []
    };
    this.searchYelp = this.searchYelp.bind(this);
    this.complete = this.complete.bind(this);
  }

  searchYelp(term, location, sortBy, results, radius) {
    Yelp.search(term, location, sortBy, results, radius).then(businesses => {
      this.setState({businesses: businesses});
    });
  }

  complete(letters) {
    Autocomplete.complete(letters).then(text => {
      console.log(text);
      this.setState({ datalist: text });
    });
  }

  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar
          searchYelp={this.searchYelp}
          complete={this.complete}
          datalist={this.state.datalist} />
        <BusinessList businesses={this.state.businesses} />
      </div>
    );
  }
}

export default App;
