# Validation de production v1.2.6

Statut : `CANDIDATE_READY_FOR_INDEPENDENT_REAUDIT`

Parent exact : `schema-fiscal-outil-wordpress-v1.2.5.zip`

SHA-256 du parent : `9508a8926c86a946fbf5110dc19da3554472037aeac9fc0b3a7ab96bd5b518e7`

## Principes préservés

- application publique autonome intégrée à WordPress ;
- calcul et fichiers entièrement locaux, sans IA ni service distant ;
- aucune conclusion fiscale ou juridique automatisée ;
- un document unique, avec détentions, flux financiers et flux non financiers séparés ;
- conservation locale uniquement sur consentement explicite.

## Corrections vérifiées par le producteur

- frontière d’import JSON : validation, quotas, copie champ par champ et nouveaux identifiants ;
- CSP synchronisée avec tous les scripts embarqués, accès réseau interdit ;
- fichiers limités à 5 Mio et documents limités à 2 500 éléments ;
- restauration des entités, liens, séparateurs, options et branches repliées ;
- fermeture protégée lorsqu’un travail modifié n’est pas enregistré ;
- sélection au clavier des entités et liens, focus visible, libellés de commandes ;
- tous les boutons ont un type explicite et les dialogues sont correctement nommés ;
- annulation disponible après chargement d’un modèle ou suppression depuis une liste ;
- numérotation des modèles fondée sur leur position réelle ;
- styles WordPress chargés uniquement lors du rendu du code court ;
- conteneur sans débordement horizontal et permission presse-papiers limitée à l’écriture.

## Commande reproductible

```sh
node tests/static-regression.mjs
sha256sum -c SHA256SUMS.txt
```

## Limites et revalidation

Le producteur ne transforme pas cette vérification en homologation indépendante. Tester l’archive dans une préproduction WordPress représentative, avec le thème et les extensions du site, puis rejouer un audit indépendant avant mise en ligne. La séparation forte du stockage local exige une origine dédiée ; elle dépend du déploiement et reste documentée dans `SECURITE-ET-DEPLOIEMENT.md`.
