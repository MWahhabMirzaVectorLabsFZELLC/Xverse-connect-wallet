import React, { useState } from "react";
import Wallet from "sats-connect";

const App = () => {
  const [addresses, setAddresses] = useState({
    payment: "",
    ordinals: "",
    stacks: ""
  });

  const handleConnect = async () => {
    try {
      const response = await Wallet.request('getAccounts', {
        purposes: ['ordinals', 'payment', 'stacks'],
        message: 'Please connect your wallet to access your Bitcoin and Stacks addresses.'
      });

      if (response.status === 'success') {
        const paymentAddressItem = response.result.find(
          (address) => address.purpose === 'payment'
        );
        const ordinalsAddressItem = response.result.find(
          (address) => address.purpose === 'ordinals'
        );
        const stacksAddressItem = response.result.find(
          (address) => address.purpose === 'stacks'
        );

        setAddresses({
          payment: paymentAddressItem?.address || "",
          ordinals: ordinalsAddressItem?.address || "",
          stacks: stacksAddressItem?.address || ""
        });
      } else {
        if (response.error.code === 'USER_REJECTION') {
          console.log("User declined the connection request.");
          // Handle user cancellation error
        } else {
          console.error("Error connecting to wallet:", response.error.message);
          // Handle other errors
        }
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error.message);
      // Handle unexpected errors
    }
  }
  
  return (
    <div className="wallet">
      <h1>Connect Your Wallet</h1>
      <button onClick={handleConnect}>Connect Wallet</button>

      {addresses.payment && (
        <p>Payment Address: {addresses.payment}</p>
      )}
      {addresses.ordinals && (
        <p>Ordinals Address: {addresses.ordinals}</p>
      )}
      {addresses.stacks && (
        <p>Stacks Address: {addresses.stacks}</p>
      )}
    </div>
  );
};

export default App;
