import gql from 'graphql-tag';

export default gql`mutation AddLyrics($content:String, $songId:ID) {
  addLyricToSong(content: $content, songId: $songId){
  id
    lyrics{
      id
      content
      likes
    }
  }
}`;