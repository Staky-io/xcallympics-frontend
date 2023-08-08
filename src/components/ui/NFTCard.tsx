import Image from 'next/image'
import axios from 'axios'
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
            try {
                const uri = await XCallympicsNFT.tokenURI(nftid)

                if (!uri) {
                    setNftUri('')
                    return
                }

                if (uri.startsWith('https://ipfs.io/ipfs/')) {
                    const req = await axios.get(uri)
                    console.log('req', req)
                    setNftUri(req.data.image)
                    return
                }

                setNftUri('')
            } catch (e) {
                setNftUri('')
            }
        }

        getNftUri()
    }, [XCallympicsNFT, nftid])

    return (
        <div className='bg-grey rounded-15 overflow-hidden cursor-pointer border-1'>
            {nftUri.length > 0 && (
                <Image alt={'XCallympics NFT'} src={nftUri} width={290} height={290} />
            )}
            <Text className='text-black p-10' size='small'>XCallympics NFT - #{nftid.toString()}</Text>
        </div>
    )
}
