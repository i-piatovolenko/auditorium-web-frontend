import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/store";
import AppContainer from "./AppContainer";
import {ApolloClient, ApolloProvider, gql, InMemoryCache} from '@apollo/client';

export const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
      <ApolloProvider client={client}>
      <BrowserRouter>
          <Provider store={store}>
    <AppContainer/>
          </Provider>
      </BrowserRouter>
      </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
