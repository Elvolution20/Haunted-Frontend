import { useCallback } from 'react';
import useHauntedFinance from './useHauntedFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { parseUnits } from 'ethers/lib/utils';
import { TAX_OFFICE_ADDR } from '../utils/constants'

const useProvideHauntedXdcLP = () => {
  const hauntedFinance = useHauntedFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleProvideHauntedXdcLP = useCallback(
    (xdcAmount: string, hauntedAmount: string) => {
      const hauntedAmountBn = parseUnits(hauntedAmount);
      handleTransactionReceipt(
        hauntedFinance.provideHauntedXdcLP(xdcAmount, hauntedAmountBn),
        `Provide Haunted-XDC LP ${hauntedAmount} ${xdcAmount} using ${TAX_OFFICE_ADDR}`,
      );
    },
    [hauntedFinance, handleTransactionReceipt],
  );
  return { onProvideHauntedXdcLP: handleProvideHauntedXdcLP };
};

export default useProvideHauntedXdcLP;
