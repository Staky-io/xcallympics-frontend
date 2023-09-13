import { useContext, useEffect, useState } from 'react'
import { Button, Heading } from '~/components/common'
import { IconNotFound } from '~/components/icons'
import { useContract, useEvent } from '~/hooks/contracts'
import { UserStoreContext } from '~/stores/User'
import { NFTBridge, XCallympicsNFT } from '~/types/abi'
import NFTCard from './NFTCard'

export default function NFTDisplay(props: {
    onClick?: (nftid: bigint) => void
    selected: bigint
}) {
    const { userState } = useContext(UserStoreContext)
    const [ownedIds, setOwnedIds] = useState<bigint[]>([])
    const NFTBridgeContract = useContract('NFTBridge') as NFTBridge
    const XCallympicsNFT = useContract('XCallympicsNFT') as XCallympicsNFT

    const checkOwnedTokens = async () => {
        const newOwnedIdsQuery = await XCallympicsNFT.getUserOwnedTokens(userState.address)
        const newOwnedIds = newOwnedIdsQuery.map((id) => id.toBigInt())
        setOwnedIds(newOwnedIds)

        return newOwnedIds
    }

    const mintNFT = async () => {
        try {
            const tx = await NFTBridgeContract.mintNFT()
            await tx.wait(1)
            const newOwnedIds = await checkOwnedTokens()
            props.onClick && props.onClick(newOwnedIds[newOwnedIds.length - 1])
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        if (!userState.isLoggedIn || !userState.address || !userState.chainId || !XCallympicsNFT) {
            setOwnedIds([])
            return
        }

        const getOwnedIds = async () => {
            try {
                const newOwnedIdsQuery = await XCallympicsNFT.getUserOwnedTokens(userState.address)
                const newOwnedIds = newOwnedIdsQuery.map((id) => id.toBigInt())
                setOwnedIds(newOwnedIds)
                props.onClick && props.onClick(newOwnedIds[newOwnedIds.length - 1])
            } catch (e) {
                setOwnedIds([])
            }
        }

        getOwnedIds()
    }, [XCallympicsNFT, userState.isLoggedIn, userState.address, userState.chainId, props])

    useEvent('NFTBridge', NFTBridgeContract?.filters['TokenBridgedToChain(address,string,uint256)'](userState.address ? userState.address : undefined), async () => {
        checkOwnedTokens()
    })

    useEvent('NFTBridge', NFTBridgeContract?.filters['TokenMinted(address,uint256)'](userState.address ? userState.address : undefined), async () => {
        checkOwnedTokens()
    })

    return ownedIds.length > 0 ? (
        <div className='flex flex-row justify-start gap-20 flex-wrap my-0 mx-auto'>
            {ownedIds.map((nftid) => (
                <NFTCard
                    key={nftid.toString()}
                    nftid={nftid}
                    selected={props.selected === nftid}
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
                onClick={() => mintNFT()}
            >Mint new runner NFT</Button>
        </>
    )
}
