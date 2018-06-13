import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
let signedIn=false;



window.googleConnectCallback = function(googleUser) {

  // Useful data for your client-side scripts:
signedIn=true;
  const profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());

  // The ID token you need to pass to your backend:
  const id_token = googleUser.getAuthResponse().id_token;
  //console.log("ID Token: " + id_token);
};

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
