import { Book, GitFork, Star } from 'lucide-react'
import React from 'react'

export default function CardLoading() {
  return (
    <div className='w-full'>
        <div className='flex h-[200px]  flex-col border-2 bg-slate-800 animate-pulse  relative rounded-md p-4  hover:bg-slate-500 hover:shadow-md transition-all'>
            <div className='flex items-center gap-3'>
                <Book width="15px" className='fill-blue-400'></Book> 
                <span className=' h-5 w-12 rounded-md bg-gray-400'></span> 
                <span className='text-gray-500'>Public</span>
            </div>
            
            <div className='text-slate-200 flex flex-col gap-3 mt-2 text-ellipsis overflow-hidden'>
             <div className=' h-2 w-full rounded-full bg-gray-400'></div>
             <div className=' h-2 w-full rounded-full bg-gray-400'></div>
             <div className=' h-2 w-full rounded-full bg-gray-400'></div>
             <div className=' h-2 w-full rounded-full bg-gray-400'></div>
             <div className=' h-2 w-full rounded-full bg-gray-400'></div>
            </div> 
            <div className='flex relative items-center mt-2'>
                <div className='bg-gray-200 rounded-md px-2 py-1 text-gray-600 text-sm'></div> 
                <Star width="15px" className='fill-yellow-400 ml-2'/> 
                <div className='bg-gray-200 rounded-md px-2 py-1 text-gray-600 text-sm'></div> 
                <GitFork width="15px" className='fill-gray-400 ml-2'/> 
            </div>
        </div>    
    </div>
  )

   
}

