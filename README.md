# Éditeur de schémas fiscaux / Tax Structure Diagram Editor

Éditeur visuel autonome pour représenter des structures juridiques et fiscales dans le navigateur. La version 1.2.6 permet de dessiner des entités, des détentions, des flux financiers et des flux non financiers, puis d’en produire une image, un PDF vectoriel, une description en prose ou un dossier JSON réutilisable.

**Démonstration publique :** <https://fiscaliteinternationale.fr/schemas-fiscaux/>

> L’outil représente des faits et des hypothèses. Il n’embarque ni moteur d’intelligence artificielle, ni règle fiscale, ni conclusion juridique automatisée. Il ne remplace pas une consultation professionnelle.

## Points clés

- traitement intégral dans le navigateur, sans appel réseau nécessaire ;
- conservation locale uniquement après consentement explicite ;
- import et export de dossiers JSON versionnés ;
- exports PNG, SVG via le presse-papiers et PDF vectoriel ;
- interface en français, anglais et espagnol ;
- application autonome, avec adaptateur WordPress facultatif ;
- code source non minifié et contrôles reproductibles sans dépendance npm.

## Essai local

Ouvrir `wordpress-plugin/schema-fiscal-outil/app/index.html` dans un navigateur récent. Certaines fonctions du presse-papiers exigent un contexte sécurisé ; pour les tester, servir le dépôt depuis un serveur HTTPS ou une adresse locale approuvée par le navigateur.

## Installation WordPress

1. Compresser le dossier `wordpress-plugin/schema-fiscal-outil`.
2. Dans WordPress, ouvrir **Extensions > Ajouter une extension > Téléverser une extension**.
3. Activer l’extension.
4. Ajouter le code court `[outil_schema_fiscal]` ou `[schema_fiscal]` à une page.

Un titre d’iframe personnalisé peut être fourni :

```text
[outil_schema_fiscal titre="Schéma de la structure"]
```

Le détail de l’installation et du format de fichier figure dans le dossier de l’extension.

## Vérification

Node.js 20 ou une version ultérieure est recommandé.

```sh
npm test
```

La commande vérifie les empreintes du paquet source, la syntaxe des scripts embarqués, la cohérence de la CSP, l’absence de primitive réseau, le contrat JSON et l’alignement des numéros de version. Le contrôle PHP est exécuté séparément dans l’intégration continue.

## Confidentialité et frontière de sécurité

L’application ne transmet pas le contenu d’un schéma et n’enregistre rien dans WordPress. Dans l’adaptateur standard, l’iframe et WordPress partagent toutefois la même origine : cette iframe isole la présentation, pas le stockage contre un autre script déjà autorisé sur le domaine. Pour un usage professionnel hautement confidentiel, servir l’application autonome sur une origine dédiée, sans cookie WordPress, et appliquer les en-têtes décrits dans `wordpress-plugin/schema-fiscal-outil/SECURITE-ET-DEPLOIEMENT.md`.

## Périmètre du dépôt

Le dossier `wordpress-plugin/schema-fiscal-outil` reproduit sans modification le paquet source v1.2.6 audité pour cette préparation. La page publique utilise en plus une intégration éditoriale et une feuille de style propres au site ; elles ne font pas partie de ce dépôt. Voir [`docs/PRODUCTION-EQUIVALENCE.md`](docs/PRODUCTION-EQUIVALENCE.md).

## Citation

Les métadonnées de citation sont fournies dans [`CITATION.cff`](CITATION.cff). Aucun DOI Zenodo n’est associé à cette version.

## Droits

Copyright © 2026 Lyès Kaci. Tous droits réservés. La présence du code dans ce paquet ne constitue pas l’octroi d’une licence open source. Voir [`LICENSE`](LICENSE).

---

**English summary.** Browser-based editor for legal and tax structure diagrams. It runs locally, makes no network request, reaches no automated legal conclusion, and exports reusable JSON, PNG/SVG imagery and vector PDF. The WordPress adapter is optional. Source inspection does not grant an open-source licence; see `LICENSE`.
