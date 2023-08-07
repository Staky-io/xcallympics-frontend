import { useContext, useEffect, useState } from 'react'
import { Button, Heading } from '~/components/common'
import { IconNotFound } from '~/components/icons'
import { useContract } from '~/hooks/contracts'
import { UserStoreContext } from '~/stores/User'
import { NFTBridge, XCallympicsNFT } from '~/types/abi'
import NFTCard from './NFTCard'

export default function NFTDisplay(props: { onClick?: (nftid: bigint) => void }) {
    const { userState } = useContext(UserStoreContext)
    const [ownedIds, setOwnedIds] = useState<bigint[]>([])
    const NFTBridgeContract = useContract('NFTBridge') as NFTBridge
    const XCallympicsNFT = useContract('XCallympicsNFT') as XCallympicsNFT

    useEffect(() => {
        if (!userState.isLoggedIn || !userState.address || !userState.chainId || !XCallympicsNFT) {
            setOwnedIds([])
            return
        }

        const getOwnedIds = async () => {
            const ownedIds = await XCallympicsNFT.getUserOwnedTokens(userState.address)
            setOwnedIds(ownedIds)
        }

        getOwnedIds()
    }, [XCallympicsNFT, userState.isLoggedIn, userState.address, userState.chainId])

    return ownedIds.length > 0 ? (
        <div className='flex flex-row justify-start gap-20 flex-wrap my-0 mx-auto'>
            {ownedIds.map((nftid) => (
                <NFTCard
                    key={nftid.toString()}
                    nftid={nftid}
                    onClick={() => props.onClick && props.onClick(nftid)}
                />
            ))}
        </div>
    ) : (
        <>
            <Heading level={3} className='mb-32 text-grey-secondary font-bold'>No cute boi here ...</Heading>
            <IconNotFound className='w-64 h-64' />
            <Button
                variant='primary'
                className='mt-32'
                onClick={() => NFTBridgeContract.mintNFT()}
            >Mint new runner NFT</Button>
        </>
    )
}
