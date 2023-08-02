import { useState } from 'react'
import { getSize } from '~/components/common'

type InputProps = {
    label?: boolean;
    placeholder?: string;
    type?: 'text' | 'password' | 'email' | 'number';
    size?: 'regular' | 'small' | 'smaller';
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
    disabled?: boolean;
    error?: string;
}

export default function Input(props: InputProps) {
    const [isInputFocused, setIsInputFocused] = useState(false)
    const mainStyle = `transition-all duration-200 bg-black-secondary hover:bg-black-quaternary ${props.label && (isInputFocused || (props.value && props.value?.length > 0)) ? 'pt-16 pb-8' : 'pt-12 pb-12'} px-16 rounded text-grey placeholder:text-grey-secondary outline-none`
    const disabledVariant = 'placeholder:text-grey-secondary bg-disabled text-grey-secondary cursor-not-allowed user-select-none py-12 px-16 rounded'

    const getBorder = () => {
        if (props.disabled) return ''

        if (props.error) {
            return 'border border-error'
        } else {
            return 'border border-black-quaternary focus:border-primary'
        }
    }

    const getClasses = () => {
        return `${props.disabled ? disabledVariant : mainStyle} ${getBorder()} ${getSize(props.size)}`
    }

    const getLabelPosition = () => {
        if (isInputFocused || (props.value && props.value?.length > 0)) {
            return 'translate-y-0 scale-75 top-0'
        } else {
            if (props.size === 'smaller') {
                return 'translate-y-1/2 scale-100 top-4'
            } else if (props.size === 'small') {
                return 'translate-y-1/2 scale-100 top-2'
            } else {
                return 'translate-y-1/2 scale-100 top-2'
            }
        }
    }

    return (
        <div className={`relative h-auto${props.className && props.className?.length > 0 ? ' ' + props.className : ''}`}>
            {props.error && <span className={`text-error mt-4 ${getSize(props.size)}`}>{props.error}</span>}
            {props.label && <label className={`absolute select-none pointer-events-none origin-left left-16 transition-all duration-250 text-grey-secondary mb-4 ${getLabelPosition()} ${getSize(props.size)}`}>{props.placeholder}</label>}
            <input
                className={getClasses()}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                placeholder={props.label ? undefined : props.placeholder}
                type={props.type}
                value={props.value}
                onChange={(e) => props.onChange && props.onChange(e.target.value)}
                disabled={props.disabled}
            />
        </div>
    )
}
