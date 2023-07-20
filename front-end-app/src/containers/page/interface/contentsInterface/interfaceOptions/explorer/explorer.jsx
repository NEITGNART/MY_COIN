// @flow
import React, { useContext, useState, useEffect } from "react";
import "./style.scss";

import { authContext } from "../../../../../../contexts/authContext";

import axios from "axios";

import { Modal } from "../../../../../../components/modal/modal";

const enumState = {
  HIDDEN: "hidden",
  CLOSE: "close",
  VISIBLE: "visible",
};

function shortenAddress(address, length = 5) {
  if (address.length < 20) return address;
  return (
    "0x" +
    address.substring(0, 5) +
    "..." +
    address.substring(address.length - length)
  );
}

function shortenHash(hash) {
  return "0x" + hash.substring(0, 10) + "...";
}

const PORT = process.env.REACT_APP_API_PORT || 8080;

export const Explorer = ({ pendingTx }) => {
  const { myWallet } = useContext(authContext);

  const [modalState, setModalState] = useState(enumState.HIDDEN);
  const [transactions, setTransactions] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableTransactions, setTableTransactions] = useState([]);

  const [pagination, setPagination] = useState([]);
  const [txPagination, setTXPagination] = useState([]);
  const [txSeleted, setTxSelected] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchDate = async () => {
      const result = await axios.get(`http://localhost:${PORT}/blocks`);
      setBlocks(
        result.data.sort(
          (a, b) =>
            new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime()
        )
      );
    };
    fetchDate();
  }, [pendingTx]);

  useEffect(() => {
    setTableData(blocks.slice(0, 10));
    setupPagination();
  }, [blocks]);

  useEffect(() => {
    const fetchDate = async () => {
      const result = await axios.get(
        `http://localhost:${PORT}/all-transactions`
      );
      setTransactions(
        result.data.sort(
          (a, b) =>
            new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime()
        )
      );
    };
    fetchDate();
  }, [pendingTx]);

  useEffect(() => {
    setTableTransactions(transactions.slice(0, 10));
    setupTxPagination();
  }, [transactions]);

  const setupTxPagination = () => {
    const subPage = transactions.length % 10 > 0 ? 1 : 0;
    const numPage = parseInt(transactions.length / 10) + subPage;
    const object = [];
    for (let index = 1; index <= numPage; index++) {
      object.push({
        id: index,
        active: +index === 1 ? "pagination__item--active" : "",
      });
    }
    setTXPagination(object);
  };

  const setupPagination = () => {
    const subPage = blocks.length % 10 > 0 ? 1 : 0;
    const numPage = parseInt(blocks.length / 10) + subPage;
    const object = [];
    for (let index = 1; index <= numPage; index++) {
      object.push({
        id: index,
        active: +index === 1 ? "pagination__item--active" : "",
      });
    }
    setPagination(object);
  };

  const handlePagination = (e) => {
    const index = +e.target.getAttribute("data-id");
    pagination.forEach((ele) => {
      ele.active = +index === +ele.id ? "pagination__item--active" : "";
    });
    setTableData(blocks.slice((index - 1) * 10, index * 10));
  };

  const handleTxPagination = (e) => {
    const index = +e.target.getAttribute("data-id");
    txPagination.forEach((ele) => {
      ele.active = +index === +ele.id ? "pagination__item--active" : "";
    });
    setTableTransactions(transactions.slice((index - 1) * 10, index * 10));
  };

  return (
    <div className="history-transaction">
      <div
        className="history-transaction__title"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p> The MyCoin Blockchain Explorer </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "25%",
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          <input
            type="text"
            placeholder="Search by Address / Tx Hash / Block Hash"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              fontSize: "16px",
              border: "none",
              outline: "none",
              marginLeft: "10px",
            }} // Use flex: 1 to make the input fill the available space
          />
          <i className="fa fa-search" aria-hidden="true"></i>
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div className="history-transaction__body" style={{ width: "40%" }}>
          <table id="history-tx-table">
            <thead>
              <tr>
                <th style={{ width: "15%" }}>Lasted blocks</th>
                <th>Nounce</th>
                <th>Block Reward</th>
                <th>Time Stamp</th>
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 &&
                tableData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.index} </td>
                      <td>{item.nonce} </td>
                      <td>{10} MC</td>
                      <td>{new Date(item.timeStamp).toLocaleString()}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div
            style={{ width: "50%" }}
            className={`cover ${pagination.length > 1 ? "" : "cover--hidden"}`}
          >
            <div className="pagination">
              {pagination.map((item) => {
                return (
                  <div
                    data-id={item.id}
                    className={`pagination__item ${item.active}`}
                    onClick={handlePagination}
                  >
                    {item.id}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="history-transaction__body" style={{ width: "60%" }}>
          <table id="history-tx-table">
            <thead>
              <tr>
                <th style={{ width: "20%" }}>Latest Transactions</th>
                <th>Amount</th>
                <th>Date Time</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tableTransactions.length > 0 &&
                tableTransactions.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td
                        className="tx-hash"
                        onClick={() => {
                          setTxSelected(item);
                          setModalState(enumState.VISIBLE);
                        }}
                      >
                        {shortenHash(item.hash)}
                      </td>
                      <td>{item.amount} MC</td>
                      <td>
                        {+item.block !== -1
                          ? new Date(item.timeStamp).toLocaleString()
                          : "Waiting..."}
                      </td>
                      <td>{item.from ? shortenAddress(item.from) : ""}</td>
                      <td>{item.to ? shortenAddress(item.to) : ""}</td>
                      <td>{+item.block !== -1 ? "Success" : "Pending"}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div
            style={{ width: "50%" }}
            className={`cover ${
              txPagination.length > 1 ? "" : "cover--hidden"
            }`}
          >
            <div className="pagination">
              {txPagination.map((item) => {
                return (
                  <div
                    data-id={item.id}
                    className={`pagination__item ${item.active}`}
                    onClick={handleTxPagination}
                  >
                    {item.id}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Modal
        state={modalState}
        onClickOverlay={() => {
          setModalState(enumState.CLOSE);
        }}
      >
        <div className="transaction-detail">
          <div className="header">Transaction detail</div>
          <hr></hr>
          <div className="body">
            <div className="transaction-detail__item">
              <div className="transaction-detail__item-label">Hash Tx</div>
              <p className="transaction-detail__item-text">{txSeleted.hash}</p>
            </div>
            <div className="transaction-detail__item">
              <div className="transaction-detail__item-label">Time</div>
              <p className="transaction-detail__item-text">
                {txSeleted.timeStamp}
              </p>
            </div>
            <div className="transaction-detail__item">
              <div className="transaction-detail__item-label">Block</div>
              <p className="transaction-detail__item-text">{txSeleted.block}</p>
            </div>
            <div className="transaction-detail__item">
              <div className="transaction-detail__item-label">From</div>
              <p className="transaction-detail__item-text">{txSeleted.from}</p>
            </div>
            <div className="transaction-detail__item">
              <div className="transaction-detail__item-label">To</div>
              <p className="transaction-detail__item-text">{txSeleted.to}</p>
            </div>
            <div className="transaction-detail__item">
              <div className="transaction-detail__item-label">Amount</div>
              <p className="transaction-detail__item-text">
                {txSeleted.amount}
              </p>
            </div>
          </div>
          <div
            className="btn"
            onClick={() => {
              setModalState(enumState.CLOSE);
            }}
          >
            Close
          </div>
        </div>
      </Modal>
    </div>
  );
};
