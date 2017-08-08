export class Holiday {

    constructor(
        public user: string,
        public contactUID: string, // year or contactUID
        public dates: string[] = []// yyyy-MM-dd
    ) { }

}
