import { Select } from "antd";
// import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useHistory } from "react-router-dom";
import { useEthers } from "@usedapp/core";
import { getCollectionsByChain } from "helpers/collections";

function SearchCollections({ setInputValue }) {
  const { Option } = Select;
  const { chainId } = useEthers();
  const NFTCollections = getCollectionsByChain(chainId);
  const history = useHistory();

  function onChange(value) {
    setInputValue(value);
    history.push("/NFTMarketPlace");
  }

  return (
    <>
      <Select
        showSearch
        style={{ width: "1000px", marginRight: "20px" }}
        placeholder="Find a Collection"
        optionFilterProp="children"
        onChange={onChange}
      >
        {NFTCollections &&
          NFTCollections.map((collection, i) => (
            <Option value={collection.addrs} key={i}>
              {collection.name}
            </Option>
          ))}
      </Select>
    </>
  );
}
export default SearchCollections;
