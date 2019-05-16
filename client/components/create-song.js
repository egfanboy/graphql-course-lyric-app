import React from "react";
import gql from "graphql-tag";
import { Link } from "react-router";
import { graphql } from "react-apollo";
import { hashHistory } from "react-router";

import { songListQuery } from "./song-list";
class CreateSong extends React.Component {
  constructor() {
    super();
    this.state = { title: "" };
  }

  onSubmit(e) {
    e.preventDefault();
    this.props
      .mutate({
        variables: { title: this.state.title },
        refetchQueries: [{ query: songListQuery }]
      })
      .then(() => {
        hashHistory.push("/");
      });
  }
  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a new song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title</label>
          <input
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
          />
        </form>
      </div>
    );
  }
}
const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;
export default graphql(mutation)(CreateSong);
