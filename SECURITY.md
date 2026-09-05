# Politique de sécurité

## Version suivie

La branche de publication préparée correspond à la version 1.2.6.

## Signaler une vulnérabilité

Ne pas joindre de schéma réel, de donnée fiscale confidentielle ni de secret d’accès. Décrire le problème, la version, le navigateur ou l’environnement WordPress, les étapes minimales de reproduction et l’impact observé au moyen du canal de contact de <https://fiscaliteinternationale.fr/>.

Une reproduction synthétique est préférable. Merci de laisser un délai raisonnable d’analyse et de correction avant toute divulgation publique.

## Modèle de sécurité

- aucun service distant n’est requis par l’application autonome ;
- l’import JSON est borné et reconstruit champ par champ avant rendu ;
- la CSP embarquée interdit les connexions réseau ;
- le stockage local n’est activé qu’après consentement explicite ;
- l’iframe WordPress de même origine n’est pas une frontière de sécurité forte.

Pour les dossiers particulièrement sensibles, utiliser une origine dédiée sans cookie WordPress et les en-têtes décrits dans `wordpress-plugin/schema-fiscal-outil/SECURITE-ET-DEPLOIEMENT.md`.
