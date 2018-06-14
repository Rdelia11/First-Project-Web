import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store/store.js';
import {Provider} from 'react-redux';


window.googleConnectCallback = function(googleUser) {
  // Useful data for your client-side scripts:
  const profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());
  // The ID token you need to pass to your backend:
  const id_token = googleUser.getAuthResponse().id_token;
  store.dispatch({type:"LOGIN",loggedIn:true,name:profile.getName(),urlPic:profile.getImageUrl()});
};

window.onscroll = function(){
  if(window.pageYOffset > 50){
    window.document.querySelector("#navbar").style="background-color:rgba(0,130,195,0.9);box-shadow: 3px 3px 8px 1px rgba(0, 0, 0, .2);";
  }else{
    window.document.querySelector("#navbar").style="background-color:rgba(0,130,195,1);box-shadow: 3px 3px 8px 1px rgba(0, 0, 0, .0);";
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
