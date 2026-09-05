# Outil de schéma fiscal : extension WordPress 1.2.6

Cette extension intègre la version graphique autonome v1.2.6 de l’outil de schémas de structure juridiques et fiscaux. Elle conserve les principes fonctionnels et éditoriaux de la version 1.2.5 : outil public autonome, traitement local, aucun moteur d’IA, aucune conclusion juridique, et distinction entre détentions, flux financiers et flux non financiers.

La version 1.2.6 est une version de durcissement et de fiabilité. Elle reconstruit les fichiers JSON importés dans un modèle interne neuf, régénère leurs identifiants, borne leur taille et leurs champs, ajoute une politique de sécurité du contenu, complète le clavier et les libellés accessibles, prévient la fermeture d’un travail non enregistré, corrige la numérotation des modèles, ajoute l’annulation après chargement d’un modèle et limite les styles WordPress aux pages qui utilisent le code court.

La version 1.2.4 a ajouté `lang=fr` à l'URL de l'iframe. Un nouveau schéma ouvert depuis la page française démarre donc en français. Une langue déjà enregistrée avec le consentement de l'utilisateur dans un dossier local reste prioritaire et n'est pas écrasée. L'application autonome conserve la détection de la langue du navigateur lorsqu'aucun paramètre n'est fourni.

Le document technique embarqué contient aussi `noindex, follow` et une canonique vers la page hôte `/schemas-fiscaux/`, afin qu'il ne concurrence pas cette dernière.

## Installation

1. Dans WordPress, ouvrir **Extensions > Ajouter une extension > Téléverser une extension**.
2. Sélectionner l’archive `schema-fiscal-outil-wordpress-v1.2.6.zip`, puis activer l’extension.
3. Créer ou modifier la page destinée à l’outil.
4. Ajouter le code court suivant dans un bloc **Code court** :

   `[outil_schema_fiscal]`

L’alias `[schema_fiscal]` est également accepté. Un titre d’iframe personnalisé peut être fourni pour l’accessibilité :

`[outil_schema_fiscal titre="Schéma de la structure"]`

## Intégration WordPress

- L’application est isolée visuellement dans une iframe : les styles du thème, de Gutenberg ou d’un constructeur de pages ne modifient pas son interface.
- Le conteneur occupe la largeur mise à disposition par le modèle de page, sans provoquer de débordement horizontal.
- La hauteur repose sur `100dvh` (avec repli `100svh` sur mobile) et tient compte de la barre d’administration WordPress, sans imposer une hauteur minimale supérieure à celle du téléphone.
- L’écriture dans le presse-papiers et les téléchargements restent disponibles dans l’iframe ; la lecture générale du presse-papiers n’est pas autorisée.
- L’adresse de l’application est versionnée afin de limiter les problèmes de cache lors d’une mise à jour de l’extension.
- Aucun script ni style de l’application n’est injecté dans la page WordPress elle-même.

Pour une intégration parfaitement bord à bord, choisir si possible le modèle de page **Pleine largeur** ou **Sans en-tête**, mais l’extension fonctionne aussi avec un modèle de page ordinaire.

## Confidentialité et fonctionnement

L’application ne transmet aucune donnée et ne fait aucun appel réseau. Elle ne sauvegarde rien dans WordPress. La conservation locale n’est activée que si l’utilisateur coche explicitement **Conserver dans ce navigateur**. Tant qu’un schéma modifié n’est ni enregistré en JSON ni conservé localement, une confirmation est demandée avant de fermer la page.

L’iframe est servie depuis le même domaine WordPress : son stockage local appartient donc à cette origine. Pour une séparation de sécurité plus forte entre l’outil et les autres scripts du site, le déploiement recommandé consiste à servir l’application autonome depuis une origine dédiée. Voir `SECURITE-ET-DEPLOIEMENT.md`.

Les dossiers peuvent être enregistrés et rouverts sous forme de fichiers JSON locaux. Les exports PNG, SVG et PDF restent produits dans le navigateur.

## Contenu

- `schema-fiscal-outil.php` : extension et codes courts WordPress ;
- `app/index.html` : application autonome v1.2.6, non minifiée ;
- `index.php` : protection de l’index du répertoire ;
- `FORMAT-SCHEMA-v2.schema.json` : contrat documenté du format JSON ;
- `SECURITE-ET-DEPLOIEMENT.md` : modèle de sécurité et recommandation d’hébergement ;
- `tests/static-regression.mjs` : contrôles reproductibles sans dépendance ;
- `VALIDATION-v1.2.6.md` : périmètre et résultats de validation.
