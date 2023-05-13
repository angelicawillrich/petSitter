import React, { useEffect } from 'react'

const useOutsideClick = (ref: HTMLInputElement | null, onClickOut: () => void) => {
  const onClick = ({ target }: any) => {
    return ref && !ref?.contains(target) && onClickOut?.()
  }
  document.addEventListener('click', onClick)
  return () => document.removeEventListener('click', onClick)
}

export default useOutsideClick
