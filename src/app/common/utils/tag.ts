export const TagCase = {
    OBJECTIVE: 'OBJECTIVE',     // (eye)           - [ADMINISTRATION - HEALTH - FAMILY - PROJECT]
    TODO: 'TODOs',              // (square)        - [ADMINISTRATION - HEALTH - FAMILY - PROJECT]
    BUDGET: 'BUDGET',           // (money)         - [TO_BUY]
    VARIOUS: 'VARIOUS'          // (commenting)    - [THOUGHT_OF_DAY]
}

export const TagCaseType = {
    ADMINISTRATION: 'ADMINISTRATION',
    HEALTH: 'HEALTH',
    FAMILY: 'FAMILY',
    PROJECT: 'PROJECT',
    THOUGHT_OF_DAY: 'THOUGHT_OF_DAY',
    TO_BUY: 'TO_BUY',
    MIN: 'MIN',
    PLUS: 'PLUS'
}

export const TagBudgetType = {
    HOME: 'HOME',
    CLOTHES: 'CLOTHES',
    FOOD: 'FOOD',
    HEALTH: 'HEALTH',
    WORK: 'WORK'
}

/* SAMPLES ROW
-TAG_CASE       -TAG_CASE_TYPE    -description              -deadline

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
