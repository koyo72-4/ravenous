import React from 'react';
import apiKey from './Secrets';

const Autocomplete = {
  complete(letters) {
    fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/autocomplete?text=${letters}`, {
      headers: { Authorization: `Bearer ${apiKey}` }
    }).then(response => response.json()).then(jsonResponse => {
      console.log(jsonResponse.terms);
      return jsonResponse.terms.map(term => {
        return (
          <option value={term.text} />
        );
      });
    });
  }
};

export default Autocomplete;
