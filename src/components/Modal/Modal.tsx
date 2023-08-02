import React, { useRef, forwardRef, useImperativeHandle, useEffect, useState } from 'react'
import { ModalRefType } from '~/components/Modal'
import { Text } from '~/components/common'
import { IconClose } from '~/components/icons'

type ModalProps = {
    children: React.ReactNode;
    className?: string;
    closable?: boolean;
    title?: string;
    subtitle?: string;
    titleCentered?: boolean;
    onClose?: () => void;
    onOpen?: () => void;
}

const Modal = forwardRef<ModalRefType, ModalProps>((props, globalRef) => {
    const [pollyfillRegistered, setPollyFillRegistered] = useState(false)
    const modalRef = useRef<HTMLDialogElement>(null)

    const close = () => {
        if (props.onClose) {
            props.onClose()
        }

        if (modalRef.current) {
            modalRef.current.close()
        }
    }

    const open = () => {
        if (props.onOpen) {
            props.onOpen()
        }

        if (modalRef.current) {
            modalRef.current.showModal()
        }
    }

    useEffect(() => {
        const registerPolyfill = async () => {
            if (modalRef != null && modalRef?.current != null) {
                const dialogPolyfill = (await import('dialog-polyfill')).default
                dialogPolyfill.registerDialog(modalRef.current)
                setPollyFillRegistered(true)
            }
        }

        if (typeof window != 'undefined' && !pollyfillRegistered) {
            registerPolyfill()
        }
    }, [modalRef, pollyfillRegistered])

    useImperativeHandle(globalRef, () => ({ close, open }))

    return (
        <dialog className='dialog-box' ref={modalRef}>
            <div className={`relative s:max-w-512 w-screen-w bg-black-secondary box-border s:rounded-15 m-0 ${(props.title || props.subtitle || !props.closable) ? 'p-20' : 'px-20 pt-40 pb-20'}${props.className ? ' ' + props.className : ''}`}>
                {props.closable && ( // TODO: Replace with a close icon
                    <button className="absolute top-16 right-16 p-4" onClick={close}>
                        <IconClose />
                    </button>
                )}

                {(props.title || props.subtitle) && (
                    <div className={`flex flex-col mb-20 ${props.titleCentered ? 'items-center' : 'items-start'}`}>
                        {props.subtitle && (
                            <Text size="smaller" className="text-grey-secondary">
                                {props.subtitle}
                            </Text>
                        )}
                        {props.title && (
                            <h6>{props.title}</h6>
                        )}
                    </div>
                )}

                {props.children}
            </div>
        </dialog>
    )
})

Modal.displayName = 'Modal'

export default Modal
