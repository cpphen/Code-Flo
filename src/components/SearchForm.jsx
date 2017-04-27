import axios from 'axios';
import React, { Component, Props }from 'react';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
class AsyncExample extends Component {
  constructor(props){
    super(props);

    this.state = { options: [] };
    this._handleSearch = this._handleSearch.bind(this)
    this._handleClick = this._handleClick.bind(this)
  }


  _handleSearch(query) {
    if (!query) {
      return;
    }


    fetch(`/register/${query}`)
    .then(resp => resp.json())
    // // .then(json => console.log(this))
    .then(json => this.setState({options: json}))


    // this.setState({options: data})



  }
  _handleClick(e){
    var id = e.target.dataset.user;
    console.log(id);
    this.props.router.push('/profile/'+id);
  }

  render() {
    return (


      <AsyncTypeahead
        labelKey="username"
        onSearch={this._handleSearch}
        options={this.state.options}
        placeholder="Search for a user..."
        renderMenuItemChildren={(option, props, index) => (
          <div className="searchBar" onClick={this._handleClick} data-user={option._id}>
            <img
              data-user={option._id}
              className='img-circle'
              src=

              {option.avatar ? option.avatar : "https://avatars2.githubusercontent.com/u/1530139?v=3"}
              style={{

                marginRight: '10px'

              }}
            />
            <span data-user={option._id}>{option.username}</span>
            {/* .login is the username field from the github response. */}
          </div>

        )}
      />


    );
  }
};
export default AsyncExample;
