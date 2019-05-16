import React from "react";
import { Link } from "react-router";
import gql from "graphql-tag";

import { graphql } from "react-apollo";

import LyricCreate from "./lyric-create";
import LyricList from "./lyric-list";
export const SongQuery = gql`
  query SongQuery($id: ID!) {
    song(id: $id) {
      title
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;
export default graphql(SongQuery, {
  options: props => ({ variables: { id: props.params.id } })
})(function SongDetail(props) {
  const { data } = props;
  if (!data.song) return null;

  return (
    <div>
      <Link to="/">Back</Link>
      <h3>{data.song.title}</h3>
      <LyricList songId={data.song.id} lyrics={data.song.lyrics} />
      <LyricCreate songId={data.song.id} />
    </div>
  );
});
