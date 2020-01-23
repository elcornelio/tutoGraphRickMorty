import React from "react";
import ReactDOM from "react-dom";
import ApolloClient, { gql } from "apollo-boost";

import { ApolloProvider, Query } from "react-apollo";

import "./styles.css";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/"
});

function App() {
  return (
    <div className="App">
      <CharactersQuery />
    </div>
  );
}

const CharactersQuery = () => {
  return (
    <Query
      query={gql`
        {
          characters {
            results {
              id
              name
              species
            }
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Eror!</p>;

        return data.characters.results.map(character => {
          return <p key={character.id}>{character.name}</p>;
        });
      }}
    </Query>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  rootElement
);
