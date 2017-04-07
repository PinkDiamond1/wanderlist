import style from './destination_search.scss'
import React from 'react'
import store from 'redux/store'
import { addDestination } from 'redux/actions'
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'

export default class DestinationSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      geocodeResults: null,
      loading: false
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSelect(address) {
    this.setState({
      address: ''
    })

    store.dispatch(addDestination({ address: address, userId: store.getState().currentUser.id }))
  }

  handleChange(address) {
    this.setState({
      address,
      geocodeResults: null
    })

  }

  render() {
    if(!this.state.loading && this.state.geocodeResults) { debugger }
    const cssClasses = {
      root: 'form-group',
      label: 'form-label',
      input: 'Demo__search-input',
      autocompleteContainer: 'Demo__autocomplete-container'
    }

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div className="Demo__suggestion-item">
        <i className='fa fa-map-marker Demo__suggestion-icon'/>
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small className="text-muted">{formattedSuggestion.secondaryText}</small>
      </div>)

    return (
      <div className="destination-search">
        <span className="destination-search__icon">🔍</span>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          classNames={cssClasses}
          autocompleteItem={AutocompleteItem}
          autoFocus={true}
          placeholder="Add a destination"
          hideLabel={true}
          inputName="Demo__input"
          onEnterKeyDown={this.handleSelect}
        />
        {this.state.loading ? <div><i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" /></div> : null}
      </div>
    )
  }
}
