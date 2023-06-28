function findMissingNumber(arr) {
  const n = arr.length + 1;
  const expectedSum = (n * (n + 1)) / 2;

  const actualSum = arr.reduce((sum, num) => sum + num, 0);

  const missingNumber = expectedSum - actualSum;

  return missingNumber;
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10 /*...*/, , 99, 100]; // Array with one number missing

const missingNumber = findMissingNumber(numbers);
console.log("Missing number:", missingNumber);
