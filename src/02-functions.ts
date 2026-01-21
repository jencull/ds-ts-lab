import {Friend, Colleague, EmailContact} from './myTypes';
import { friends, colleagues } from './01-basics';

function older(f: Friend) : string {
     f.age += 1
     return `${f.name} is now ${f.age}` 
}

function allOlder (f: Friend []) : string [] {
    return f.map((friend) => {
        friend.age += 1;
        return `${friend.name} is now ${friend.age}`;
    });
}

console.log(older(friends[0]))
console.log(allOlder(friends))

// Find the colleague with the highest extension number.
function highestExtension(cs: Colleague[]) {
  const result = cs.sort(
    (c1, c2) => c1.contact.extension - c2.contact.extension
  );
  return result[cs.length - 1];
}
console.log(highestExtension(colleagues.current));

function addColleague(cs: Colleague[], name: string, department: string, email: string) {
  // Get the highest existing extension num, assign a variable to call later
  const highestPerson = highestExtension(cs);

  // Create the new colleague
  const newColleague: Colleague = {
    name: name,
    department: department,
    contact: {
      email: email,
      // the highest person on the extention list and add 1
      extension: highestPerson.contact.extension + 1,
    },
  };
  // Add them to original array
  cs.push(newColleague);
}

addColleague(colleagues.current, "Sheild O Connell", "HR", "soc@here.com");
console.log(colleagues.current.filter((c) => c.name === "Sheild O Connell"));

function sortColleagues(
  colleagues: Colleague[],
  sorter: (c1: Colleague, c2: Colleague) => number
): EmailContact[] {
  const sorted = colleagues.sort(sorter); // Colleague[] inferred
  const result: EmailContact[] = sorted.map((ce) => ({ name: ce.name, email: ce.contact.email }));
  return result 
}

console.log(sortColleagues(colleagues.current, (a, b) => a.contact.extension - b.contact.extension));
console.log(sortColleagues(colleagues.current, (a, b) => a.name.length - b.name.length));

function findFriends(
  // use the existing array of friends
  friends: Friend[],
  // Callback function: look in the array, if true keep them
  lookFor: (friend: Friend) => boolean
): string[] { //return type, sends back the strings (names)
  // filter, lookFor on every friend, if one exists its 'true'
  const matches = friends.filter(lookFor);
  // if true we keep the name because thats all we want, ignore other info
  const result: string[] = matches.map((f) => f.name);
  // send names back
  return result;
}

console.log(findFriends(friends, (friend) => friend.name.startsWith("Pa")));
console.log(findFriends(friends, (friend) => friend.age < 35));
