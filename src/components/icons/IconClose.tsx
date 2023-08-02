import { IconProps } from '~/components/icons'

export default function IconClose(props: IconProps) {
    return (
        <svg
            width='18'
            height='19'
            viewBox='0 0 18 19' fill='none' xmlns='http://www.w3.org/2000/svg'
            className={props.className}
        >
            <g clipPath='url(#clip0_32_4722)'>
                <mask
                    id='mask0_32_4722'
                    style={{maskType:'alpha'}}
                    maskUnits='userSpaceOnUse'
                    x='0'
                    y='0'
                    width='18'
                    height='19'
                >
                    <rect
                        y='0.625'
                        width='17.5435'
                        height='18'
                        fill='#D9D9D9'
                    />
                </mask>

                <g mask='url(#mask0_32_4722)'>
                    <path
                        d='M5.45625 14.1251L4.5 13.1688L8.04375 9.62506L4.5 6.08131L5.45625 5.12506L9 8.66881L12.5437 5.12506L13.5 6.08131L9.95625 9.62506L13.5 13.1688L12.5437 14.1251L9 10.5813L5.45625 14.1251Z'
                        fill='#637592'
                    />
                </g>
            </g>

            <defs>
                <clipPath id='clip0_32_4722'>
                    <rect
                        width='18'
                        height='18'
                        fill='white'
                        transform='translate(0 0.625)'
                    />
                </clipPath>
            </defs>
        </svg>
    )
}
