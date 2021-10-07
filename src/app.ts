import inquirer from 'inquirer';

const LOTTERY_NUMBER_UPPER_BOUND = 49;
const LOTTERY_NUMBER_AMOUNT = 6;
const winningNumbers: number[] = [];
const chosenNumbers: number[] = [];

const generateRandomNumber = (max: number) => () => Math.floor(Math.random() * max + 1);

const generateWinningNumber = generateRandomNumber(LOTTERY_NUMBER_UPPER_BOUND);

const generateWinningNumbers = () => {
  while (winningNumbers.length < LOTTERY_NUMBER_AMOUNT) {
    const generatedNumber = generateWinningNumber();

    if (!winningNumbers.includes(generatedNumber)) {
      winningNumbers.push(generatedNumber);
    }
  }
};

const validateInput = (input: string) => {
  const parsedInput = parseInt(input, 10);

  if (Number.isNaN(parsedInput)) {
    console.error('Your input is not a number! Please try again.');
    return;
  }

  chosenNumbers.push(parsedInput);
};

const startApp = async () => {
  generateWinningNumbers();

  do {
    const userInput = await inquirer.prompt([{
      name: 'number',
      type: 'input',
      message: `Please select a number from 1 to ${LOTTERY_NUMBER_UPPER_BOUND}... `,
    }]);
    validateInput(userInput.number);
  } while (chosenNumbers.length < LOTTERY_NUMBER_AMOUNT);

  const results = new Set(winningNumbers.concat(chosenNumbers));

  if (results.size === LOTTERY_NUMBER_AMOUNT) {
    console.log('Congratulations! You won the lottery!');
    return;
  }

  console.log("You didn't guess the correct combination... Try again!");
};

startApp().then(() => {
  process.exit(0);
});
