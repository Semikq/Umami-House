import { z } from "zod";
export const uuidSchema = z.string().uuid();
export const uuidParamsSchema = z.object({ uuid: uuidSchema });
export const cityUuidParamsSchema = z.object({ city_uuid: uuidSchema });
