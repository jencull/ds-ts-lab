import {
  ColleagueV2,
  Friend,
  Buddy,
  BuddyList,
  Administrator,
} from "./myTypes";
import { friends } from "./01-basics";

const colleague1: ColleagueV2 = {
  name: "Ralph Graham",
  department: "Engineering",
  contact: {
    email: "rgraham@company.com",
    extension: 121,
  },
};

const colleague2: ColleagueV2 = {
  name: "Patti Burke",
  department: "Finance",
  contact: {
    email: "pburke@company.com",
    extension: 132,
  },
};

const colleague3: ColleagueV2 = {
  name: "Dean Sullivan",
  department: "HR",
  contact: {
    email: "dos@company.com",
    extension: 125,
  },
};

function makeBuddyList(
  name: string,
  buddies: Buddy[],
  admin?: Administrator
): BuddyList {
  return {
    name,
    members: buddies,
    administrator: admin,
  } as BuddyList;
  // The as operator above casts an object to a specific type.
}
// Tests for makeBuddyList
const myFootballBuddies = makeBuddyList(
  "Football team",
  [colleague1, friends[0], colleague2],
  colleague1
)

const myBandBuddies = makeBuddyList(
    "Band name",
    [colleague1, friends[1]]
    // No administrator
  )

console.log(myFootballBuddies)
console.log(myBandBuddies)
//--------------------------------------
function findBuddyContact(list: BuddyList, name: string): string | undefined {
  for (const buddy of list.members) {
    if (buddy.name === name) {
      if ("phone" in buddy) {
        return buddy.phone;
      }
      else {
        return buddy.contact.email;
      }
    }
    //return undefined;
  }
  return undefined;
}
// Test for findBuddyContact.
console.log("Contact buddy at: ", findBuddyContact(myFootballBuddies, "Ralph Graham"));
console.log("Contact buddy at: ", findBuddyContact(myFootballBuddies, "Paul Fleming"));

function getBuddyListFriends(list: BuddyList): Friend[] {
  // Use reduce to build a new array of just Friends
  const friends = list.members.reduce((results, buddy) => {
    
    // Is this buddy actually a Friend?
    // Use "phone" in buddy because only Friends have a phone number in our types
    if ("phone" in buddy) {
      // If yes, add them to the running list
      results.push(buddy);
    }
    
    // Always return the running list for the next loop
    return results;
  }, [] as Friend[]); // Start with an empty array of Friends
  
  return friends;
}

// This should print a list of friends found in the football group
console.log(getBuddyListFriends(myFootballBuddies));