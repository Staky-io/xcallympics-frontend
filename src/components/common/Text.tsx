import { getSize } from '~/components/common'

type TextProps = {
    children: React.ReactNode;
    size?: 'regular' | 'small' | 'smaller';
    className?: string;
}

export default function Text(props: TextProps) {
    return <p className={`${getSize(props.size)}${props.className ? ' ' + props.className : ''}`}>{props.children}</p>
}
