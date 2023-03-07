const result = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const symbolsEl = document.getElementById("symbols");
const numbers = document.getElementById("numbers");
const generate = document.getElementById("generate");
const clipboard = document.getElementById("clipboard");

// fn to copy generated password

// get randoms
const randomFunc = {
  lower: getRandomLowerCase,
  upper: getRandomUpperCase,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

// event listener
generate.addEventListener("click", () => {
  // if the boxes are checked
  const length = +lengthEl.value;
  const hasLowerCase = lowercase.checked;
  const hasUpperCase = uppercase.checked;
  const hasSymbol = symbolsEl.checked;
  const hasNumber = numbers.checked;

  //   put the input into the result element
  result.innerText = generatePassword(
    hasLowerCase,
    hasUpperCase,
    hasNumber,
    hasSymbol,
    length
  );
});

// generate fn
const generatePassword = (lower, upper, number, symbol, length) => {
  // initialize password variable
  let generatedPassword = "";
  //   count the number of checked values
  const typesCount = lower + upper + number + symbol;
  //   get an array of objects with the category and filter out unchecked(false)
  const typesArray = [{ lower }, { upper }, { number }, { symbol }].filter(
    // filter the first false one out of the array
    (item) => Object.values(item)[0]
  );
  //   if theres none checked, return nothing
  if (typesCount === 0) {
    return "";
  }

  //   loop over length and call generator for each type
  for (let i = 0; i < length; i += typesCount) {
    // increment by the typesCount
    typesArray.forEach((type) => {
      const funcName = Object.keys(type)[0];
      //   console.log(funcName);

      // add funcName to generated password
      generatedPassword += randomFunc[funcName]();
    });
  }
  //   get password from beginning to length given
  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
};

// functions to get characters
function getRandomLowerCase() {
  // add 97 because lowercase letters' code start from 97
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// add 97 because uppercase letters' code start from 65
function getRandomUpperCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

// numbers start from 48 - 57 (0 - 9)
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]=+.,"';
  return symbols[Math.floor(Math.random() * symbols.length)];
}
