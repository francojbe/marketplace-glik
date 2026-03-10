import { HttpTypes } from "@medusajs/types"

export const MOTO_CATEGORIES: any[] = []

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
