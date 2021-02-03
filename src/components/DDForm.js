import React, { useState } from 'react'
import fire from '../Fire'
import { makeStyles} from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));


function DDForm() {
    const classes = useStyles()
    const [ticker,setTicker] = useState('')
    const [DD,setDD] = useState('')

    const handleSubmit = async (e) => {

        e.preventDefault()

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
            'dd' : DD
        }

        fire.database().ref().child(ticker).push(entry)
        
    }


    return(
        <form onSubmit={handleSubmit} style={{'display':'flex', 'flexDirection':'column', 'width':'15vw'}}>
            <FormControl>
                <InputLabel htmlFor="standard-adornment-amount">Ticker</InputLabel>
                    <Input
                        id="standard-adornment-amount"
                        onChange={ e => setTicker(e.target.value)}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
            </FormControl>


            <TextField
                id="outlined-multiline-static"
                label="Due Diligence"
                multiline
                rows={4}
                variant="outlined"
                onChange={e => setDD(e.target.value)}
            />

            <Button
                variant="contained"
                color="default"
                type='submit'
                className={classes.button}
                startIcon={<CloudUploadIcon />}
                >
                Upload
            </Button>
        </form>
    )
}

export default DDForm