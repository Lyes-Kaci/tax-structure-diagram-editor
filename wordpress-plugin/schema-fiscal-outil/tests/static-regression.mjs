import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import vm from "node:vm";
import {fileURLToPath} from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = fs.readFileSync(path.join(root, "app/index.html"), "utf8");
const php = fs.readFileSync(path.join(root, "schema-fiscal-outil.php"), "utf8");
const errors = [];
const check = (ok, message) => { if(!ok) errors.push(message); };

check(/Version:\s+1\.2\.6/.test(php), "version PHP différente de 1.2.6");
check(/private const VERSION = '1\.2\.6'/.test(php), "constante PHP différente de 1.2.6");
check(/v1\.2\.6/.test(html), "version visible différente de 1.2.6");
check(!/clipboard-read/.test(php), "permission clipboard-read encore présente");
check(/allow="clipboard-write"/.test(php), "permission clipboard-write absente");
check(/function normaliserDocumentImport/.test(html) && /const id = uid\("e"\)/.test(html), "normalisation ou régénération des identifiants absente");
check(/IMPORT_MAX_BYTES\s*=\s*5\s*\*\s*1024\s*\*\s*1024/.test(html), "borne de fichier absente");
check(/beforeunload/.test(html) && /if\(!DIRTY\s*\|\|\s*CONSERVE\)\s*return/.test(html), "avertissement de travail non enregistré absent");
check(!/(?:fetch\s*\(|XMLHttpRequest|WebSocket\s*\(|EventSource\s*\()/i.test(html), "primitive réseau détectée");

const inlineHandlers = [...html.matchAll(/\s(on[a-z]+)\s*=\s*["']/gi)].map(m=>m[1]);
check(inlineHandlers.length===0, `gestionnaires HTML inline: ${inlineHandlers.join(", ")}`);
const buttons = [...html.matchAll(/<button\b[^>]*>/gi)].map(m=>m[0]);
check(buttons.every(b=>/\btype\s*=/.test(b)), "bouton sans attribut type");
const markupOnly = html.replace(/<script(?:\s[^>]*)?>[\s\S]*?<\/script>/gi, "");
const ids = [...markupOnly.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
check(new Set(ids).size===ids.length, "identifiants HTML statiques en double");

const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(m=>m[1]);
for(const [i, source] of scripts.entries()){
  try { new vm.Script(source, {filename:`inline-${i+1}.js`}); }
  catch(e){ errors.push(`syntaxe JavaScript ${i+1}: ${e.message}`); }
}
const csp = html.match(/<meta http-equiv="Content-Security-Policy" content="([^"]+)">/i)?.[1] || "";
const declared = new Set([...csp.matchAll(/'sha256-([^']+)'/g)].map(m=>m[1]));
const actual = scripts.map(source=>crypto.createHash("sha256").update(source).digest("base64"));
check(csp.includes("default-src 'none'"), "CSP default-src manquante");
check(csp.includes("connect-src 'none'"), "CSP connect-src manquante");
check(actual.every(hash=>declared.has(hash)) && declared.size===actual.length, "empreintes CSP désynchronisées");

if(errors.length){
  console.error(`ECHEC (${errors.length})`);
  for(const e of errors) console.error(`- ${e}`);
  process.exit(1);
}
console.log(`OK: ${scripts.length} scripts, ${buttons.length} boutons, CSP synchronisée, contrôles de sécurité présents.`);
