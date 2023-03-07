import { Box, styled, Paper, Grid, Typography, Chip, Rating } from '@mui/material'
import React from 'react'
import FirstCard from './FirstCard';
import SecondCard from './SecondCard';

const Component = styled(Box)`
display: flex;
padding: 9px 68px 0 68px;
justify-content: space-between;
`;
const MentorContainer = styled(Box)`

`;

const Container = styled(Paper)`

`;

export default function MentorCard() {
    return (
        <>
            <FirstCard />
            <SecondCard />
        </>
    )
}
