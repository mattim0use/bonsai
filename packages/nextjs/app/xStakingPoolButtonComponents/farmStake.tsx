import { useState } from 'react';
import { useContractWrite } from 'wagmi';
import externalContracts from '../../contracts/externalContracts';

function FarmStake() {
  const [amount, setAmount] = useState("");

  const { writeAsync } = useContractWrite({
    address: externalContracts[137].xStakingPool.address,
    abi: externalContracts[137].xStakingPool.abi,
    functionName: 'stake',
    args: [BigInt(amount)],
  });

  const handleStake = async () => {
    if (writeAsync) {
      await writeAsync();
    }
  };

  return (
    
    <button onClick={handleStake}>Stake</button>
  );
}

export default FarmStake;