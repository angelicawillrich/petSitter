import React from 'react'
import Dummy1 from '../assets/dummy1.png'
import { showStars } from '../utils'
import Accordion from '../components/accordion'
import { especies } from '../shared'

const photos = [
  { id: 0, url: 'src/assets/dog1.png' },
  { id: 1, url: 'src/assets/dog2.png' },
  { id: 2, url: 'src/assets/dog3.png' },
  { id: 3, url: 'src/assets/dog1.png' },
  { id: 4, url: 'src/assets/dog2.png' },
  { id: 5, url: 'src/assets/dog1.png' },
  { id: 6, url: 'src/assets/dog2.png' },
  { id: 7, url: 'src/assets/dog3.png' },
  { id: 8, url: 'src/assets/dog1.png' },
  { id: 9, url: 'src/assets/dog2.png' },
  { id: 10, url: 'src/assets/dog1.png' },
  { id: 11, url: 'src/assets/dog2.png' },
  { id: 12, url: 'src/assets/dog3.png' },
  { id: 13, url: 'src/assets/dog1.png' },
  { id: 14, url: 'src/assets/dog2.png' },
  { id: 15, url: 'src/assets/dog1.png' },
  { id: 16, url: 'src/assets/dog2.png' },
  { id: 17, url: 'src/assets/dog3.png' },
  { id: 18, url: 'src/assets/dog1.png' },
  { id: 19, url: 'src/assets/dog2.png' },
  { id: 20, url: 'src/assets/dog1.png' },
  { id: 21, url: 'src/assets/dog2.png' },
  { id: 22, url: 'src/assets/dog3.png' },
  { id: 23, url: 'src/assets/dog1.png' },
  { id: 24, url: 'src/assets/dog2.png' },
  { id: 25, url: 'src/assets/dog1.png' },
  { id: 26, url: 'src/assets/dog2.png' },
  { id: 27, url: 'src/assets/dog3.png' },
  { id: 28, url: 'src/assets/dog1.png' },
  { id: 29, url: 'src/assets/dog2.png' },
]

const pets = [
  {
    name: 'Cacau',
    yearBirth: '2014',
    weight: '8 kg',
    specie: '0',
    breed: 'vira-lata',
    picture: null,
    others: 'A cacau é uma cachorrinha muito querida',
  },
  {
    name: 'Mione',
    yearBirth: '2014',
    weight: '6 kg',
    specie: '0',
    breed: 'vira-lata',
    picture: null,
    others: 'A Mione é uma cachorrinha muito querida',
  },
]

const PageUser = () => {
  return (
    <div className="flex flex-row flex-3 w-full h-full gap-8 justify-center">
      <div className="flex flex-col flex-1 h-full basis-3/5 divide-y divide-y-reverse divide-gray-100">
        <div>
          <div className="flex flex-row gap-4">
            <div className="flex justify-center items-center mb-3">
              <img
                src={Dummy1}
                alt="dummy1"
                className="w-12 h-12"
              />
              <div className="fley flex-col">
                <h1>Angélica Willrich</h1>
                <div className="flex">{showStars(4)}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col text-gray-900 text-base">
            <span>Rua das Margaridas, nro 1</span>
            <span>
              Laranjal - Pelotas - RS
            </span>
            <span>
              maria.a@email.com.br
            </span>
            <span>
              (53) 123456789
            </span>
          </div>
        </div>
        <div />
        <div className="flex flex-col gap-3 mt-4 pb-3">
          <h1>Pets</h1>
          {pets && pets.map((pet) => (
            <Accordion
              header={(
                <div className="flex flex-row gap-2">
                  {pet.picture
              && <img className="h-10 w-10 rounded-full object-cover" src={URL.createObjectURL(pet.picture)} alt="Foto do pet" />}
                  {pet.name}
                </div>
          )}
              key={pet.name}
              showControllers={false}
            >

              <div className="flex flex-col w-full gap-1 justify-items-start mb-6 mt-4">
                <div>
                  Ano de nascimento:
                  {' '}
                  {pet.yearBirth}
                </div>
                <div>
                  Peso:
                  {' '}
                  {pet.weight}
                </div>
                <div>
                  Espécie:
                  {' '}
                  {especies.find((specie) => String(specie.id) === pet.specie)?.label }
                </div>
                <div>
                  Raca:
                  {' '}
                  {pet.breed}
                </div>
                <div>
                  Outras informacoes:
                  {' '}
                  {pet.others}
                </div>
              </div>
            </Accordion>
          ))}
        </div>
        <div>
          <div className="max-h-96 overflow-auto grid grid-cols-4 gap-2 grid-cols mt-4">
            {photos.map((photo) => (
              <div key={photo.id}>
                <img
                  src={photo.url}
                  alt=""
                  className="w-40"
                />
              </div>
            ))}

          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 h-full basis-2/5 divide-y divide-y-reverse divide-gray-100">
        <div className="mt-4">
          <h1 className="mb-3">Avaliações 3.5/5</h1>
          <div>
            <div className="flex flex-col mb-4">
              <span className="text-base text-gray-900">Ótima cliente!</span>
              <div className="flex flex-row">
                {showStars(4)}
              </div>
              <span>José da Silva</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base text-gray-900">A Angélica já é minha cliente há anos e é super pontual.</span>
              <div className="flex flex-row">
                {showStars(3)}
              </div>
              <span>Joana Silveira</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
export default PageUser
