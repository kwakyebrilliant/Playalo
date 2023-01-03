import React, { useEffect, useState, useRef} from 'react'
import { ethers } from 'ethers';
import Identicon from 'identicon.js';
import { Button, Card, ButtonGroup } from 'react-bootstrap';

const Home = ({ contract }) => {

    const {loading, setLoading} = useState(true);

    if (loading) return (
        <main style={{ padding: "1rem 0"}}>
            <h2>Loading...</h2>
        </main>
    ) 
  return (
    <div>Home</div>
  )
}

export default Home;
