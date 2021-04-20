const stack = require('./stack')
const queue = require('./queue')

// Create a stack called starTrek and add Kirk, Spock, McCoy, and Scotty to the stack

function main() {
    let starTrek = new stack
    starTrek.push('Kirk')
    starTrek.push('Spock')
    starTrek.push('McCoy')
    starTrek.push('Scotty')

    return starTrek
}

let starTrek = main();

// Useful methods for a stack

function peek(stack) {
    let temp = stack.pop()
    stack.push(temp)
    return temp
}

//console.log(peek(starTrek))

function isEmpty(stack){return !stack.top}

//console.log(isEmpty(starTrek))

function display(stack){
    let temp = [];
    while (stack.top != null) {
        temp.push(stack.pop())
    }
    for (let i = temp.length - 1 ; i >= 0; i--) {
        stack.push(temp[i])
    }
    return temp
}
/*
console.log(display(starTrek))
console.log('-------------------------')
console.log(display(starTrek))
*/

// Remove McCoy from your stack and display the stack

let scotty = starTrek.pop()
starTrek.pop()
starTrek.push(scotty)

//console.log(display(starTrek))

// palindrome test

function is_palindrome(str) {

    str = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
    let string = new stack;
    let rev = '';

    for(let i = 0; i < str.length; i++) {
        string.push(str[i]);
    }

    for(let i = 0; i < str.length; i++) {
       rev += string.pop();
    }

    return rev == str
}

// True, true, true, false
/*
console.log(is_palindrome("dad"));
console.log(is_palindrome("A man, a plan, a canal: Panama"));
console.log(is_palindrome("1001"));
console.log(is_palindrome("Tauhida"));
*/

// parens check

function paren(str){

    let parens = new stack;
    let locs = new stack;
    let messages = false;

    for(let i = 0; i < str.length; i++){

      if(str[i] == '(' ) {
        parens.push(str[i]);
        locs.push(i)
      }

      else if(str[i] == ')') {
            let check = parens.pop()
            locs.pop()

            if (check != '(') {
                console.log(`extra ')' at index ${i}`)
                messages = true
            }
      }
    }

    while (locs.top != null) {
        let temp = locs.pop()
        console.log(`extra '(' at index ${temp}`)
        messages = true
    }
    if (!messages) {
        console.log('no extra parens')
    }

    return
  }

//paren('((())')

// Sort stack

function sort(stk) {
    sorted = new stack

    while (stk.top != null) {
      let temp = stk.pop();  

      if (temp > peek(sorted)) {
        sorted.push(temp);
      } else {
        while (temp <= peek(sorted)) {
            stk.push(sorted.pop());
        }
        sorted.push(temp);
      }
    }

    let revSorted = new stack

    while (sorted.top != null) {
        revSorted.push(sorted.pop());
    }
    return revSorted;
}

const test = new stack

test.push(1);
test.push(3);
test.push(2);
test.push(6);
test.push(5);

out = sort(test);
//console.log(display(out));


// Create a queue using Singly linked list

// enqueue(data) 
// dequeue() 

// Kirk, Spock, Uhura, Sulu, and Checkov to the queue

let starTrekQ = new queue

starTrekQ.enqueue('Kirk')
starTrekQ.enqueue('Spock')
starTrekQ.enqueue('Uhura')
starTrekQ.enqueue('Sulu')
starTrekQ.enqueue('Checkov')

// Implement a peek() function outside
// of the Queue class that lets you take a 
// peek at what the 1st item in the queue is.


function peekQ(input) {
    let temp = input.dequeue();
    input.enqueue(temp);

    while (input.first.value != temp) {
        let temp2 = input.dequeue()
        input.enqueue(temp2);
        //console.log('one swap')
    }
    return temp;
}

/*
console.log(starTrekQ)
console.log('----------------------------')
console.log(peekQ(starTrekQ))
console.log('-----------------------------')
console.log(starTrekQ)
*/

function isEmptyQ(input) {return !input.first}

function displayQ(input) {
    let temp = input.dequeue();
    let arr = [];
    arr.push(temp)
    input.enqueue(temp);

    while (input.first.value != temp) {
        let temp2 = input.dequeue()
        input.enqueue(temp2);
        arr.push(temp2)
        //console.log('one swap')
    }
    return arr;
}

//console.log(displayQ(starTrekQ))

// remove spock
let name = starTrekQ.dequeue()
starTrekQ.dequeue()
starTrekQ.enqueue(name)

starTrekQ.enqueue(starTrekQ.dequeue())
starTrekQ.enqueue(starTrekQ.dequeue())
starTrekQ.enqueue(starTrekQ.dequeue())

//console.log(displayQ(starTrekQ))

// square dance pairing

function pair(input) {
    let spare = new queue

    spare.enqueue(input.dequeue())
    let out = [];
    while (input.first != null) {
        if (isEmptyQ(spare)) {
            spare.enqueue(input.dequeue())
        } else {
            let fresh = peekQ(input)
            let stored = peekQ(spare)
            if (fresh[0] != stored[0]) {
                out.push(input.dequeue() + ' ' + spare.dequeue())
                console.log('paired')
            } else {
                spare.enqueue(input.dequeue())
                console.log('stored')
            }
        }
    }
    return out
}

let people = new queue

people.enqueue('F Jane')
people.enqueue('M Frank')
people.enqueue('M John')
people.enqueue('F Persia')

//console.log(pair(people))

// ophidian bank

function oph(input) {
    let lineTrips = 0;
    while (input.first != null) {
        let n = Math.random()*100;
        
        if (n > 25) {
            input.dequeue();
            lineTrips++;
        } else {
            input.enqueue(input.dequeue())
            lineTrips++
        }
    }
    console.log(`total trips through line: ${lineTrips}`)
    return
}

let bankPeople = new queue

bankPeople.enqueue('Jane')
bankPeople.enqueue('Frank')
bankPeople.enqueue('John')
bankPeople.enqueue('Persia')
bankPeople.enqueue('Persia2')
bankPeople.enqueue('Persia3')
bankPeople.enqueue('Persia4')
bankPeople.enqueue('Persia5')
bankPeople.enqueue('Persia6')
bankPeople.enqueue('Persia7')

oph(bankPeople) // a queue of length 10
