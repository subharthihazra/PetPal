import React, { useState } from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup,RadioGroupItem } from './ui/radio-group'

function FilterSideBar() {
    const [petType,setPetType] = useState("Dog")
    return (
        // className='transition ease-in-out duration-200'
        <div className='fixed left-0 h-screen flex flex-col z-50 bg-white w-72 sm:w-96 p-4 ease-in-out duration-200'>
            <div className='text-2xl mb-4 font-bold'>Filter Your Search</div>
            <hr /> 
            <div className='overflow-y-auto overflow-visible mt-4' >
                <div className='flex flex-col gap-2'>
                    <di className="font-semibold">Pet Type</di>
                    <div>
                        <RadioGroup defaultValue="cats">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="dogs" id="r1" />
                                <Label htmlFor="r1">Dogs</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="cats" id="r2" />
                                <Label htmlFor="r2">Cats</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="others" id="r3" />
                                <Label htmlFor="r3">Others</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterSideBar