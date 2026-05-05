import React from 'react'

const Loading = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-[var(--color-bg)] w-full'>
      <div className='flex flex-col items-center gap-4'>
        <div className='w-12 h-12 border-4 border-gray-200 border-t-[var(--color-primary)] rounded-full animate-spin'></div>
        <p className='text-[var(--color-text-secondary)] font-medium text-[15px] animate-pulse'>
          Loading...
        </p>
      </div>
    </div>
  )
}

export default Loading
