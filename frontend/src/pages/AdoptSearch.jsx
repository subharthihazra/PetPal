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
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  
import { ChevronDownIcon , MixerHorizontalIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

function AdoptSearch() {
    const [sortBy,setSortby] = useState('newest')
    const [filterOpen , setFilterOpen] = useState(false);
    const [page,setPage] = useState(1);
    const [filters,setFilters] = useState({
        type : 'cats',
        
    })
    const [petType,setPetType] = useState("")
    const [gender,setGender] = useState("")
    const [weight,setWeight] = useState("")
    const [age,setAge] = useState()
    const [city,setCity] = useState('')
    const [breed,setBreed] = useState('')

    const [searchParams,setSearchparams] = useSearchParams()
    const [queryCall,setQueryCall] = useState('')
    function objectToQueryString(obj) {
        const ans = Object.entries(obj)
          .map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value))
          .join('&');
          setQueryCall(ans)
      }
    useEffect(()=>{
        let query = {}
        if(petType.length>0){
            query.type = petType.toLowerCase()
        }
        if(gender.length>0){
            query.gender = gender.toLowerCase()
        }
        if(weight.length>0){
            query.weight = weight
        }
        if(age!=null){
            query.age = age;
        }
        if(breed.length>0){
            query.breed = breed
        }
        setSearchparams(
            query
        )

        objectToQueryString({
            age,gender,breed,
            type : petType,
            weight,
        })
    },[petType,gender,weight,age,city,breed])
  
      
    useEffect(()=>{
        axios.get(import.meta.env.VITE_API_LINK + `/discover/page/${page}?`+queryCall)
        console.log(searchParams)
    },[])
    return (
        <>
        <div>
            {filterOpen && <><div ><FilterSideBar petType={petType} setPetType={setPetType}
            gender={gender} setGender={setGender} weight={weight} setWeight={setWeight}
            age={age} setAge={setAge} city={city} setCity={setCity} breed={breed} setBreed={setBreed}  /></div>
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
        <Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>

                        </>
    )
}

export default AdoptSearch