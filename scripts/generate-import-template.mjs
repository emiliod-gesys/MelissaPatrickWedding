import * as XLSX from "xlsx";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const columns = ["Usuario", "Nombre", "Idioma", "Conyugal", "Adicionales"];
const examples = [
  {
    Usuario: "juan_perez",
    Nombre: "Juan Pérez",
    Idioma: "ESP",
    Conyugal: "F",
    Adicionales: 0,
  },
  {
    Usuario: "maria_carlos",
    Nombre: "María y Carlos García",
    Idioma: "ESP",
    Conyugal: "T",
    Adicionales: 2,
  },
  {
    Usuario: "hans_mueller",
    Nombre: "Hans Müller",
    Idioma: "ALE",
    Conyugal: "F",
    Adicionales: 1,
  },
];

const worksheet = XLSX.utils.json_to_sheet(examples, { header: columns });
worksheet["!cols"] = [{ wch: 22 }, { wch: 30 }, { wch: 10 }, { wch: 10 }, { wch: 12 }];

const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Invitados");

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = join(root, "public", "templates", "plantilla-invitados.xlsx");

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, XLSX.write(workbook, { type: "buffer", bookType: "xlsx" }));

console.log(`Plantilla generada en ${outputPath}`);
