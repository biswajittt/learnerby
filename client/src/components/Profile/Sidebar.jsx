import React from 'react'
import { useState } from 'react';
import { Card, Paper, Stack, Box, styled, Typography, TextField, Button, Skeleton, Avatar, Autocomplete, FormControl, InputLabel, Select, MenuItem, Tabs, Tab } from '@mui/material';
import Profile from './Tabs/Profile';
import { TabContext, TabList, TabPanel } from '@mui/lab'
import Classes from './Tabs/Classes';
import Connections from './Tabs/Connections';

const SideBar = styled(Box)(({ theme }) => ({

}));
const SideBarList = styled(Card)(({ theme }) => ({
    marginTop: '100px',
    marginRight: '10px',
    marginLeft: '10px',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center'
}));



export default function Sidebar() {

    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <>
            <SideBar>
                <TabContext value={value}>

                    <SideBarList sx={{ borderBottom: 1, borderColor: 'divider' }}>

                        <TabList aria-label='Tabs Example' onChange={handleChange}>
                            <Tab label="Profile" value='1' />
                            <Tab label="Classes" value='2' />
                            <Tab label="Connections" value='3' />
                        </TabList>

                    </SideBarList>

                    <TabPanel value='1'>
                        {/* <RatingTab /> */}
                        <Profile />
                    </TabPanel>
                    <TabPanel value='2'>
                        <Classes />
                    </TabPanel>
                    <TabPanel value='3'>
                        <Connections />
                    </TabPanel>

                </TabContext>
            </SideBar>
        </>
    )
}
