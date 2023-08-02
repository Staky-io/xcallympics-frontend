'use client'

import { useState, useRef } from 'react'
import { Button, Dropdown, Heading, Input, Text } from '~/components/common'
import { Modal, useModal, ModalRefType, ModalSlider, ModalSliderRefType } from '~/components/Modal'

export default function Home() {
    const [inputValue, setInputValue] = useState('')
    const [inputValue2, setInputValue2] = useState('')
    const modalRef = useRef<ModalRefType>(null)
    const modalSliderRef = useRef<ModalSliderRefType>(null)
    const [openModal, slideModalPrevious, slideModalNext, resetSlider, slideModalIndex] = useModal(modalRef, modalSliderRef)

    return (
        <main>
            <Text>Hello world</Text>
            <Heading>Heading 1</Heading>
            <Heading level={2}>Heading 2</Heading>
            <Heading level={3}>Heading 3</Heading>
            <Heading level={4}>Heading 4</Heading>
            <Heading level={5}>Heading 5</Heading>
            <Heading level={6}>Heading 6</Heading>

            <div className='flex flex-row mt-128'>
                <Button variant="primary" className='mr-10'>Button primary</Button>
                <Button variant="secondary" className='mr-10'>Button secondary</Button>
                <Button variant="tertiary" onClick={openModal}>Open modal</Button>
            </div>

            <Input
                value={inputValue}
                label={false}
                placeholder='Classic placeholder'
                className='mt-60'
                onChange={(value) => setInputValue(value)}
            />
            <Input
                value={inputValue2}
                label={true}
                placeholder='Placeholder with label'
                className='mt-10'
                onChange={(value) => setInputValue2(value)}
            />

            <Dropdown
                className='mt-10 w-448'
                placeholder='Select an option'
                options={[
                    { label: 'Option 1', value: '1' },
                    { label: 'Option 2', value: '2' },
                    { label: 'Option 3', value: '3' }
                ]}
                onChange={(value) => console.log(value)}
            />

            <Modal
                ref={modalRef}
                title='Modal title'
                subtitle='Modal subtitle'
                closable={true}
                onOpen={() => console.log('Modal opened')}
                onClose={() => console.log('Modal closed')}
            >
                This is a cool modal !!
            </Modal>

            <Modal
                ref={modalRef}
                title='Modal title'
                subtitle={`Modal subtitle - slide ${slideModalIndex+1}/3`}
                closable={true}
                onOpen={() => console.log('Modal opened')}
                onClose={() => {
                    console.log('Modal closed')
                    resetSlider()
                }}
            >
                <ModalSlider ref={modalSliderRef}>
                    <div>
                        This is a cool swipeable modal !!
                        <Button variant="primary" className='w-1/2 ml-1/2 mt-20 justify-center' onClick={slideModalNext}>Next</Button>
                    </div>
                    <div>
                        <h6>This is the second step of the modal</h6>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque labore molestiae obcaecati inventore accusantium est aut deserunt sint. Quas saepe mollitia debitis, iste eum et odit quidem dolor iure repellendus.
                        <div className='flex flex-row items-center justify-between'>
                            <Button variant="secondary" className='w-1/2 mt-20 justify-center' onClick={slideModalPrevious}>Previous</Button>
                            <Button variant="primary" className='w-1/2 mt-20 justify-center' onClick={slideModalNext}>Next</Button>
                        </div>
                    </div>
                    <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque labore molestiae obcaecati inventore accusantium est aut deserunt sint. Quas saepe mollitia debitis, iste eum et odit quidem dolor iure repellendus.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque labore molestiae obcaecati inventore accusantium est aut deserunt sint. Quas saepe mollitia debitis, iste eum et odit quidem dolor iure repellendus.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque labore molestiae obcaecati inventore accusantium est aut deserunt sint. Quas saepe mollitia debitis, iste eum et odit quidem dolor iure repellendus.
                        <Button variant="secondary" className='w-1/2 mt-20 justify-center' onClick={slideModalPrevious}>Previous</Button>
                    </div>
                </ModalSlider>
            </Modal>
        </main>
    )
}
