import React from 'react'
import { RiStarHalfFill, RiStarFill } from 'react-icons/ri'
import { services } from './shared'

// eslint-disable-next-line import/prefer-default-export
export const showStars = (stars: number) => {
  const starsArr = []
  for (let i = 0; i < Math.floor(stars); i++) {
    starsArr.push(<RiStarFill className="text-yellow-300 w-4 h-4" />)
  }
  if (stars > Math.floor(stars)) {
    starsArr.push(<RiStarHalfFill className="text-yellow-300 w-4 h-4" />)
  }
  return starsArr
}

export const getServiceName = (id: string) => {
  return services.find((service) => String(id) === String(service?.id))?.label
}

export const convertBase64 = async (file: any): Promise<string | ArrayBuffer | null> => {
  try {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    await new Promise<void>((resolve) => {
      fileReader.onload = () => resolve()
    })
    return fileReader.result
  } catch (error) {
    throw new Error('Nao foi possível ler a imagem.')
  }
}

export const generateInitialsAvatar = (name: string) => {
  const initial = name.substring(0, 1)
  return (
    <div
      className="flex h-10 w-10 bg-purple-200 font-bold text-purple-600 rounded-full justify-center items-center p-0"
    >
      {initial.toLocaleUpperCase()}
    </div>
  )
}
