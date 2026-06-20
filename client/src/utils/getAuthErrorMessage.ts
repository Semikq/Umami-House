function readPayloadMessage(data: unknown) {
    if (typeof data === "string" && data.trim()) {
        return data.trim()
    }

    if (data && typeof data === "object") {
        const payload = data as { error?: string, message?: string }

        if (typeof payload.error === "string" && payload.error.trim()) {
            return payload.error.trim()
        }

        if (typeof payload.message === "string" && payload.message.trim()) {
            return payload.message.trim()
        }
    }

    return null
}

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

export function transformAuthErrorResponse(response: { status: number, data: unknown }) {
    if (response.status === 409) {
        return "Таку пошту вже зареєстровано"
    }

    if (response.status === 404) {
        return "Такого акаунту не існує"
    }

    if (response.status === 401) {
        return "Невірний пароль"
    }

    const payloadMessage = readPayloadMessage(response.data)
    if (payloadMessage) {
        return mapKnownServerMessage(payloadMessage)
    }

    return "Помилка сервера. Спробуйте ще раз."
}

export default function getAuthErrorMessage(err: unknown, fallback: string) {
    if (!err || typeof err !== "object") {
        return fallback
    }

    const apiError = err as {
        data?: unknown
        error?: string
        status?: number | string
    }

    if (typeof apiError.status === "number") {
        if (apiError.status === 409) return "Таку пошту вже зареєстровано"
        if (apiError.status === 404) return "Такого акаунту не існує"
        if (apiError.status === 401) return "Невірний пароль"
    }

    if (typeof apiError.data === "string" && apiError.data.trim()) {
        return mapKnownServerMessage(apiError.data.trim())
    }

    const payloadMessage = readPayloadMessage(apiError.data)
    if (payloadMessage) {
        return mapKnownServerMessage(payloadMessage)
    }

    if (apiError.status === "FETCH_ERROR") {
        return "Не вдалося з'єднатися з сервером. Перевірте REACT_APP_SERVER_URL на Vercel."
    }

    if (typeof apiError.error === "string" && apiError.error.trim()) {
        return mapKnownServerMessage(apiError.error.trim())
    }

    return fallback
}
