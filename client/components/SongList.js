import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import fetchSongsQuery from '../queries/fetchSongs';
import deleteSongMutation from '../mutations/deleteSong';

class SongList extends Component {
  onSongDelete(id) {
    this.props
      .mutate({
        variables: {
          id,
        },
      })
      .then(() => this.props.data.refetch()); // fetch the query again
    // you use this instead of refetchQueries if the query is inside the props and is associated to this component
  }

  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => (
      <li key={id} className="collection-item">
        {title}
        <i
          className="material-icons"
          onClick={() => this.onSongDelete(id)}
        >
          delete
        </i>
      </li>
    ));
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading . . .</div>;
    }
    // classnames from materialize css imported inside index.html
    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

export default graphql(deleteSongMutation)(graphql(fetchSongsQuery)(SongList));
