/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/baseComponents/button'
import TextArea from '../components/baseComponents/textArea'
import { Rating } from '../components/rating'
import { searchRating } from '../utils'
import { IUpdateRating, createRating, updateRating } from '../api/rating.api'
import { StoreContext } from '../context/context'
import Modal from '../components/baseComponents/modal'

interface IRatingProps {
  reviewerId?: string
  reviewedId?: string
  reviewedName: string
  reviewedByPetSitter?: boolean
  ratingId?: string
  onClose: () => void
}

const initialState = {
  _id: '',
  rating: 5,
  description: '',
}

const RatingModal = ({
  ratingId, reviewedName, reviewedByPetSitter, reviewedId, reviewerId, onClose,
}: IRatingProps) => {
  const [formState, setFormState] = useState<IUpdateRating>(initialState)
  const { getLoggedInUser, loggedInUser } = useContext(StoreContext)

  const getRating = async () => {
    if (ratingId) {
      try {
        const filter = new URLSearchParams({ _id: ratingId })
        const searchResult = await searchRating(filter.toString())
        setFormState({
          _id: searchResult._id,
          rating: searchResult.rating,
          description: searchResult.description,
        })
      } catch (err: any) {
        alert('Não foi possível encontrar a avaliação.')
        onClose()
      }
    }
  }

  useEffect(() => {
    if (ratingId) getRating()
  }, [ratingId])

  const onSetRating = (value: number) => {
    setFormState((previousState) => ({ ...previousState, rating: value }))
  }

  const handleSubmitUpdate = async () => {
    if (!formState.description) {
      alert('Por favor, preecha o campo de texto.')
    }
    try {
      const data = {
        _id: formState._id,
        description: formState.description,
        rating: formState.rating,
      }
      const result = await updateRating(data)

      if (result) {
        loggedInUser && await getLoggedInUser(loggedInUser?._id)
        alert('Sua avaliação foi salva com sucesso!')
        onClose()
      }
    } catch (error: any) {
      console.error(error)
      alert(JSON.parse(error.request.responseText).message)
    }
  }

  const handleSubmitCreate = async () => {
    if (!formState.description) {
      alert('Por favor, preecha o campo de texto.')
    }
    if (reviewedByPetSitter === undefined || !reviewedId || !reviewerId) {
      alert('Não foi possível completar a operação.')
      return
    }
    try {
      const data = {
        description: formState.description,
        rating: formState.rating,
        reviewedByPetSitter,
        reviewerId,
        reviewedId,
        createdAt: new Date(),
      }
      const result = await createRating(data)
      if (result) {
        loggedInUser && await getLoggedInUser(loggedInUser?._id)
        alert('Sua avaliação foi salva com sucesso!')
        onClose()
      }
    } catch (error: any) {
      console.error(error)
      alert(JSON.parse(error.request.responseText).message)
    }
  }

  const text = reviewedByPetSitter
    ? (
      <div className="flex flex-col">
        <span>Olá!</span>
        <span>
          Você foi recentemente contratado por
          {' '}
          <b>{reviewedName}</b>
          {' '}
          e nós gostaríamos de saber a sua opinião sobre este(a) usuário(a). A sua avaliação ficará disponível na página do(a) usuário(a) onde outros PetSitters poderão vê-la.
        </span>
      </div>
    )
    : (
      <div className="flex flex-col">
        <span>Olá!</span>
        <span>
          Você contratou o serviço de
          {' '}
          <b>{reviewedName}</b>
          {' '}
          e nós gostaríamos de saber a sua opinião sobre este(a) PetSitter. A sua avaliação ficará disponível na página do(a) PetSitter onde outras pessoas poderão vê-la.
        </span>
      </div>
    )

  return (
    <Modal title="Avaliacao" onClose={onClose}>
      <div className="flex flex-col max-w-xl justify-center items-center gap-6">
        {text}
        <Rating rating={formState.rating} onClick={onSetRating} />
        <div className="flex flex-col w-full">
          <TextArea
            id="comment"
            value={formState.description}
            rows={3}
            placeholder="Comentário..."
            maxLength={200}
            required
            onChange={(e) => setFormState((previousState) => ({ ...previousState, description: e.target.value }))}
          />
          <span className="text-[12px]">Máx. 200 caracteres</span>
        </div>
        <Button
          type="button"
          onClick={() => (ratingId ? handleSubmitUpdate() : handleSubmitCreate())}
        >
          Enviar avaliação
        </Button>
      </div>
    </Modal>
  )
}

export default RatingModal
