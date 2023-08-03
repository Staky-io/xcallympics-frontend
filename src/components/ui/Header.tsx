import { IconTorch } from '../icons'

export default function Header() {
    return (
        <div className="w-full flex flex-row justify-center items-center mt-60 select-none cursor-default">
            <IconTorch className="mr-10" />
            <h2 style={{ textShadow: '0px 0px 1rem #C661FF' }}>xCallympics</h2>
            <IconTorch className="ml-10 -scale-x-100" />
        </div>
    )
}
