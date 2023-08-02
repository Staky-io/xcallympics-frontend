import Button from './Button'
import Dropdown from './Dropdown'
import Heading from './Heading'
import Input from './Input'
import Text from './Text'

export const getSize = (size: string | undefined) => {
    if (size === 'smaller') {
        return 'text-12'
    } else if (size === 'small') {
        return 'text-14'
    } else {
        return 'text-16'
    }
}

export {
    Button,
    Dropdown,
    Heading,
    Input,
    Text
}
