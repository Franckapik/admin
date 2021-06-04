-- version 5 ---
alt shift o : effracer les dep non utilisées
ctrl+l : join line
ctrl+shift+i : indent lines
windows+shit+f : format document

exemple de vérification de données avant affichage :   
{response && response.length && response.length > 0 ?


Charte graphique à remettre en place
https://github.com/Franckapik/quadratik-charter


* Dans le dashboard, recuperer des données de gg analytics ?
* Info générale => Profil utilisateur. (Pourrait être utile pour les clients dans la v6) Ambitieux
* Mes clients => Tableau avec les différents services associés. facture, devis, contact, livraison, expedition...
S'assurer du bon chargement des données et vérifier les erreurs possibles suite à des défauts d'enregistrement.
* Mailing . Edition de mails
* Devis/facturation => Possibilité de reprendre un client dans la liste pour auto-completer ou bien faire une nouvelle facture qui ne sera associé à aucun client mais visible dans les clients ? Oui, juste un badge pour différencier client web ou client hors-web.
* Mes produits => Sépération peut-etre necessaire entre le calcul d'un prix avec marges etc et les caractéristiques économiques d'un produit ? Non je ne pense pas. le fichier excel peut-etre adopté de plusieurs manières différentes mais doit garder une bonne liberté.
* Template CSS => charte graphique en réutilisant tous les components proposés par Argon dans la doc.

1- Revoir la bd selon les besoins et mettre en lien avec les fichiers excel de calculs de prix.
2- Trouver de nouvelles relations entre les tables avec les factures, mails, livraisons, etc...
3- Mettre en place les clefs et les nouvelles infos dans les tables.
4- Afficher le maxmimum de données sur l'admin avec les fausses informations.


Les dernières reflexions sur l'ancien site internet :
---------

Tout recentrer autours du quadralab.
Si design retravaillé : 
- avant tout avoir un seul dossier pour le design, sur le disque dur commun (réorganiser)
- produit au coeur de la visite
- différencier les collections
- rendre moin classique le site
- preferer un design simple, epuré avec de l'espace vide.
- retourner vers l'artisanat, le une seule personne, le local  le eco friendly 
- tout miser sur l'illustration et la 3D
- jouer sur les cadres et les ombres.
- definir un concept global
- présence des formes primitives en lien avec le diffuseur
- partir du mobile 
- quelques mots clefs en grands
- faire aparaitre la marque avec son nom et son logo reduit (ex : vicoustic) monogrammes
- reflechir sur une police peut-etre plus typée 
- faire professionel vs blog
- animation légères
- le site manque clairement d'unité depuis le début. Quadralab/boutique/Guide
- La vue isometrique du site internet de base est cohérente également.
- les nouvelles collections n'ont jamais été renouvelées.
- le contenu texte est directement pioché sur la base de donnée s'il doit être traduit/modifié.

Tous les élements de la charte graphique sont listés ici : https://github.com/viki53/Graphic-Charter

Les rubriques très simples sur le coté : https://creativedreams.design/#work

Un site équilibré : https://www.topologyeyewear.com/

Savoir pourquoi un style me lasse rapidement ? Ou du moin ne me satisfait pas sur le long terme .
Trouve le moyen de charger des informations/illustration assez rapidement. (deplacement de fichier dans un dossier ou bien admin)

Avant tout, retravailler le css de nouveau pour les hauteurs de pages.
et le guide selon Projet Home STduio

Présentation du produit améliorée avec graphique , le tout dans une boite modale 


devis/facturation dans l'admin à changer (erreur)
devis personnalisé ? -> pas visible dans le panier !?
devis create 0 dans les options de l'admin avec une liste des devis et factures ? Redondant?

inspiration sur https://www.panasorb.eu/lng/fr/isolation-phonique/isolation-phonique-par-lester/isolation-phonique-par-lester-100x200x10cm-gris.html


devis avec une selection du Nom plutot que via l'id.

un dashboard a la place de info generale

automatisation du mail de commande recue ?

Retrouver les valeurs au niveau de la (section) boutique.

Chnager la section contacts pour quelque chose de plus ysmpa visuellement. Allez à l'essentiel.

cors : pour les rss, omit a la place de include pour les credentials, comprendre.

gerer les erreurs d'envoi de mail coté client (affichage du msg)

Résoudre le pb suivant : admin. La fonction admindata utilise les autres query mais sans sessid. Possible ?

Parametrer le webhook du paiement. => maj de la db.
form validation

Option avec un select possible a la commande pour les couleurs. Mofgication du prix en fonction.

covid-19 pas de relais enregistrable avec boxtal : suivisimple a retravailler plus tard


Quadralab et la boutique harmonisée pour importimport { MethodNotAllowed } from "http-errors"
 export de produits automatique

faire avec email template tous les autres mails.

Gestion de login pour les clients via les userid enregsitrés lors de la cmde.


ajouter skyline et diffuseur à peindre soi meme

Montrer bandeau reduction pour les packs.

refaire la section valeurs

montrer le systeme d'Accroche et montrer un vrai diffuseur

Regarder un force scroll si c'est interessant ou pas :/!?
https://projects.lukehaas.me/scrollify/#examples

Graphique de la composition de prix d'un produit.

Confirmation automatique de la commande.

Remettre la carte leaflet en choix de point relais pour le client

Internationalisation du site avec ajout de la locale en : tout un travail de récriture et chaque partie texte du site doit etre en json.
Travail lourd et peu indispensable pour le moment. A faire probablement plus tard.
pour react et un peu de clarté : https://react.i18next.com/latest/usetranslation-hook

in the link i sent with the useTranslations hook, `t` is the `_` equivalent
the `_` convention comes from GNU gettext


Remplacer le react easy state par du Contexte React ou un simple import/export webpack pour les fonctions ne necessitant pas d'actualisation.

resoudre le pb de child a du table
faire un instagram ?
lien pour devenir partenaire sur la section contact

Utiliser chokidar au lieu de nodemon ?
----------------------------------------

Création de devis avec une personne déjà enregsitrée . - > modification de commande . ajout d'une ligne devis dans la db => possibilité de génération de devis pdf. Quel intéret ? Meme parcours pour la modification d'un devis existant.


TRES BONNE PAGE sur les promises :
https://dzone.com/articles/common-promise-mistakes

Attention au path relative des images pour le router /:id

le bordereau du suivi est-il l'etiquette a imprimer et coller ? Oui.

nettoyer les console.log avec un regex : console\.log\(([^)]+)\);

l'api relais colis en javascript existe a partir d'une iframe au cas ou boxtal devient compliqué.

Ajouter un id auto implémenté : ALTER TABLE public.devis ADD COLUMN ID SERIAL PRIMARY KEY;


L'adresse redirect url est celle qui est appelée suite à la transaction quoi qu'il arrive.
Le webhook est un lien qui permet de recevoir le statut du paiement lorsqu'il change from mollie. Lorsque l'argent est arrivé, un statut est envoyé et permet d'engager ensuite la livraison, les mails , etc ...


const useObjectState = (initial) => {
  const [state, setState]  = React.useState(initial);

  const changeDif = React.useCallback((update) => {
    setState(previous => ({
      ...previous,
      ...typeof update === 'function' ? update(previous) : update
    }));
  }, []);

  return [state, changeDif];
}

https://icetutor.com/question/push-method-in-react-hooks-usestate/
