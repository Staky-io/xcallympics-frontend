export { default as Button } from './Button'
export { default as Dropdown } from './Dropdown'
export { default as Heading } from './Heading'
export { default as Input } from './Input'
export { default as Spinner } from './Spinner'
export { default as Text } from './Text'

export const getSize = (size: string | undefined) => {
    if (size === 'smaller') {
        return 'text-12'
    } else if (size === 'small') {
        return 'text-14'
    } else {
        return 'text-16'
    }
}
