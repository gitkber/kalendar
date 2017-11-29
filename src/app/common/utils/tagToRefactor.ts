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

/*
WELL_TO_BE      OBJECTIVE   HOME                rangement en profondeur
WELL_TO_BE      OBJ_BY_DAY  HOME/TODOs          rangement en surface 10 min par jour
WELL_TO_BE      OBJ_ONE_DAY HOME/TODOs          trier jouets
WELL_TO_BE      OBJ_ONE_DAY HOME/TODOs          trier/ranger dans les armoires

WELL_TO_BE      OBJECTIVE   HOME/ADMIN          trier papier
WELL_TO_BE      OBJ_BY_DAY  HOME/ADMIN/TODOs    trier papiers 15 min par jour
WELL_TO_BE      OBJ_WEEK    HOME/ADMIN/TODOs    relever courrier

WELL_TO_BE      OBJECTIVE   HOME/CONTACT        créer albums
WELL_TO_BE      OBJ_ONE_DAY HOME/CONTACT/TODOs  trier photos

WELL_TO_BE      OBJECTIVE   HEALTH              soin du corps
WELL_TO_BE      OBJ_ONE_DAY HEALTH/TODOs        prendre rdv dentiste
WELL_TO_BE      OBJ_ONE_DAY HEALTH/TODOs        prendre rdv pour checkup

WELL_TO_BE      OBJECTIVE   HEALTH              ww (57)
WELL_TO_BE      OBJECTIVE   HEALTH              faire du sport
WELL_TO_BE      OBJECTIVE   HEALTH              arreter de fumer
WELL_TO_BE      OBJECTIVE   FAMILY              nourriture saine (Family)

??? ->
OTHER           OBJ_ONE_DAY FAMILY              tel Véro
OTHER           OBJECTIVE   FAMILY              organiser annif elsa
OTHER           THOUGHT_OF_DAY                  au bonheur d'elsa
??? <-

*/
