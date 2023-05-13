/* eslint-disable max-len */
import React, { useContext, useState } from 'react'
import { IoMdCloseCircle } from 'react-icons/io'
import Button from '../components/baseComponents/button'
import Input from '../components/baseComponents/input'
import Modal from '../components/baseComponents/modal'
import { createPost, deletePost } from '../api/user.api'
import { StoreContext } from '../context/context'
import { convertBase64 } from '../utils'
import { path } from '../shared'

interface PostsModalProps {
  onClose: () => void
}

interface FormState {
  filename?: any
  description?: string
}

const initialState = {
  filename: '',
  description: '',
}

const PostsModal = ({ onClose }: PostsModalProps) => {
  const [formState, setFormState] = useState<FormState>(initialState)
  const [selectedPostImage, setSelectedPostImage] = useState<File | undefined>(undefined)

  const { getLoggedInPetSitter, loggedInPetSitter } = useContext(StoreContext)

  const onSavePost = async () => {
    try {
      if (!loggedInPetSitter || !selectedPostImage || !formState.description) {
        alert('Erro ao salvar post! Todos os campos são obrigatórios.')
        return
      }

      const image = await convertBase64(selectedPostImage)
      const addData = {
        petSitterId: loggedInPetSitter._id,
        filename: image,
        description: formState.description,
      }
      await createPost(addData)
      setFormState(initialState)
      setSelectedPostImage(undefined)
      getLoggedInPetSitter(loggedInPetSitter?._id)
      alert('Post salvo com sucesso!')
      onClose()
    } catch (error: any) {
      console.error({ error })
      alert(JSON.parse(error.request.responseText).message)
    }
  }

  const onDeletePost = async (postId: string) => {
    try {
      if (!loggedInPetSitter?.posts) return

      const deleteDataParams = new URLSearchParams({ userId: loggedInPetSitter._id, postId })
      await deletePost(deleteDataParams.toString())
      if (loggedInPetSitter) getLoggedInPetSitter(loggedInPetSitter?._id)
      alert('Post removido com sucesso!')
    } catch (error: any) {
      console.error({ error })
      alert(JSON.parse(error.request.responseText).message)
    }
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const postImage = e.target.files?.[0]
    if (postImage) {
      setSelectedPostImage(postImage)
      setFormState((previousState) => ({ ...previousState, filename: postImage }))
    }
  }

  return (
    <Modal title="Postagens" onClose={onClose}>
      <div className=" max-h-80 overflow-auto grid grid-cols-2 gap-2 grid-cols">
        {loggedInPetSitter?.posts.map((post) => (
          <div key={post._id} className="relative p-2 flex flex-col">
            <IoMdCloseCircle
              className="absolute top-0 right-0 cursor-pointer"
              onClick={() => onDeletePost(post._id)}
            />
            <img src={`${path}${post.filename}`} alt="" />
            <span className="text-gray-400 text-xs font-medium">{post.description}</span>
            <span className="text-gray-400 text-[8px]">{new Date(post.date).toLocaleDateString('pt-BR')}</span>
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
          required
        />
        <Input
          label=""
          type="text"
          onChange={(e) => setFormState((previousState) => ({ ...previousState, description: e.target.value }))}
          placeholder="Adicione uma legenda..."
          required
        />
        <Button onClick={() => onSavePost()}>Salvar nova postagem</Button>
      </div>

    </Modal>
  )
}

export default PostsModal
