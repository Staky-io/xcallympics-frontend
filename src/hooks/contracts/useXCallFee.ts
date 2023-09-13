import { useContext, useEffect, useState } from 'react'
import useContract from './useContract'
import { getBTPAddress, getContractAddress } from '~/helpers'
import { UserStoreContext } from '~/stores/User'
import { BTPId } from '~/types'
import { NFTBridge } from '~/types/abi'

type useXCallFeeProps = {
    destionationChain: BTPId
    destinationChainId: bigint
}

export default function useXCallFee({ destionationChain, destinationChainId }: useXCallFeeProps) {
    const { userState } = useContext(UserStoreContext)
    const [xcallFee, setXcallFee] = useState<bigint>(0n)
    const NFTBridgeContract = useContract('NFTBridge') as NFTBridge

    useEffect(() => {
        const getXCallFee = async () => {
            try {
                if (destionationChain.length === 0 || destinationChainId === 0n || userState.chainId === 0n || !NFTBridgeContract) {
                    setXcallFee(0n)
                } else {
                    const to = getBTPAddress(destionationChain, getContractAddress(Number(destinationChainId), 'NFTBridge'))
                    const fee = await NFTBridgeContract.getXCallFee(to, true)
                    setXcallFee(fee.toBigInt())
                }
            } catch (e) {
                console.error(e)
                setXcallFee(0n)
            }
        }

        getXCallFee()
    }, [NFTBridgeContract, destionationChain, destinationChainId, userState.chainId])

    return xcallFee
}
