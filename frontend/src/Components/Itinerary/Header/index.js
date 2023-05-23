import React from 'react'
import { useContext } from 'react'
import { TravelInfoStateContext } from '..'
import CustomRangePicker from './DateRange'
export default function Header() {
    const { travelInfo, setTravelInfo } = useContext(TravelInfoStateContext)
    return (
        <div>Header
        <CustomRangePicker/>

        </div>
    )
}
