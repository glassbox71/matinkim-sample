import React from 'react'
import { qnadata } from '../data2/Qna'

export default function Qan() {
  return (
    <div>{qnadata.map((q)=>(
        <div>
            <h2>{q.q}</h2>
            <p>{q.a}</p>
        </div>
    ))}
        </div>
  )
}
