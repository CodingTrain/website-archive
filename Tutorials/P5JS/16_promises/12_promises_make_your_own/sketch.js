// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Promises Part 2
// Video:https://youtu.be/AwyoVjVXnLk

function setup() {
  noCanvas();
  delayES8(1000)
    .then(() => createP('hello'))
    .catch((err) => console.error(err));
}

async function delayES8(time) {
  // This function returns a promise!
  await delay(time);
  await someThingElse();
  let val = await somethingElseElse();
  return val;
}


function delay(time) {
  return new Promise((resolve, reject) => {
    if (isNaN(time)) {
      reject(new Error('delay requires a valid number.'));
    } else {
      setTimeout(resolve, time);
    }
  });
}

// function sayHello() {
//   createP('hello');
// }
