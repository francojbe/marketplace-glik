import { HttpTypes } from "@medusajs/types"

export const MOTO_CATEGORIES = [
    { id: "1", name: "Scooter y Maxi-Scooter", handle: "scooter", icon: "ScooterIcon" },
    { id: "2", name: "Naked", handle: "naked", icon: "NakedIcon" },
    { id: "3", name: "Deportivas (Sport)", handle: "sport", icon: "SportIcon" },
    { id: "4", name: "Trail / Adventure", handle: "trail", icon: "TrailIcon" },
    { id: "5", name: "Custom / Cruiser", handle: "custom", icon: "CustomIcon" },
    { id: "6", name: "Enduro y Motocross", handle: "enduro", icon: "EnduroIcon" },
    { id: "7", name: "Trabajo / Utilitarias", handle: "trabajo", icon: "WorkIcon" },
    { id: "8", name: "Touring / Gran Turismo", handle: "touring", icon: "TouringIcon" },
    { id: "9", name: "Café Racer / Clásicas", handle: "classic", icon: "ClassicIcon" },
    { id: "10", name: "Eléctricas", handle: "electrica", icon: "ElectricIcon" },
    { id: "11", name: "Cuatrimotos (ATV / UTV)", handle: "atv", icon: "AtvIcon" },
]

export const CILINDRADA_OPTIONS = [
    { label: "Hasta 125cc", value: "0-125" },
    { label: "126cc a 250cc", value: "126-250" },
    { label: "251cc a 500cc", value: "251-500" },
    { label: "501cc a 800cc", value: "501-800" },
    { label: "Más de 800cc", value: "801-up" },
]

export const CONDICION_OPTIONS = [
    { label: "Nuevas (0km)", value: "new" },
    { label: "Usadas", value: "used" },
]

export const MARCA_OPTIONS = [
    "Honda", "Yamaha", "Suzuki", "Kawasaki", "BMW", "KTM", "Ducati", "Bajaj", "Triumph"
]

export const YEAR_RANGE = {
    min: 2010,
    max: new Date().getFullYear() + 1,
}
