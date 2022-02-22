import { Select } from "antd";
// import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useHistory } from "react-router-dom";
import { useEthers } from "@usedapp/core";
import { getCollectionsByChain } from "helpers/collections";

function SearchCollections({ inputValue, setInputValue }) {
  const { Option } = Select;
  const { chainId } = useEthers();
  const NFTCollections = getCollectionsByChain(chainId);
  const history = useHistory();

  console.log("defaultvalue", inputValue);

  function onChange(value) {
    setInputValue(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
        value={inputValue !== "explore" ? inputValue : null}
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
