import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import MailIcon from '@mui/icons-material/Mail';
import Typography from '@mui/material/Typography';

import AppToolbar, { DrawerHeader } from '../components/AppToolbar';

export default function ContactUs() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppToolbar />
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) => theme.palette.grey[100],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
                                    <MailIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">Contact Us at any of the Following</Typography>
                                <Typography variant="body" component="div">Phone: 123-456-7890</Typography>
                                <Typography variant="body" component="div">Mail: 12345 Corporate Hwy</Typography>
                                <Typography variant="body" component="div">Email: mailto@corporate.com</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </Box >
    );
}