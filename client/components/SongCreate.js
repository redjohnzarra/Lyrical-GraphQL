import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import fetchSongsQuery from '../queries/fetchSongs';
import addSongMutation from '../mutations/addSong';

class SongCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { title: '' };
  }

  updateInput(e) {
    this.setState({
      title: e.target.value,
    });
  }

  submitForm(e) {
    e.preventDefault();
    this.props
      .mutate({
        variables: {
          title: this.state.title,
        },
        refetchQueries: [{ query: fetchSongsQuery }], // Array of queries to fetch after this mutation is completed
        // properties inside this array are query & variables
      })
      .then(() => {
        this.goBack();
      })
      .catch(() => {
        console.log('ERROR HERE');
      });
  }

  goBack() {
    this.props.router.goBack();
  }

  render() {
    return (
      <div>
        <Link onClick={this.goBack.bind(this)}>Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.submitForm.bind(this)}>
          <label>Song Title</label>
          <input
            type="text"
            onChange={this.updateInput.bind(this)}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

export default graphql(addSongMutation)(SongCreate);
