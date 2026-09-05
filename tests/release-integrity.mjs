import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const plugin = path.join(repo, "wordpress-plugin", "schema-fiscal-outil");
const read = relative => fs.readFileSync(path.join(plugin, relative));
const text = relative => read(relative).toString("utf8");
const sha256 = buffer => crypto.createHash("sha256").update(buffer).digest("hex");
const errors = [];
let checks = 0;
const check = (condition, message) => {
  checks += 1;
  if(!condition) errors.push(message);
};

const sums = text("SHA256SUMS.txt").trim().split(/\r?\n/);
for(const line of sums){
  const match = line.match(/^([a-f0-9]{64})  (.+)$/);
  check(Boolean(match), `ligne SHA256SUMS invalide: ${line}`);
  if(!match) continue;
  const [, expected, relative] = match;
  const target = path.resolve(plugin, relative);
  check(target.startsWith(`${plugin}${path.sep}`), `chemin hors paquet: ${relative}`);
  check(fs.existsSync(target), `fichier absent: ${relative}`);
  if(fs.existsSync(target)) check(sha256(fs.readFileSync(target)) === expected, `empreinte différente: ${relative}`);
}

const html = text("app/index.html");
const php = text("schema-fiscal-outil.php");
const wpReadme = text("readme.txt");
const schema = JSON.parse(text("FORMAT-SCHEMA-v2.schema.json"));
const rootPackage = JSON.parse(fs.readFileSync(path.join(repo, "package.json"), "utf8"));
const citation = fs.readFileSync(path.join(repo, "CITATION.cff"), "utf8");
const licence = fs.readFileSync(path.join(repo, "LICENSE"), "utf8");

for(const [label, source] of [["PHP", php], ["interface", html], ["readme WordPress", wpReadme], ["citation", citation]]){
  check(source.includes("1.2.6"), `version 1.2.6 absente de ${label}`);
}
check(rootPackage.version === "1.2.6", "version package.json différente de 1.2.6");
check(rootPackage.private === true, "protection contre une publication npm accidentelle absente");
check(rootPackage.license === "UNLICENSED", "statut de licence package.json inattendu");
check(citation.includes('repository-code: "https://github.com/Lyes-Kaci/tax-structure-diagram-editor"'), "URL du dépôt absente de CITATION.cff");
check(/All rights reserved/i.test(php), "mention de droits absente du plugin");
check(/All rights reserved/i.test(licence), "mention de droits absente de LICENSE");

check(schema.$schema === "https://json-schema.org/draft/2020-12/schema", "draft JSON Schema inattendu");
check(schema.properties?.v?.const === 2, "version de format JSON différente de 2");
check(["v", "ents", "dets", "flux"].every(key => schema.required?.includes(key)), "champs JSON requis incomplets");
check(schema.properties?.ents?.maxItems === 2500, "borne des entités inattendue");
check(schema.properties?.dets?.maxItems === 2500, "borne des détentions inattendue");
check(schema.properties?.flux?.maxItems === 2500, "borne des flux inattendue");

check(!/(?:fetch\s*\(|XMLHttpRequest|WebSocket\s*\(|EventSource\s*\()/i.test(html), "primitive réseau détectée");
check(/connect-src 'none'/.test(html), "connect-src 'none' absent de la CSP");
check(/default-src 'none'/.test(html), "default-src 'none' absent de la CSP");
check(/allow="clipboard-write"/.test(php), "écriture presse-papiers non déclarée dans l’iframe");
check(!/clipboard-read/.test(php), "lecture générale du presse-papiers déclarée dans l’iframe");
check(/function normaliserDocumentImport/.test(html), "normalisation d’import absente");
check(/const id = uid\("e"\)/.test(html), "régénération des identifiants d’entité absente");
check(/IMPORT_MAX_BYTES\s*=\s*5\s*\*\s*1024\s*\*\s*1024/.test(html), "borne de 5 Mio absente");
check(/<link rel="canonical" href="https:\/\/fiscaliteinternationale\.fr\/schemas-fiscaux\/">/.test(html), "canonique de la page hôte absente");

const secretPatterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\bgh[pousr]_[A-Za-z0-9]{30,}\b/,
  /\bsk-[A-Za-z0-9_-]{20,}\b/
];
const releaseText = [html, php, wpReadme, citation].join("\n");
check(secretPatterns.every(pattern => !pattern.test(releaseText)), "motif de secret détecté");

if(errors.length){
  console.error(`ÉCHEC: ${errors.length} anomalie(s) sur ${checks} contrôles.`);
  for(const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`OK: ${checks} contrôles de préparation de publication.`);
