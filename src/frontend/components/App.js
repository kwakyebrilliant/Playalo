import {
  Link,
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { useState } from 'react'
import { Spinner, Navbar, Nav, Button, Container } from 'react-bootstrap'
import logo from './logo.png';
import './App.css';
 
function App() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)

  return (
     <BrowserRouter>
      <div className="App">
        <>
          <Navbar expand="lg" bg="secondary" variant="dark">
            <Container>
              <Navbar.Brand href="http://www.dappuniversity.com/bootcamp">
                <img src={logo} width="40" height="40" className="" alt="" />
                &nbsp; Playalo
              </Navbar.Brand>

            </Container>
          </Navbar>
        </>
      </div>
    </BrowserRouter>

  );
}

export default App;
