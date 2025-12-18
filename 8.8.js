const countVowels = (word) => {
  const vowels = ["a", "e", "i", "o", "u"];
  return [...word.toLowerCase()].filter((letter) => vowels.includes(letter)).length;
};