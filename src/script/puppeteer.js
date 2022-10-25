import puppeteer from "puppeteer"
import fs from "fs"

async function serieARound() {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    headless: true,
  })
  let page = await browser.newPage()

  page.setDefaultNavigationTimeout(0)

  await page.goto("https://ge.globo.com/futebol/brasileirao-serie-a/")

  const round = await page.evaluate(() => {
    const dataRound = document.querySelector(".lista-jogos__navegacao--rodada")
    const roundNumber = {
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
serieARound()

async function liberatorsRound() {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    headless: true,
  })

  const page = await browser.newPage()

  page.setDefaultNavigationTimeout(0)

  await page.goto("https://ge.globo.com/futebol/libertadores/")

  const phaseRound = await page.evaluate(() => {
    let dataObtained = document.querySelector(".navegacao-fase__fase").innerText

    if (dataObtained == "FINAL") {
      dataObtained = 4
    } else {
      // Por semi e quartas e tals
      console.log("nao foi")
    }

    const phase = {
      phaseLib: [dataObtained, 5 - dataObtained],
    }

    return phase
  })

  fs.writeFile(
    "chartInformation.json",
    JSON.stringify(phaseRound, null, 2),
    (err) => {
      if (err) throw new Error("Error")

      console.log("Good!")
    }
  )
  await browser.close()
}

liberatorsRound()
