// @flow
import React, { useState, useEffect } from "react";
import "./style.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function showToastError(message) {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}

export const SendTransaction = (props) => {
  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState("");

  useEffect(() => {
    setAmount(props.transaction.amount);
    setAddress(props.transaction.receive);
  }, [props.transaction]);

  const handleSetupTransaction = () => {
    if (+amount === +0) {
      showToastError("Amount must be greater than 0");
      return;
    }

    if (amount > props.walletBalance) {
      showToastError("You don't have enough money to send");
      return;
    }
    props.setBalance(props.walletBalance - amount);
    props.setTransaction({ receive: address, amount: amount });
    props.openModal();
  };

  return (
    <div className="send-transaction">
      <div className="send-transaction__title">
        <p>Send Transaction</p>
        <ToastContainer />
      </div>
      <div className="send-transaction__body">
        <div className="send-transaction-form">
          <div className="amount">
            <div className="amount__type">
              <label>Type</label>
              <p>
                MC <span style={{ opacity: "0.5" }}>- MyCoin</span>
              </p>
            </div>
            <div className="amount__main">
              <label>Amount</label>
              <input
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                type="number"
                placeholder="Amount"
              />
            </div>
          </div>
          <div className="address">
            <label>Address</label>
            <input
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              type="text"
              placeholder="Please enter the address (0x.....)"
            />
          </div>
          <div className="tx-fee">
            <label>Transaction fee</label>
            <p>Cost 0.000861000030639 MC = $0.20</p>
          </div>
        </div>
        <div className="btn-submit">
          <div className="basic-button" onClick={handleSetupTransaction}>
            Send Transaction
          </div>
          <p
            className="btn-submit__clear-btn"
            onClick={() => {
              setAddress("");
              setAmount(0);
            }}
          >
            Clear all
          </p>
        </div>
      </div>
    </div>
  );
};
