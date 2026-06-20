import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";
import { createClient } from "@supabase/supabase-js";
const MIME_TO_EXT = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
};
let supabaseClient;
function getSupabaseClient() {
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
export function isSupabaseStorageEnabled() {
    return getSupabaseClient() !== null;
}
function isVercelDeployment() {
    return process.env.VERCEL === "1";
}
export async function uploadImageToStorage({ data, mimeType, title, folder, }) {
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
    if (isVercelDeployment()) {
        throw new Error("Supabase Storage не налаштовано на Vercel. Додайте SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY та SUPABASE_STORAGE_BUCKET у Environment Variables backend-проєкту і зробіть redeploy.");
    }
    const uploadsDir = path.join("uploads", folder);
    await fs.mkdir(uploadsDir, { recursive: true });
    await fs.writeFile(path.join(uploadsDir, filename), buffer);
    return {
        image_url: `/uploads/${folder}/${filename}`,
        title: displayTitle,
    };
}
