import * as React from 'react';
import { useDispatch } from 'react-redux'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Avatar from '@mui/material/Avatar';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { addDatapoint } from '../util/Database'
import AppToolbar, { DrawerHeader } from '../components/AppToolbar';

const ERROR_NOTIF = "ERROR_NOTIF";
const SUCCESS_NOTIF = "SUCCESS_NOTIF";
const MONTHS = { 0: "Jan", 1: "Feb", 2: "Mar", 3: "Apr", 4: "May", 5: "Jun", 6: "Jul", 7: "Aug", 8: "Sep", 9: "Oct", 10: "Nov", 11: "Dec" };

export default function GasForm() {
    const [showAlert, setShowAlert] = React.useState(""); // state for notification popup
    const [ppgError, setPpgError] = React.useState({ error: false, helperText: "" }); // state for the ppg input processing
    const [nameError, setNameError] = React.useState({ error: false, helperText: "" }); // state for the name input processing
    const [addrError, setAddrError] = React.useState({ error: false, helperText: "" }); // state for the address input processing
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let error = false;
        if (data.get("ppg") === "") {
            error = true;
            setPpgError({ error: true, helperText: "Price field is required." });
        }
        if (data.get("name") === "") {
            error = true;
            setNameError({ error: true, helperText: "Name field is required." });
        } else {
            setNameError({ error: false, helperText: "" });
        }
        if (data.get("address") === "") {
            error = true;
            setAddrError({ error: true, helperText: "Address field is required." });
        } else {
            setAddrError({ error: false, helperText: "" });
        }
        if (ppgError.error || error) {
            setShowAlert(ERROR_NOTIF);
            return;
        }

        let dataObj = {}
        for (const pair of data.entries()) {
            dataObj[pair[0]] = pair[1];
        }
        const date = new Date();
        dataObj['date'] = `${date.getDate()} ${MONTHS[date.getMonth()]}, ${date.getFullYear()}`;
        console.log(dataObj);
        dispatch(addDatapoint(dataObj));
        setShowAlert(SUCCESS_NOTIF);
    };

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
                                                    if (isNaN(event.target.value))
                                                        setPpgError({ error: true, helperText: "Entry must be a number." });
                                                    else
                                                        setPpgError({ error: false, helperText: "" });
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                error={nameError.error}
                                                helperText={nameError.helperText}
                                                required
                                                fullWidth
                                                id="name"
                                                label="Gas Station Name"
                                                name="name"
                                                autoComplete="name"
                                                onChange={(event) => {
                                                    if (event.target.value === "")
                                                        setNameError({ error: true, helperText: "Name field is required." });
                                                    else
                                                        setNameError({ error: false, helperText: "" });
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                error={addrError.error}
                                                helperText={addrError.helperText}
                                                required
                                                fullWidth
                                                id="address"
                                                label="Street Address"
                                                name="address"
                                                autoComplete="address"
                                                onChange={(event) => {
                                                    if (event.target.value === "")
                                                        setAddrError({ error: true, helperText: "Address field is required." });
                                                    else
                                                        setAddrError({ error: false, helperText: "" });
                                                }}
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
                </Container>
            </Box>
        </Box >
    );
}