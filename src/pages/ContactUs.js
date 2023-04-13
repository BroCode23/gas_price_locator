import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import ReportIcon from '@mui/icons-material/Report';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';

import AppToolbar, { DrawerHeader } from '../components/AppToolbar';

export default function ContactUs() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppToolbar />
            <Box component="main" sx={{
                flexGrow: 1, left: "64px", right: "0px", position: "fixed", height: "100%", overflowY: "auto", bgcolor: '#E7EBF0', p: 3
            }}>
                <DrawerHeader />
                <Card sx={{ width: "fit-content", margin: "auto" }}>
                    <CardContent>
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <ReportIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">Contact Us at any of the Following</Typography>
                            <Typography variant="body" component="div">Phone: 123-456-7890</Typography>
                            <Typography variant="body" component="div">Mail: 12345 Corporate Hwy</Typography>
                            <Typography variant="body" component="div">Email: mailto@corporate.com</Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box >
    );
}