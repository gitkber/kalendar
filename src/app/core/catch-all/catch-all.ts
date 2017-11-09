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

export class CatchAllAction {
    public key: string;

    constructor(
        public action: Action,
        public catchAll?: CatchAll
    ) { }
}

/*
TAG
    TAG_CASE
        - OBJECTIVE
        - TODOs
        - THOUGHT_OF_DAY
    TAG_CASE_TYPE
        - ADMINISTRATION
        - HEALTH
        - FAMILY
        - PROJECT
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
        - UC BUDGET             - CatchAll
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

*/

/*
-TAG_CASE       -TAG_CASE_TYPE    -description              -deadline

THOUGHT_OF_DAY  FAMILY            au bonheur d'elsa

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

                                - TAG_PROJECT   -...

TODOs           PROJECT         KsLIFE          ...

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
