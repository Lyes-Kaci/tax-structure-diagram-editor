# Équivalence avec la production

Date du contrôle : 2026-09-05.

## Établi

La page publique charge l’application v1.2.6 à l’adresse suivante :

`https://fiscaliteinternationale.fr/wp-content/plugins/schema-fiscal-outil/app/index.html?lang=fr&ver=1.2.6`

La comparaison a établi l’égalité exacte entre l’application publique et `wordpress-plugin/schema-fiscal-outil/app/index.html` pour :

- les 16 blocs JavaScript embarqués, comparés individuellement par SHA-256 ;
- la feuille de style principale embarquée ;
- la politique CSP embarquée.

Les contrôles fonctionnels publics ont aussi couvert la création de deux entités, d’une détention et d’un flux financier, la génération de prose, le rejet d’un format JSON non pris en charge et la neutralisation d’un import hostile synthétique.

## Non établi

L’identité octet par octet du fichier PHP installé en production n’a pas été établie. Les attributs observables de l’iframe et son URL correspondent au comportement de l’adaptateur fourni, mais le site ajoute une feuille de style éditoriale propre à sa page. Cette règle de présentation n’est pas incluse ici.

Le dépôt doit donc être présenté comme la source fidèle de l’application autonome v1.2.6 accompagnée d’un adaptateur WordPress générique, et non comme une copie complète de toute la pile du site.
