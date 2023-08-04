export default function ComponentContainer(props: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={`w-full rounded-10 border-pink border p-32 ${props.className}`}
            style={{ boxShadow: '0px 0px 8px 0px #FCB2FF' }}
        >
            {props.children}
        </div>
    )
}
