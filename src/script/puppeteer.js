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
    let dados = document.querySelector(".lista-jogos__navegacao--rodada")
    let roundNumber = /\d\d/.exec(dados.innerText)

    return roundNumber
  })

  fs.writeFile(
    "chartInformation.json",
    JSON.stringify(round, null, 2),
    (err) => {
      if (err) throw new Error("Erro")

      console.log("Tudo certo!")
    }
  )

  await browser.close()
}

start()
