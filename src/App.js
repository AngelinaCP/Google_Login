import './App.css';
import {useEffect, useState} from 'react';
import jwt_decode from "jwt-decode"

function App() {

  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);

    //если пользователь уже залогинился, кнопка логина исчезает
    document.getElementById("signInDiv").hidden = true;
  } 

  function handleSignOut(event) {
    //функция для выхода
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
     /* global google */ 
    google.accounts.id.initialize( {
      client_id: "534749363099-5dcbemths79oav1bj8tlue8euq2hfmeh.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );

    google.accounts.id.prompt();
  }, [])

  return (
    <div className="App">
      <div id="signInDiv"></div>
      { 
        //если у пользователя нет аттрибутов, то он разлогинен
        Object.keys(user).length != 0 &&
        <button onClick={ (e) => handleSignOut(e)}>Выйти</button>
      }
      { user &&
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>
      }
    </div>
  );
}

export default App;
