import React, { useState, useEffect, useRef } from 'react'
import { getSize } from '~/components/common'
import { IconDropdown } from '../icons'
import { useClickOutside } from '~/hooks/ui'

type DropdownOption = {
    label: string;
    value: string | number | bigint;
}

type DropdownProps = {
    options: DropdownOption[];
    placeholder?: string;
    selected?: string | number | bigint;
    label?: boolean;
    value?: string;
    className?: string;
    size?: 'regular' | 'small' | 'smaller';
    onChange?: (value: string | number | bigint) => void;
}

export default function Dropdown(props: DropdownProps) {
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [selected, setSelected] = useState<DropdownOption | undefined>(undefined)
    const [isOpen, setIsOpen] = useState(false)

    const classNames = [
        'flex flex-row items-center justify-between',
        'w-full cursor-pointer transition-all duration-200 bg-black-secondary hover:bg-black-quaternary pt-12 pb-12 px-16',
        'text-grey placeholder:text-grey-secondary outline-none border border-black-quaternary focus:border-primary',
        `${props.label ? 'pt-16 pb-8' : 'pt-12 pb-12'}`,
        `${isOpen ? 'rounded-b-0 rounded-t' : 'rounded'}`
    ].join(' ')

    const applyChoice = (option: DropdownOption) => {
        if (props.onChange) {
            props.onChange(option.value as string)
        }

        setSelected(props.options.find(item => item.value === option.value))
    }

    useClickOutside(dropdownRef, () => setIsOpen(false))

    useEffect(() => {
        if (props.selected) {
            const option = props.options.find(item => item.value === props.selected)
            setSelected(option)

            if (props.onChange && option) {
                props.onChange(option.value as string)
            }
        }
    }, [props])

    return (
        <div
            ref={dropdownRef}
            className={`relative select-none${props.className ? ' ' + props.className : ''}`}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className={`${getSize(props.size)} ${classNames}`}>
                {props.label && <label className={`absolute select-none pointer-events-none origin-left left-16 text-grey-secondary mb-4 translate-y-0 scale-75 top-0 ${getSize(props.size)}`}>{props.placeholder}</label>}
                {selected ? selected.label : props.placeholder ? props.placeholder : 'Select an option'}
                <IconDropdown className={`transition-transform duration-200 ${isOpen && 'rotate-180'}`} />
            </div>

            {isOpen && (
                <div className='absolute top-full left-0 w-full bg-white rounded shadow-lg'>
                    {props.options.filter((item) => item.value !== selected?.value).map((item, index) => (
                        <div
                            key={index}
                            className={`
                                px-16 py-12 cursor-pointer bg-black-secondary border-b border-x border-black-quaternary hover:bg-black-quaternary 
                                ${index === props.options.filter((item) => item.value !== selected?.value).length - 1 ? 'rounded-b' : ''}
                            `}
                            onClick={() => {
                                applyChoice(item)
                                setIsOpen(false)
                            }}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
