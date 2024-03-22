import React, { useState } from 'react';
import { Image, Transformation } from 'cloudinary-react';
import { CloudinaryContext, uploadMultiple } from 'cloudinary-react';

export async function Cloudinary(e) {
    console.log()

    const files = e.target.files;
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', 'prepper-recipe-view'); 


    try{
        const response = await fetch(
        `https://api.cloudinary.com/v1_1/dh0iihyz2/image/upload`,
        {
            method: 'POST',
            body: formData,
        }
        );
        if (!response.ok) {
            throw new Error('Failed to upload image');
        }

        const data = await response.json();
        return (
            data.url
         );


    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }


}


/*
div for upload


    <CloudinaryContext cloudName="dh0iihyz2">
    
    { image ? 
    (
        
        <Image publicId={image}>
            <Transformation width="300" height="200" crop="fill" />
        </Image>
        
        
    ) 
    : 
    (
        
        <input type="file" onChange={e => handleImageUpload(e)} />
    )
    }
</CloudinaryContext>

#IMPORTS 
                    
import {Cloudinary } from "../components/CloudinaryImageUpload";
import { Image, Transformation } from 'cloudinary-react';
import { CloudinaryContext, uploadMultiple } from 'cloudinary-react'; 

*/