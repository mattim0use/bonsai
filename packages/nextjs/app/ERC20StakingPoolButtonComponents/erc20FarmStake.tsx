import { useState } from 'react';
import { useContractWrite } from 'wagmi';
import externalContracts from '../../contracts/externalContracts';


//needs a input field to set the amount then will work 
function Erc20FarmStake() {
  const [amount, setAmount] = useState("");

  const { writeAsync } = useContractWrite({
    address: externalContracts[137].erc20StakingPool.address,
    abi: externalContracts[137].erc20StakingPool.abi,
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

export default Erc20FarmStake;