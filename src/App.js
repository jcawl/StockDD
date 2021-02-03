import logo from './logo.svg'
import './App.css'
import ReadData from './components/ReadData'
import DDForm from './components/DDForm'
import RefreshIcon from '@material-ui/icons/Refresh';
import Button from '@material-ui/core/Button';
import React, { useState }from 'react'

function App() {

  const [open, setOpen] = useState(false)

  function refreshHit(e) {
    e.preventDefault()
    if (open) { setOpen(false)}
    else { setOpen(true) }
  }

  return (
    <div style={{"display":"flex", flexDirection: 'column', "justifyContent":'center', 'alignItems':'center'}} >
      <div style={{"display":"flex", flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Button variant="outlined" color="primary" target="_blank" rel="noopener noreferrer" href="https://finviz.com/screener.ashx">
          Screener
        </Button>
        <Button variant="outlined" color="primary" target="_blank" rel="noopener noreferrer" href="https://finviz.com/map.ashx">
          Market View
        </Button>
        <Button variant="outlined" color="primary" target="_blank" rel="noopener noreferrer" href="https://seekingalpha.com/market-news/all">
          News
        </Button>
        <Button variant="outlined" color="primary" target="_blank" rel="noopener noreferrer" href="https://finra-markets.morningstar.com/BondCenter/Default.jsp">
          Bond Data
        </Button>
      </div>
    <div className="App" style={{"display":"flex", "justifyContent":'center', 'alignItems':'center'}}>
      <ReadData refresh={open}/>
    </div>
    </div>
  );
}

export default App;
