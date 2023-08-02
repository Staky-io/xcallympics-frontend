type HeadingProps = {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    children: React.ReactNode;
    className?: string;
}

export default function Heading(props: HeadingProps) {
    const { level, children, className } = props

    switch (level) {
        case 1:
            return <h1 className={className}>{children}</h1>
            break
        case 2:
            return <h2 className={className}>{children}</h2>
            break
        case 3:
            return <h3 className={className}>{children}</h3>
            break
        case 4:
            return <h4 className={className}>{children}</h4>
            break
        case 5:
            return <h5 className={className}>{children}</h5>
            break
        case 6:
            return <h6 className={className}>{children}</h6>
            break
        default:
            return <h1 className={className}>{children}</h1>
            break
    }
}
