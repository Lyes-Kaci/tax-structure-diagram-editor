# Sécurité et déploiement

## Garanties de l’application

- Aucun appel réseau n’est nécessaire au fonctionnement de `app/index.html`.
- La politique CSP intégrée interdit par défaut les connexions, objets, formulaires, médias et scripts non autorisés.
- Un JSON externe n’est jamais appliqué directement. Il est validé, borné, copié champ par champ et reçoit de nouveaux identifiants internes avant tout rendu.
- Les fichiers sont limités à 5 Mio et les documents à 2 500 éléments.
- La conservation dans `localStorage` reste soumise au consentement explicite.

## Frontière d’origine

Dans l’extension standard, l’application et WordPress partagent la même origine. L’iframe protège l’interface contre les styles du thème, mais ne constitue pas une frontière d’origine contre un autre script déjà autorisé sur ce même domaine. Un script compromis exécuté sur l’origine WordPress pourrait donc viser le stockage local de cette origine.

Pour les déploiements exigeant une séparation forte, servir le contenu de `app/` sur une origine dédiée, sans cookie WordPress, avec HTTPS et les en-têtes suivants :

```text
Content-Security-Policy: reprendre exactement la politique générée dans app/index.html
Referrer-Policy: no-referrer
X-Content-Type-Options: nosniff
Permissions-Policy: clipboard-read=(), camera=(), microphone=(), geolocation=()
Cross-Origin-Resource-Policy: same-site
```

L’URL de l’iframe doit alors être adaptée explicitement dans `schema-fiscal-outil.php`. Cette variante d’infrastructure n’est pas activée silencieusement par l’extension, afin de préserver l’installation WordPress autonome.

## Contrôle avant publication

Exécuter depuis la racine du plugin :

```sh
node tests/static-regression.mjs
sha256sum -c SHA256SUMS.txt
```

Une validation indépendante sur l’environnement de préproduction reste requise après toute modification de code, de CSP ou d’en-têtes HTTP.
