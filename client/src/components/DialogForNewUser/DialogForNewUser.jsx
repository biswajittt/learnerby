import React, { useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';



export default function DialogForNewUser(props) {

    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <Dialog
            fullScreen={fullScreen}
            open={props.open}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                {"Please Login or Register"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You can login or register as a student or mentor
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={props.closeDialog}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}
