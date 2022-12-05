// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
 
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MusicNFTMarketplace is ERC721("DAppFi", "DAPP"), Ownable {
        string public baseURI =
                "https://bafybeidhjjbjonyqcahuzlpt7sznmh4xrlbspa3gstop5o47l6gsiaffee.ipfs.nftstorage.link/";
        string public baseExtension = ".json";
        address public artist;
        uint256 public royaltyFee;

        struct MarketItem {
                uint256 tokenId;
                address payable seller;
                uint256 price;
        }
        MarketItem[] public marketItems;

        
        
}