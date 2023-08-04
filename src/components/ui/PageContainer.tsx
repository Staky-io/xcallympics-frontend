export default function PageContainer(props: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`w-full max-w-2xl mx-auto my-0 ${props.className}`}>
            {props.children}
        </div>
    )
}
