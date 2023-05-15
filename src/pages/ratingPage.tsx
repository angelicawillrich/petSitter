import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import Button from '../components/baseComponents/button'
import TextArea from '../components/baseComponents/textArea'
import { Rating } from '../components/rating'
import { searchRating } from '../utils'
import { IUpdateRating, updateRating } from '../api/rating.api'
import { StoreContext } from '../context/context'

const initialState = {
  _id: '',
  rating: 5,
  description: '',
}

const RatingPage = () => {
  const [formState, setFormState] = useState<IUpdateRating>(initialState)
  const { getUserWithToken } = useContext(StoreContext)

  const {
    userId, petSitterId, reviewedByPetSitter, ratingId,
  } = useParams()
  console.log(userId, petSitterId, reviewedByPetSitter)
  console.log({ formState })

  const navigate = useNavigate()

  useEffect(() => {
    getUserWithToken(() => navigate('/login'))
  }, [])

  const getRating = async () => {
    if (ratingId) {
      try {
        const filter = new URLSearchParams({ _id: ratingId })
        const searchResult = await searchRating(filter.toString())
        console.log({ searchResult })
        setFormState({
          _id: searchResult._id,
          rating: searchResult.rating,
          description: searchResult.description,
        })
      } catch (err: any) {
        alert('Não foi possível encontrar a avaliação.')
        navigate('-1')
      }
    }
  }

  useEffect(() => {
    if (ratingId) getRating()
  }, [ratingId])

  const onSetRating = (value: number) => {
    setFormState((previousState) => ({ ...previousState, rating: value }))
    console.log({ value })
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
      await updateRating(data)
      alert('Sua avaliação foi salva com sucesso!')
      navigate(-1)
    } catch (error: any) {
      console.error(error)
      alert(JSON.parse(error.request.responseText).message)
    }
  }

  const handleSubmitCreate = async () => {
    console.log('aa')
  }

  return (
    <div className="flex flex-col max-w-xl justify-center items-center gap-6">
      <header>
        <img src={Logo} alt="PetSitter logomarca" />
      </header>
      <div className="flex flex-col">
        <span>Olá!</span>
        <span>
          Você contratou o serviço de
          {' '}
          <b>Maria A.</b>
          {' '}
          e nós gostaríamos de saber a sua opinião sobre este(a) PetSitter. A sua avaliação ficará disponível na página do(a) PetSitter onde outras pessoas poderão vê-la.
        </span>
      </div>
      <Rating rating={formState.rating} onClick={onSetRating} />
      <form className="flex flex-col w-full items-center justify-center gap-6" onSubmit={ratingId ? handleSubmitUpdate : handleSubmitCreate}>
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
        <Button type="submit">Enviar avaliação</Button>
      </form>
    </div>
  )
}

export default RatingPage
