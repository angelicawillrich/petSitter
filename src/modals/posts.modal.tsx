/* eslint-disable max-len */
import React, { useState } from 'react'
import { IoMdCloseCircle } from 'react-icons/io'
import Button from '../components/button'
import Input from '../components/input'
import Modal from '../components/modal'

interface Posts {
  id: number
  imageUrl: string
  text: string
}

interface PostsModalProps {
  onClose: () => void
  // posts: Posts[]
}

interface FormState {
  photo?: File
  text?: string
}

const posts = [
  { id: 0, imageUrl: 'src/assets/dog1.png', text: 'Oi! Esta é a Mione!' },
  { id: 1, imageUrl: 'src/assets/dog2.png', text: 'Essa é a Cacau!' },
  { id: 2, imageUrl: 'src/assets/dog3.png', text: 'Bom dia!' },
  { id: 3, imageUrl: 'src/assets/dog4.png', text: 'Essa é a Cacau!' },
  { id: 4, imageUrl: 'src/assets/dog1.png', text: 'Oie!' },
  { id: 5, imageUrl: 'src/assets/dog2.png', text: 'Essa é a Cacau!' },
  { id: 6, imageUrl: 'src/assets/dog3.png', text: 'Oi! Esta é a Mione!' },
  { id: 7, imageUrl: 'src/assets/dog4.png', text: 'Essa é a Cacau!' },
]

const PostsModal = ({ onClose /* , posts */ }: PostsModalProps) => {
  const [formState, setFormState] = useState<FormState>()

  const onSavePost = () => {
    console.log('save post')
    if (formState) {
      console.log('formState', formState)
    }
  }

  const onDeletePost = (id: number) => {
    console.log('delete post', id)
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedPost = e.target.files?.[0]
    if (selectedPost) {
      console.log('selectedPost', selectedPost)
      setFormState((previousState) => ({ ...previousState, photo: selectedPost }))
    }
  }
  console.log('formState', formState)

  return (
    <Modal title="Postagens" onClose={onClose}>
      <div className=" max-h-80 overflow-auto grid grid-cols-4 gap-2 grid-cols">
        {posts.map((post) => (
          <div key={post.id} className="relative">
            <div>
              <IoMdCloseCircle
                className="absolute top-0 right-0 cursor-pointer"
                onClick={() => onDeletePost(post.id)}
              />
              <img
                src={post.imageUrl}
                alt=""
                className="w-28"
              />
            </div>
            <span className="text-gray-400 text-xs font-medium">{post.text}</span>
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
          placeholder="Adicione mais fotos..."
        />
        <Input
          label=""
          type="text"
          onChange={(e) => setFormState((previousState) => ({ ...previousState, text: e.target.value }))}
          placeholder="Adicione uma legenda..."
        />
        <Button onClick={() => onSavePost()}>Salvar nova postagem</Button>
      </div>
    </Modal>
  )
}

export default PostsModal
