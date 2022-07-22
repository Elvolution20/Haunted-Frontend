import React from 'react';

//Graveyard ecosystem logos
import hauntedLogo from '../../assets/img/haunted_cash.png';
import hShareLogo from '../../assets/img/haunted_share.png';
import hauntedLogoPNG from '../../assets/img/haunted_cash.png';
import hShareLogoPNG from '../../assets/img/haunted_share.png';
import hBondLogo from '../../assets/img/haunted_bond.png';

import hauntedXdcLpLogo from '../../assets/img/haunted_xdc_lp.png';
import hshareXdcLpLogo from '../../assets/img/hshare_xdc_lp.png';

import wxdcLogo from '../../assets/img/xdc_logo_blue.svg';
import booLogo from '../../assets/img/spooky.png';
import zooLogo from '../../assets/img/zoo_logo.svg';
import shibaLogo from '../../assets/img/shiba_logo.svg';

const logosBySymbol: { [title: string]: string } = {
  //Real tokens
  //=====================
  HAUNTED: hauntedLogo,
  HAUNTEDPNG: hauntedLogoPNG,
  HSHAREPNG: hShareLogoPNG,
  HSHARE: hShareLogo,
  HBOND: hBondLogo,
  WXDC: wxdcLogo,
  BOO: booLogo,
  SHIBA: shibaLogo,
  ZOO: zooLogo,
  'HAUNTED-XDC-LP': hauntedXdcLpLogo,
  'HSHARE-XDC-LP': hshareXdcLpLogo,
};

type LogoProps = {
  symbol: string;
  size?: number;
};

const TokenSymbol: React.FC<LogoProps> = ({ symbol, size = 64 }) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid Token Logo symbol: ${symbol}`);
  }
  return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={size} height={size} />;
};

export default TokenSymbol;
