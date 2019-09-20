import r, {RequestPromise} from 'request-promise-native';
import Collegue from './Collegue';

const rp = r.defaults({
    jar: true
});

const URL: String = "https://jbmerand-collegues-api.herokuapp.com";

interface RetourPostCreerCollegue {
    statusCode: number;
    body: string;
}

/**
 * Classe de service de l'application.
 */
export default class Service {

    /**
     * Méthode permettant de s'authentifier via une requête POST.
     * @param identifiant : string, identifiant du collègue
     * @param mdp : string, mot de passe du collègue
     */
    postAuthenticateReq(identifiant: string, mdp: string): RequestPromise {
        return rp(`${URL}/auth`,
            {
                method: 'POST',
                json: true,
                body: {
                    "identifiant": identifiant,
                    "motDePasse": mdp
                },
                resolveWithFullResponse: true
            }
        )
    }

    /**
     * Méthode permettant de créer un collègue via une requête POST.
     * @param collegue : Collegue, objet contenant les informations du collègue à ajouter
     */
    postCreerCollegueReq(collegue: Collegue): Promise<string> {
        let strCollegue = JSON.stringify(collegue);
        console.log("collegue à créer = " + strCollegue);
        return rp(`${URL}/collegues`,
            {
                method: 'POST',
                json: true,
                body: {
                    "nom": collegue.nom,
                    "prenoms": collegue.prenoms,
                    "email": collegue.email,
                    "dateDeNaissance": collegue.dateDeNaissance,
                    "photoUrl": collegue.photoUrl,
                    "identifiant": collegue.identifiant,
                    "motDePasse": collegue.motDePasse,
                    "role": collegue.role
                },
                resolveWithFullResponse: true
            }
        )
            .then((response: RetourPostCreerCollegue) => {
                    if (response.statusCode !== 201) {
                        return Promise.reject(() => `${response.statusCode} : échec de création du collègue.`)
                    } else {
                        return response.body;
                    }
                }
            )
    }

    /**
     * Méthode permettant de modifier l'email du collègue dont le matricule est spécifié via une requête PATCH.
     * @param matricule : string, matricule du collègue
     * @param email : string, nouvel email à sauvegarder
     */
    patchModifierEmailCollegueReq(matricule: string, email: string): RequestPromise<Response> {
        return rp(`${URL}/collegues/${matricule}`,
            {
                method: 'PATCH',
                json: true,
                body: {
                    "email": email
                }
            }
        )
    }

    /**
     * Méthode permettant de modifier l'url de la photo du collègue dont la matricule est spécifié, via une requête
     * PATCH.
     * @param matricule : string, matricule du collègue
     * @param photoUrl : string, le nouvel url pour la photo
     */
    patchModifierPhotoUrlCollegueReq(matricule: string, photoUrl: string): RequestPromise<Response> {
        return rp(`${URL}/collegues/${matricule}`,
            {
                method: 'PATCH',
                json: true,
                body: {
                    "photoUrl": photoUrl
                }
            }
        )
    }

    /**
     * Reuquête permettant de récupérer une promesse de toutes les informations à propos des collègues dont le nom
     * est spécifié, via une requête GET.
     * @param nom : string, nom du collègue
     */
    getToutesInfosColleguesAPartirNom(nom: string): Promise<any> {
        return rp(`${URL}/collegues?nom=${nom}`,
            {
                json: true
            }
        )
            .then(tabMatricule => tabMatricule.map(
                (matricule: string) => rp(`${URL}/collegues/${matricule}`, {
                        json: true
                    }
                )
            ))
            .then(tabDonnees$ => Promise.all(tabDonnees$));
    }
}