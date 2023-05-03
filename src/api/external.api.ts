import React from 'react'
import axios from 'axios'

export const getStates = async () => {
  const baseUrl = 'https://servicodados.ibge.gov.br/'
  const url = `${baseUrl}api/v1/localidades/estados`
  const result = axios.get(url)
  return result
}

export const getCitiesByState = async (stateId: number) => {
  const baseUrl = 'https://servicodados.ibge.gov.br/api/v1/'
  const url = `${baseUrl}localidades/estados/${stateId}/municipios`
  const result = axios.get(url)
  return result
}
