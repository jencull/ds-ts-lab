export interface Friend {
    name: string;
    phone: string;
    dob? : Date;
    age: number;
    interests? : string[]
}

// ? makes the variable optional

export interface Colleague {
    name: string;
    department: string;
    contact: {
      email: string;
      extension: number
    } 
  }

export interface ColleagueHistory {
  current: Colleague[],
  former: Colleague[]
}

export interface EmailContact {
    name: string;
    email: string
}
