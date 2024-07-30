import "./App.css";
import { useState } from "react";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";
import { fromNano } from "ton-core";
function App() {
  const [incrementValue, setIncrementValue] = useState(3);
  const {
    contract_address,
    counter_value,
    recent_sender,
    owner_address,
    contract_balance,
    sendIncrement,
    sendDeposit,
    sendWithdrawalRequest,
  } = useMainContract();

  const { connected } = useTonConnect();

  return (
    <div>
      <div className="TonConnectButton">
        <TonConnectButton />
      </div>
      <div>
        <div className="Card">
          <b>Our contract Address</b>
          <div className="Hint">{contract_address}</div>
          <b>Recent Sender</b>
          <div className="Hint">{recent_sender ?? "Loading..."}</div>
          <b>Owner Address</b>
          <div className="Hint">{owner_address ?? "Loading..."}</div>
          <b>Сontract Balance</b>
          {contract_balance && (
            <div className="Hint">{fromNano(contract_balance)}</div>
          )}
        </div>
        <div className="Card">
          <b>Counter Value</b>
          <div>{counter_value ?? "Loading..."}</div>
        </div>

        <div className="Actions">
          <input
            type="number"
            value={incrementValue}
            onChange={(e) => setIncrementValue(Number(e.target.value))}
            className="input-field"
          />
          {connected && (
            <a
              onClick={() => {
                sendIncrement(incrementValue);
              }}
              className="action-button increment-button"
            >
              Increment by {incrementValue}
            </a>
          )}
          {connected && (
            <a
              onClick={() => {
                sendDeposit();
              }}
              className="action-button deposit-button"
            >
              Request deposit of 1 TON
            </a>
          )}
          {connected && (
            <a
              onClick={() => {
                sendWithdrawalRequest();
              }}
              className="action-button withdrawal-button"
            >
              Withdrawal founds from the contract
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
