import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { typeToBreed } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ToggleGroup from "./ToggleGroup";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function FilterSideBar({
  petType,
  setPetType,
  gender,
  setGender,
  weight,
  setWeight,
  age,
  setAge,
  city,
  setCity,
  breed,
  setBreed,
  setFilterApplied
}) {
  const [breedFilter, setBreedFilter] = useState([]);
  useEffect(() => {
    setBreedFilter(typeToBreed[petType]);
  }, [petType]);

  return (
    // className='transition ease-in-out duration-200'
    <div className="fixed left-0 h-screen flex flex-col z-50 bg-white w-72 sm:w-96 p-4 ease-in-out duration-200">
      <div className="text-2xl mb-4 font-bold flex flex-row justify-between">
        <span>Filter Your Search</span>
        <Button variant="outline" onClick={()=>setFilterApplied(true)} >Apply Filters</Button>
      </div>
      <hr />
      <div className="overflow-y-auto overflow-visible mt-4">
        <div className="flex flex-col gap-2">
          <div className="font-semibold">Pet Type</div>
          <div>
            <RadioGroup
              value={petType}
              onValueChange={setPetType}
            >
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

            { breedFilter?.length > 0 && 
        <div>
            <div className="font-semibold">Breed</div>
          <div>
            <Select value={breed} onValueChange={setBreed}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Breed" />
              </SelectTrigger>
              <SelectContent>
                {breedFilter.map((e)=>(
                    <SelectItem value={e}>{e}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        }
        <div>
            <div>Gender</div>
        <div>
        <RadioGroup
              value={gender}
              onValueChange={setGender}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="r1" />
                <Label htmlFor="r1">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="r2" />
                <Label htmlFor="r2">Female</Label>
              </div>
            </RadioGroup>
        </div>
        </div>
        <div>
            <div>Weight</div>
            <div>
            <RadioGroup
              value={weight}
              onValueChange={setWeight}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0-15kgs" id="r1" />
                <Label htmlFor="r1">0-15kgs</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="15-30kgs" id="r2" />
                <Label htmlFor="r2">15-30kgs</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="30-45kgs" id="r3" />
                <Label htmlFor="r3">30-45kgs</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="45kgs+" id="r4" />
                <Label htmlFor="r3">45kgs+</Label>
              </div>
            </RadioGroup>
            </div>
        </div>
        <div>
            <div>Max Age</div>
            <div>
                <Input placeholder="Enter the maximum age" value={age} onChange={(e)=>{
                    setAge(e.target.value)
                }} />
            </div>
        </div>
        <div>

        </div>
      </div>
    </div>
  );
}

export default FilterSideBar;
