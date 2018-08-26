import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import CreateIcon from '@material-ui/icons/AddCircle';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';


let counter = 0;
function createData(name, mobile, email, state, city, score) {
  counter += 1;
  return { id: counter, name, mobile, email, state, city, score };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Nome' },
  { id: 'mobile', numeric: false, disablePadding: true, label: 'Celular' },
  { id: 'email', numeric: false, disablePadding: true, label: 'Email' },
  { id: 'state', numeric: false, disablePadding: true, label: 'Estado' },
  { id: 'city', numeric: false, disablePadding: true, label: 'Cidade' },
  { id: 'score', numeric: true, disablePadding: false, label: 'Nota' },
];

class CustomerTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

CustomerTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
    display: 'flex',
  },
  title: {
    flex: '0 0 auto',
  },
});

let CustomerTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} {(numSelected === 1) ? 'selecionado' : 'selecionados'}
          </Typography>
        ) : (
          <Typography variant="title" id="tableTitle">
            Clientes Cadastrados
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected === 1 ? (
          <Tooltip title="Informações adicionais do cliente">
            <IconButton aria-label="Info">
              <InfoIcon />
            </IconButton>
          </Tooltip>
          ): null}
        {numSelected === 1 ? (
          <Tooltip title="Editar cliente selecionado">
            <IconButton aria-label="Delete">
              <EditIcon />
            </IconButton>
          </Tooltip>
          ): null}
        {numSelected > 0 ? (
          <Tooltip title="Remover cliente(s) selecionado(s)">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>

        ) : (
          <div className={classes.actions}>
            <Tooltip title="Filtrar clientes">
              <IconButton aria-label="Filtrar clientes">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cadastrar cliente">
              <IconButton aria-label="Cadastrar cliente">
                <CreateIcon />
              </IconButton>
            </Tooltip>
          </div>
        )}
      </div>
    </Toolbar>
  );
};

CustomerTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

CustomerTableToolbar = withStyles(toolbarStyles)(CustomerTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class CustomerTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'score',
    selected: [],
    data: [
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
    ],
    page: 0,
    rowsPerPage: 10,
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <CustomerTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <CustomerTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data
                .sort(getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.name}
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.mobile}
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.email}
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.state}
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.city}
                      </TableCell>
                      <TableCell numeric>{n.score}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage="Linhas por página"
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

CustomerTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomerTable);
