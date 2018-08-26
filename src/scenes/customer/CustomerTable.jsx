import React from 'react';
import CrmTable from "../../commons/components/table/CrmTable";

let counter = 0;
function createData(name, mobile, email, state, city, score) {
  counter += 1;
  return { id: counter, name, mobile, email, state, city, score };
}

const rows = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Nome' },
  { id: 'mobile', numeric: false, disablePadding: true, label: 'Celular' },
  { id: 'email', numeric: false, disablePadding: true, label: 'Email' },
  { id: 'state', numeric: false, disablePadding: true, label: 'Estado' },
  { id: 'city', numeric: false, disablePadding: true, label: 'Cidade' },
  { id: 'score', numeric: true, disablePadding: false, label: 'Nota' },
];

const data = [
  createData('Renan', '19 98184 3533', 'renan@gmail.com', 'SP', 'São Caetano do Sul', 2.5),
  createData('Drica', '19 98755 8785', 'drica@gmail.com', 'SP', 'São Caetano do Sul', 9.9),
  createData('Luna', '19 2543 5465', 'luna@gmail.com', 'SP', 'São Caetano do Sul', 10),
  createData('Vitor', '19 2543 5465', 'vitor@gmail.com', 'SP', 'São Paulo', 9.9),
  createData('Gabriel', '19 2543 5465', 'gabriel@gmail.com', 'SP', 'São Caetano do Sul', 9.9),
  createData('Marcos', '19 2543 5465', 'marcos@gmail.com', 'SP', 'São Caetano do Sul', 9.9),
  createData('Claudia', '19 2543 5465', 'claudia@gmail.com', 'SP', 'São Caetano do Sul', 9.9),
  createData('Dani', '19 2543 5465', 'dani@gmail.com', 'SP', 'Santo André', 8.0),
  createData('Alessandra', '19 2543 5465', 'alessandra@gmail.com', 'SP', 'Santo André', 7.5),
  createData('Marcelo', '19 2543 5465', 'marcelo@gmail.com', 'SP', 'Borborema', 6.5),
  createData('Cesar', '19 2543 5465', 'cesar@gmail.com', 'SP', 'Limeira', 9.9),
  createData('Cris', '19 2543 5465', 'cris@gmail.com', 'SP', 'Limeira', 9.9),
  createData('Julio', '19 2543 5465', 'julio@gmail.com', 'SP', 'Limeira', 9.9),
];

const CustomerTable = () => (
  <CrmTable
    rows={rows}
    data={data}
    title="Lista de Clientes"
  />
);

export default CustomerTable;
