import { createHash } from "crypto"

export const getHash = (username: string, password: string) => {
    return createHash("sha256").update(`${username}:${password}`).update(`${password}:${username}`).digest("hex")
}