import {
  Link,
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { useState } from 'react'
import { ethers } from "ethers";
import { Spinner, Navbar, Nav, Button, Container } from 'react-bootstrap'
import logo from './logo.png';
import './App.css';
 
function App() {
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)

  const web3Handler = async () => {
    // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    // setAccount(accounts[0])
    // // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // // Get signer
    // const signer = provider.getSigner()
    // loadContract(signer)
  }

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
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/my-tokens">My Tokens</Nav.Link>
                  <Nav.Link as={Link} to="/my-resales">My Resales</Nav.Link>
                </Nav>
                <Nav>
                  {account ? (
                    <Nav.Link
                      href={`https://etherscan.io/address/${account}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button nav-button btn-sm mx-4">
                      <Button variant="outline-light">
                        {account.slice(0, 5) + '...' + account.slice(38, 42)}
                      </Button>

                    </Nav.Link>
                  ) : (
                    <Button variant="outline-light">Connect Wallet</Button>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>

        <div>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
              <Spinner animation="border" style={{ display: 'flex' }} />
              <p className='mx-3 my-0'>Awaiting Metamask Connection...</p>
            </div>
          ) : (
            <Routes>
              <Route path="/" />
              <Route path="/my-tokens" />
              <Route path="/my-resales" />
            </Routes>
          )}
        </div>

      </div>
    </BrowserRouter>

  );
}

export default App;
