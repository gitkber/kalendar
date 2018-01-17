import { Action } from '../action';
import { TagBudgetOperation, TagBudgetType } from '../../common/utils/tag';

export class Budget {
    constructor(
        public tagOperation: TagBudgetOperation,
        public tagType: TagBudgetType,
        public description: string,
        public kalendarDate: string,
        public amount?: string,
    ) { }
}

export class BudgetAction {
    public key: string;

    constructor(
        public action: Action,
        public budget?: Budget
    ) { }
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
