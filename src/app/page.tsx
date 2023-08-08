'use client'

import { useState } from 'react'
import { ComponentContainer, Header, NFTControls, NFTDisplay, PageContainer } from '~/components/ui'

export default function Home() {
    const [selectedNFT, setSelectedNFT] = useState<bigint>(BigInt(0))

    return (
        <main>
            <Header />
            <PageContainer className='flex flex-row justify-center items-start gap-48 mt-128'>
                {/* TODO: control UI + move to it's own component */}
                <ComponentContainer className='min-h-604 h-full flex flex-col justify-around'>
                    <NFTControls selectedNFT={selectedNFT} />
                </ComponentContainer>

                <ComponentContainer className='flex flex-col justify-center items-center min-h-604'>
                    <NFTDisplay
                        onClick={(nftid) => setSelectedNFT(nftid)}
                        selected={selectedNFT}
                    />
                </ComponentContainer>
            </PageContainer>
        </main>
    )
}
