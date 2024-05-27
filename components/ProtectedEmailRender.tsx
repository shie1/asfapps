import { useEffect, useMemo, useState } from "react"

export const ProtectedEmailRender = ({ email }: {
    email: string
}) => {
    const [display, setDisplay] = useState(false)

    useEffect(() => {
        if (typeof window !== "undefined") {
            setDisplay(true)
        }
    }, [])

    return (<span>{display ? email : "..."}</span>)
}