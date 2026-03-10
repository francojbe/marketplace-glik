import { Modules } from "@medusajs/framework/utils"

export default async function seedMotos({ container }) {
    const productModuleService = container.resolve(Modules.PRODUCT)

    console.log("Iniciando creación de categoría Motos...")

    try {
        const category = await productModuleService.createProductCategories([
            {
                name: "Motos",
                handle: "motos",
                is_active: true,
                is_internal: false
            }
        ])

        console.log("✅ Categoría Motos creada con éxito:", category[0].id)
    } catch (error) {
        console.error("❌ Error al crear categoría Motos:", error.message)
    }
}
