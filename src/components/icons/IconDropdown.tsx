import { IconProps } from '~/components/icons'

export default function IconDropdown(props: IconProps) {
    return (
        <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={props.className}
            style={props.style}
        >
            <mask
                id="mask0_236_2787"
                style={{ maskType: 'alpha' }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="18"
                height="19"
            >
                <rect
                    y="0.5"
                    width="17.5435"
                    height="18"
                    fill="#D9D9D9"
                />
            </mask>
            <g mask="url(#mask0_236_2787)">
                <path
                    d="M10 13.5625L5 8.5625L6.0625 7.5L10 11.4375L13.9375 7.5L15 8.5625L10 13.5625Z"
                    fill="#637592"
                />
            </g>
        </svg>

    )
}
