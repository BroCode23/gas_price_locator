import * as React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

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
      <Box component="main" sx={{ flexGrow: 1, left: "64px", right: "0px", position: "fixed", height: "100%", overflowY: "auto", bgcolor: '#E7EBF0', p: 3 }}>
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
      </Box>
    </Box>
  );
}