import { useState } from 'react';
import { useContractWrite } from 'wagmi';
import {ethers} from 'ethers';
import externalContracts from '../contracts/externalContracts';

function FarmApprove() {
  const spender = externalContracts[137].xStakingPool.address
  const amount = ethers.MaxUint256.toString();;

  const { writeAsync } = useContractWrite({
    address: externalContracts[137].bonsaiTokenABI.address,
    abi: externalContracts[137].bonsaiTokenABI.abi,
    functionName: 'approve',
    args: [spender, BigInt(amount)],
  });

  const handleApprove = async () => {
    if (writeAsync) {
      await writeAsync();
    }
  };

  return (
    <button onClick={handleApprove}>Approve</button>
  );
}

export default FarmApprove;