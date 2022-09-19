import React, { useEffect } from 'react'
import { Slider, Flex, SliderTrack, SliderFilledTrack, SliderThumb, Text } from '@chakra-ui/react'
import { useState } from 'react'

export default function MintAmount(props) {

    const [sliderValue, setSliderValue] = useState(100)

    function getNumber(sliderValue){
        if(sliderValue<=101){
            return <b>1</b>
        } else if(sliderValue<201 && sliderValue>100){
            return <b>2</b>
        } else if(sliderValue<301 && sliderValue>200){
            return <b>3</b>
        } else if(sliderValue<401 && sliderValue>300){
            return <b>4</b>
        } else if(sliderValue<501 && sliderValue>400){
            return <b>5</b>
        }
    }

    useEffect(()=>{
        props.updateFunction(sliderValue/100)
    },[sliderValue])


  return (
   
        <Slider defaultValue={100} min={100} max={500} step={100} onChange={(v)=>{setSliderValue(v)}}>
            <SliderTrack bg="blackAlpha.300" >
                <SliderFilledTrack bg='blue.200'/>
            </SliderTrack>
            <SliderThumb boxSize={8} bg='blue.200' >
                {getNumber(sliderValue)}
            </SliderThumb>
        </Slider>
   
  )
}
