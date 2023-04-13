import * as React from 'react';
import { useDispatch } from 'react-redux'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import { addDatapoint } from '../util/Database'
import AppToolbar, { DrawerHeader } from '../components/AppToolbar';

const ERROR_NOTIF = "ERROR_NOTIF";
const SUCCESS_NOTIF = "SUCCESS_NOTIF";

export default function GasForm() {
    const [showAlert, setShowAlert] = React.useState(""); // state for the success notification
    const [ppgError, setPpgError] = React.useState({ error: false, helperText: "" }); // state for the ppg input processing
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (ppgError.error) {
            setShowAlert(ERROR_NOTIF);
            return;
        }
        const months = { 0: "Jan", 1: "Feb", 2: "Mar", 3: "Apr", 4: "May", 5: "Jun", 6: "Jul", 7: "Aug", 8: "Sep", 9: "Oct", 10: "Nov", 11: "Dec" };
        const data = new FormData(event.currentTarget);
        let dataObj = {}
        for (const pair of data.entries()) {
            dataObj[pair[0]] = pair[1];
        }
        const date = new Date();
        let currentDate = `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
        dataObj['date'] = currentDate;
        console.log(dataObj);
        dispatch(addDatapoint(dataObj));
        setShowAlert(SUCCESS_NOTIF);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppToolbar />
            <Box component="main" sx={{
                flexGrow: 1, left: "64px", right: "0px", position: "fixed", height: "100%", overflowY: "auto", bgcolor: '#E7EBF0', p: 3
            }}>
                <DrawerHeader />
                <Card sx={{ margin: "auto", width: "fit-content" }}>
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
                                <BorderColorOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">Submit a Price</Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            error={ppgError.error}
                                            helperText={ppgError.helperText}
                                            autoComplete="price"
                                            name="ppg"
                                            required
                                            fullWidth
                                            id="ppg"
                                            label="Price Per Gallon"
                                            autoFocus
                                            onChange={(event) => {
                                                if (isNaN(event.target.value) || event.target.value === "")
                                                    setPpgError({ error: true, helperText: "Entry must be a number." });
                                                else
                                                    setPpgError({ error: false, helperText: "" });
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="name"
                                            label="Gas Station Name"
                                            name="name"
                                            autoComplete="name"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="address"
                                            label="Street Address"
                                            name="address"
                                            autoComplete="address"
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >Submit Price</Button>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
                {showAlert === "SUCCESS_NOTIF" ? <Alert sx={{ position: "absolute", bottom: "25px", right: "25px" }} severity="success" variant="filled" onClose={() => { setShowAlert("") }}>
                    <AlertTitle>Success</AlertTitle>
                    Price submitted to the database
                </Alert> : null}
                {showAlert === "ERROR_NOTIF" ? <Alert sx={{ position: "absolute", bottom: "25px", right: "25px" }} severity="error" variant="filled" onClose={() => { setShowAlert("") }}>
                    <AlertTitle>Error</AlertTitle>
                    Fix the form before submitting
                </Alert> : null}
            </Box>
        </Box >
    );
}