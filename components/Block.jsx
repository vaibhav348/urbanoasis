import Image from "next/image"

const Block = ({sym,title, para}) => {
  return (
    <div className='border-r border-gray-200 w-50 h-full flex items-center px-2'>
    <p className="text-2xl m-2 ">{sym}</p>
           <div>
   
        <h3 className="font-bold text-sm">{title}</h3>
        <p className="text-gray-400 text-xs line-clamp-1">{para}</p>
    </div>
    </div>
  )
}

export default Block