import React from "react";

import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { SongQuery } from "./song-detail";

class LyricCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: "" };
  }

  onSubmit(e) {
    const { content } = this.state;
    const { songId } = this.props;
    e.preventDefault();
    this.setState({ content: "" });
    this.props.mutate({
      variables: { content, songId }
    });
  }
  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Add Lyric</label>
        <input onChange={e => this.setState({ content: e.target.value })} />
      </form>
    );
  }
}

const mutation = gql`
  mutation CreateLyric($content: String, $songId: ID!) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      title
      lyrics {
        content
        id
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
