import * as React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import AppToolbar, { DrawerHeader } from '../components/AppToolbar';
import GasData from '../components/GasData';
import GasImg from '../util/gas_map.png';

export default function Homepage() {

  const rows = useSelector((state) => state.database.rows);
  let index = 0;
  let minPrice = rows[0].ppg;
  for (let i in rows) {
    if (parseFloat(rows[i].ppg) < minPrice) {
      minPrice = rows[i].ppg;
      index = i;
    }
  }

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
          <Grid container spacing={2}>
            <Grid item xs='auto'>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <img src={GasImg} alt="Local Gas Stations" border="3px solid #000" />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs='auto'>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography variant="h6" component="div">Cheapest Gas in Area</Typography>
                  <Typography variant="h3">${parseFloat(rows[index].ppg).toFixed(2)}</Typography>
                  <Typography variant="body" component="div">{rows[index].name}</Typography>
                  <Typography variant="body2" component="div">{rows[index].address}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <GasData />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}