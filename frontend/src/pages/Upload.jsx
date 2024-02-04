import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import styles from "./css/Upload.module.css";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-dropdown-menu";
import ToggleGroup from "@/components/ToggleGroup";
import {Input } from '@/components/ui/input'
import { useSelector } from "react-redux";
import axios from "axios";

const ImageUpload = ({selectedImage,setSelectedImage}) => {


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      previewImage(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    if (file) {
      previewImage(file);
    }
  };

  const previewImage = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      setSelectedImage(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="text-xl font-bold">Upload Image of Your Pet</div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
        id="fileInput"
      />
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => document.getElementById("fileInput").click()}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
          height: "70%",
        }}
        className="mt-auto mb-auto flex flex-col"
      >
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Preview"
            style={{ maxWidth: "100%", height: "", maxHeight: "100%" }}
            className="m-auto"
          />
        ) : (
          <p className="m-auto">Drag and drop or click to select an image</p>
        )}
      </div>
    </div>
  );
};




function Upload() {
  const [tab, setTab] = useState(0);
  
  // ["Male","Female"]
  const [gender,setGender] = useState("Male")
  //["0-15kgs",15-30kgs,30-45kgs,45kgs+]
  const [weight,setWeight] = useState("0-15Kg")
  const [selectedImage,setSelectedImage] = useState(null)
  const [name,setName] = useState('');
  //[cats,dogs,others]
  const [type,setType] = useState('');
  // cats --> ["ragdoll","maine-coon","persian-cat","siamese-cat","others"]
  //Dogs --> ["german-shepherd","labrador","bulldog","husky","others"]
  const [breed,setBreed] = useState('')
  //""
  const [age,setAge] = useState()
  // "Calm" , "Violent" , "Loving", "Others"
  const [personality,setPersonality] = useState('')
  const [stray,setStray] = useState(false)
  // 
  const [city,setCity] = useState('')

  const userId = useSelector((state)=>state.auth.userId)
  async function UploadImage() {
    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('owner', userId);
    formData.append('nickname', name.toLowerCase()); // Convert to lowercase
    formData.append('gender', gender.toLowerCase()); // Convert to lowercase
    formData.append('type', type.toLowerCase()); // Convert to lowercase
    formData.append('breed', breed.toLowerCase()); // Convert to lowercase
    formData.append('age', age);
    formData.append('personality', personality.toLowerCase()); // Convert to lowercase
    formData.append('stray', stray);
    formData.append('weight', weight.toLowerCase()); // Convert to lowercase
    formData.append('city', city.toLowerCase()); // Convert to lowercase
  
    try {
      const data = await axios.post(import.meta.env.VITE_API_LINK + '/dashboard/uploads', formData);
  
      // Handle the response if needed
    } catch (error) {
      console.log(error.message);
    }
  }
 useEffect(()=>{
    console.log(type)
 },[type])
  useEffect(()=>{
    if(tab==1){
      //Call AI API here

    }
    
  },[tab])

  return (
    <>
      <div className="grid grid-cols-5 w-full h-screen">
        <div
          className="col-span-2 h-full flex flex-col justify-center gap-4 pb-60"
          style={{ background: "#F2DF7D" }}
        >
          <div className={styles.leftColumn}>
            <div className="flex flex-col gap-10 fixed">
              <div className="flex flex-row gap-2 items-center text-lg">
                <div className={styles.wrapper}>
                  <div
                    className={` ${
                      tab == 0 ? styles.selected : styles.unselected
                    } ${styles.circle}`}
                  ></div>
                </div>
                <div className={`${tab === 0 ? 'text-3xl' : ''}`}>Upload a Picture</div>
              </div>
              <div className="flex flex-row gap-2 items-center text-lg">
                <div className={styles.wrapper}>
                  <div
                    className={` ${
                      tab == 1 ? styles.selected : styles.unselected
                    } ${styles.circle}`}
                  ></div>
                </div>
                <div className={`${tab === 1 ? 'text-3xl' : ''}`}>AI detection</div>
              </div>
              <div className="flex flex-row gap-2 items-center text-lg">
                <div className={styles.wrapper}>
                  <div
                    className={` ${
                      tab == 2 ? styles.selected : styles.unselected
                    } ${styles.circle}`}
                  ></div>
                </div>
                <div className={`${tab === 2 ? 'text-3xl' : ''}`}>Pet Details</div>
              </div>
              <div className="flex flex-row gap-2 items-center text-lg">
                <div className={styles.wrapper}>
                  <div
                    className={` ${
                      tab == 3 ? styles.selected : styles.unselected
                    } `}
                  ></div>
                </div>
                <div className={`${tab === 3 ? 'text-3xl' : ''}`}>Confirmation</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 h-screen">
          {tab == 0 && (
            <div className="h-full flex flex-col justify-center p-8">
              <ImageUpload selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
              <div className="flex flex-row justify-end p-4">
                <div>
                  <Button onClick={() => setTab(2)}>Upload</Button>
                </div>
              </div>
            </div>
          )}
          {tab == 1 && (
            <div className="h-full flex flex-col justify-center p-8">
              Detecting with AI
            </div>
          )}
          {tab == 2 && (
            <div className="h-full flex flex-col justify-center p-8">
             <div className="flex flex-col m-auto text-xl gap-8">
        <div className="flex flex-row gap-2 items-center ">
        <div>You have a</div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Pet" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="black">Black</SelectItem>
              <SelectItem value="brown">Brown</SelectItem>
              <SelectItem value="others">Other</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
          <div>Coloured</div>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Pet" value={type} onChange={(e)=>setType(e.target.value)} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="cats">Cat</SelectItem>
              <SelectItem value="dogs">Dog</SelectItem>
              <SelectItem value="others">Other</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 text-base">
        <div className=" flex flex-col justify-start gap-0">
            <div className="text-start">Breed</div>
            <Select value={breed} onValueChange={setBreed}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Pet" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="cats">Cat</SelectItem>
              <SelectItem value="dogs">Dog</SelectItem>
              <SelectItem value="others">Other</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        </div> 
        <div>
        <div className="text-start">Gender</div>
          <ToggleGroup arr={["Male","Female"]} state={gender} setState={setGender}/>  
        </div>       
      </div>
      <div className="grid grid-cols-2 text-base">
        <div className=" flex flex-col justify-start gap-0">
            <div className="text-start">Personality</div>
            <Select value={personality} onValueChange={setPersonality}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Pet" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="cats">Cat</SelectItem>
              <SelectItem value="dogs">Dog</SelectItem>
              <SelectItem value="others">Other</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        </div> 
        
        <div className=" flex flex-col justify-start gap-0">
            <div className="text-start">City</div>
            <Select value={city} onValueChange={setCity}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Pet" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="cats">Cat</SelectItem>
              <SelectItem value="dogs">Dog</SelectItem>
              <SelectItem value="others">Other</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        </div>        
      </div>
      <div className="text-base">
      <div>
        <div className="text-start">Weight</div>
          <ToggleGroup arr={["0-15Kg","15-30Kg","30-45Kg","45+Kg"]} state={weight} setState={setWeight}/>  
        </div> 
      </div>
      <div>
        <div>Age</div>
        <Input value={age} onChange={(e)=>setAge(e.target.value)} />
      </div>
      </div>
      <div>
        
      </div>
              <div className="flex flex-row justify-end p-4">
                <div>
                  <Button onClick={()=>setTab(3)}>Next</Button>
                </div>
              </div>
            </div>
          )}
          {tab == 3 && (
            <div className="h-full flex flex-col justify-center p-8">
             <Input  placeholder="Enter the name " value={name} onChange={(e)=>setName(e.target.value)} />
              <div className="flex flex-row justify-end p-4">
                <div>
                  <Button onClick={UploadImage}>Upload</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Upload;
