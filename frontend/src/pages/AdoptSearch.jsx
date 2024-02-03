import FilterSideBar from '../components/FilterComponent'
import Navbar from '../components/Navbar'
import PetCard from '../components/PetCard'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuRadioItem,
    DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu"
import { ChevronDownIcon , MixerHorizontalIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

function AdoptSearch() {
    const [sortBy,setSortby] = useState('newest')
    const [filterOpen , setFilterOpen] = useState(false);
    return (
        <div>
            {filterOpen && <><div ><FilterSideBar /></div>
            <div className='h-screen w-screen fixed bg-black opacity-50 z-20' onClick={()=>setFilterOpen(false)}></div>
            </> }
            <div className='p-4'>
                <Navbar />
            </div>
            <div className='text-center text-4xl mt-4'>Yay we found 897 pets for you to adopt</div>
            <div className='m-8 flex justify-center items-center'>
                <div className='flex flex-row justify-between w-11/12'>
                    <div className=''><Button variant="secondary" onClick={()=>setFilterOpen(true)}><MixerHorizontalIcon className='mr-2' />Filter</Button></div>
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Sort By <ChevronDownIcon className='ml-2'/></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortby}>
                                    <DropdownMenuRadioItem value="newest">Newest Addition</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="oldest">Oldest Addition</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="popular">Popular</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-3 m-6'>
                <div className='w-full flex justify-center '>

                    <PetCard image='/cat.png' name="Vercel" gender="Non-binary" health="Down sometimes"
                        description="Vercel is famous because it give people hosting freeeee, also next js"
                        location="Kolkata, India" />
                </div>
                <div className='w-full flex justify-center '>
                    <PetCard image='/cat2.webp' name="Netlify" gender="Female" health="Up usually"
                        description="Wannabe Vercel but fails due to UX"
                        location="Kolkata, India" />
                </div>
                <div className='w-full flex justify-center '>
                    <PetCard image='/cat3.webp' name="Heroku" gender="Rather Not say" health="Up always"
                        description="Greedy, charges money due to being spoiled by crypto miners"
                        location="Kolkata, India" />
                </div>
            </div>
        </div>
    )
}

export default AdoptSearch