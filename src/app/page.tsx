'use client'

import { useState } from 'react'
import { ComponentContainer, Header, NFTControls, NFTDisplay, PageContainer } from '~/components/ui'

export default function Home() {
    const [selectedNFT, setSelectedNFT] = useState<bigint>(0n)

    return (
        <main>
            <Header />
            <PageContainer className='flex flex-col-reverse xl:flex-row justify-center items-start gap-48 mt-128 mb-32 max-w-604 xl:max-w-2xl'>
                <ComponentContainer className='xl:min-h-604 py-60 h-full flex flex-col justify-around'>
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
