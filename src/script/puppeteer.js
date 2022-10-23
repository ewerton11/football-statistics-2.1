import puppeteer from "puppeteer"

async function start() {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    headless: true,
  })
  const page = await browser.newPage()

  page.setDefaultNavigationTimeout(0)

  await page.goto("https://ge.globo.com/futebol/brasileirao-serie-a/")

  const round = await page.evaluate(() => {
    //regex /\d\d/

    const dados = document.querySelector(".lista-jogos__navegacao--rodada")

    return dados
  })

  await browser.close()
}

start()
