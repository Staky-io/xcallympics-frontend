import React, { useEffect, useState } from 'react'
import { ModalRefType, ModalSliderRefType } from '~/components/Modal'

export type useModalType = [
    openModal: () => void,
    previousModal: () => void,
    nextModal: () => void,
    resetSlider: () => void,
    sliderIndex: number
]

export default function useModal(modalRef: React.RefObject<ModalRefType>, modalSliderRef?: React.RefObject<ModalSliderRefType>): useModalType {
    const [sliderIndex, setSliderIndex] = useState<number>(0)

    useEffect(() => {
        setSliderIndex(modalSliderRef?.current?.getCurrentIndex() || 0)
    }, [modalSliderRef])

    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.open()

            if (modalSliderRef && modalSliderRef.current) {
                modalSliderRef.current.refreshHeight()
            }
        }
    }

    const previousModal = () => {
        if (modalSliderRef && modalSliderRef.current) {
            modalSliderRef.current.previous()
            setSliderIndex(modalSliderRef.current.getCurrentIndex() - 1)
        }
    }

    const nextModal = () => {
        if (modalSliderRef && modalSliderRef.current) {
            modalSliderRef.current.next()
            setSliderIndex(modalSliderRef.current.getCurrentIndex() + 1)
        }
    }

    const resetSlider = () => {
        if (modalSliderRef && modalSliderRef.current) {
            modalSliderRef.current.reset()
            setSliderIndex(0)
        }
    }

    return [openModal, previousModal, nextModal, resetSlider, sliderIndex]
}
