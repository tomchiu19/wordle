import React, { useEffect } from "react"

function AlertModal({
  showAlertModal,
  setShowAlertModal,
  message,
  isOutOfGuesses,
  isConfettiRunning,
  inGame,
}) {
  let alertTimeout

  useEffect(() => {
    if (showAlertModal) {
      // Most of these alerts are temporary (1.5s). The exceptions are:
      // - out of guesses (infinite time)
      // - win (8000ms, which just happens to be when the confetti disappears)
      if (isOutOfGuesses) {
        return
      }

      const ms = isConfettiRunning ? 8000 : 1500
      alertTimeout = setTimeout(() => {
        setShowAlertModal(false)
      }, ms)
    }

    return () => {
      clearTimeout(alertTimeout)
    }
  }, [showAlertModal])

  return (
    <>
      <div
        className={`alert-modal${inGame ? "__game" : "__lobby"}${showAlertModal ? "" : " hide"}`}
        onTransitionEnd={() => setShowAlertModal(false)}
      >
        {message}
      </div>
    </>
  )
}

export default AlertModal
