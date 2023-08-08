import { BTPId } from '~/types'

export default function getBTPAddress(network: BTPId, to: string): string {
    return `btp://${network}/${to}`
}
