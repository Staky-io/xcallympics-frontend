import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useContract } from '~/hooks/contracts'
import { XCallympicsNFT } from '~/types/abi'
import { Text } from '~/components/common'

export default function NFTCard(props: { nftid: bigint, onClick?: (nftid: bigint) => void }) {
    const { nftid } = props
    const [nftUri, setNftUri] = useState<string>('')
    const XCallympicsNFT = useContract('XCallympicsNFT') as XCallympicsNFT

    useEffect(() => {
        if (!XCallympicsNFT || !nftid) {
            setNftUri('')
            return
        }

        const getNftUri = async () => {
            const uri = await XCallympicsNFT.tokenURI(nftid)

            if (!uri) {
                setNftUri('')
                return
            }

            setNftUri(uri)
        }

        getNftUri()
    }, [XCallympicsNFT, nftid])

    return (
        <div className='bg-grey rounded-15 overflow-hidden cursor-pointer'>
            <Image alt={'XCallympics NFT'} src={nftUri} width={290} height={290} />
            <Text className='text-black p-10' size='small'>XCallympics NFT - #{nftid.toString()}</Text>
        </div>
    )
}
