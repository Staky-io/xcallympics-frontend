import { useContext } from 'react'
import { IconTorch } from '~/components/icons'
import { UserStoreContext } from '~/stores/User'
import { Button } from '~/components/common'

export default function Header() {
    const { userState, disconnect, connectWallet } = useContext(UserStoreContext)

    return (
        <div className="w-full flex flex-row justify-center items-center mt-60 select-none cursor-default">
            <IconTorch className="mr-10" />
            <h2 style={{ textShadow: '0px 0px 1rem #C661FF' }}>xCallympics</h2>
            <IconTorch className="ml-10 -scale-x-100" />

            <div className='absolute right-32 top-64'>
                {userState.isLoggedIn ? (
                    <Button
                        variant='secondary'
                        onClick={disconnect}
                    >
                        {`(${userState.address.slice(0, 5)}...${userState.address.slice(userState.address.length - 6, userState.address.length - 1)}) Disconnect`}
                    </Button>
                ) : (
                    <Button
                        variant='primary'
                        className='mr-10'
                        onClick={connectWallet}
                    >
                        Connect wallet
                    </Button>
                )}
            </div>
        </div>
    )
}
