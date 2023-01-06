import React, { useEffect, useState, useRef} from 'react'
import { ethers } from 'ethers';
import Identicon from 'identicon.js';
import { Button, Card, ButtonGroup } from 'react-bootstrap';

const Home = ({ contract }) => {

    const audioRef = useRef(null);
    const [loading, setLoading] = useState(true)
    const [isPlaying, setIsPlaying] = useState(null)
    const [currentItemIndex, setCurrentItemIndex] = useState(0)
    const [marketItems, setMarketItems] = useState(null)
    const loadMarketplaceItems = async () => {
        // Get all unsold items/tokens
    const results = await contract.getAllUnsoldTokens()

    const marketItems = await Promise.all(results.map(async i => {
        // get uri url from contract
      const uri = await contract.tokenURI(i.tokenId)
      // use uri to fetch the nft metadata stored on ipfs 
      const response = await fetch(uri + ".json")
      const metadata = await response.json()
      const identicon = `data:image/png;base64,${new Identicon(metadata.name + metadata.price, 330).toString()}`
       // define item object
       let item = {
        price: i.price,
        itemId: i.tokenId,
        name: metadata.name,
        audio: metadata.audio,
        identicon
      }
    }))
    setMarketItems(marketItems)
    setLoading(false)
    }
    const buyMarketItem = async (item) => {
        await (await contract.buyToken(item.itemId, { value: item.price })).wait()
        loadMarketplaceItems()
      }
      const skipSong = (forwards) => {
        if (forwards) {
          setCurrentItemIndex(() => {
            let index = currentItemIndex
            index++
            if (index > marketItems.length - 1) {
              index = 0;
            }
            return index
          })
        } else {
          setCurrentItemIndex(() => {
            let index = currentItemIndex
            index--
            if (index < 0) {
              index = marketItems.length - 1;
            }
            return index
          })
        }
      }
      useEffect(() => {
        if (isPlaying) {
          audioRef.current.play()
        } else if (isPlaying !== null) {
          audioRef.current.pause()
        }
      })
    useEffect(() => {
        !marketItems && loadMarketplaceItems()
    })
    if (loading) return (
        <main style={{ padding: "1rem 0"}}>
            <h2>Loading...</h2>
        </main>
    ) 
  return (
    <div>
        {marketItems.length > 0 ?
        <div className="row">
             <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '500px' }}>
                <div className="content mx-auto">
                    <audio src={marketItems[currentItemIndex].audio} ref={audioRef}></audio>
                        <Card>
                            <Card.Header>{currentItemIndex + 1} of {marketItems.length}</Card.Header>
                                <Card.Img variant="top" src={marketItems[currentItemIndex].identicon} />
                                    <Card.Body color="secondary">
                                        <Card.Title as="h2" > {marketItems[currentItemIndex].name}</Card.Title>
                            
                            </Card.Body>
                            <Card.Footer>
                                <div className='d-grid my-1'>
                                    <Button onClick={() => buyMarketItem(marketItems[currentItemIndex])} variant="primary" size="lg">
                                    {`Buy for ${ethers.utils.formatEther(marketItems[currentItemIndex].price)} ETH`}
                                    </Button>
                                </div>
                            </Card.Footer>
                        </Card>

                </div>
            </main>

        </div>
        : (
            <main style={{ padding: '1rem 0'}}>
                <h2>No listed assets</h2>
            </main>
        )}
    </div>
  )
}

export default Home;
