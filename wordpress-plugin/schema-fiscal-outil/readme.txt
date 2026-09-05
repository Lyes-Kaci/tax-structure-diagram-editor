=== Outil de schéma fiscal ===
Contributors: lyeskaci
Tags: fiscalité, schéma, structure, détention, flux
Requires at least: 6.0
Requires PHP: 7.4
Stable tag: 1.2.6
License: All rights reserved

Intègre l’outil autonome de schémas de structure juridiques et fiscaux dans une page WordPress.

== Installation ==

1. Téléverser et activer l’extension.
2. Insérer le code court [outil_schema_fiscal] dans une page.
3. Utiliser de préférence un modèle de page pleine largeur.

== Confidentialité ==

Aucune donnée n’est envoyée à un serveur et rien n’est enregistré dans WordPress. La conservation dans le navigateur exige l’accord exprès de l’utilisateur.

== Changelog ==

= 1.2.6 =

* Normalise strictement les schémas JSON avant leur rendu et régénère tous leurs identifiants.
* Borne la taille des fichiers, le nombre d’éléments et la longueur des champs importés.
* Ajoute une politique de sécurité du contenu sans accès réseau.
* Complète le clavier, les libellés accessibles et la réduction des animations.
* Avertit avant la fermeture d’un travail modifié mais non enregistré.
* Corrige l’annulation après chargement d’un modèle et la numérotation des modèles.
* Charge les styles WordPress seulement sur une page qui emploie le code court.
* Supprime le débordement horizontal du conteneur et restreint le presse-papiers à l’écriture.

= 1.2.5 =

* Supprime tout tiret cadratin du document technique et des exemples visibles.
* Préserve la reconnaissance d'un tiret cadratin éventuellement présent dans un texte importé sans l'inscrire littéralement dans le code livré.
* Ne modifie aucune règle de dessin, de calcul, d'import ou d'export.

= 1.2.4 =

* Ouvre en français tout nouveau schéma lancé depuis la page WordPress française.
* Préserve la langue d'un dossier local déjà enregistré avec le consentement de l'utilisateur.
* Ajoute noindex et une canonique à l'application technique embarquée ; la page hôte demeure la ressource indexable.

= 1.2.3 =

* Remplace les panneaux mobiles par un comportement hors-canvas fiable, y compris sur les écrans tactiles larges.
* Ajoute une fermeture tactile fixe, par le fond, par Échap et par geste latéral.
* Réorganise la navigation mobile et rend les modèles lisibles en une colonne dans une fenêtre adaptée au téléphone.

= 1.2.2 =

* Corrige la fermeture des panneaux latéraux sur mobile.
* Ajoute des commandes tactiles de fermeture toujours visibles, un fond refermable et des états ARIA synchronisés.

= 1.2.1 =
* Correction de la saisie dans l'inspecteur droit : le focus et le curseur restent stables pendant la modification d'une quotité, d'un montant ou d'un libellé.

= 1.2.0 =
* Intégration de la version graphique v1.2.
* Isolation complète vis-à-vis du thème WordPress.
* Mise en page pleine largeur et hauteur dynamique.
* Compatibilité avec le presse-papiers et les téléchargements.
