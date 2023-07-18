// @flow
import React, { useContext, useEffect } from "react";
import "./style.scss";

import { interfaceOptionContext } from "../../../../contexts/interfaceOptionContext";
import DashBoardIcon from "../../../../assets/Icon/dashboard.png";
import SendIcon from "../../../../assets/Icon/send.png";
import HistoryIcon from "../../../../assets/Icon/history.png";
export const SlideMenu = (props) => {
  const { option, setInterfaceOption } = useContext(interfaceOptionContext);

  const handleInterfaceOption = (e) => {
    const target = e.currentTarget;
    setInterfaceOption(+target.getAttribute("data-id") + 1);
  };

  return (
    <div className="slide-menu">
      {menuItems.map((item, index) => {
        return (
          <div
            onClick={handleInterfaceOption}
            data-id={index}
            className={`menu-item ${
              +option === index + 1 ? "item--active" : ""
            }`}
          >
            <div className="menu-item__image">
              {<img src={item.srcImg} height={35} width={35}></img>}
            </div>
            <p className="menu-item__text">{item.text}</p>
          </div>
        );
      })}
    </div>
  );
};

const menuItems = [
  { srcImg: DashBoardIcon, text: "Dashboard" },
  { srcImg: SendIcon, text: "Send" },
  { srcImg: HistoryIcon, text: "History" },
  { srcImg: HistoryIcon, text: "Explorer" },
];
