import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import TwitterIcon from '@material-ui/icons/Twitter';
import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';
import FingerprintOutlinedIcon from '@material-ui/icons/FingerprintOutlined';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import GavelOutlinedIcon from '@material-ui/icons/GavelOutlined';
import PhoneInTalkOutlinedIcon from '@material-ui/icons/PhoneInTalkOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import InsertChartOutlinedTwoToneIcon from '@material-ui/icons/InsertChartOutlinedTwoTone';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer( {ticker} ) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
        <List>
          <ListItem button component='a' target="_blank" rel="noopener noreferrer" href={`https://finviz.com/quote.ashx?t=${ticker}`}>
            <ListItemIcon> <InsertChartOutlinedTwoToneIcon /> </ListItemIcon>
            <ListItemText primary={'Chart'} />
          </ListItem>
      </List>
      <List>
          <ListItem button component='a' target="_blank" rel="noopener noreferrer" href={`http://www.google.com/search?q=${ticker}+investor+relations+press+release`}>
            <ListItemIcon> <AnnouncementOutlinedIcon /> </ListItemIcon>
            <ListItemText primary={'Press Releases'} />
          </ListItem>
      </List>
      <List>
          <ListItem button component='a' target="_blank" rel="noopener noreferrer" href={`http://openinsider.com/screener?s=${ticker}`}>
            <ListItemIcon> <FingerprintOutlinedIcon /> </ListItemIcon>
            <ListItemText primary={'Insider Activity'} />
          </ListItem>
      </List>
      <List>
          <ListItem button component='a' target="_blank" rel="noopener noreferrer" href={`https://whalewisdom.com/stock/${ticker}`}>
            <ListItemIcon> <AccountBalanceOutlinedIcon /> </ListItemIcon>
            <ListItemText primary={'Institutional Holdings'} />
          </ListItem>
      </List>
      <List>
          <ListItem button component='a' target="_blank" rel="noopener noreferrer" href={`https://www.sec.gov/cgi-bin/browse-edgar?CIK=${ticker}`}>
            <ListItemIcon> <GavelOutlinedIcon /> </ListItemIcon>
            <ListItemText primary={'SEC Filings'} />
          </ListItem>
      </List>
      <List>
          <ListItem button component='a' target="_blank" rel="noopener noreferrer" href={`https://marketchameleon.com/Overview/${ticker}/Similar/`}>
            <ListItemIcon> <PeopleAltOutlinedIcon /> </ListItemIcon>
            <ListItemText primary={'Market Peers'} />
          </ListItem>
      </List>
      <Divider />
      <List>
          <ListItem button component='a' target="_blank" rel="noopener noreferrer" href={`https://twitter.com/search?q=${ticker}`}>
            <ListItemIcon> <TwitterIcon /> </ListItemIcon>
            <ListItemText primary={'Twitter'} />
          </ListItem>
      </List>
      <List>
          <ListItem button component='a' target="_blank" rel="noopener noreferrer" href={`https://stocktwits.com/symbol/${ticker}`}>
            <ListItemIcon> <PhoneInTalkOutlinedIcon /> </ListItemIcon>
            <ListItemText primary={'Stock Twits'} />
          </ListItem>
      </List>
    </div>
    
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
              <ChevronRightOutlinedIcon fontSize='small' />
          </Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}