const API_URL = "https://glik7-marketplace-api.nojauc.easypanel.host";

async function run() {
    console.log("🚀 INICIANDO CONFIGURACIÓN MARKETPLACE MOTOS (vía API)...\n");

    // PASO 1: OBTENER TOKEN
    console.log("==> PASO 1: OBTENIENDO TOKEN ADMIN...");
    const authRes = await fetch(`${API_URL}/auth/user/emailpass`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "admin@mercurjs.com", password: "admin" })
    });
    const authData = await authRes.json();
    const token = authData.token;
    console.log("✅ Token obtenido:", token ? token.substring(0, 20) + "..." : "FALLÓ");
    if (!token) return;

    const HEADERS = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    };

    // PASO 2: CATEGORÍA PRINCIPAL "MOTOS"
    console.log("\n==> PASO 2: CREANDO CATEGORÍA 'MOTOS'...");
    const catRes = await fetch(`${API_URL}/admin/product-categories`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({
            name: "Motos",
            handle: "motos",
            is_active: true,
            is_internal: false
        })
    });
    const catData = await catRes.json();
    // It might already exist (400), but we check if we have the ID or fetch it
    let motosId = catData?.product_category?.id;
    if (!motosId && catData.type === 'invalid_data') {
        console.log("⚠️ La categoría Motos ya existe. Buscando su ID...");
        const findCat = await fetch(`${API_URL}/admin/product-categories?handle=motos`, { headers: HEADERS });
        const findData = await findCat.json();
        motosId = findData.product_categories?.[0]?.id;
    }
    console.log("✅ MOTOS_ID:", motosId);

    // PASO 3: SUBCATEGORÍAS
    if (motosId) {
        console.log("\n==> PASO 3: CREANDO SUBCATEGORÍAS (Street, Offroad, Scooters, Custom)...");
        const subcats = ["Street", "Offroad", "Scooters", "Custom"];
        for (const sub of subcats) {
            const res = await fetch(`${API_URL}/admin/product-categories`, {
                method: "POST",
                headers: HEADERS,
                body: JSON.stringify({
                    name: sub,
                    handle: sub.toLowerCase(),
                    parent_category_id: motosId,
                    is_active: true
                })
            });
            const d = await res.json();
            console.log(`- ${sub}:`, d.product_category ? "Creada" : d.message || "Ya existía");
        }
    }

    // PASO 4: REGIÓN CHILE
    console.log("\n==> PASO 4: CREANDO / VERIFICANDO REGIÓN CHILE...");
    const regionRes = await fetch(`${API_URL}/admin/regions`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({
            name: "Chile",
            currency_code: "CLP",
            countries: ["cl"]
        }) // Note: tax_rate and automatic_taxes are handled separately in Medusa v2 or might throw error, keeping it simple.
    });
    const regionData = await regionRes.json();
    console.log("Respuesta Región:", regionData.region ? `✅ Creada (${regionData.region.id})` : regionData.message || 'Error/Ya existe');

    // PASO 5: PRODUCTO MOTO
    console.log("\n==> PASO 5: CREANDO PRODUCTO MOTO DE PRUEBA...");
    const prodRes = await fetch(`${API_URL}/admin/products`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({
            title: "Yamaha MT-07 2024",
            description: "Moto nueva 689cc 73cv",
            category_ids: motosId ? [motosId] : [],
            options: [{ title: "Estado", values: ["Nueva"] }],
            variants: [{
                title: "MT-07 Nueva",
                sku: "MT07-2024-" + Math.floor(Math.random() * 1000),
                prices: [{ currency_code: "CLP", amount: 8500000 }],
                manage_inventory: false,
                options: { "Estado": "Nueva" }
            }]
        })
    });
    const prodData = await prodRes.json();
    console.log("Respuesta Producto:", prodData.product ? `✅ Creado (${prodData.product.id})` : prodData.message || prodData);

    console.log("\n🎉 SCRIPT DE CONFIGURACIÓN FINALIZADO");
}

run();
