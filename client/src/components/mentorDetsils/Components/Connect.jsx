import React, { useEffect, useState } from 'react'
import { Input, Modal, Radio, RadioGroup, DialogTitle, Dialog, DialogActions, DialogContent, Card, Tabs, Tab, Box, styled, Stack, Avatar, Grid, Paper, Button, Typography, Divider, Chip, Skeleton, FormControl, FormLabel, FormControlLabel, CircularProgress, TextField, Alert, AlertTitle } from '@mui/material'

import { useParams } from 'react-router-dom';
import { sendConnection } from '../../../service/api';

import io from 'socket.io-client'
import { useStore } from 'react-redux';



const ConnectModalCard = styled(Card)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '350px',
    height: '200px',
    padding: '20px',

}));


const ConnectButton = styled(Button)(({ theme }) => ({
    left: '76%',
    width: '81px',
    marginTop: '10px',
    background: '#262626',
    ":hover": {
        background: '#555555',

    },
}));

const Error = styled(Typography)`
font-size: 10px;
color: #ff6361;
line-height: 0;
margin-top: 10px;
font-weight: bold;
`;


///*** */ socket config
const ENDPOINT = "http://localhost:8000";
let socket;

export default function Connect(props) {
    const { id } = useParams();



    // socket.on('private', function (msg) {
    //     alert(msg);
    // });

    /** for sokcet */

    // // const [socketConnected, setSocketConnected] = useStore(false);
    // useEffect(() => {

    //     socket = io(ENDPOINT);

    // }, [])

    // useEffect(() => {

    //     // socket.emit("addUser", props.accountHolderId, props.accountHolderEmail);
    //     // console.log(props.accountHolderEmail)

    //     // socket.on("getUsers", (users) => {
    //     //     console.log(users)
    //     // })

    //     socket.on("getConnection", data => {
    //         console.log(data)
    //     })

    // }, [socket])

    /*** */


    const [studentQuery, setStudentQuery] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [connectionSendSuccessfull, setConnectionSendSuccessfull] = useState(false);
    const [error, setError] = useState(false);


    const retrievedStudentData = localStorage.getItem('accountHolderData');
    const studentDetails = JSON.parse(retrievedStudentData)

    const onStudentQueryChange = (event) => {
        setStudentQuery(event.target.value);
        console.log(studentQuery);
    }

    const handleConnection = async () => {

        if (studentQuery === '') {
            setError(true);
            return;
        }

        if (studentQuery.length > 0) {
            setIsDisabled(true);
            console.log(studentQuery.length)
            // socket.emit("sendConnection", { id, studentDetails, studentQuery })
            // console.log("hi")
            // const data = { id, studentDetails, studentQuery }
            let response = await sendConnection(id, studentDetails, studentQuery);
            if (!response) return;
            // props.openContactModal = false;
            // socket.emit('send connection request', response)
            console.log(response)
            if (response) {
                setConnectionSendSuccessfull(true)

                setTimeout(
                    function waitAndDo() {
                        props.handleContactModalClose(true);
                        setConnectionSendSuccessfull(false);
                        setIsDisabled(false);
                    }, 5000)

            }

        } else {
            console.log(studentQuery.length)
        }

    }

    return (
        <Modal
            open={props.openContactModal}
            onClose={props.handleContactModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"

        >
            {
                (connectionSendSuccessfull) ?
                    <ConnectModalCard >
                        <Alert severity="success">
                            <AlertTitle>
                                <strong>Success</strong>
                            </AlertTitle>
                            Connection Sent — <strong>check it out!</strong>
                        </Alert>
                    </ConnectModalCard> :

                    <ConnectModalCard >
                        <Typography id="modal-modal-title" variant="h6" component="h2"  >
                            Send your query
                        </Typography>
                        <Stack>
                            <TextField label="Type your question" multiline rows={3}
                                sx={{ marginTop: '15px', }}
                                InputProps={{
                                    style: {
                                        borderRadius: '13px',
                                        marginTop: '5px',
                                    },
                                    readOnly: isDisabled,
                                }}
                                name='studentquery'
                                onChange={onStudentQueryChange}
                            />
                            {
                                (error) ?
                                    <Error>*Please enter your query</Error> :
                                    null
                            }
                            <ConnectButton variant='contained' size='small' onClick={handleConnection} disabled={isDisabled == true}>Connect</ConnectButton>
                        </Stack>
                    </ConnectModalCard>

            }



        </Modal>
    )
}
