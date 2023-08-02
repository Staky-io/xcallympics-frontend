import { useModal } from '~/hooks/ui'
import Modal from './Modal'
import ModalSlider from './ModalSlider'

export type ModalSliderRefType = {
    previous: () => void;
    next: () => void;
    reset: () => void;
    refreshHeight: () => void;
    getCurrentIndex: () => number;
}

export type ModalRefType = {
    open: () => void;
    close: () => void;
}

export {
    Modal,
    ModalSlider,
    useModal
}
