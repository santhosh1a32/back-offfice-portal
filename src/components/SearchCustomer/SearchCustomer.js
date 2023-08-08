import * as React from 'react';
import Autosuggest from 'react-autosuggest';

const customerList = [
    {
        name: 'Elvis Presley',
        contractNumber: 123490
    },
    {
        name: 'Paul McCartney',
        contractNumber: 234514
    },
    {
        name: 'John Doe',
        contractNumber: 676764
    }
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
    const inputValue = value.toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : customerList
}

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion.name}
    </div>
);

const SearchCustomer = () => {
    const [value, updateValue] = React.useState('');
    const [suggestions, updateSuggestions] = React.useState([]);

    const onChange = (e, val) => {
        updateValue(val);
    }

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    const onSuggestionsFetchRequested = ({ value }) => {
        updateSuggestions(getSuggestions(value));
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    const onSuggestionsClearRequested = () => {
        updateSuggestions([])
    };

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
        placeholder: 'Type a programming language',
        value,
        onChange
    };

    return (
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
        />
    )
}

export default SearchCustomer;