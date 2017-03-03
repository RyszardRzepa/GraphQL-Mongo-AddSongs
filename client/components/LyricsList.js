import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricsList extends Component {

  Like(id, likes) {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typeName: 'LyricType',
          likes: ++likes
        }
      }
    })
  }

  renderLyrics() {
    return this.props.lyrics.map((lyric) => {
      return <li className="collection-item" key={lyric.id}>
          {lyric.content} <i
          onClick={() => this.Like(lyric.id, lyric.likes)}
          className="material-icons right">thumb_up
        </i>
          <div>
          {lyric.likes}
          </div>
        </li>


    })
  }

  render() {
    return (
      <ul className="collection">
        {this.renderLyrics()}
      </ul>
    )
  }
}

const mutation = gql`
mutation AddLike($id: ID) {
  likeLyric(id: $id) {
    likes
    id
  }
}`;

export default graphql(mutation)(LyricsList);