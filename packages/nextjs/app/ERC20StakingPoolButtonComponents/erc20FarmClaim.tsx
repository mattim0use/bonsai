import { useContractWrite } from 'wagmi';
import externalContracts from '../../contracts/externalContracts';

function Erc20FarmClaim() {
  const { writeAsync } = useContractWrite({
    address: externalContracts[137].erc20StakingPool.address,
    abi: externalContracts[137].erc20StakingPool.abi,
    functionName: 'getReward',
    //args:[] should be here but didnt look which args were needed. prob wallet.
  });

  const handleClaim = async () => {
    if (writeAsync) {
      await writeAsync();
    }
  };

  return (
    <button onClick={handleClaim}>Claim</button>
  );
}

export default Erc20FarmClaim;