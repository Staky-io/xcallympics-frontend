import { getSize } from '~/components/common'

type ButtonProps = {
    children: React.ReactNode;
    className?: string;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'stroke' | 'text' | 'cancel';
    size?: 'regular' | 'small' | 'smaller';
    disabled?: boolean;
    centered?: boolean;
    onClick?: () => void;
}

export default function Button(props: ButtonProps) {
    const { children, centered, size, disabled = false, className, variant, onClick } = props

    const mainStyle = 'py-12 px-16 rounded transition-all duration-200 select-none flex flex-row items-center'
    const primaryVariant = 'bg-primary hover:bg-primary-dark text-grey'
    const disabledVariant = 'bg-black-secondary text-disabled cursor-not-allowed'

    const getVariant = () => {
        switch (variant) {
            case 'primary':
                return primaryVariant
            case 'secondary':
                return 'bg-black-tertiary hover:bg-black-quaternary text-primary'
            case 'tertiary':
                return 'bg-black-tertiary hover:bg-black-quaternary text-grey'
            case 'stroke':
                return 'border border-primary hover:border-primary-dark text-primary hover:text-primary-dark'
            case 'text':
                return 'text-primary hover:text-primary-dark'
            case 'cancel':
                return 'bg-black-tertiary hover:bg-black-quaternar text-error hover:text-error-dark'
            default:
                return primaryVariant
        }
    }

    return (
        <button
            className={`${mainStyle} ${centered ? 'flex flex-row justify-center items-center' : ''} ${disabled ? disabledVariant : getVariant()}${className && className?.length > 0 ? ' ' + className : ''}`}
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
        >
            <span className={`font-semibold ${getSize(size)}`}>{children}</span>
        </button>
    )
}
