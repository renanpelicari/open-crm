import React, { PureComponent } from 'react';
import axios from 'axios';
import CrmTable from "../../commons/components/table/CrmTable";

const URL = 'http://localhost:3003/api/customers';

const columnsDefinitions = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Nome' },
  { id: 'mobile', numeric: false, disablePadding: true, label: 'Celular' },
  { id: 'email', numeric: false, disablePadding: true, label: 'Email' },
  { id: 'state', numeric: false, disablePadding: true, label: 'Estado' },
  { id: 'city', numeric: false, disablePadding: true, label: 'Cidade' },
  { id: 'score', numeric: true, disablePadding: false, label: 'Nota' },
];

class CustomerTable extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };

    this.searchData = this.searchData.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  componentWillMount() {
    this.searchData('name', 'asc');
  }

  searchData(sortBy, sortDirection) {
    const sort = (sortDirection === 'asc') ? sortBy : `-${sortBy}`;

    axios.get(`${URL}?sort=${sort}`)
      .then(resp => this.updateData(resp.data))
  }

  updateData(data) {
    window.console.log(data);
    this.setState({
      ...this.state,
      data: data
    })
  }

  render() {
    const { data } = this.state;
    return (
      <CrmTable
        columnsDefinitions={columnsDefinitions}
        data={data}
        title="Lista de Clientes"
      />
    )
  }
}

export default CustomerTable;
