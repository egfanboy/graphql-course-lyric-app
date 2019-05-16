import React from "react";
import ReactDOM from "react-dom";
import "./style/style.css";

import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { Router, Route, hashHistory, IndexRoute } from "react-router";

import SongList from "./components/song-list";
import CreateSong from "./components/create-song";

import App from "./components/app";
import SongDetail from "./components/song-detail";

const client = new ApolloClient({ dataIdFromObject: o => o.id });

const Root = () => (
  <ApolloProvider client={client}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={SongList} />
        <Route path="create" component={CreateSong} />
        <Route path="songs/:id" component={SongDetail} />
      </Route>
    </Router>
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.querySelector("#root"));
