const API_URL = "https://glik7-marketplace-api.nojauc.easypanel.host";

async function run() {
    console.log("🚀 EJECUTANDO PASO 6 CORREGIDO (MOTO PRUEBA)...\n");

    const authRes = await fetch(`${API_URL}/auth/user/emailpass`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "admin@mercurjs.com", password: "admin" })
    });
    const { token } = await authRes.json();
    const HEADERS = { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" };

    const motosId = "pcat_01KKB0AXCK5NV2P05AF8DGKT56";

    console.log("==> CREANDO PRODUCTO MOTO...");
    const prodRes = await fetch(`${API_URL}/admin/products`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({
            title: "Yamaha MT-07 2024",
            description: "Moto nueva 689cc 73cv",
            categories: [{ id: motosId }], // <- Formato correcto Medusa V2
            options: [{ title: "Estado", values: ["Nueva"] }],
            variants: [{
                title: "MT-07 Nueva",
                sku: "MT07-2024",
                prices: [{ currency_code: "clp", amount: 8500000 }],
                manage_inventory: false,
                options: { "Estado": "Nueva" }
            }]
        })
    });
    const prodData = await prodRes.json();
    console.log(JSON.stringify(prodData, null, 2));
}

run();
