import React from 'react'
import { useContext } from 'react'
import { TravelInfoStateContext } from '..'
import 'react-dates/initialize';
import DateRangePickerExample from './DateRange'
export default function Header() {
    const { travelInfo, setTravelInfo } = useContext(TravelInfoStateContext)
    return (
        <div>
        <DateRangePickerExample/>
        </div>
    )
}
