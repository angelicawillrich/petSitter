/* eslint-disable max-len */
import React, { useState } from 'react'
import { IoMdCloseCircle } from 'react-icons/io'
import Button from '../components/baseComponents/button'
import Input from '../components/baseComponents/input'
import Modal from '../components/baseComponents/modal'

interface Photo {
  id: number
  url: string
}

interface AlbumModalProps {
  onClose: () => void
  photos: Photo[]
}

const AlbumModal = ({ onClose, photos }: AlbumModalProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<File | undefined>(undefined)

  const onSaveImage = () => {
    console.log('save image')
    if (selectedPhoto) {
      console.log('selectedPhoto', selectedPhoto)
    }
  }

  const onDeleteImage = (id: number) => {
    console.log('delete image', id)
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0]
    if (selectedImage) {
      console.log('selectedImage', selectedImage)
      setSelectedPhoto(selectedImage)
    }
  }

  return (
    <Modal title="Álbum" onClose={onClose}>
      <div className=" max-h-80 overflow-auto grid grid-cols-6 gap-2 grid-cols">
        {photos.map((photo) => (
          <div key={photo.id} className="relative">
            <IoMdCloseCircle
              className="absolute top-0 right-0 cursor-pointer"
              onClick={() => onDeleteImage(photo.id)}
            />
            <img src={photo.url} alt="" />
          </div>
        ))}
      </div>
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
