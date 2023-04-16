import React, { useEffect } from 'react'
import { useState } from 'react';
import { Card, Paper, Stack, Box, styled, Typography, TextField, Button, Skeleton, Avatar, Autocomplete, FormControl, InputLabel, Select, MenuItem, Tabs, Tab, Divider, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useParams } from 'react-router-dom';
import { changeClassStatus, fetchClassesByMentorId } from '../../../service/api';

const ClassComponent = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0px 12px 15px 12px',
    marginTop: '2px',

}));
const ClassComponentCard = styled(Card)(({ theme }) => ({
    width: '1083px',
    padding: '29px 25px 35px 25px',

}));
const ClassComponentCardHeader = styled(Stack)(({ theme }) => ({


}));
const ClassComponentCardBody = styled(Paper)(({ theme }) => ({
    width: '100%',
    overflow: 'hidden',
    marginTop: '25px'

}));
const ClassComponentCardBodyHeader = styled(Stack)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between'

}));
const ClassComponentCardBodyHeaderText = styled(Stack)(({ theme }) => ({
    fontSize: '16px',
    opacity: '54%',
    fontWeight: 'bold'

}));
const ClassComponentCardBodyContent = styled(Stack)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between'

}));



const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


export default function Classes() {

    const { id } = useParams();

    const [classes, setClasses] = useState('');

    const [status, setSatus] = useState('Started');

    const [isStatusChanged, setIsStatusChanged] = useState(false);
    const [studentObjectId, setStudentObjectId] = useState('');

    const fetchClasses = async () => {
        let response = await fetchClassesByMentorId(id);
        console.log(response.data[0].bookedClasses)
        setClasses(response.data[0].bookedClasses)
    }
    // const changeStatus = async () => {
    //     // console.log(studentId)
    //     let response = await changeClassStatus(studentObjectId, id);
    //     if (!response) return;
    //     setIsStatusChanged(true);
    // }
    const onStatusChange = async (event) => {
        setSatus(event.target.value);
        let response = await changeClassStatus(studentObjectId, id);
        if (!response) return;
        // changeStatus();
    };

    useEffect(() => {
        fetchClasses();
        console.log(classes)
    }, [])



    return (

        <ClassComponent>
            <ClassComponentCard>

                <ClassComponentCardHeader direction='row' spacing={2}>
                    <Typography sx={{ fontSize: '25px', fontWeight: 'bold' }}>CLASSES</Typography>

                </ClassComponentCardHeader>

                <ClassComponentCardBody>
                    <TableContainer sx={{ maxHeight: 440 }}>

                        <Table stickyHeader aria-label="sticky table">

                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>
                                            Student Name
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>
                                            Email ID
                                        </Typography>

                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>
                                            Phone Number
                                        </Typography>

                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>
                                            Payment
                                        </Typography>

                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ fontSize: '15px', fontWeight: 'bold' }}>
                                            Status
                                        </Typography>

                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            {
                                (classes) ?
                                    <TableBody>
                                        {
                                            classes.map((data, index) => (
                                                <TableRow key={index}>
                                                    <TableCell >
                                                        {data.studentData.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {data.studentData.email}
                                                    </TableCell>
                                                    <TableCell>
                                                        {data.studentData.phonenumber}
                                                    </TableCell>
                                                    <TableCell>
                                                        {data.payment.paymentStatus}
                                                    </TableCell>
                                                    <TableCell>
                                                        {/* <TextField
                                                            defaultValue={data.bookedClassDetails.classCompleted}
                                                            id="standard-basic"
                                                            variant="standard" disabled={status}
                                                            InputProps={{ disableUnderline: status }}
                                                            onClick={changeStatus}
                                                            onDoubleClick={updateStatus}
                                                        /> */}
                                                        <FormControl>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                defaultValue={data.bookedClassDetails.classCompleted}
                                                                value={status}
                                                                onChange={onStatusChange}
                                                                InputProps={{ disableUnderline: status }}
                                                                sx={{ borderRadius: '23px', background: '#d0ffa8de', height: '30px' }}
                                                            >


                                                                <MenuItem value='Started' onClick={() => setStudentObjectId(data._id)}>Started</MenuItem>
                                                                <MenuItem value='Completed' onClick={() => setStudentObjectId(data._id)}>Completed</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </TableCell>
                                                </TableRow>
                                            ))

                                        }
                                    </TableBody> :

                                    <>

                                        {
                                            (classes.length == 0) ?

                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>
                                                            <Skeleton variant="rounded" sx={{ width: '110px', height: '26px' }} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton variant="rounded" sx={{ width: '110px', height: '26px' }} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton variant="rounded" sx={{ width: '118px', height: '26px' }} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton variant="rounded" sx={{ width: '110px', height: '26px' }} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton variant="rounded" sx={{ width: '110px', height: '26px' }} />
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <Skeleton variant="rounded" sx={{ width: '110px', height: '26px' }} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton variant="rounded" sx={{ width: '110px', height: '26px' }} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton variant="rounded" sx={{ width: '118px', height: '26px' }} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton variant="rounded" sx={{ width: '110px', height: '26px' }} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton variant="rounded" sx={{ width: '110px', height: '26px' }} />
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <Skeleton variant="rounded" sx={{ width: '110px', height: '26px' }} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton variant="rounded" sx={{ width: '110px', height: '26px' }} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton variant="rounded" sx={{ width: '118px', height: '26px' }} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton variant="rounded" sx={{ width: '110px', height: '26px' }} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton variant="rounded" sx={{ width: '110px', height: '26px' }} />
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <Skeleton variant="rounded" sx={{ width: '110px', height: '26px' }} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton variant="rounded" sx={{ width: '110px', height: '26px' }} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton variant="rounded" sx={{ width: '118px', height: '26px' }} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton variant="rounded" sx={{ width: '110px', height: '26px' }} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton variant="rounded" sx={{ width: '110px', height: '26px' }} />
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <Skeleton variant="rounded" sx={{ width: '110px', height: '26px' }} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton variant="rounded" sx={{ width: '110px', height: '26px' }} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton variant="rounded" sx={{ width: '118px', height: '26px' }} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton variant="rounded" sx={{ width: '110px', height: '26px' }} />
                                                        </TableCell>
                                                        <TableCell>
                                                            <Skeleton variant="rounded" sx={{ width: '110px', height: '26px' }} />
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                                :

                                                <Typography sx={{ display: 'flex', justifyContent: 'center', }}>No Data</Typography>
                                        }

                                    </>
                            }
                        </Table>

                    </TableContainer>
                </ClassComponentCardBody>

            </ClassComponentCard>
        </ClassComponent>
    )
}
