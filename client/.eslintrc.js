// Extend react-script's version of ESLint: 
// http://rahulgaba.com/front-end/2019/02/17/Use-custom-eslint-config-in-create-react-app-using-three-simple-steps-No-external-dependencies.html

module.exports = {
  "extends": [
    "react-app",
    "airbnb"
  ],
  "rules" : {
    // "indent": ["error", 2],
    "comma-dangle": ["error", "never"],
    "react/destructuring-assignment": 0,
    "react/jsx-filename-extension": 0

    // more custom rules here
  }
}