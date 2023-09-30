import React, { useState, useEffect } from 'react';

export const useImageupload = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(
      'https://api.imgbb.com/1/upload?key=70fb97e516483d52ddf8b1cd4d5d1698',
      {
        method: 'POST',
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.data.url;
    } else {
      console.error('Failed to upload image');
      return null;
    }
  } catch (error) {
    console.error('Error uploading image', error);
    return null;
  }
};