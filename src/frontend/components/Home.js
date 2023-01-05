import React, { useEffect, useState, useRef} from 'react'
import { ethers } from 'ethers';
import Identicon from 'identicon.js';
import { Button, Card, ButtonGroup } from 'react-bootstrap';

const Home = ({ contract }) => {

    const {loading, setLoading} = useState(true);
    const [marketItems, setMarketItems] = useState(null)
    const loadMarketplaceItems = async () => {
        // Get all unsold items/tokens
    const results = await contract.getAllUnsoldTokens()

    const marketItems = await Promise.all(results.map(async i => {
        // get uri url from contract
      const uri = await contract.tokenURI(i.tokenId)
    } ))
    }

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
