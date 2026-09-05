# Liste de contrôle avant publication

## Décisions du titulaire

- [x] confirmer le nom public du dépôt ;
- [x] conserver « tous droits réservés » ;
- [x] autoriser la création du dépôt et la première publication ;
- [x] différer tout archivage Zenodo.

## Contrôles techniques

- [x] archive source v1.2.6 et sommes de contrôle vérifiées ;
- [x] application autonome comparée à la production ;
- [x] tests statiques et contrôles d’intégrité exécutés ;
- [x] essai fonctionnel public avec données synthétiques ;
- [x] import hostile synthétique neutralisé ;
- [ ] lint PHP rejoué par l’intégration continue ou sur un poste disposant de PHP 7.4+ ;
- [ ] installation testée dans une préproduction WordPress représentative avant toute mise à jour du site.

## GitHub et Zenodo

- [x] renseigner l’URL définitive dans `CITATION.cff` ;
- [x] créer un dépôt sans import d’historique confidentiel ;
- [ ] laisser les contrôles GitHub Actions réussir ;
- [ ] créer le tag signé `v1.2.6` ;
- [ ] connecter le dépôt à Zenodo si un DOI est souhaité ;
- [ ] créer la release GitHub depuis le tag ;
- [ ] ajouter le DOI obtenu aux métadonnées et à la documentation lors de la version suivante.
