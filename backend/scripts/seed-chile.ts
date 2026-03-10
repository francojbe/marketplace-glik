import { Modules } from "@medusajs/framework/utils"

export default async function seedChile({ container }) {
    const regionModuleService = container.resolve(Modules.REGION)

    console.log("Iniciando creación de región Chile...")

    try {
        const chileRegion = await regionModuleService.createRegions([
            {
                name: "Chile",
                currency_code: "clp",
                countries: ["CL"],
                payment_providers: ["pp_system_default"],
                automatic_taxes: true
            }
        ])

        console.log("✅ Región Chile con moneda CLP creada con éxito:", chileRegion[0].id)
    } catch (error) {
        console.error("❌ Error al crear región:", error.message)
    }
}
