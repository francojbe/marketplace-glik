const API_URL = "https://glik7-marketplace-api.nojauc.easypanel.host";

async function run() {
    console.log("🚀 LIMPIANDO CATEGORÍAS DE ROPA...\n");
    const authRes = await fetch(`${API_URL}/auth/user/emailpass`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "admin@mercurjs.com", password: "admin" })
    });
    const { token } = await authRes.json();
    const HEADERS = { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" };

    const catRes = await fetch(`${API_URL}/admin/product-categories?limit=50`, { headers: HEADERS });
    const catData = await catRes.json();
    const cats = catData.product_categories || [];

    const keepCats = ["Motos", "scooters", "sport", "adventure", "street", "cruiser"];

    for (const c of cats) {
        if (!keepCats.includes(c.handle) && c.name !== "Motos") {
            console.log(`    Borrando categoría: ${c.name} (${c.handle})...`);
            await fetch(`${API_URL}/admin/product-categories/${c.id}`, { method: "DELETE", headers: HEADERS });
        }
    }

    console.log("\n==> CREANDO CATEGORÍAS FALTANTES...");
    for (const handle of keepCats) {
        if (handle === "Motos") continue;

        const exists = cats.find(c => c.handle === handle);
        if (!exists) {
            console.log(`    Creando categoría: ${handle}...`);
            const parent = cats.find(c => c.name === "Motos");
            await fetch(`${API_URL}/admin/product-categories`, {
                method: "POST",
                headers: HEADERS,
                body: JSON.stringify({ name: handle.charAt(0).toUpperCase() + handle.slice(1), handle: handle, is_active: true, is_internal: false })
            });
        }
    }
    console.log("✅ FIN");
}
run();
