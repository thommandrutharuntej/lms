import React from 'react'

const Companies = () => {
  const companyLogos = [
    { name: 'Microsoft', url: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
    { name: 'Google', url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
    { name: 'IBM', url: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg' },
    { name: 'PayPal', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg' },
    { name: 'Netflix', url: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
    { name: 'Amazon', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' }
  ]

  return (
    <div className='w-full bg-[var(--color-bg)] pb-12 px-4 sm:px-10 md:px-20 lg:px-36 border-b border-[var(--color-border)]'>
      <p className='text-center text-[15px] font-medium text-[var(--color-text-secondary)] mb-8'>
        Trusted by learners from
      </p>
      <div className='flex flex-wrap items-center justify-center gap-10 md:gap-16 lg:gap-20'>
        {companyLogos.map((company, index) => (
          <img
            key={index}
            src={company.url}
            alt={`${company.name} logo`}
            className='h-6 md:h-8 object-contain opacity-55 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300'
          />
        ))}
      </div>
    </div>
  )
}

export default Companies
