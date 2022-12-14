const fs = require("fs")
const icongen = require("icon-gen")

const options = {
   report: true,
   ico: {
      name: "app",
      sizes: [256],
   },
   favicon: {
      name: "favicon-",
      pngSizes: [16, 32, 96, 128],
   },
}

icongen("./app-icon.png", "./public/icons/", options).then(() => {
   fs.rename("./public/icons/app.ico", "./public/favicon.ico", () => {
      fs.unlink("./public/icons/favicon.ico", () => {
         console.log("All generated.")
      })
   })
})
