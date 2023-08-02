import { Children, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { ModalSliderRefType } from '.'

type ModalSliderProps = {
    children: React.ReactNode | React.ReactNode[];
}

const ModalSlider = forwardRef<ModalSliderRefType, ModalSliderProps>((props, globalRef) => {
    const [isReady, setIsReady] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [currentSlideHeight, setCurrentSlideHeight] = useState(0)
    const localRef = useRef<HTMLDivElement>(null)
    const { children } = props

    const previous = () => {
        if (children && currentSlide > 0) {
            setCurrentSlide(currentSlide - 1)
            setIsReady(true)
        }
    }

    const next = () => {
        if (children && currentSlide < Children.count(children) - 1) {
            setCurrentSlide(currentSlide + 1)
            setIsReady(true)
        }
    }

    const getTransalteX = (index: number) => {
        if (currentSlide > index) {
            return '-translate-x-full'
        } else if (currentSlide < index) {
            return 'translate-x-full'
        } else {
            return 'transalte-x-0'
        }
    }

    const refreshHeight = () => {
        setCurrentSlideHeight(localRef.current?.children[currentSlide].clientHeight || 0)
    }

    const reset = () => {
        setCurrentSlide(0)
        setIsReady(false)
        refreshHeight()
    }

    useEffect(() => {
        setCurrentSlideHeight(localRef.current?.children[currentSlide].clientHeight || 0)
    }, [currentSlide])

    useImperativeHandle(globalRef, () => ({
        previous,
        next,
        reset,
        refreshHeight,
        getCurrentIndex: () => currentSlide
    }))

    return (
        <div
            ref={localRef}
            className={`relative w-full overflow-hidden transition-height ${isReady ? 'duration-200' : 'duration-0'}`}
            style={{ height: `${currentSlideHeight}px` }}
        >
            {Children.map(children, (child, index) => (
                <div
                    key={index}
                    className={`w-full absolute left-0 top-0 transition-transform duration-250 justify-center ${getTransalteX(index)}`}
                >
                    {child}
                </div>
            ))}
        </div>
    )
})

ModalSlider.displayName = 'ModalSlider'

export default ModalSlider
