import React from "react";
import { Link } from "react-router";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { hashHistory } from "react-router";

class SongList extends React.Component {
  deleteSong(id) {
    this.props
      .mutate({
        variables: { songId: id }
      })
      .then(this.props.data.refetch);
  }
  render() {
    const { data } = this.props;

    if (data.loading) return null;

    return (
      <div>
        <div className="collection">
          {data.songs.map(({ title, id }) => (
            <div
              key={title}
              className="collection-item"
              onClick={() => hashHistory.push(`songs/${id}`)}
            >
              {title}
              <i
                className="material-icons right"
                onClick={e => {
                  e.stopPropagation();
                  this.deleteSong(id);
                }}
              >
                delete
              </i>
            </div>
          ))}
        </div>
        <Link to="/create" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

export const songListQuery = gql`
  {
    songs {
      title
      id
    }
  }
`;

const deleteMutation = gql`
  mutation DeleteSong($songId: ID) {
    deleteSong(id: $songId) {
      id
    }
  }
`;

export default graphql(deleteMutation)(graphql(songListQuery)(SongList));
