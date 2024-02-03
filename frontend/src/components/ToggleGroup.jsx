import React from 'react'

function ToggleGroup({arr,state,setState}) {
    console.log(arr)
  return (
    <div 
    style={{
        background : 'hsl(var(--muted))',

    }}
     className={`rounded grid grid-cols-${arr.length}  pt-1 pb-1 pl-2 pr-2`}>{
        arr.map((e)=>(
            <div className={`${state==e ? 'bg-white' : ''} rounded cursor-pointer`} onClick={()=>setState(e)} key={e}>{e}</div>
        ))
    }</div>
  )
}
 
export default ToggleGroup