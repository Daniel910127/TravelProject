import React from 'react'

export default function index() {
  let count = 1
  let arr =  ['a','b','c']
  return (
    <div>
        {arr.map(item => <div>{item} {count++}</div>)}
       
    </div>
  )
}
