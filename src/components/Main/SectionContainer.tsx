import React, { ReactNode } from 'react'

interface SectionContainerProps {
    children: ReactNode;
    weather?: boolean;
}

export default function SectionContainer({children, weather, ...props}: SectionContainerProps) {
    let styles: string = "p-4";

    if (weather) {
        styles += " h-full w-1/2"
    } else {
        styles += " h-full w-full"
    }

    return (
        <section className={styles} {...props}>
            {children}
        </section>
    )
}
