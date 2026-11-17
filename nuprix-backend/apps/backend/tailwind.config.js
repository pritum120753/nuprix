module.exports = {
  darkMode: "class",
  presets: [require("@medusajs/ui-preset")],
  content: [
    "./src/admin/**/*.{js,jsx,ts,tsx}",
    "./.medusa/client/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@medusajs/{draft-order,cloud}/.medusa/server/src/admin/**/*.{js,mjs}",
  ],
}
