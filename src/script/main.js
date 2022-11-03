let menu = document.querySelector(".menu-box-1")
let xnavbar = document.querySelector(".x-menu")
let navmenu = document.querySelector("#nav-menu")

let logo = document.querySelector(".box-2")

let colorMode = document.querySelector(".color-system")

menu.addEventListener("click", () => {
  navmenu.classList.toggle("active")
})

xnavbar.addEventListener("click", () => {
  navmenu.classList.toggle("active")
})

logo.addEventListener("click", () => {
  document.location.reload(true)
})

var i = 0
colorMode.addEventListener("click", function () {
  let firstelement = document.querySelector(".color-mode")

  if (i == 0) {
    i++

    firstelement.textContent = "Clear"
  } else {
    i = 0

    firstelement.textContent = "Dark"
  }
})

let sSlide = document.querySelector(".section-slide")
let widthClass = sSlide.getBoundingClientRect().width

class Next {
  constructor() {
    this.left = document.querySelector(".left-arrow")
    this.right = document.querySelector(".right-arrow")
    this.article = document.querySelector(".section-slide")
    this.width = widthClass
    this.count = 0

    this.leftSection()
    this.rightSection()
  }

  leftSection() {
    this.left.addEventListener("click", () => {
      if (this.count == 1) {
        this.count--

        this.article.scrollBy(-this.width, 0)
        this.left.style.visibility = "hidden"
      } else if (this.count == 2) {
        this.count--

        this.article.scrollBy(-this.width, 0)
        this.left.style.visibility = "visible"
        this.right.style.visibility = "visible"
      }
    })
  }

  rightSection() {
    this.right.addEventListener("click", () => {
      if (this.count == 0) {
        this.count++

        this.article.scrollBy(this.width, 0)
        this.left.style.visibility = "visible"
      } else if (this.count == 1) {
        this.count++

        this.article.scrollBy(this.width, 0)
        this.left.style.visibility = "visible"
        this.right.style.visibility = "hidden"
      }
    })
  }
}

const Tables = new Next()

// const updatedDay = new Date().getDay()
// const updatedMonth = new Date().getMonth()
// const updateTime = new Date().getHours()
// const updateMinutes = new Date().getMinutes()
// const updateDate = `Ultima atualizaçao ${updatedDay}/${updatedMonth} ${updateTime}:${updateMinutes}`

// document.getElementById("update-schedule").innerText = updateDate

const inputTeam = document.getElementById("input-select-team")

inputTeam.addEventListener("input", () => {
  const widthTeam = document.querySelector(".select-team")
  const team = document.querySelector(".select-team-list")

  inputTeam.value.length === 0
    ? (team.style.display = "none")
    : (team.style.display = "flex")
  // && (widthTeam.style.width = "10vw")

  team.addEventListener("click", (e) => {
    team.style.display = "none"
    // widthTeam.style.width = ""

    const selectTeam = e.target.innerHTML

    function filterTeam(objectTeam) {
      const img = document.querySelector(".select-team > img")

      if (selectTeam === selectTeam) {
        objectTeam.forEach((item) => {
          const index = objectTeam[0].items.findIndex(
            (item) => item.nameTeam === selectTeam
          )

          const imgTeam = document.createElement("img")

          img.src = "/public/imagens/bola-time.png"
            ? (imgTeam.innerHTML = item.items[index].image)
            : (imgTeam.innerHTML = item.items[index].image)
        })
      }
    }
    filterTeam(objectTeam)
  })

  teamUl.innerHTML = ""

  teamSearch
    .filter((teamSearch) => teamSearch.includes(inputTeam.value))
    .forEach((teamSearch) => listHtml(teamSearch))
})

const teamUl = document.querySelector(".select-team-list ul")

const teamSearch = []
const objectTeam = []

function listHtml(teamSearch) {
  const li = document.createElement("li")

  li.id = li.innerHTML = teamSearch
  teamUl.appendChild(li)
}

function fetchData() {
  fetch("./src/script/chartInformation.json")
    .then((Response) => Response.json())
    .then((data) => {
      data.teams.forEach((item) => {
        objectTeam.push(item)
      })

      data.teams[0].items.forEach((item) => {
        listHtml(item.nameTeam)
        teamSearch.push(item.nameTeam)
      })
    })
}

fetchData()
