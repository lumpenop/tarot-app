module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["next/core-web-vitals", "next/typescript", "prettier"],
  plugins: ["unused-imports", "prettier"],
  ignorePatterns: ["*.json"],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "react-hooks/exhaustive-deps": "off",
    "react-hooks/rules-of-hooks": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "error",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
  },
};
