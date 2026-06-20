import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const MIME_TO_EXT: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
};

export type StorageFolder = "menu" | "dishes" | "sales" | "restaurants" | "partners";

let supabaseClient: SupabaseClient | null | undefined;

function getSupabaseClient(): SupabaseClient | null {
    if (supabaseClient !== undefined) {
        return supabaseClient;
    }

    const url = process.env.SUPABASE_URL?.trim();
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

    if (!url || !key) {
        supabaseClient = null;
        return null;
    }

    supabaseClient = createClient(url, key, {
        auth: { persistSession: false, autoRefreshToken: false },
    });

    return supabaseClient;
}

export function isSupabaseStorageEnabled(): boolean {
    return getSupabaseClient() !== null;
}

export async function uploadImageToStorage({
    data,
    mimeType,
    title,
    folder,
}: {
    data: string;
    mimeType: string;
    title?: string;
    folder: StorageFolder;
}): Promise<{ image_url: string; title: string }> {
    const ext = MIME_TO_EXT[mimeType] ?? "jpg";
    const filename = `${randomUUID()}.${ext}`;
    const storagePath = `uploads/${folder}/${filename}`;
    const displayTitle = title?.trim() || filename;
    const buffer = Buffer.from(data, "base64");

    const supabase = getSupabaseClient();
    if (supabase) {
        const bucket = process.env.SUPABASE_STORAGE_BUCKET?.trim() || "menu";
        const { error } = await supabase.storage.from(bucket).upload(storagePath, buffer, {
            contentType: mimeType,
            upsert: false,
        });

        if (error) {
            throw new Error(error.message);
        }

        const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(storagePath);

        return {
            image_url: publicData.publicUrl,
            title: displayTitle,
        };
    }

    const uploadsDir = path.join("uploads", folder);
    await fs.mkdir(uploadsDir, { recursive: true });
    await fs.writeFile(path.join(uploadsDir, filename), buffer);

    return {
        image_url: `/uploads/${folder}/${filename}`,
        title: displayTitle,
    };
}
