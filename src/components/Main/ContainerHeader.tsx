import React from 'react'

export default function ContainerHeader({children, ...props}) {
    const style = 'uppercase text-center border border-neutral-700 bg-neutral-600 mb-4';

    return (
        <h2 className={style} {...props}>
            {children}
        </h2>
    )
}
