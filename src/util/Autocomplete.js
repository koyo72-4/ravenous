import apiKey from './Secrets';

const Autocomplete = {
  complete(letters) {
    fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/autocomplete?text=${letters}`, {
      headers: { Authorization: `Bearer ${apiKey}` }
    }).then(response => {return response.json();}).then(jsonResponse => {
      if (jsonResponse.terms) {
        //console.log(jsonResponse.terms);
        return jsonResponse.terms.map(term => term.text);
      }
    });
  }
};

export default Autocomplete;
