import {Friend, Colleague} from './myTypes';
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
function highestExtension(cs: Colleague[]): Colleague {
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
