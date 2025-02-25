export class User{

    constructor(
        public userId: number,
        public name: string,
        public role: string,
        public sickLeaveBalance: number,
        public vacationLeaveBalance: number,
        public userName: string,
        public password: string        
      ) {}        
}