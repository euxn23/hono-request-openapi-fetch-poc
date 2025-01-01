import { app } from "../src/app";
import { writeFile } from "node:fs/promises";

async function main() {
  const res = await app.request("/doc");
  const doc = await res.json();
  await writeFile("openapi.json", JSON.stringify(doc, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
