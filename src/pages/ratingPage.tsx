import React, { useState } from 'react'
import Logo from '../assets/logo.svg'
import Button from '../components/baseComponents/button'
import TextArea from '../components/baseComponents/textArea'
import { Rating } from '../components/rating'

const RatingPage = () => {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  console.log(comment)

  const onRating = (value: number) => {
    setRating(value)
    console.log({ value })
  }

  const handleSubmit = () => {
    console.log({ comment })
    console.log({ rating })
    alert('Obrigado pela sua avaliação!')
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
      <Rating rating={rating} onClick={onRating} />
      <form className="flex flex-col w-full items-center justify-center gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full">
          <TextArea
            id="comment"
            rows={3}
            placeholder="Comentário..."
            maxLength={200}
            required
            onChange={(e) => setComment(e.target.value)}
          />
          <span className="text-[12px]">Máx. 200 caracteres</span>
        </div>
        <Button type="submit">Enviar avaliação</Button>
      </form>
    </div>
  )
}

export default RatingPage
