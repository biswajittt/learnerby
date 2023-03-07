import React, { useState, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { styled, InputBase, Button, alpha, Box, createTheme, Stack } from "@mui/material";

import { useSelector, useDispatch } from 'react-redux';
import { getMentorsDataBySearchQuery } from '../../redux/actions/index';
import { Link, useNavigate } from "react-router-dom"

// const Search = styled('div')`
// position: relative;
// border-radius: 10px;
// background-color: grey;
// margin-right: 160px;
// width: 100%;
// `;
// const SearchIconWrapper = styled('div')`
// padding: 10px;
// height: 100%;
// position: absolute;
// display: flex;
// align-items: center;
// justify-content: center;
// padding: 1px;
// padding-left: 4px;
// pointerEvents: 'none',
// `;
// const StyledInputBase = styled(InputBase)`
// color: inherit;
// width: 100%;
// padding: 2px;
// padding-left: 33px;
// `;
const theme = createTheme({
    breakpoints: {
        values: {
            mobile: 0,
            tablet: 640,
            laptop: 1200,
        },
    },
});
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: alpha(theme.palette.common.white, 0.15),
    backgroundColor: '#e2e2e2',
    '&:hover': {
        backgroundColor: '#e2e2e2',
    },
    marginRight: theme.spacing(2),
    marginLeft: '100px',
    width: '570px',
    [theme.breakpoints.down('lg')]: {
        marginLeft: theme.spacing(3),
        width: '500px',
    },
    [theme.breakpoints.down(1011)]: {
        width: '440px',
    },
    [theme.breakpoints.down(930)]: {
        width: '348px',
    },
    [theme.breakpoints.down('md')]: {
        width: '430px',
    },
    [theme.breakpoints.down(796)]: {
        width: '360px',
    },
    [theme.breakpoints.down(719)]: {
        width: '290px',
    },
    [theme.breakpoints.down(488)]: {
        width: '252px',
    },
    [theme.breakpoints.down(446)]: {
        marginLeft: '0px'
    },
    [theme.breakpoints.down(421)]: {
        width: '220px',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '490px',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: 'inherit',

    },
    [theme.breakpoints.between('xl', 'lg')]: {
        width: '416px',
    },
    [theme.breakpoints.down('lg')]: {
        width: '410px',
    },
    [theme.breakpoints.down(1000)]: {
        width: '355px',
    },
    [theme.breakpoints.down(975)]: {
        width: '340px',
    },
    [theme.breakpoints.down(930)]: {
        width: '258px',
    },
    [theme.breakpoints.down('md')]: {
        width: '344px',
    },
    [theme.breakpoints.down(796)]: {
        width: '270px',
    },
    [theme.breakpoints.down(719)]: {
        width: '205px',
    },
    [theme.breakpoints.down(488)]: {
        width: '168px',
    },
    [theme.breakpoints.down(421)]: {
        width: '137px',
    },
}));


export default function SearchBar() {
    const navigate = useNavigate();


    const [searchQuery, setSearchQuery] = useState("");
    const [disabledButton, setdisabledButton] = useState(true)

    const getSearchQuery = (event) => {
        setSearchQuery({ [event.target.name]: event.target.value });
        // console.log(searchQuery)
        // if (searchQuery != '') {
        //     setdisabledButton(false)
        //     // console.log(searchQuery.length)
        // } else {
        //     setdisabledButton(true)
        //     // console.log(searchQuery.length)
        // }

    }
    useEffect(() => {

        const enabled =
            searchQuery.length > 0;
        console.log(enabled)
        console.log(searchQuery == '')
        // const enabled =
        //     email.length > 0 &&
        //     password.length > 0;
    }, [searchQuery])
    console.log(searchQuery)

    const dispatch = useDispatch();
    const mentors = useSelector((state) => state.getMentorsDataBySearchQueryReducers)

    // useEffect(() => {
    //     dispatch(getMentorsDataBySearchQuery(searchQuery))
    // }, [dispatch])


    const handleSearch = () => {
        // console.log(searchQuery)
        // console.log("lenght", searchQuery.searchquery.length)
        // console.log(typeof searchQuery.searchquery)
        if (typeof searchQuery.searchquery != 'undefined' && searchQuery.searchquery.length > 0 && searchQuery.searchquery != "" && searchQuery.searchquery != " ") {
            navigate(`/searchpage/searchquery/${searchQuery['searchquery']}`)
            dispatch(getMentorsDataBySearchQuery(searchQuery))
        } else {
            console.log("search query is empty")
        }

        // if (typeof searchQuery != 'undefined')
        //     dispatch(getMentorsDataBySearchQuery(searchQuery))
        // console.log(mentors)
    }
    // console.log(mentors)



    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder='Search' name='searchquery' inputProps={{ 'aria-label': 'search' }} onChange={getSearchQuery} />

            {
                (typeof searchQuery.searchquery != 'undefined' && searchQuery.searchquery != '' && searchQuery.searchquery.length > 0) ?
                    <Button variant="contained" justifyContent="end" size='small' sx={{ borderRadius: '17px', background: '#262626' }} onClick={handleSearch}>Search</Button> :

                    <Button variant="contained" size='small' sx={{ borderRadius: '17px', background: '#262626' }} disabled>Search</Button>

                // <Link to={`/searchpage/searchquery/${searchQuery['searchquery']}`} style={{ textDecoration: 'none' }}>
                //     <Button variant="contained" size='small' onClick={handleSearch} sx={{ borderRadius: '17px', background: '#262626' }}>Search</Button>
                // </Link>
            }

        </Search>
    )
}
