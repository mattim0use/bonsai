import { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';
import externalContracts from '../../contracts/externalContracts';
import { useAccount } from "wagmi";

function FarmBalance() {
  const [balance, setBalance] = useState(0);
  const { address: connectedAddress } = useAccount();

  const { data } = useContractRead({
    address: externalContracts[137].xStakingPool.address,
    abi: externalContracts[137].xStakingPool?.abi,
    functionName: 'balanceOf',
    args: [connectedAddress || '']
  });

  useEffect(() => {
    if (data) {
      setBalance(Number(data));
    }
  }, [data]);

  return (
    <div>Your balance: {balance}</div>
  );
}

export default FarmBalance;