import React, { useState, useLayoutEffect } from "react"
import { FaRegCircleQuestion } from "react-icons/fa6"
import { RiMoonClearFill } from "react-icons/ri"

import InfoModal from "./InfoModal"

function NavBar() {
  const [showInfoModal, setShowInfoModal] = useState(false)
  const [colorTheme, setColorTheme] = useState("")

  // Upon Mount, initialize theme preference based on localStorage or system preference.
  useLayoutEffect(() => {
    const storedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")

    if (storedTheme) {
      document.documentElement.setAttribute("data-theme", storedTheme)
    }

    setColorTheme(storedTheme)
  })

  function switchColorTheme() {
    const current = document.documentElement.getAttribute("data-theme")
    const target = current === "light" ? "dark" : "light"

    document.documentElement.setAttribute("data-theme", target)
    localStorage.setItem("theme", target)

    setColorTheme(target)
  }

  function getColorThemeClassName() {
    let colorThemeClassName = "navbar__color-theme"
    if (colorTheme === "dark") {
      colorThemeClassName += " dark"
    } else {
      colorThemeClassName += " light"
    }
    return colorThemeClassName
  }

  function openInfoModal() {
    setShowInfoModal(true)
  }

  function closeInfoModal() {
    setShowInfoModal(false)
  }

  function refreshPage() {
    window.location.href = "/"
  }

  return (
    <>
      <header className="navbar">
        <div className="navbar__left" onClick={refreshPage}>
          <div className="logo">
            <div className="logo__wordmark">
              <strong className="logo__wordmark--left">Wordle&nbsp;</strong>
              <strong className="logo__wordmark--right">Forever</strong>
            </div>
          </div>
        </div>
        <div className="navbar__right">
          <FaRegCircleQuestion
            className="navbar__info"
            onClick={openInfoModal}
          />
          <RiMoonClearFill
            className={getColorThemeClassName()}
            onClick={switchColorTheme}
          />
        </div>
        <InfoModal show={showInfoModal} handleClose={closeInfoModal} />
      </header>
    </>
  )
}

export default NavBar
