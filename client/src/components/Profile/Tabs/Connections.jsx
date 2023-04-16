import React from 'react'
import { useState, useEffect } from 'react';
import { Divider, Grid, Card, Paper, Stack, Box, styled, Typography, TextField, Button, Skeleton, Avatar, Autocomplete, FormControl, InputLabel, Select, MenuItem, Tabs, Tab, cardActionAreaClasses, List, ListItem, ListItemAvatar, ListItemText, Container } from '@mui/material';
import { fetchMentorConnections } from '../../../redux/actions/connectionAction'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import io, { Socket } from 'socket.io-client'
import { fetchConnectionStatus } from '../../../service/api';

const ConnectionComponent = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0px 12px 15px 12px',
    marginTop: '2px',

}));

// const ConnectionComponentCard = styled(Card)(({ theme }) => ({
//     width: '1083px',
//     padding: '29px 25px 35px 25px',
// }));

const NewConnectionsRequest = styled(Grid)(({ theme }) => ({

}));
const NewConnectionsRequestCard = styled(Card)(({ theme }) => ({

    padding: '10px 25px 35px 25px',
    marginRight: '10px',
    marginLeft: '10px',
    height: '440px'

}));

const ConnectedPeople = styled(Grid)(({ theme }) => ({

}));
const ConnectedPeopleCard = styled(Card)(({ theme }) => ({

    padding: '10px 25px 35px 25px',
    marginRight: '10px',
    marginLeft: '10px',
    height: '440px'
}));

const CardTitle = styled(Box)(({ theme }) => ({

    display: 'flex',
    justifyContent: 'center',
    background: '#eeeeee',
    borderRadius: '10px',
    height: '38px'
}));

const OpenConnectionContainer = styled(Stack)(({ theme }) => ({

}));
const FirstOpenConnectionContainer = styled(Container)(({ theme }) => ({
    // background: 'grey',
    height: '180px'
}));
const SecondOpenConnectionContainer = styled(Container)(({ theme }) => ({
    background: '#f4f4f4',
    height: '260px',
    borderRadius: '18px',
    padding: '15px'
}));

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

function stringAvatarInOpenConnection(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
            width: '78px', height: '78px'
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}


///*** */ socket config
const ENDPOINT = "http://localhost:8000";
let socket;

export default function Connections() {

    // socket = io(ENDPOINT);

    // const retrievedMentorData = localStorage.getItem('accountHolderData');
    // const mentorDetails = JSON.parse(retrievedMentorData)

    // const id = mentorDetails._id;
    const dispatch = useDispatch();

    const [connectionsDetails, setConnectionsDetails] = useState(false);
    const [temp, setTemp] = useState([]);


    const { id } = useParams()


    const [isResquestAceepted, setIsRequestAccepted] = useState(false);

    const acceptConnectionRequest = async (studentId, studentObjectId) => {
        console.log(typeof studentId, typeof studentObjectId)
        let response = await fetchConnectionStatus(studentId, studentObjectId, id);
        if (!response) return;
        setIsRequestAccepted(true);
    }

    const { loading, connectionData } = useSelector((state) => state.connectionReducer)

    useEffect(() => {

        dispatch(fetchMentorConnections(id))

    }, [id, dispatch, isResquestAceepted])


    const [openConnection, setOpenConnection] = useState({ open: false, studentName: '', studentQuery: '' });
    const openConnectionChat = (studentName, studentQuery) => {
        setOpenConnection({ open: true, studentName: studentName, studentQuery: studentQuery });
    }


    return (

        <ConnectionComponent >

            <Grid container spacing={2} v direction="row">

                <NewConnectionsRequest item xs={6}>

                    <NewConnectionsRequestCard>
                        <CardTitle>
                            <Typography sx={{ fontWeight: 'bold', fontSize: '20px', padding: '5px' }}>
                                Connetion Requests
                            </Typography>
                        </CardTitle>

                        {
                            (loading == false && connectionData && connectionData.data.mentorConnectionsDetails.length > 0) ?
                                <List

                                    sx={{
                                        width: '100%',
                                        maxWidth: 'auto',
                                        bgcolor: 'background.paper',
                                        position: 'relative',
                                        overflow: 'auto',
                                        maxHeight: '90%',
                                        marginTop: '10px',
                                        '& ul': { padding: 0 },
                                    }}
                                >
                                    {
                                        (connectionData.data.mentorConnectionsDetails[0].students).map((data, index) => (

                                            <ListItem alignItems="flex-start" key={index}>
                                                <ListItemAvatar sx={{ cursor: 'pointer' }} onClick={() => openConnectionChat(data.studentData.name, data.studentQuery)}>
                                                    <Avatar {...stringAvatar(`${data.studentData.name}`)} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    sx={{ cursor: 'pointer' }}
                                                    onClick={() => openConnectionChat(data.studentData.name, data.studentQuery)}
                                                    primary={
                                                        <Typography sx={{ fontWeight: 'bold', fontSize: '15px' }}>
                                                            {data.studentData.name}
                                                        </Typography>
                                                    }

                                                    secondary={
                                                        <Typography
                                                            sx={{ display: 'inline', fontWeight: '500', fontSize: '14px', opacity: '74%' }}
                                                            component="span"
                                                            variant="body2"
                                                            color="text.primary"
                                                        >
                                                            {data.studentQuery.split(' ').slice(0, 5).join(' ')}
                                                        </Typography>
                                                    }
                                                >

                                                </ListItemText>
                                                {
                                                    (data.status == "sent") ?
                                                        <Button variant="contained" size="small" sx={{ background: '#000000', color: 'white' }}
                                                            onClick={() => acceptConnectionRequest(data.studentData._id, data._id)}
                                                        >
                                                            <Typography sx={{ fontSize: '13px', fontWeight: 'bold' }}>
                                                                Accept
                                                            </Typography>
                                                        </Button> :
                                                        <Button variant="outlined" size="small" disabled >
                                                            <Typography sx={{ fontSize: '13px', fontWeight: 'bold' }}>
                                                                Accepted
                                                            </Typography>
                                                        </Button>
                                                }

                                            </ListItem>
                                        ))
                                    }

                                </List> :
                                <Box sx={{ display: "flex", justifyContent: 'center', marginTop: '166px' }}>
                                    <Typography sx={{ fontSize: '19px' }}>
                                        No connection requestes
                                    </Typography>
                                </Box>

                            // <List

                            //     sx={{
                            //         width: '100%',
                            //         maxWidth: 'auto',
                            //         bgcolor: 'background.paper',
                            //         position: 'relative',
                            //         overflow: 'auto',
                            //         maxHeight: '90%',
                            //         marginTop: '10px',
                            //         '& ul': { padding: 0 },
                            //     }}
                            // >
                            //     <ListItem alignItems="flex-start">
                            //         <ListItemAvatar>
                            //             <Avatar {...stringAvatar('Kent Dodds')} />
                            //         </ListItemAvatar>
                            //         <ListItemText primary="Brunch this weekend?"
                            //             secondary={
                            //                 <Typography
                            //                     sx={{ display: 'inline' }}
                            //                     component="span"
                            //                     variant="body2"
                            //                     color="text.primary"
                            //                 >
                            //                     fdfdfd
                            //                 </Typography>
                            //             }
                            //         >
                            //         </ListItemText>
                            //     </ListItem>

                            // </List>
                        }


                        {/* <List

                            sx={{
                                width: '100%',
                                maxWidth: 'auto',
                                bgcolor: 'background.paper',
                                position: 'relative',
                                overflow: 'auto',
                                maxHeight: '90%',
                                marginTop: '10px',
                                '& ul': { padding: 0 },
                            }}
                        >

                            {
                                (loading == false && connectionData) ?
                                    <>
                                        <Typography>hi</Typography>
                                        {
                                            (connectionData.data.mentorConnectionsDetails[0].students).map((data, index) => {
                                                <ListItem alignItems="flex-start">
                                                    <ListItemAvatar>
                                                        <Avatar {...stringAvatar('Kent Dodds')} />
                                                    </ListItemAvatar>
                                                    <ListItemText primary="Brunch this weekend?"
                                                        secondary={
                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                {data.studentQuery}
                                                            </Typography>
                                                        }
                                                    >
                                                    </ListItemText>
                                                </ListItem>
                                            })
                                        }
                                    </>
                                    :

                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar {...stringAvatar('Kent Dodds')} />
                                        </ListItemAvatar>
                                        <ListItemText primary="Brunch this weekend?"
                                            secondary={
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    Ali Connors
                                                </Typography>
                                            }
                                        >
                                        </ListItemText>
                                    </ListItem>

                            }

                            <Divider variant="inset" component="li" />

                        </List> */}

                    </NewConnectionsRequestCard>

                </NewConnectionsRequest>

                <ConnectedPeople item xs={6}>


                    <ConnectedPeopleCard>
                        {
                            (openConnection.open) ?
                                <OpenConnectionContainer>

                                    < FirstOpenConnectionContainer sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Stack spacing={2}>
                                            <Container>
                                                <Avatar {...stringAvatarInOpenConnection(`${openConnection.studentName}`)} />
                                            </Container>
                                            <Typography sx={{ fontSize: '15px', fontWeight: 'bold', display: 'flex', justifyContent: 'center' }}>{openConnection.studentName}</Typography>
                                        </Stack>
                                    </FirstOpenConnectionContainer>

                                    <SecondOpenConnectionContainer>
                                        <Typography sx={{ fontSize: '16px', color: 'black', overflow: 'auto', resize: 'vertical' }}>{openConnection.studentQuery}</Typography>
                                    </SecondOpenConnectionContainer>

                                </OpenConnectionContainer> :

                                <Typography sx={{ display: 'flex', justifyContent: 'center', fontWeight: 'bold', marginTop: '200px' }}>No Opened Connection Chat</Typography>
                        }
                    </ConnectedPeopleCard>

                </ConnectedPeople>

            </Grid>


        </ConnectionComponent>


    )
}
