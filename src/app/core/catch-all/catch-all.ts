import { Action } from '../action';

export class CatchAll {
    constructor(
        public user: string,
        public tagCase: string,
        public tagCaseType: string,
        public description: string,
        public deadline?: string
    ) { }
}

export class CatchAllAction {
    public key: string;

    constructor(
        public action: Action,
        public catchAll?: CatchAll
    ) { }
}

export class CatchBudget extends CatchAll {
    constructor(
        public user: string,
        public tagCase: string,
        public tagCaseType: string,
        public tagBudgetType: string,
        public description: string,
        public kalendarDate?: string,
        public budget?: string,
        // public deadline?: string,
    ) {
        super(user, tagCase, tagCaseType, description, null);
    }
}

/* BUDGET
BUDGET          MIN         [HOME - CAR - FOOD - HEALTH - ELSA (contact) -  K    (contact) ]
BUDGET          PLUS        [WORK - ALLOC]

-TAG_CASE   -TAG_CASE_TYPE  -tagBudgetType  -description        -kalendarDate       -amount     -contactID

BUDGET      TO_BUY          HOME            armoire à chaussures
BUDGET      TO_BUY          CLOTHES         veste                                               elsa
BUDGET      MIN             HEALTH          dentiste            15/12/2017          62.5
BUDGET      MIN             HOME            pret hypothecaire   15/12/2017          622.5
BUDGET      MIN             HOME            luminus             15/12/2017          200.5
BUDGET      MIN             VARIOUS         base                25/12/2017          20          k
BUDGET      MIN             FOOD            carrefour           15/12/2017          10.5
BUDGET      MIN             FOOD            quick               15/12/2017          22.5
BUDGET      MIN             CLOTHES         pantalon            15/12/2017          22.5        k
BUDGET      MIN             CLOTHES         gants               15/12/2017          22.5        elsa
BUDGET      MIN             CLOTHES         divers              15/12/2017          22.5        elsa
BUDGET      PLUS            WORK            salaire             01/01/2017          500
 */

export class CatchProject extends CatchAll {
    constructor(
        public user: string,
        public tagCase: string,
        public tagCaseType: string,
        public tagProjectUC: string,
        public tagProjectUCView: string,
        public description: string,
        public tagProjectStatus: string,
        public deadline?: string,
    ) {
        super(user, tagCase, tagCaseType, description, deadline);
    }
}

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
