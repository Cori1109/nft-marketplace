
export const switchNetwork = async (chainId) => {
  if (window.ethereum) {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainId }],
    });
  }
}
