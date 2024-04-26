import React from 'react'

export default function SectionContainer({children, ...props}) {
    return (
        <section className='p-4 h-full w-full' {...props}>
            {children}
        </section>
    )
}
