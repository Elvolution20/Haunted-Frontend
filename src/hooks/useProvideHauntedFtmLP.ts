import { useCallback } from 'react';
import useHauntedFinance from './useHauntedFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { parseUnits } from 'ethers/lib/utils';
import { TAX_OFFICE_ADDR } from '../utils/constants'

const useProvideHauntedFtmLP = () => {
  const hauntedFinance = useHauntedFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleProvideHauntedFtmLP = useCallback(
    (ftmAmount: string, hauntedAmount: string) => {
      const hauntedAmountBn = parseUnits(hauntedAmount);
      handleTransactionReceipt(
        hauntedFinance.provideHauntedFtmLP(ftmAmount, hauntedAmountBn),
        `Provide Haunted-FTM LP ${hauntedAmount} ${ftmAmount} using ${TAX_OFFICE_ADDR}`,
      );
    },
    [hauntedFinance, handleTransactionReceipt],
  );
  return { onProvideHauntedFtmLP: handleProvideHauntedFtmLP };
};

export default useProvideHauntedFtmLP;
