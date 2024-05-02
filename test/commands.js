const instance = await NftMarket.deployed();

instance.mintToken("https://salmon-left-snipe-841.mypinata.cloud/ipfs/Qma3qmQQ2bKMSMkb77QWux2aSwbHs6XuCL7yaJf4zokw1c", "500000000000000000", { value: "25000000000000000", from: accounts[0] });
instance.mintToken("https://salmon-left-snipe-841.mypinata.cloud/ipfs/QmPBBUhWvigWwQT2MZVmfXxyg6AWJepLfaTqi2G8ZjCzNy", "300000000000000000", { value: "25000000000000000", from: accounts[0] });
