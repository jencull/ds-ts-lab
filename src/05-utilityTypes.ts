import { friends, colleagues } from "./01-basics";
import { Friend, Colleague, SecureFriendContact, FriendPartial, EventPass, FriendColleague } from "./myTypes";


function updateFriend(friend: Friend, updates: FriendPartial ) : Friend {
  // ... = spread operator
  // ...friend unpacks properties of original friend into new object
  // ...updates unpacks the new values. It comes second so it will overwrite
  // the values from original friend
    return { ...friend, ...updates}
}

// updates the friendPartial phone and dob
console.log(updateFriend(friends[0], {
  phone: '08712345',
  dob: new Date("1998-10-22")
}))

function secureFindFriends(
  // array of Friend
  friends: Friend[],
  // criteria function that returns true/false
  criteria: (f: Friend) => boolean
): SecureFriendContact[] { // returns an array of SecuryFriendContact
  const matches = friends.filter(criteria); // filtered by the criteria (set in let result)
  return matches.map((f) => { // transforms
    const secure: SecureFriendContact = { // creates new object with name and phone
      name: f.name,
      phone: f.phone,
    };
    return secure; // returns new 'secure' object to the map array
  });
}
let result = secureFindFriends( // result will be an array of SecureFriendContact from below args
    friends, // passes friend array as data source
    (f: Friend) => f.age < 30 // defines the criteria
)
console.log(result) // prints filtered and sanitised list to console

// result[0].phone = '08654321'
// phone causes a problem because its readonly so can't overwrite

// use Colleague object and return a transformed EventPass
function generateEventPass(colleague: Colleague): EventPass {
  const passCode = Math.round(Math.random() * (1000 - 1) + 1); // generate decimal no between 1-1000, round makes it a whole number
  return {
    // return name, dept and the generated passCode
    name: colleague.name,
    department: colleague.department,
    passCode: passCode, // this is newly added
  };
}
console.log(generateEventPass(colleagues.current[0]));

function intersection(
  friends: Friend[], // input Friend array
  colleagues: Colleague[] // input Colleague array
): FriendColleague[] { // output new array called FriendColleague
  let result: FriendColleague[] = [];
  // iterates through friends to build result array
  friends.reduce((res, friend) => {
    // check if the current friends name exists in the colleague array
    const colleague = colleagues.find((col) => col.name === friend.name);
    if (colleague) {
      // If a match is found, send a hybrid object into the collector (res)
      // using the properties below 
      res.push({
        name: friend.name,
        age: friend.age,
        contact: colleague.contact
      });
    }
    return res; // pass updated list to next iteration
  }, result); // empty starting array for the 
  return result; // completed new hybrid array
}

console.log(intersection(friends, colleagues.current));
