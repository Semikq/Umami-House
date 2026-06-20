function mapKnownServerMessage(message: string) {
    const normalized = message.toLowerCase()

    if (normalized.includes("no record was found")) {
        return "Такого акаунту не існує"
    }

    if (normalized.includes("invalid password")) {
        return "Невірний пароль"
    }

    return message
}

export default function getAuthErrorMessage(err: unknown, fallback: string) {
    if (!err || typeof err !== "object") {
        return fallback
    }

    const apiError = err as {
        data?: unknown
        error?: string
    }

    if (typeof apiError.data === "string" && apiError.data.trim()) {
        return mapKnownServerMessage(apiError.data.trim())
    }

    if (apiError.data && typeof apiError.data === "object") {
        const payload = apiError.data as { error?: string, message?: string }

        if (typeof payload.error === "string" && payload.error.trim()) {
            return payload.error.trim()
        }

        if (typeof payload.message === "string" && payload.message.trim()) {
            return mapKnownServerMessage(payload.message.trim())
        }
    }

    if (typeof apiError.error === "string" && apiError.error.trim()) {
        return mapKnownServerMessage(apiError.error.trim())
    }

    return fallback
}
