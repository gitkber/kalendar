export const Topic = {
    WELL_TO_BE: 'WELL_TO_BE',
    BUDGET: 'BUDGET',
    PROJECT: 'PROJECT',
    OTHER: 'OTHER',
}

export const CategoryWellToBe = {
    HOME: 'HOME',
    HEALTH: 'HEALTH',
    FAMILY: 'FAMILY'
}

export const CategoryBudget = {
    HOME: 'HOME',
    CAR: 'CAR',
    FOOD: 'FOOD',
    HEALTH: 'HEALTH',
}

/* BUDGET
BUDGET          MIN         [HOME - CAR - FOOD - HEALTH - ELSA (contact) -  K    (contact) ]
BUDGET          PLUS        [WORK - ALLOC]

-TAG_TOPIC   -TAG_CASE_TYPE  -tagType          -description        -kalendarDate       -amount     -contactID  -deadline

BUDGET          MIN         HEALTH              dentiste            15/12/2017           62.5
BUDGET          MIN         HOME                pret hypothecaire   15/12/2017          622.5
BUDGET          MIN         HOME                luminus             15/12/2017          200.5
BUDGET          MIN         CAR                 essence             15/12/2017           20.5
BUDGET          MIN         VARIOUS             base                25/12/2017           20
BUDGET          MIN         FOOD                carrefour           15/12/2017           10.5
BUDGET          MIN         FOOD                quick               15/12/2017           22.5
BUDGET          TO_BUY      CLOTHES             pull                                                elsa
BUDGET          MIN         CLOTHES             gants               15/12/2017           22.5       elsa
BUDGET          MIN         CLOTHES             divers              15/12/2017           22.5       elsa
BUDGET          PLUS        WORK                salaire             01/01/2017          500
BUDGET          PLUS        ALLOC               famifed             01/01/2017          500
WELL_TO_BE      TO_BUY      CLOTHES             pull
WELL_TO_BE      MIN         CLOTHES             pantalon            15/12/2017           22.5
WELL_TO_BE      TO_BUY      HOME                armoire à chaussure
 */

/* OBJECTIVE
WELL_TO_BE      OBJECTIVE   HEALTH              arreter de fumer
WELL_TO_BE      OBJECTIVE   FAMILY              nourriture saine (Family)

??? ->
OTHER           OBJ_ONE_DAY FAMILY              tel Véro
OTHER           OBJECTIVE   FAMILY              organiser annif elsa
OTHER           THOUGHT_OF_DAY                  au bonheur d'elsa
??? <-
*/
/*
    TAG_PROJECT
        - KsLIFE
    TAG_PROJECT_UC
        - UC VIEWS
        - UC CONTACT            - Contact
        - UC CONTACT HOLIDAY    - ContactHoliday
        - UC PUBLIC HOLIDAY     - PublicHoliday
        - UC IMAGE              - Image
        - UC MEMO               - Refactor to UC Event
        - UC TODOs              - CatchAll
        - UC OBJECTIVE          - CatchAll
        - UC BUDGET             - CatchAll or Budget ?
        - UC EVENT              - CatchAll
        - UC PROJECT            - CatchAll
     TAG_PROJECT_UC_VIEW
        - HOME_VIEW
        - MONTH_VIEW
        - YEAR_VIEW
        - ALBUM_VIEW
        - ...
     TAG_PROJECT_STATUS
        - NOT_STARTED
        - IN_PROGRESS
        - COMPLETED
        - NICE_TO_HAVE

-TAG_CASE   -TAG_CASE_TYPE  - TAG_PROJECT   -...

TODOs       PROJECT         KsLIFE          ...

... -TAG_PROJECT_UC     -TAG_PROJECT_UC_VIEW -description   -TAG_PROJECT_STATUS

... UC VIEWS            yearView            layout              in progress
... UC VIEWS            monthView           layout              in progress
... UC VIEWS            homeView            layout              in progress
... UC VIEWS            homeView            layout carousel     in progress
... UC VIEWS            homeView            layout postit       in progress
... UC OBJECTIVE        homeView            postit              not started
... UC TODOs            homeView            postit              not started
... UC CONTACT          homeView            postit              not started
... UC CONTACT          homeView            carousel            completed
... UC CONT HOL         homeView            carousel            completed
... UC MEMO             homeView            carousel            completed
... UC PUBL HOL         homeView            carousel            completed
... UC IMAGE            homeView            polaroid by week    completed
... UC IMAGE            albumView           carousel            nice to have
... UC CONTACT          contactView         review layout       not started
... UC CONTACT          contactView         family tree         nice to have
... UC CONTACT          contactView         manage address      nice to have
... UC CONTACT          contactView         avatar              nice to have
... UC TODOs            todosView           layout              not started
... UC OBJECTIVE        objView             layout              not started
... UC BUDGET           budgetView          layout              nice to have

*/
/* SAMPLES ROW
-TAG_CASE       -TAG_CASE_TYPE    -description              -deadline

OBJECTIVE       HEALTH            WELL_TO_BE

WELL_TO_BE      CITATION          Le  changement est une porte que ne s'ouvre que de l'intérieur. (Tom Peters)
                                  Je suis la seule personne responsable de ma vie et de mon bonheur.
WELL_TO_BE      TO_BUY            charms en forme de lotus blanc / jaune / vert / bleu / violet / noir
WELL_TO_BE      Mission           Bien chez soi. Opération 'blanc' : Ménage in/out : intérieur et exterieur
                                  (jeter ce qui est inutile)... 15 à 30 minutes par jour

VARIOUS         THOUGHT_OF_DAY    au bonheur d'elsa

BUDGET          TO_BUY            armoire à chaussures
BUDGET          TO_BUY            pull elsa

OBJECTIVE       ADMINISTRATION    trier photos
OBJECTIVE       ADMINISTRATION    trier papier

OBJECTIVE       HEALTH            ww (57)
OBJECTIVE       HEALTH            bien se nourrir
OBJECTIVE       HEALTH            faire du sport
OBJECTIVE       HEALTH            arreter de fumer

TODOs           ADMINISTRATION    relever courrier          05/11/2017
TODOs           HEALTH            dentiste
TODOs           HEALTH            checkup
TODOs           FAMILY            organiser annif elsa      01/03/2018
*/
/* ??? WORKFLOW ???
                                                    deadline        kalendarDate        amount
(1) TODOs       HEALTH      prendre rdv dentiste    30/11/2017
(2) TODOs       HEALTH      prendre rdv dentiste    31/12/2017
(3) TODOCLOSE   HEALTH      prendre rdv dentiste

(4) TODODONE    HEALTH      prendre rdv dentiste    30/11/2017      29/11/2017
(4) EVENT       HEALTH      dentiste (15h10)                        15/12/2017

(5) BUDGET      MIN HEALTH  dentiste                                15/12/2017          62.5

(1) deadline isNowOrPast ?
    NO -> do nothing
    YES -> TODOs DONE ?
            NO -> Fill new deadline (2) or CLOSE TODOs (3)
            YES -> Remove deadline
                -> Fill kalendarDate (to display in kalendar)
                -> Fill amount (if necessary)

 */
