import { Box, styled } from '@mui/material'
import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MentorCard from '../mentorCard/MentorCard';
import Banner from './Banner'
import Slide from './Slide'
import HomeNavbar from './HomeNavbar'
import { getMentorsData } from '../../redux/actions/index';
import { useState } from 'react';
import DialogForNewUser from '../DialogForNewUser/DialogForNewUser';

const Component = styled(Box)`
padding: 9px 10px;
`;

export default function Home() {

    const [openDialog, setOpenDialog] = useState(true);

    const { mentors } = useSelector((state) => state.getMentorsReducers)
    // const [mentors, setMentors] = useState(mentorsData);
    // console.log("fsdfsdfsdf", mentors)
    // const {mentors} = getMentors;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMentorsData());
    }, [dispatch])

    // useEffect(() => {
    //     setMentors(mentorsData);
    // }, [mentorsData])

    // const result = useSelector((state) => state.mentorInfo)
    // console.log(result)
    // setInterval(test, 2000);
    // function test() {
    //     console.log("fsdfsdfsdf", mentorsData)
    // }
    // const data = mentors.filter(data => data.mode == 'online')
    // console.log("after fil:", mentors[0].interest)
    // console.log("after filte: ", mentors.filter(data => data.interest.includes("Physics")))
    const find = (type, condition) => {
        if (type == "interest") {
            return mentors.filter(data => data.interest.includes(condition))
        } else {
            return mentors.filter(data => data.mode == condition)
        }
    }

    const closeDialog = () => {
        setOpenDialog(false)
    }


    return (
        <>
            {
                //no need
                localStorage.setItem("visited", "true")
            }
            <HomeNavbar />
            <Component>
                <Banner />
                <Slide type="Teaching Mode" title="Online" mentors={find("teaching_mode", 'online')} />
                <Slide type="Teaching Mode" title="Offline" mentors={find("teaching_mode", 'offline')} />
                <Slide type="interest" title="Mathematics" mentors={find("interest", 'Mathematics')} />
                <Slide type="interest" title="Physics" mentors={find("interest", 'Physics')} />
                <Slide type="interest" title="Chemistry" mentors={find("interest", 'Chemistry')} />
            </Component>
            {
                (localStorage.getItem("accountHolderData") == null) ?
                    <DialogForNewUser open={openDialog} closeDialog={closeDialog} /> : null
            }

            {/* <MentorCard /> */}
        </>
    )
}
