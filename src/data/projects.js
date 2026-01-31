export const PROJECTS = {
  cpp: {
    basic: [
      ["int", "main()", "{"],
      ["cout", "<<", "'Hello';"],
      ["return", "0;"],
      ["}"]
    ],
    calculator: [
      ["int", "a", "=", "5;"],
      ["int", "b", "=", "3;"],
      ["int", "result", "=", "a", "+", "b;"],
      ["cout", "<<", "result;"]
    ],
    fibonacci: [
      ["int", "n1", "=", "0;"],
      ["int", "n2", "=", "1;"],
      ["for(int", "i", "=", "0;", "i", "<", "10;", "i++)"],
      ["int", "next", "=", "n1", "+", "n2;"],
      ["n1", "=", "n2;"],
      ["n2", "=", "next;"]
    ]
  },
  python: {
    basic: [
      ["def", "main():", ""],
      ["print('Hello')", ""],
      ["main()", ""]
    ],
    calculator: [
      ["a", "=", "5", ""],
      ["b", "=", "3", ""],
      ["result", "=", "a", "+", "b", ""],
      ["print(result)", ""]
    ],
    fibonacci: [
      ["n1", "=", "0", ""],
      ["n2", "=", "1", ""],
      ["for", "i", "in", "range(10):", ""],
      ["next", "=", "n1", "+", "n2", ""],
      ["n1", "=", "n2", ""],
      ["n2", "=", "next", ""]
    ]
  },
  javascript: {
    basic: [
      ["function", "main()", "{"],
      ["console.log('Hello');"],
      ["}"]
    ],
    calculator: [
      ["let", "a", "=", "5;"],
      ["let", "b", "=", "3;"],
      ["let", "result", "=", "a", "+", "b;"],
      ["console.log(result);"]
    ],
    fibonacci: [
      ["let", "n1", "=", "0;"],
      ["let", "n2", "=", "1;"],
      ["for(let", "i", "=", "0;", "i", "<", "10;", "i++)"],
      ["let", "next", "=", "n1", "+", "n2;"],
      ["n1", "=", "n2;"],
      ["n2", "=", "next;"]
    ]
  }
};
