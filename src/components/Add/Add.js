import React from 'react'
import Select from 'react-select'

const optionsSpecies = [
    { value: 'trout', label: 'Trout' },
    { value: 'salmon', label: 'Salmon' },
    { value: 'grayling', label: 'Grayling' },
    { value: 'rainbowtrout', label: 'Rainbowtrout'}
  ]

const optionsCm = []

function addOptions() {
    for (let i = 1; i < 201; i++) {
        optionsCm.push({value: i, label: i + ' cm'})
    }
}

addOptions()

export default function Add(props) {
  return (
    <div className='add'>
        <form>
            <Select 
                options={optionsSpecies}
                placeholder='Species' />
            <Select
                options={optionsCm}
                placeholder='cm' />  
        </form>
    </div>
  )
}

