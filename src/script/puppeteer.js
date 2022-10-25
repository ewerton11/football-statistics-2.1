import puppeteer from "puppeteer"
import fs from "fs"

async function start() {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    headless: true,
  })
  const page = await browser.newPage()

  page.setDefaultNavigationTimeout(0)

  await page.goto("https://ge.globo.com/futebol/brasileirao-serie-a/")

  const round = await page.evaluate(() => {
    let dataRound = document.querySelector(".lista-jogos__navegacao--rodada")
    let roundNumber = {
      roundBra: [
        `${/\d\d/.exec(dataRound.innerText)}`,
        38 - `${/\d\d/.exec(dataRound.innerText)}`,
      ],
    }

    return roundNumber
  })

  fs.writeFile(
    "chartInformation.json",
    JSON.stringify(round, null, 2),
    (err) => {
      if (err) throw new Error("Error")

      console.log("Good!")
    }
  )

  await browser.close()
}

start()
