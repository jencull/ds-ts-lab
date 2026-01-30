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

export type Department = "Engineering" | "Finance" | "HR";
export interface ColleagueV2 {
  name: string;
  department: Department;    // *****
  contact: {
    email: string;
    extension: number;
    slack?: string;
  };
}

export type Buddy = Friend | ColleagueV2;
export type Administrator = Buddy | string | undefined

export type BuddyList = {
  name: string;
  administrator: Administrator;
  members: Buddy[];
};

// the Partial utility makes every property optional
// it takes Friend type and adds a ? to each field
export type FriendPartial = Partial<Friend>
// Type for gaining access to an event, e.g. concert.
// transformation using Omit and &. Omit the contact
// then add on a new property called passCode
// produces a result called EventPass that has name, dept,
// no contact info but a required passcode
// EventPass inherits properties from Colleague so if
// anything is added to Colleague it will get included in EventPass automatically
export type EventPass = Omit<Colleague, "contact"> & {
  passCode : number;
}
// Immutable person type, based on Friend type.
// Pick: ignores everything in the friend type except name & phone
// Readonly: read only, can't write new values
export type SecureFriendContact = Readonly<Pick<Friend,"name" | "phone" > >

// to create a new type FriendColleage pick name & age from Friend and pick contact from Colleague
export type FriendColleague = Pick<Friend, "name" | "age"> & Pick<Colleague, "contact">;