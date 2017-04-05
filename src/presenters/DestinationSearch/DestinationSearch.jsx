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
    this.renderGeocodeFailure = this.renderGeocodeFailure.bind(this)
    this.renderGeocodeSuccess = this.renderGeocodeSuccess.bind(this)
  }

  handleSelect(address) {
    this.setState({
      address: ''
    })

    store.dispatch(addDestination({ address: address, userId: store.getState().currentUser.id }))

    // geocodeByAddress(address,  (err, { lat, lng }) => {
    //   if (err) {
    //     console.log('Oh no!', err)
    //     this.setState({
    //       geocodeResults: this.renderGeocodeFailure(err),
    //       loading: false
    //     })
    //   }
    //   console.log(`Yay! got latitude and longitude for ${address}`, { lat, lng })
    //   this.setState({
    //     geocodeResults: this.renderGeocodeSuccess(lat, lng),
    //     loading: false
    //   })
    // })
  }

  handleChange(address) {
    this.setState({
      address,
      geocodeResults: null
    })

  }

  renderGeocodeFailure(err) {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Error!</strong> {err}
      </div>
    )
  }

  renderGeocodeSuccess(lat, lng) {
    // debugger
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
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          classNames={cssClasses}
          autocompleteItem={AutocompleteItem}
          autoFocus={true}
          placeholder="Search Places"
          hideLabel={true}
          inputName="Demo__input"
          onEnterKeyDown={this.handleSelect}
        />
        {this.state.loading ? <div><i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" /></div> : null}
      </div>
    )
  }
}
