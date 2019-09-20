import Service from './Service';
import readline, {Interface} from 'readline';
import Collegue from './Collegue';

import { parse } from 'date-fns'

/**
 * Classe gérant la présentation de l'IHM.
 */
export default class Presentation {

    rl: Interface;
    service: Service;

    /**
     * Constructeur
     */
    constructor() {
        this.service = new Service();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    /**
     * Méthode pour obtenir une promesse de saisie de l'utilisateur.
     * @param question : string, question à poser avant la saisie de l'utilisateur
     */
    recupererSaisieUtilisateur(question: string): Promise<string> {
        return new Promise((res, rej) => {
            this.rl.question(question, saisie => {
                res(saisie);
                if (saisie.length === 0) {
                    rej(`Erreur : saisie vide.`);
                }
            })
        })
    }

    /**
     * Méthode pour démarrer la présentation de l'IHM.
     */
    start(): void {
        console.log(`** Administration Collègues **`);
        console.log(`** Authentification pour connexion à collegues-api **`);

        this.rl.question(`Quel est votre identifiant (u1) ? `, identifiant => {
            this.rl.question(`Quel est votre mot de passe (pass1) ? `, mdp => {
                this.service.postAuthenticateReq(identifiant, mdp)
                    .then(response => {
                        console.log(`${response.statusCode} : authentification réussie.`);
                        this.afficherMenu(this.rl);
                    })
                    .catch(err => {
                        console.log(`${err.statusCode} : échec de l'authentification. Aurevoir.`);
                        this.rl.close();
                    });
            })
        })
    }

    /**
     * Méthode affichant le menu de l'IHM
     * @param rl : Interface, interface de saisie
     */
    afficherMenu(rl: Interface): void {
        console.log(
            `1. Rechercher un collègue par nom
2. Créer un collègue
3. Modifier email d'un collègue
4. Modifier url de photo d'un collègue
99.Sortir`
        );
        rl.question(
            `Quel est votre choix ? `,
            (saisie: string) => {
                console.log(`Vous avez saisi : ${saisie}`);
                if (saisie && saisie === '1') {
                    this.rechercherCollegueParNom(rl);
                } else if (saisie && saisie === '2') {
                    this.creerCollegue(rl);
                } else if (saisie && saisie === '3') {
                    this.modifierEmailCollegue(rl);
                } else if (saisie && saisie === '4') {
                    this.modifierPhotoUrlCollegue(rl);
                } else if (saisie && saisie === '99') {
                    rl.close();
                    console.log('Aurevoir');
                } else {
                    console.log(`Choix invalide, merci de recommencer :`);
                    this.afficherMenu(rl);
                }
            }
        );
    }

    /**
     * Méthode d'affichage des informations des collègues dont le nom est entré dans la console.
     * @param rl : Interface, interface de saisie
     */
    rechercherCollegueParNom(rl: Interface): void {
        rl.question(
            `Quel est le nom du collègue que vous recherchez ? (durand) `,
            (nomCollegue: string) => {
                this.service.getToutesInfosColleguesAPartirNom(nomCollegue)
                    .then(body => {
                        console.log(body);
                        this.afficherMenu(rl);
                    })
                    .catch(err => {
                        console.log(`${err.statusCode} : erreur dans la recherche des collègues. `);
                        this.afficherMenu(rl);
                    })
            }
        )
    }

    /**
     * Méthode pour créer un collègue.
     * @param rl : Interface, interface de saisie
     */
    async creerCollegue(rl: Interface): Promise<void> {
        const nom = await this.recupererSaisieUtilisateur('Nom ? ');
        const prenoms = await this.recupererSaisieUtilisateur('Prénom(s) ? ');
        const email = await this.recupererSaisieUtilisateur('Email ? ');
        const dateDeNaissance = await this.recupererSaisieUtilisateur('Date de naissance ? (24/11/1983) ')
            .then((dateStr: string) => parse(dateStr, 'dd/MM/yyyy', new Date()));
        const photoUrl = await this.recupererSaisieUtilisateur('Url de sa photo ? (https://...) ');
        const identifiant = await this.recupererSaisieUtilisateur('Identifiant de connexion ? (> 6 carac) ');
        const motDePasse = await this.recupererSaisieUtilisateur('Mot de passe de connexion (opPO09$$lk) ? ');
        const role = await this.recupererSaisieUtilisateur('Rôle ? (USER) ');

        let collegue = new Collegue(nom, prenoms, email, dateDeNaissance, photoUrl,
            identifiant, motDePasse, role);
        this.service.postCreerCollegueReq(collegue)
            .then(body => {
                console.log(body);
                this.afficherMenu(rl);
            })
            .catch(err => {
                console.log(`${err} : échec de la création du collègue`);
                this.afficherMenu(rl);
            })
    }

    /**
     * Méthode pour modifier l'email d'un collègue.
     * @param rl : Interface, interface de saisie
     */
    modifierEmailCollegue(rl: Interface): void {
        console.log(">> Modifier email d'un collègue <<");
        rl.question('Matricule du collègue ? ', (matricule: string) => {
            rl.question('Nouvel email ? ', (email: string) => {
                this.service.patchModifierEmailCollegueReq(matricule, email)
                    .then(() => {
                        console.log(`OK : email modifié.`);
                        this.afficherMenu(rl);
                    })
                    .catch(err => {
                        console.log(`Erreur : email non modifié.\n${err}`);
                        this.afficherMenu(rl);
                    })
            })
        })
    }

    /**
     * Méthode pour modifier l'url d'un collègue.
     * @param rl : Interface, interface de saisie
     */
    modifierPhotoUrlCollegue(rl: Interface): void {
        console.log(">> Modifier url de la photo d'un collègue <<");
        rl.question('Matricule du collègue ? ', (matricule: string) => {
            rl.question('Nouvel url de la photo ? ', (photoUrl: string) => {
                this.service.patchModifierPhotoUrlCollegueReq(matricule, photoUrl)
                    .then(() => {
                        console.log(`OK : url de la photo modifiée.`);
                        this.afficherMenu(rl);
                    })
                    .catch(err => {
                        console.log(`Erreur : url non modifié.\n${err}`);
                        this.afficherMenu(rl);
                    })
            })
        })
    }
}

