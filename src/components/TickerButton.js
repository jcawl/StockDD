import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import fire from '../Fire'
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';

export default function TickerButton() {
  const [open, setOpen] = React.useState(false);
  const [ticker, setTicker] = React.useState('')
  const [dd, setDD] = React.useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
        let price = 0
        let entryDate = ''

        let ddCheck = ''

        if(dd === ''){ ddCheck = 'no value added'}
        else { ddCheck = dd}

        await fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=sandbox_c007t0n48v6r2qrrjr90`)
            .then(results => results.json())
            .then(data => {
                price = data.c
                console.log(data)
                entryDate = new Date().toLocaleDateString()
            });

        let entry = {
            'date' : entryDate,
            'price' : price,
            'dd' : ddCheck
        }

        fire.database().ref().child(ticker).push(entry)
        
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <PlaylistAddOutlinedIcon fontSize='small' />
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <DialogContentText>
            Add new ticker to watchlist
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="$"
            type="text"
            onChange={e => setTicker(e.target.value)}
            fullWidth
          />
          <TextField
          id="outlined-multiline-static"
          label="Company Overview"
          margin="dense"
          multiline
          rows={5}
          onChange={e => setDD(e.target.value)}
          variant="outlined"
          fullWidth
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}