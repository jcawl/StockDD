import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import fire from '../Fire'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';

export default function DDButton({ ticker }) {
  const [open, setOpen] = React.useState(false);
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
            'dd' : dd
        }

        fire.database().ref().child(ticker).push(entry)
        
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <CreateOutlinedIcon fontSize='small' />
      </Button>
      <Dialog open={open} fullWidth={ true } maxWidth={"md"} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent >
          <DialogContentText>
            {ticker}
          </DialogContentText>
          <TextField
          autoFocus
          id="outlined-multiline-static"
          label="DD"
          multiline
          rows={25}
          onChange={e => setDD(e.target.value)}
          variant="outlined"
          style={{width:'100%'}}
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