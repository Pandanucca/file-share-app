import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import React, {
  useState, useEffect
} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from 'react-router-dom';
import Contact from './components/contact.mjs';
import FileUpload from './components/FileUpload.mjs';
import Files from './components/Files.mjs';
import Register from "./components/register.mjs";
import Login from "./components/login.mjs";
import { Navbar, Nav } from 'react-bootstrap';
import "./App.css"


function App() {
  useEffect(() => {
    getCurrentUser();
  }, [])
  const SERVER_URL = "http://localhost:4000/";
  const [user, setUser] = useState(null);
  //const SERVER_URL = "http://3.215.210.108:4000/";
  const getCurrentUser = async () => {
    const resp = await fetch(SERVER_URL + "currentUser")
    const data = await resp.json();
    console.log("getCurrentUser", data);
    if (data.user) {
      setUser(data.user);
    }
  }

  const loginResult = (user) => {
    console.log("loginResult", user)
    if (user.status === 1) {
      setUser(user);
    }
  }

  return (
    <Router>

      <div className="App">
        <header className="App-header">

          <nav>
            <img src={'https://store-images.s-microsoft.com/image/apps.41124.13649428968955623.1a3a6552-6f8f-4761-aea0-b19c276f1a8b.2e3286de-5f85-4557-bba7-ec751fe004d4'} className="App-icon" alt="icon" />
            <Link className='nav-link' to={"/"}>WeShare</Link> |
            {!user ?
              <span>
                <Link className='nav-link' to={"/login"} >Login</Link> |
                <Link className='nav-link' to={"/register"}>Register</Link> |
              </span>
              :
              <span>
                <Link className='nav-link' to={"/upload"}>File Upload</Link> |
                <Link className='nav-link' to={"/logout"} >Logout</Link> |
              </span>
            }
            <Link className='nav-link' to={"/contact"}>Contact</Link>
          </nav>
          <img src={logo} className="App-logo" alt="logo" />

          <Routes>
            <Route path="/register" element={

              user ? (<Home />) :
                (<Register serverUrl={SERVER_URL} />)

            } />
            <Route path="/login" element={
              user ? (<Home />) :
                (<Login serverUrl={SERVER_URL} setLogin={loginResult} />
                )
            } />
            <Route path="/upload" element={
              user ?
                (<FileUpload serverUrl={SERVER_URL} />) :
                (<Login serverUrl={SERVER_URL} setLogin={loginResult} />)

            } />
            <Route path="/contact" element={
              <Contact serverUrl={SERVER_URL} />}
            />
            <Route path="/logout" element={
              <Logout serverUrl={SERVER_URL} />
            }
            />
            <Route path="/" element={
              <Home />}
            />
          </Routes>

          {user ? <Files serverUrl={SERVER_URL} /> : <div></div>}

        </header>
      </div >
    </Router >
  );
}
function Logout(props) {

  useEffect(() => {
    fetch(props.serverUrl + "logout").then((resp) => {
      window.location.replace("/");
    })
  }, [])
  return <h1>File Share</h1>

}
function Home() {
  return <h1> File Share
  </h1>

}
export default App;