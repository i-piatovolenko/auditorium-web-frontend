import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "./store/store";
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {BrowserRouter} from "react-router-dom";

export const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
});

document.title = "Auditorium"

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <BrowserRouter>
                <App/>
                </BrowserRouter>
            </Provider>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
