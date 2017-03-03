import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import gql from 'graphql-tag';
import fetchSongs from '../queries/fetchSongs';

class SongsList extends Component {

  onSongDelete(id) {
    this.props.mutate({
      variables: { id }
    })
    .then(() => this.props.data.refetch());
  }

  renderSongs() {
    const { loading } = this.props.data;

    if (loading) {
      return <div>
        loading...
      </div>
    }
    return this.props.data.songs.map(({ title, id }) => {
      return <li className="collection-item" key={id}>
        <Link to={`/songs/${id}`}>
          {title}
        </Link>
        <i className="material-icons right" onClick={() => this.onSongDelete(id)}>delete</i>
      </li>
    })
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <ul className="collection">
          {this.renderSongs()}
        </ul>
        <Link
          to="songs/new"
          className="btn-floating btn-large red right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    )
  }
}

const mutation = gql`mutation DeleteSong($id: ID) {
  deleteSong(id: $id){
    id
  }
}
`;

export default graphql(mutation)(
  graphql(fetchSongs)(SongsList)
);

