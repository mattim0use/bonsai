
'use client';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import React, { useState, useEffect } from 'react';
import { chain } from '@/constants/chain';
import { parse } from 'uuid';
import { bytesToHex, createPublicClient, http, createWalletClient, custom } from 'viem';
import stakingAbi from '@/utils/staking-abi.json';
import toast from 'react-hot-toast';
import { mainnet } from 'viem/chains'
import { erc20Abi } from "viem";
import { ethers } from "ethers";

export default function Farm() {
    const { login, user, logout } = usePrivy();
    const [input, setInput] = useState<number>(0);
    const [balance, setBalance] = useState<number>(0);
    const [stakedBalance, setStakedBalance] = useState<number>(0);
    const [allowance, setAllowance] = useState<any>(null);
    const [earned, setEarned] = useState<number>(0);
    const { wallets } = useWallets();
    const wallet = wallets[0];
    const MAX_UINT256 = ethers.MaxUint256.toString();
    const uuid = '9e772603-0d39-4cf7-8d6a-69e2e43c2b7e';
    const ensClient = createPublicClient({
        chain: mainnet,
        transport: http(),
    });
    const client = createWalletClient({
        chain,
        transport: custom(window.ethereum!)
    })

    const publicClient = createPublicClient({
        chain,
        transport: http(process.env.NEXT_PUBLIC_RPC_URL),
    });



    const handleBalance = async () => {
        const allowance = await publicClient.readContract({
            address: "0xDED32ba7c89835D1daa9CbAC487E5b6B2a20bDb2" as `0x${string}`, abi: erc20Abi,
            functionName: 'allowance',
            args: [wallet.address as `0x${string}`, "0xE6d15Aef7fA74241DFDC83a79814BE99ccd9D8c8"]
        })
        const balance = await publicClient.readContract({
            address: "0xDED32ba7c89835D1daa9CbAC487E5b6B2a20bDb2" as `0x${string}`, abi: erc20Abi,
            functionName: 'balanceOf',
            args: [wallet.address as `0x${string}`]
        })

        const stakedBalance = await publicClient.readContract({
            address: "0xE6d15Aef7fA74241DFDC83a79814BE99ccd9D8c8" as `0x${string}`, abi: stakingAbi.abi,
            functionName: 'balanceOf',
            args: [wallet.address as `0x${string}`]
        })

        const earned = await publicClient.readContract({
            address: "0xE6d15Aef7fA74241DFDC83a79814BE99ccd9D8c8" as `0x${string}`, abi: stakingAbi.abi,
            functionName: 'earned',
            args: [wallet.address as `0x${string}`]
        })
        setEarned(Number(earned))
        setAllowance(Number(allowance))
        setBalance(Number(balance))
        setStakedBalance(Number(stakedBalance))

        toast.success('Balance is ' + balance)
    }
    useEffect(() => {
        if (wallet) {
            handleBalance()

        }

    }, [wallet])



    const handleApprove = async () => {
        const [account] = await client.getAddresses()

        try {
            const { request: approval } = await publicClient.simulateContract({
                address: "0x3a3F615b05AAD54d8A7Af1D1B20854f0513278Da" as `0x${string}`, abi: erc20Abi,
                functionName: 'approve',
                args: ["0xE6d15Aef7fA74241DFDC83a79814BE99ccd9D8c8", BigInt(MAX_UINT256)],
                account: account,
            })
            await client.writeContract(approval)

        } catch (error) {
            console.log(error);
            toast.error('Approval Failed, enjoy');
        }
        handleBalance()
    };

    const handleFarm = async () => {
        if (input > balance) return toast.error('You are trying to stake more than you have, enjoy');
        const [account] = await client.getAddresses()
        if (allowance >= input) {
            try {
                const { request } = await publicClient.simulateContract({
                    address: stakingAbi.address as `0x${string}`,
                    abi: stakingAbi.abi,
                    functionName: 'stake',
                    args: [input],
                    account: wallet.address as `0x${string}`
                })

                await client.writeContract(request)


            } catch (error) {
                console.log(error);
                toast.error('Staking Failed, enjoy');
            }
            handleBalance()
        } else {
            handleApprove()

        };

        toast.success('Approved, enjoy');
    }
    const handleWithdraw = async () => {
        if (input > stakedBalance) {
            toast.error('You are trying to withdraw more than you have, enjoy');
            return;
        }

        const [account] = await client.getAddresses()
        try {
            const { request } = await publicClient.simulateContract({
                address: stakingAbi.address as `0x${string}`,
                abi: stakingAbi.abi,
                functionName: 'withdraw',
                args: [input],
                account: account,
            })

            await client.writeContract(request)



        } catch (error) {
            console.log(error);
            toast.error('Approval Failed, enjoy');
        }
        handleBalance()
    };


    const handleClaim = async () => {

        const [account] = await client.getAddresses()
        try {
            const { request } = await publicClient.simulateContract({
                address: stakingAbi.address as `0x${string}`,
                abi: stakingAbi.abi,
                functionName: 'getReward',
                account: account,
            })

            await client.writeContract(request)


        } catch (error) {
            console.log(error);
            toast.error('Check your ENS, enjoy');
        }
        handleBalance()

    };



    const toHumanReadable = (num: number) => {
        const amount = num / 1000000000000000000;
        if (isNaN(amount)) {
            return 0;
        }
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    return (
        <div className="flex flex-col gap-6">


            <div className="flex flex-col rounded-3xl shadow-primary">
                <div className="flex">
                    {' '}
                    <div className="text-accent py-2.5 pl-4 pr-2.5 text-2xl">???</div>
                    <input
                        value={toHumanReadable(input)}
                        className="w-full p-2.5 text-2xl"
                        placeholder="enjoy farming "
                    />
                    <button onClick={() => setInput(balance * 0.5)} className="py-2.5 pl-4 pr-5">
                        50%
                    </button>
                </div>
                <div className="flex flex-col gap-2.5 p-3 txt-sm">
                    <div
                        style={{
                            boxShadow:
                                '2px 2px 4px 0px rgba(0, 199, 255, 0.25) inset, 0px 0px 1px 0px rgba(0, 199, 255, 0.50) inset',
                        }}
                        className="flex justify-between p-2 rounded-full"
                    >

                        <p className="text-accent cursor-pointer" onClick={() => setInput(balance)}>
                            {toHumanReadable(balance)} $ENJOY
                        </p>
                        <p className="text-accent cursor-pointer" onClick={() => setInput(stakedBalance)}>
                            {toHumanReadable(stakedBalance)} $ENJOYING
                        </p>
                    </div>
                    <div className="flex justify-end"></div>
                </div>
            </div>

            {!user ? (
                <>
                    <button
                        onClick={login}
                        className="bg-accent text-white py-4 rounded-full shadow-primary text-2xl  hover:scale-105 transition-transform duration-300 ease-in-out w-full"
                    >
                        Connect to farm
                    </button>
                </>
            ) : (
                <>
                    <ul className="grid grid-cols-2 space-x-2">
                        {allowance <= balance ? (
                            <button
                                onClick={handleApprove}
                                className="bg-accent text-white py-4 rounded-full shadow-primary text-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform duration-300 ease-in-out w-full"
                            >
                                Approve
                            </button>
                        ) : (

                            <button
                                onClick={handleFarm}
                                className="bg-accent text-white py-4 rounded-full shadow-primary text-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform duration-300 ease-in-out w-full"
                            >
                                Stake
                            </button>

                        )}
                        <button
                            onClick={handleWithdraw}
                            className="bg-accent text-white py-4 rounded-full shadow-primary text-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform duration-300 ease-in-out w-full"
                        >
                            Withdraw
                        </button>
                    </ul>
                    <button
                        onClick={handleClaim}
                        className="bg-accent text-white py-4 rounded-full shadow-primary text-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform duration-300 ease-in-out w-full"
                    >
                        Enjoy {toHumanReadable(earned)} $ENJOY
                    </button>
                    <button
                        onClick={logout}
                        className="bg-accent text-white py-4 rounded-full shadow-primary text-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform duration-300 ease-in-out w-full"
                    >
                        Change wallet
                    </button>

                </>
            )}
        </div>
    );
}
