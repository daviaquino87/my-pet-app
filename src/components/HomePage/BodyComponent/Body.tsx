import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import Balance from "../BalanceComponente/balance";
import ButonnAdd from "../ButtonComponent/ButtonAdd";

class Body extends React.Component {
  render() {
    return (
      <div className="balance-group">
        <Link to="/reports">
          <a href="#reports" className="Reports">
            Reports
          </a>
        </Link>
        <Balance />
        <ButonnAdd />
      </div>
    );
  }
}

export default Body;
