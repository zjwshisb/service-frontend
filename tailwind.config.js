module.exports = {
  content: ['./src/pages/**/*.tsx', './src/components/**/*.tsx', './src/layouts/**/*.tsx'],
  plugins: [
    // ...
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
