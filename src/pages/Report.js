import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import AppToolbar, { DrawerHeader } from '../components/AppToolbar';

export default function Report() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppToolbar />
            <Box component="main" sx={{
                flexGrow: 1, left: "64px", right: "0px", position: "fixed", height: "100%", overflowY: "auto", bgcolor: '#E7EBF0', p: 3
            }}>
                <DrawerHeader />
            </Box>
        </Box >
    );
}