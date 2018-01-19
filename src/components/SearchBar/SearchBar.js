import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      location: '',
      sortBy: 'best_match',
      results: 20,
      radius: 0
    };

    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleRadiusChange = this.handleRadiusChange.bind(this);
    this.handleKeyPress= this.handleKeyPress.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    this.sortByOptions = {
      'Best Match': 'best_match',
      'Highest Rated': 'rating',
      'Most Reviewed': 'review_count',
      'Distance': 'distance'
    };

    this.resultOptions = {
      '10 results': 10,
      '20 results': 20,
      '50 results': 50
    };
  }

  getSortByClass(sortByOption) {
    if (this.state.sortBy === sortByOption) {
      return 'active';
    } else {
      return '';
    }
  }

  getResultClass(resultOption) {
    if (this.state.results === resultOption) {
      return 'active';
    } else {
      return '';
    }
  }

  handleSortByChange(sortByOption) {
    this.setState({ sortBy: sortByOption }, function() {
      if (this.state.term && this.state.location) {
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy, this.state.results, this.state.radius);
      }
    });
  }

  handleResultChange(resultOption) {
    this.setState({ results: resultOption }, function() {
      if (this.state.term && this.state.location) {
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy, this.state.results, this.state.radius);
      }
    });
  }

  handleTermChange(event) {
    this.setState({ term: event.target.value }, function() {
      if (this.state.term) {
        console.log(this.state.term);
        this.props.complete(this.state.term);
      }
    });
  }

  handleLocationChange(event) {
    this.setState({ location: event.target.value });
  }

  handleRadiusChange(event) {
    this.setState({ radius: event.target.value });
  }

  handleKeyPress(event) {
    if (event.charCode === 13) {
      if (this.state.term && this.state.location) {
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy, this.state.results, this.state.radius);
      }
    }
  }

  handleSearch(event) {
    if (this.state.term && this.state.location) {
      this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy, this.state.results, this.state.radius);
      event.preventDefault();
    }
  }

  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map(sortByOption => {
      let sortByOptionValue = this.sortByOptions[sortByOption];
      return (
        <li
          key={sortByOptionValue}
          className={this.getSortByClass(sortByOptionValue)}
          onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>
          <span>{sortByOption}</span>
        </li>
      );
    });
  }

  renderResultOptions() {
    return Object.keys(this.resultOptions).map(resultOption => {
      let resultOptionValue = this.resultOptions[resultOption];
      return (
        <li
          key={resultOptionValue}
          className={this.getResultClass(resultOptionValue)}
          onClick={this.handleResultChange.bind(this, resultOptionValue)}>
          {resultOption}
        </li>
      );
    });
  }

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>
            {this.renderSortByOptions()}
          </ul>
        </div>
        <div className="SearchBar-fields">
          <input
            placeholder="Search Businesses"
            onChange={this.handleTermChange}
            onKeyPress={this.handleKeyPress}
            list="suggestions" />
          <input
            placeholder="Where?"
            onChange={this.handleLocationChange}
            onKeyPress={this.handleKeyPress} />
          <datalist id="suggestions">
            {
              this.props.datalist.map(text => {
                return (
                  <option value={text} />
                );
              })
            }
          </datalist>
        </div>
        <div className="SearchBar-submit">
          <div className="select-radius">
            <select
              id="Radius"
              onChange={this.handleRadiusChange}>
              <option value={0}>Specify a search radius</option>
              <option value={10000}>10000 meters (6.2 miles)</option>
              <option value={25000}>25000 meters (15.5 miles)</option>
              <option value={40000}>40000 meters (24.9 miles)</option>
            </select>
          </div>
          <div className="submit-button">
            <a
              onClick={this.handleSearch}>
              Let&rsquo;s Go
            </a>
          </div>
          <div className="number-results">
            <ul>
              {this.renderResultOptions()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
