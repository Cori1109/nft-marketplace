import { createWatcher } from "@makerdao/multicall";
import { config } from "config/multicall";
import { FetchMetadata } from "hooks/FetchMetadata";
import { GetBaseData } from "hooks/GetBaseData";
import { useIPFS } from "hooks/useIPFS";

export async function GetMetaData(addr, setNftMetadata, setLoading) {
  const { resolveLink } = useIPFS();
  const baseData = await GetBaseData(addr);
  setLoading(true);

  const createTokenIDWatcher = (totalSuppy, addr) => {
    const watcherJson = [];
    for (let i = 0; i < totalSuppy; i++) {
      watcherJson.push({
        target: addr,
        call: ["tokenByIndex(uint256)(uint256)", i],
        returns: [["tokenId" + i, (val) => val]],
      });
    }
    return watcherJson;
  };

  const createTokenURIWatcher = (tokenIDs, addr) => {
    const watcherJson = [];
    for (let i = 0; i < tokenIDs.length; i++) {
      const indexURI = i * 2;
      const indexOwner = i * 2 + 1;
      watcherJson.push(
        {
          target: addr,
          call: ["tokenURI(uint256)(string)", tokenIDs[i]],
          returns: [["tokenURI" + indexURI, (val) => val]],
        },
        {
          target: addr,
          call: ["ownerOf(uint256)(address)", tokenIDs[i]],
          returns: [["owner" + indexOwner, (val) => val]],
        }
      );
    }
    return watcherJson;
  };

  const watcherTokenIDs = createWatcher(
    createTokenIDWatcher(baseData.totalSupply, addr),
    config
  );

  watcherTokenIDs.batch().subscribe(async (updates) => {
    watcherTokenIDs.stop();
    // Handle batched updates here
    let tokenIds = [];
    for (let i = 0; i < updates.length; i++) {
      const tokenId = updates[i].value.toNumber();
      tokenIds.push(tokenId);
      // console.log(updates[i].type, tokenId);
    }

    // get token uri
    const watcherTokenURIs = createWatcher(
      createTokenURIWatcher(tokenIds, addr),
      config
    );

    watcherTokenURIs.batch().subscribe(async (updates1) => {
      watcherTokenURIs.stop();
      let tokenURIs = [];
      let owners = [];
      let _nftMetadata = [];

      for (let i = 0; i < updates1.length; i++) {
        const tokenStr = "tokenURI" + `${i}`;
        const ownerStr = "owner" + `${i}`;
        if (updates1[i].type === tokenStr) {
          tokenURIs.push(updates1[i].value);
        }
        if (updates1[i].type === ownerStr) {
          owners.push(updates1[i].value);
        }
        // console.log(updates1[i].type, updates1[i].value);
      }
      for (let i = 0; i < tokenIds.length; i++) {
        const metadata = await FetchMetadata(tokenURIs[i]);
        // console.log("metadata", metadata);
        const imageURI = metadata ? resolveLink(metadata.image) : null;
        _nftMetadata.push({
          owner: owners[i],
          token_id: tokenIds[i],
          tokenURI: tokenURIs[i],
          token_address: addr,
          image: imageURI,
          metaData: metadata,
        });
      }
      console.log("==========+++++=========", _nftMetadata);
      setNftMetadata(_nftMetadata);
      setLoading(false);
    });
    watcherTokenURIs.start();
  });
  watcherTokenIDs.start();
}
