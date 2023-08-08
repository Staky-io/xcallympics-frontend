import { useContext, useEffect, useState } from 'react'
import useContract from './useContract'
import { getBTPAddress } from '~/helpers'
import { UserStoreContext } from '~/stores/User'
import { BTPId } from '~/types'
import { ADDRESSES } from '~/helpers/constants'
import { NFTBridge } from '~/types/abi'

type useXCallFeeProps = {
    destionationChain: BTPId
    destinationChainId: bigint
}

export default function useXCallFee({ destionationChain, destinationChainId }: useXCallFeeProps) {
    const { userState } = useContext(UserStoreContext)
    const [xcallFee, setXcallFee] = useState<bigint>(BigInt(0))
    const NFTBridgeContract = useContract('NFTBridge') as NFTBridge

    useEffect(() => {
        const getXCallFee = async () => {
            try {
                if (destionationChain.length === 0 || destinationChainId === BigInt(0) || userState.chainId === BigInt(0) || !NFTBridgeContract) {
                    setXcallFee(BigInt(0))
                } else {
                    const to = getBTPAddress(destionationChain, ADDRESSES[destinationChainId.toString()].NFT_BRIDGE)
                    const fee = await NFTBridgeContract.getXCallFee(to, true)
                    setXcallFee(fee)
                }
            } catch (e) {
                console.error(e)
                setXcallFee(BigInt(0))
            }
        }

        getXCallFee()
    }, [NFTBridgeContract, destionationChain, destinationChainId, userState.chainId])

    return xcallFee
}
