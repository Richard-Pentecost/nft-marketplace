// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NftMarket is ERC721URIStorage {

  struct NftItem {
    uint tokenId;
    uint price;
    address creator;
    bool isListed;
  }

  uint public listingPrice = 0.025 ether;

  uint private _listedItems;
  uint private _tokenIds;

  mapping(string => bool) private _usedTokenURIs;
  mapping(uint => NftItem) private _idToNftItem;

  event NftItemCreated (
    uint tokenId,
    uint price,
    address creator,
    bool isListed
  );

  constructor() ERC721("CreaturesNFT", "CNFT") {}

  function getNftItem(uint tokenId) public view returns (NftItem memory) {
    return _idToNftItem[tokenId];
  }

  function listedItemsCount() public view returns (uint) {
    return _listedItems;
  }

  function tokenURIExists(string memory tokenURI) public view returns (bool) {
    return _usedTokenURIs[tokenURI] == true;
  }

  function mintToken(string memory tokenURI, uint price) public payable returns(uint) {
    require(!tokenURIExists(tokenURI), 'Token URI already exists');
    require(msg.value == listingPrice, 'Price must be equal to listing price');

    _tokenIds++;
    _listedItems++;

    uint newTokenId = _tokenIds;

    _safeMint(msg.sender, newTokenId);
    _setTokenURI(newTokenId, tokenURI);
    _usedTokenURIs[tokenURI] = true;
    _createNftItem(newTokenId, price);

    return newTokenId;
  }

  function _createNftItem(uint tokenId, uint price) private {
    require(price > 0, 'Price must be at least 1 wei');

    _idToNftItem[tokenId] = NftItem(tokenId, price, msg.sender, true);

    emit NftItemCreated(tokenId, price, msg.sender, true);
  }
}