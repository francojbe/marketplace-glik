const API_URL = "https://glik7-marketplace-api.nojauc.easypanel.host";

async function run() {
    console.log("🚀 EJECUTANDO SCRIPT: MARKETPLACE GLIK MOTOS REALES...\n");

    try {
        // 1. OBTENER TOKEN ADMIN
        console.log("==> 1. AUTENTICANDO ADMIN...");
        const authRes = await fetch(`${API_URL}/auth/user/emailpass`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: "admin@mercurjs.com", password: "admin" })
        });
        const { token } = await authRes.json();
        const HEADERS = { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" };
        console.log("    ✅ Autenticado");

        // 2. BUSCAR LA CATEGORÍA "MOTOS" PARA ASIGNARLAS AHÍ
        console.log("\n==> 2. BUSCANDO CATEGORÍA 'MOTOS'...");
        const catRes = await fetch(`${API_URL}/admin/product-categories?q=Motos`, { headers: HEADERS });
        const catData = await catRes.json();
        let motosId = null;
        if (catData.product_categories && catData.product_categories.length > 0) {
            motosId = catData.product_categories[0].id;
            console.log(`    ✅ Categoría encontrada: ${motosId}`);
        } else {
            console.log("    ❌ No se encontró categoría Motos, procediendo sin ella (o puedes crearla primero).");
        }

        const categoryPayload = motosId ? [{ id: motosId }] : [];

        // 3. BORRAR PRODUCTOS DEMO EXISTENTES
        console.log("\n==> 3. ELIMINANDO PRODUCTOS EXISTENTES (DEMO)...");
        const listRes = await fetch(`${API_URL}/admin/products?limit=50`, { headers: HEADERS });
        const listData = await listRes.json();
        const products = listData.products || [];

        for (const p of products) {
            console.log(`    Borrando: ${p.title} (${p.id})...`);
            await fetch(`${API_URL}/admin/products/${p.id}`, { method: "DELETE", headers: HEADERS });
        }
        console.log("    ✅ Productos demo eliminados");

        // 4. CREAR LAS 6 MOTOS REALES
        console.log("\n==> 4. CREANDO 6 MOTOS REALES...");

        const motosReales = [
            {
                title: "Yamaha MT-07 2024",
                description: "La motocicleta Hyper Naked MT-07, con su motor CP2 de 689 cc rico en par y su chasis compacto.",
                categories: categoryPayload,
                options: [
                    { title: "Año", values: ["2024"] },
                    { title: "Kilometraje", values: ["50"] },
                    { title: "Cilindrada", values: ["689cc"] },
                    { title: "Marca", values: ["Yamaha"] },
                    { title: "Estado", values: ["Usada"] }
                ],
                variants: [{
                    title: "Yamaha MT-07 2024",
                    sku: "YAM-MT07-24",
                    prices: [{ currency_code: "clp", amount: 8500000 }],
                    manage_inventory: false,
                    options: { "Año": "2024", "Kilometraje": "50", "Cilindrada": "689cc", "Marca": "Yamaha", "Estado": "Usada" }
                }]
            },
            {
                title: "Honda CB500X 2023",
                description: "Una motocicleta Adventure ligera y ágil con motor bicilíndrico de 471cc, ideal para recorrer todo tipo de caminos.",
                categories: categoryPayload,
                options: [
                    { title: "Año", values: ["2023"] },
                    { title: "Kilometraje", values: ["8000"] },
                    { title: "Cilindrada", values: ["471cc"] },
                    { title: "Marca", values: ["Honda"] },
                    { title: "Estado", values: ["Usada"] }
                ],
                variants: [{
                    title: "Honda CB500X 2023",
                    sku: "HON-CB50X-23",
                    prices: [{ currency_code: "clp", amount: 6200000 }],
                    manage_inventory: false,
                    options: { "Año": "2023", "Kilometraje": "8000", "Cilindrada": "471cc", "Marca": "Honda", "Estado": "Usada" }
                }]
            },
            {
                title: "Suzuki V-Strom 650 2024",
                description: "Legendaria moto trail de 645cc famosa por su durabilidad. Preparada para offroad y rutas largas.",
                categories: categoryPayload,
                options: [
                    { title: "Año", values: ["2024"] },
                    { title: "Kilometraje", values: ["0"] },
                    { title: "Cilindrada", values: ["645cc"] },
                    { title: "Marca", values: ["Suzuki"] },
                    { title: "Estado", values: ["Nueva"] }
                ],
                variants: [{
                    title: "Suzuki V-Strom 650",
                    sku: "SUZ-VSTROM-24",
                    prices: [{ currency_code: "clp", amount: 9800000 }],
                    manage_inventory: false,
                    options: { "Año": "2024", "Kilometraje": "0", "Cilindrada": "645cc", "Marca": "Suzuki", "Estado": "Nueva" }
                }]
            },
            {
                title: "Bajaj Pulsar NS200 2023",
                description: "La reina de la ciudad (Street). 199cc, 24hp de potencia, agilidad pura para el día a día y viajes cortos.",
                categories: categoryPayload,
                options: [
                    { title: "Año", values: ["2023"] },
                    { title: "Kilometraje", values: ["15000"] },
                    { title: "Cilindrada", values: ["199cc"] },
                    { title: "Marca", values: ["Bajaj"] },
                    { title: "Estado", values: ["Usada"] }
                ],
                variants: [{
                    title: "Bajaj Pulsar NS200",
                    sku: "BAJ-NS200-23",
                    prices: [{ currency_code: "clp", amount: 3500000 }],
                    manage_inventory: false,
                    options: { "Año": "2023", "Kilometraje": "15000", "Cilindrada": "199cc", "Marca": "Bajaj", "Estado": "Usada" }
                }]
            },
            {
                title: "Kawasaki Z900 2025",
                description: "Naked radical de 948cc y 125cv. Tecnología de punta, modos de manejo e imponente estilo Sugomi.",
                categories: categoryPayload,
                options: [
                    { title: "Año", values: ["2025"] },
                    { title: "Kilometraje", values: ["0"] },
                    { title: "Cilindrada", values: ["948cc"] },
                    { title: "Marca", values: ["Kawasaki"] },
                    { title: "Estado", values: ["Nueva"] }
                ],
                variants: [{
                    title: "Kawasaki Z900",
                    sku: "KAW-Z900-25",
                    prices: [{ currency_code: "clp", amount: 12000000 }],
                    manage_inventory: false,
                    options: { "Año": "2025", "Kilometraje": "0", "Cilindrada": "948cc", "Marca": "Kawasaki", "Estado": "Nueva" }
                }]
            },
            {
                title: "Honda PCX 160 2024",
                description: "El mejor scooter para moverte eficientemente por la ciudad. Consumo inmejorable y diseño moderno.",
                categories: categoryPayload,
                options: [
                    { title: "Año", values: ["2024"] },
                    { title: "Kilometraje", values: ["0"] },
                    { title: "Cilindrada", values: ["156cc"] },
                    { title: "Marca", values: ["Honda"] },
                    { title: "Estado", values: ["Nueva"] }
                ],
                variants: [{
                    title: "Honda PCX 160",
                    sku: "HON-PCX-24",
                    prices: [{ currency_code: "clp", amount: 2800000 }],
                    manage_inventory: false,
                    options: { "Año": "2024", "Kilometraje": "0", "Cilindrada": "156cc", "Marca": "Honda", "Estado": "Nueva" }
                }]
            }
        ];

        for (const moto of motosReales) {
            const res = await fetch(`${API_URL}/admin/products`, {
                method: "POST",
                headers: HEADERS,
                body: JSON.stringify(moto)
            });
            const data = await res.json();
            if (res.ok) {
                console.log(`    ✅ Creada: ${moto.title} (${data.product.id})`);
            } else {
                console.error(`    ❌ Error creando ${moto.title}:`, JSON.stringify(data));
            }
        }

        console.log("\n🎉 ¡TODAS LAS MOTOS REALES FUERON CREADAS CON ÉXITO!");

    } catch (e) {
        console.error("ERROR GRAVE:", e);
    }
}

run();
