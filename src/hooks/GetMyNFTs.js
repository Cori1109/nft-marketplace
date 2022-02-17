import { createWatcher } from "@makerdao/multicall";
import { config } from "config/multicall";
import { useIPFS } from "./useIPFS";
import { FetchMetadata } from "hooks/FetchMetadata";
import { getCollectionsByChain } from "helpers/collections";

export const GetMyNFTs = async (account, chainId, setLoading, setMyNFTs) => {
  const { resolveLink } = useIPFS();
  const NFTCollections = getCollectionsByChain(chainId);
  const LenData = NFTCollections.length;
  console.log("GetMyNFTs called", LenData);
  setLoading(true);
  const createBaseDataWatcher = (collections) => {
    const watcherJson = [];
    for (let i = 0; i < LenData; i++) {
      const indexbl = i * 3;
      const indexna = i * 3 + 1;
      const indexts = i * 3 + 2;
      watcherJson.push(
        {
          target: collections[i].addrs,
          call: ["balanceOf(address)(uint256)", account],
          returns: [["balanceOf" + indexbl, (val) => val]],
        },
        {
          target: collections[i].addrs,
          call: ["name()(string)"],
          returns: [["name" + indexna, (val) => val]],
        },
        {
          target: collections[i].addrs,
          call: ["totalSupply()(uint256)"],
          returns: [["totalSupply" + indexts, (val) => val]],
        }
      );
    }
    return watcherJson;
  };

  const createTOBIWatcher = (totalSups, collections) => {
    const watcherJson = [];
    for (let i = 0; i < LenData; i++) {
      for (let j = 0; j < totalSups[i]; j++) {
        watcherJson.push({
          target: collections[i].addrs,
          call: ["tokenByIndex(uint256)(uint256)", j],
          returns: [["tokenId[" + i + "][" + j + "]", (val) => val]],
        });
      }
    }
    return watcherJson;
  };

  const createURIOwnerWatcher = (totalSups, collections, tIDs) => {
    const watcherJson = [];
    let cnt = 0;
    for (let i = 0; i < LenData; i++) {
      for (let j = 0; j < totalSups[i]; j++) {
        const indexURI = cnt * 2;
        const indexOwner = cnt * 2 + 1;
        watcherJson.push(
          {
            target: collections[i].addrs,
            call: ["tokenURI(uint256)(string)", tIDs[cnt]],
            returns: [["tokenURI" + indexURI, (val) => val]],
          },
          {
            target: collections[i].addrs,
            call: ["ownerOf(uint256)(address)", tIDs[cnt]],
            returns: [["owner" + indexOwner, (val) => val]],
          }
        );
        cnt++;
      }
    }
    return watcherJson;
  };

  const watcherBaseData = createWatcher(
    createBaseDataWatcher(NFTCollections),
    config
  );

  // get NFT TotalSupply
  watcherBaseData.batch().subscribe(async (updates) => {
    watcherBaseData.stop();
    // Handle batched updates here
    let balances = [];
    let names = [];
    let totalSupps = [];

    for (let i = 0; i < updates.length; i++) {
      // console.log("--------createBaseDataWatcher---------");
      const tokenStr = "balanceOf" + `${i}`;
      const nameStr = "name" + `${i}`;
      const totalSuppStr = "totalSupply" + `${i}`;
      if (updates[i].type === tokenStr) {
        balances.push(updates[i].value.toNumber());
        // console.log(updates[i].type, updates[i].value.toNumber());
      }
      if (updates[i].type === nameStr) {
        names.push(updates[i].value);
        // console.log(updates[i].type, updates[i].value);
      }
      if (updates[i].type === totalSuppStr) {
        totalSupps.push(updates[i].value.toNumber());
        // console.log(updates[i].type, updates[i].value.toNumber());
      }
    }

    const watcherTOBI = createWatcher(
      createTOBIWatcher(totalSupps, NFTCollections),
      config
    );

    watcherTOBI.batch().subscribe(async (updates1) => {
      watcherTOBI.stop();
      // Handle batched updates here
      let tokenIds = [];
      for (let i = 0; i < updates1.length; i++) {
        tokenIds.push(updates1[i].value.toNumber());
        // console.log(updates1[i].type, tokenIds[i]);
      }

      // get token uri
      const watcherURIOwner = createWatcher(
        createURIOwnerWatcher(totalSupps, NFTCollections, tokenIds),
        config
      );

      watcherURIOwner.batch().subscribe(async (updates2) => {
        watcherURIOwner.stop();
        let tokenURIs = [];
        let owners = [];
        let _nftMetadata = [];

        for (let i = 0; i < updates2.length; i++) {
          const tokenStr = "tokenURI" + `${i}`;
          const ownerStr = "owner" + `${i}`;
          if (updates2[i].type === tokenStr) {
            tokenURIs.push(String(updates2[i].value));
          }
          if (updates2[i].type === ownerStr) {
            owners.push(updates2[i].value);
          }
          // console.log(updates2[i].type, updates2[i].value);
        }
        let cnt = 0;
        for (let i = 0; i < LenData; i++) {
          let bcnt = 0;
          for (let j = 0; j < totalSupps[i]; j++) {
            if (owners[cnt] === account || bcnt >= balances[i]) {
              const metadata = await FetchMetadata(tokenURIs[cnt]);
              // console.log("metadata", metadata);
              const imageURI = metadata ? resolveLink(metadata.image) : null;
              const description = metadata ? metadata.description : null;
              _nftMetadata.push({
                name: names[i],
                token_id: tokenIds[cnt],
                tokenURI: tokenURIs[cnt],
                token_address: NFTCollections[i].addrs,
                image: imageURI,
                contract_type: description,
              });
              bcnt++;
            }
            cnt++;
          }
        }
        console.log("==========+++++=========", _nftMetadata);
        setMyNFTs(_nftMetadata);
        setLoading(false);
      });
      watcherURIOwner.start();
    });
    watcherTOBI.start();
  });
  watcherBaseData.start();
};
