import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router';
import addSongLyrics from '../queries/addLyricsToSong';

import LyricsList from './LyricsList';

class SongDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      content: ''
    }
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.mutate({
      variables: {
        content: this.state.content,
        songId: this.props.params.id
      }
    })
    .then(() => this.setState({ content: '' }))
  }

  render() {
    const { song, loading } = this.props.data;

    if (loading) {
      return <div> loading.. </div>
    }

    return (
      <div>
        <Link to="/">Back</Link>
        <h3> {song.title}</h3>

        <LyricsList lyrics={song.lyrics}/>

        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Create lyrics</label>
          <input
            onChange={(event) => this.setState({ content: event.target.value })}
            value={this.state.content}
          />
        </form>
      </div>
    )
  }
}

const query = gql`query SingleSong($id: ID!) {
  song(id: $id) {
    title
    id
    lyrics{
      id
      content
      likes
    }
  }
}`;


export default graphql(addSongLyrics)(
  graphql(query, {
    options: (props) => {
      return { variables: { id: props.params.id } }
    }
  })(SongDetail)
);

