import React, { useMemo } from 'react';
import Page from '../../components/Page';
import HomeImage from '../../assets/img/home.jpg';
import CashImage from '../../assets/img/cash_image.png';
import Image from 'material-ui-image';
import styled from 'styled-components';
import { Alert } from '@material-ui/lab';
import { createGlobalStyle } from 'styled-components';
import CountUp from 'react-countup';
import CardIcon from '../../components/CardIcon';
import TokenSymbol from '../../components/TokenSymbol';
import useHauntedStats from '../../hooks/useHauntedStats';
import useLpStats from '../../hooks/useLpStats';
import useModal from '../../hooks/useModal';
import useZap from '../../hooks/useZap';
import useBondStats from '../../hooks/useBondStats';
import usehShareStats from '../../hooks/usehShareStats';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import { haunted as hauntedTesting, hShare as hShareTesting } from '../../haunted-finance/deployments/deployments.testing.json';
import { haunted as hauntedProd, hShare as hShareProd } from '../../haunted-finance/deployments/deployments.mainnet.json';

import MetamaskFox from '../../assets/img/metamask-fox.svg';

import { Box, Button, Card, CardContent, Grid, Paper } from '@material-ui/core';
import ZapModal from '../Bank/components/ZapModal';

import { makeStyles } from '@material-ui/core/styles';
import useHauntedFinance from '../../hooks/useHauntedFinance';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) no-repeat !important;
    background-size: cover !important;
  }
`;

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('415')]: {
      marginTop: '10px',
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const TVL = useTotalValueLocked();
  const hauntedFtmLpStats = useLpStats('HAUNTED-FTM-LP');
  const hShareFtmLpStats = useLpStats('HSHARE-FTM-LP');
  const hauntedStats = useHauntedStats();
  const hShareStats = usehShareStats();
  const hBondStats = useBondStats();
  const hauntedFinance = useHauntedFinance();

  let haunted;
  let hShare;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    haunted = hauntedTesting;
    hShare = hShareTesting;
  } else {
    haunted = hauntedProd;
    hShare = hShareProd;
  }

  const buyHauntedAddress = 'https://spookyswap.finance/swap?outputCurrency=' + haunted.address;
  const buyHShareAddress = 'https://spookyswap.finance/swap?outputCurrency=' + hShare.address;

  const hauntedLPStats = useMemo(() => (hauntedFtmLpStats ? hauntedFtmLpStats : null), [hauntedFtmLpStats]);
  const hshareLPStats = useMemo(() => (hShareFtmLpStats ? hShareFtmLpStats : null), [hShareFtmLpStats]);
  const hauntedPriceInDollars = useMemo(
    () => (hauntedStats ? Number(hauntedStats.priceInDollars).toFixed(2) : null),
    [hauntedStats],
  );
  const hauntedPriceInFTM = useMemo(() => (hauntedStats ? Number(hauntedStats.tokenInFtm).toFixed(4) : null), [hauntedStats]);
  const hauntedCirculatingSupply = useMemo(() => (hauntedStats ? String(hauntedStats.circulatingSupply) : null), [hauntedStats]);
  const hauntedTotalSupply = useMemo(() => (hauntedStats ? String(hauntedStats.totalSupply) : null), [hauntedStats]);

  const hSharePriceInDollars = useMemo(
    () => (hShareStats ? Number(hShareStats.priceInDollars).toFixed(2) : null),
    [hShareStats],
  );
  const hSharePriceInFTM = useMemo(
    () => (hShareStats ? Number(hShareStats.tokenInFtm).toFixed(4) : null),
    [hShareStats],
  );
  const hShareCirculatingSupply = useMemo(
    () => (hShareStats ? String(hShareStats.circulatingSupply) : null),
    [hShareStats],
  );
  const hShareTotalSupply = useMemo(() => (hShareStats ? String(hShareStats.totalSupply) : null), [hShareStats]);

  const hBondPriceInDollars = useMemo(
    () => (hBondStats ? Number(hBondStats.priceInDollars).toFixed(2) : null),
    [hBondStats],
  );
  const hBondPriceInFTM = useMemo(() => (hBondStats ? Number(hBondStats.tokenInFtm).toFixed(4) : null), [hBondStats]);
  const hBondCirculatingSupply = useMemo(
    () => (hBondStats ? String(hBondStats.circulatingSupply) : null),
    [hBondStats],
  );
  const hBondTotalSupply = useMemo(() => (hBondStats ? String(hBondStats.totalSupply) : null), [hBondStats]);

  const hauntedLpZap = useZap({ depositTokenName: 'HAUNTED-FTM-LP' });
  const hshareLpZap = useZap({ depositTokenName: 'HSHARE-FTM-LP' });

  const StyledLink = styled.a`
    font-weight: 700;
    text-decoration: none;
  `;

  const [onPresentHauntedZap, onDissmissHauntedZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        hauntedLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissHauntedZap();
      }}
      tokenName={'HAUNTED-FTM-LP'}
    />,
  );

  const [onPresentHshareZap, onDissmissHshareZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        hshareLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissHshareZap();
      }}
      tokenName={'HSHARE-FTM-LP'}
    />,
  );

  return (
    <Page>
      <BackgroundImage />
      <Grid container spacing={3}>
        {/* Logo */}
        <Grid container item xs={12} sm={4} justify="center">
          {/* <Paper>xs=6 sm=3</Paper> */}
          <Image color="none" style={{ width: '300px', paddingTop: '0px' }} src={CashImage} />
        </Grid>
        {/* Explanation text */}
        <Grid item xs={12} sm={8}>
          <Paper>
            <Box p={4}>
              <h2>Haunted Finance</h2>
              <p>The first algorithmic stablecoin on Conflux, pegged to the price of 1 CFX via seigniorage.</p>
              <p>
                Stake your HAUNTED-CFX LP in the Farming to earn HSHARE rewards.
                Then stake your earned HSHARE in the Staking to earn more HAUNTED!
              </p>
            </Box>
          </Paper>



        </Grid>



        {/* TVL */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center">
              <h2>Total Value Locked</h2>
              <CountUp style={{ fontSize: '25px' }} end={TVL} separator="," prefix="$" />
            </CardContent>
          </Card>
        </Grid>

        {/* Wallet */}
        <Grid item xs={12} sm={8}>
          <Card style={{ height: '100%' }}>
            <CardContent align="center" style={{ marginTop: '2.5%' }}>
              {/* <h2 style={{ marginBottom: '20px' }}>Wallet Balance</h2> */}
              <Button color="primary" href="/staking" variant="contained" style={{ marginRight: '10px' }}>
                Stake Now
              </Button>
              <Button href="/farming" variant="contained" style={{ marginRight: '10px' }}>
                Farm Now
              </Button>
              <Button
                color="primary"
                target="_blank"
                href={buyHauntedAddress}
                variant="contained"
                style={{ marginRight: '10px' }}
                className={classes.button}
              >
                Buy HAUNTED
              </Button>
              <Button variant="contained" target="_blank" href={buyHShareAddress} className={classes.button}>
                Buy HSHARE
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* HAUNTED */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>HAUNTED</h2>
              <Button
                onClick={() => {
                  hauntedFinance.watchAssetInMetamask('HAUNTED');
                }}
                color="primary"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '10px' }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="HAUNTED" />
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>{hauntedPriceInFTM ? hauntedPriceInFTM : '-.----'} CFX</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px', alignContent: 'flex-start' }}>
                  ${hauntedPriceInDollars ? hauntedPriceInDollars : '-.--'}
                </span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${(hauntedCirculatingSupply * hauntedPriceInDollars).toFixed(2)} <br />
                Circulating Supply: {hauntedCirculatingSupply} <br />
                Total Supply: {hauntedTotalSupply}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* HSHARE */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>HSHARE</h2>
              <Button
                onClick={() => {
                  hauntedFinance.watchAssetInMetamask('HSHARE');
                }}
                color="primary"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '10px' }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="HSHARE" />
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>{hSharePriceInFTM ? hSharePriceInFTM : '-.----'} CFX</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px' }}>${hSharePriceInDollars ? hSharePriceInDollars : '-.--'}</span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${(hShareCirculatingSupply * hSharePriceInDollars).toFixed(2)} <br />
                Circulating Supply: {hShareCirculatingSupply} <br />
                Total Supply: {hShareTotalSupply}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* HBOND */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>HBOND</h2>
              <Button
                onClick={() => {
                  hauntedFinance.watchAssetInMetamask('HBOND');
                }}
                color="primary"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '10px' }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="HBOND" />
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>{hBondPriceInFTM ? hBondPriceInFTM : '-.----'} CFX</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px' }}>${hBondPriceInDollars ? hBondPriceInDollars : '-.--'}</span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${(hBondCirculatingSupply * hBondPriceInDollars).toFixed(2)} <br />
                Circulating Supply: {hBondCirculatingSupply} <br />
                Total Supply: {hBondTotalSupply}
              </span>
            </CardContent>
          </Card>
        </Grid>
        
      </Grid>
    </Page>
  );
};

export default Home;
