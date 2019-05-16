import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { SongQuery } from "./song-detail";

class LyricList extends React.Component {
  handleLike(lyric) {
    const { songId } = this.props;
    this.props.mutate({
      variables: { id: lyric.id },
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          content: lyric.content,
          id: lyric.id,
          likes: lyric.likes + 1,
          __typename: "LyricType"
        }
      },
      refetchQueries: [{ query: SongQuery, variables: { id: songId } }]
    });
  }

  render() {
    return (
      <div className="collection">
        {this.props.lyrics.map(({ content, likes, id }) => (
          <div key={id} className="collection-item">
            {content}
            <div className="votebox">
              <i
                className="material-icons right"
                onClick={() => this.handleLike({ id, likes, content })}
              >
                thumb_up
              </i>
              {likes}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID!) {
    likeLyric(id: $id) {
      id
      likes
      content
    }
  }
`;

export default graphql(mutation)(LyricList);
