import React from 'react';
import Header from "../../commons/components/header/Header";
import CustomerTable from "./CustomerTable";

const CustomerPage = () => (
  <div>
    <Header title="Open CRM"/>
    <CustomerTable />
  </div>
);

export default CustomerPage;
