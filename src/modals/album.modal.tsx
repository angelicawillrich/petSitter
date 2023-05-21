/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import React, { useContext, useState } from 'react'
import { IoMdCloseCircle } from 'react-icons/io'
import Button from '../components/baseComponents/button'
import Input from '../components/baseComponents/input'
import Modal from '../components/baseComponents/modal'
import { path } from '../shared'
import { convertBase64 } from '../utils'
import { StoreContext } from '../context/context'
import { addPhotoAlbum, deletePhotoAlbum } from '../api/user.api'
import { IUser } from '../interfaces/interfaces'
import ImageNotFound from '../assets/not_found.png'

interface Photo {
  _id?: string
  filename: string
  date?: Date
}

interface AlbumModalProps {
  onClose: () => void
  photos?: Photo[]
  user?: IUser
}

const AlbumModal = ({ onClose, photos, user }: AlbumModalProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<File | undefined>(undefined)
  const { getLoggedInUser } = useContext(StoreContext)

  const onSaveImage = async () => {
    if (!user) return
    if (selectedPhoto) {
      const image = await convertBase64(selectedPhoto)
      const addData = {
        userId: user?._id,
        photo: image,
      }
      setSelectedPhoto(undefined)
      await addPhotoAlbum(addData)
      await getLoggedInUser(user._id)
      alert('Imagem salva com sucesso!')
    }
  }

  const onDeleteImage = async (photoId?: string) => {
    if (!user?.album || !photoId) return

    const deleteDataParams = new URLSearchParams({ userId: user._id, photoId })
    await deletePhotoAlbum(deleteDataParams.toString())
    await getLoggedInUser(user._id)
    alert('Imagem removida com sucesso!')
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0]
    if (selectedImage) {
      setSelectedPhoto(selectedImage)
    }
  }

  return (
    <Modal title="Álbum" onClose={onClose}>
      {photos && photos.length > 0
        ? (
          <div className=" max-h-80 overflow-auto grid grid-cols-5 gap-1 grid-cols">

            {photos?.map((photo) => (
              <div key={photo._id} className="relative p-2">
                <IoMdCloseCircle
                  className="absolute top-0 right-0 cursor-pointer"
                  onClick={() => onDeleteImage(photo?._id)}
                />
                <img
                  src={`${path}${photo.filename}`}
                  alt=""
                  className="w-40"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null // prevents looping
                    currentTarget.src = ImageNotFound
                  }}
                />
              </div>
            ))}
          </div>
        )
        : (
          <div className="flex justify-center">
            <span>Você ainda não possui fotos</span>
          </div>
        )}
      <div
        className=" flex flex-col justify-center items-center mt-6 gap-4"
      >
        <Input
          label=""
          type="file"
          accept="image/*"
          onChange={(e) => handleImageSelect(e)}
        />
        <Button onClick={() => onSaveImage()}>Salvar nova foto</Button>
      </div>
    </Modal>
  )
}

export default AlbumModal
