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

export const HistoryTransaction = ({ pendingTx, stateMine }) => {
  const { myWallet } = useContext(authContext);

  const [modalState, setModalState] = useState(enumState.HIDDEN);
  const [transactions, setTransactions] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [txSeleted, setTxSelected] = useState({});

  useEffect(() => {
    const fetchDate = async () => {
      const result = await axios.get(
        `http://localhost:${PORT}/transactions/${myWallet.publicKey.substring(
          2,
          myWallet.publicKey.length
        )}`
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
    setTableData(transactions.slice(0, 10));
    setupPagination();
  }, [transactions]);

  const setupPagination = () => {
    const subPage = transactions.length % 10 > 0 ? 1 : 0;
    const numPage = parseInt(transactions.length / 10) + subPage;
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
    setTableData(transactions.slice((index - 1) * 10, index * 10));
  };

  return (
    <div className="history-transaction">
      <div className="history-transaction__title">
        <p>History Transaction</p>
      </div>
      <div className="history-transaction__body">
        <table id="history-tx-table">
          <thead>
            <tr>
              <th>Txn</th>
              <th>Amount</th>
              <th>Date Time</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 &&
              tableData.map((item, index) => {
                return (
                  <tr key={index}>
                    <td
                      className="tx-hash"
                      onClick={() => {
                        setTxSelected(item);
                        setModalState(enumState.VISIBLE);
                      }}
                    >
                      {item.hash}
                    </td>
                    <td>
                      {`${
                        "0x" + item.from === myWallet.publicKey ? "- " : "+ "
                      }`}
                      {item.amount} MC
                    </td>
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
