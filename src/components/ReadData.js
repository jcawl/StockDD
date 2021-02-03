import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TickerButton from './TickerButton'
import firebase from '../Fire'
import DDButton from './DDButton'
import LinkDrawer from './LinkDrawer'
import { FormatAlignLeftSharp } from '@material-ui/icons';
import RemoveIcon from '@material-ui/icons/Remove';
import Button from '@material-ui/core/Button';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(ticker, exchange, marketCap, float, history) {
  return {
    ticker,
    exchange,
    marketCap,
    float,
    history
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [changed, setChanged] = React.useState(0)
  const classes = useRowStyles();

  function removeEntry (e, currentRow, ticker, key) {
    currentRow.show = false
    firebase.database().ref(`${ticker}/${key}`).remove()
    setChanged(changed + 1)
    e.preventDefault()
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.ticker}
        </TableCell>
        <TableCell align="right">{row.exchange}</TableCell>
        <TableCell align="right">{row.marketCap}</TableCell>
        <TableCell align="right">{row.float}</TableCell>
        <TableCell align='right'>
              <DDButton ticker={row.ticker}/>
        </TableCell>
        <TableCell align='right'>
              <LinkDrawer ticker={row.ticker}/>
            </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                DD
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>DD</TableCell>
                    <TableCell align="right"> Price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {Object.keys(row.history).map(function(keyName, keyIndex){
                    return (row.history[keyName].show) ? <TableRow key={keyName}>
                      <TableCell component="th" scope="row">
                        {row.history[keyName].date}
                      </TableCell>
                      <TableCell>{row.history[keyName].dd}</TableCell>
                      <TableCell align="right">{row.history[keyName].price}</TableCell>
                      <Button onClick={(e) => removeEntry(e, row.history[keyName], row.ticker, keyName) }>
                        <RemoveIcon />
                      </Button>
                    </TableRow> : <div></div>
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    ticker: PropTypes.string.isRequired,
    exchange: PropTypes.string.isRequired,
    marketCap: PropTypes.number.isRequired,
    float: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        price: PropTypes.number.isRequired,
        dd: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        show: PropTypes.bool.isRequired
      }),
    )})
};


export default function ReadData({refresh}) {

  window.onload = function() {
    setRows([])
}


  const [rows, setRows] = useState([])

  function setData() {
      var res = {}
      var dbRef = null
      dbRef = firebase.database().ref().on('value', (snapshot) => {
          if (snapshot) {
            console.log(snapshot.val())
            setRows([])
            res = snapshot.val()

            if (res === null){
              return <TickerButton />
            }
            Object.keys(res).map(function(keyName, keyIndex){
              fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${keyName}&token=sandbox_c007t0n48v6r2qrrjr90`)
                .then(results => results.json())
                .then(data => {
                    console.log(data)
                    let hist = res[keyName]
                    Object.keys(hist).map(function(point) {
                      hist[point].show = true
                    })
                    setRows(rows => [...rows, createData(keyName,data.exchange,data.marketCapitalization,data.shareOutstanding,hist)])
                });
          })
          } else {
            return
          }
        })
        return () => {
          dbRef()
        }
  }

    useEffect(() => {
       setData()
      
      }, [firebase.database()]);

  return (
    <React.Fragment>
    <TableContainer component={Paper} style={{width:'80vw'}}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Ticker</TableCell>
            <TableCell align="right">Exchange</TableCell>
            <TableCell align="right">Market Cap</TableCell>
            <TableCell align="right">Float</TableCell>
            <TableCell align='right'>
              <TickerButton />
            </TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.ticker} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </React.Fragment>
  );
}