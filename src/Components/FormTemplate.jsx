import React, { useState } from 'react';
import { db, storage } from '../firebase'; // Import Firebase db and storage
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './FormTemplate.css'; // CSS for styling (if any)
import logo from './image1.png'; // Placeholder logo image

const FormTemplate = () => {
  const [formData, setFormData] = useState({
    companyName: 'Insert Company Name',
    companyDescription: 'Insert Company Description',
    companyOfferings: 'Insert Company Offerings',
    personName: 'Insert Person Name',
    personTitle: 'Insert Person Title',
    quote: 'Insert Quote',
    boilerplate: 'Insert Boilerplate',
    companyLogoURL: null, 
    // Added companyLogoURL state to store the download URL
  });
  const [imageURL, setImageURL] = useState(null);
  const [editField, setEditField] = useState(null);

  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleFieldClick = (field) => {
    setEditField(field);
  };

  const handleSave = async () => {
    try {
      console.log('Starting handleSave...');
      
      // Ensure formData is correctly populated
      console.log('formData:', formData);
  
      const timestamp = serverTimestamp(); // Firestore server timestamp
      console.log('Timestamp:', timestamp);
  
        const storageBucket = 'press-release-24'; // Replace with your Firebase Storage bucket name
        const companyName = formData.companyName; // Assuming formData contains companyName
        const path = 'gs://' + storageBucket + '/images/' + companyName; // Full path including bucket and filename
      
      const storageRef = ref(storage, path);
        // Upload file to Firebase Storage
        const snapshot = await uploadBytes(storageRef, formData.companyLogoPNG);
        console.log('File uploaded successfully:', snapshot);
  
        // Get download URL
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('Download URL:', downloadURL);
  
        // Update companyLogoURL in formData and state
        console.log('Before updating formData:', formData.companyLogoURL);
        setFormData({
          ...formData,
          companyLogoURL: downloadURL, // Ensure downloadURL is correctly obtained
        });
        
        await setDoc(doc(db, 'press-release', formData.companyName), {
          companyName: formData.companyName,
          companyDescription: formData.companyDescription,
          companyOfferings: formData.companyOfferings,
          personName: formData.personName,
          personTitle: formData.personTitle,
          quote: formData.quote,
          boilerplate: formData.boilerplate,
          companyLogoURL: downloadURL,
          timestamp: timestamp,
        });
    
        console.log('After updating formData:', formData.companyLogoURL);
        // Log updated formData
        console.log('Updated formData:', formData.companyLogoURL);
  
        // Alert user
        alert('Image uploaded successfully!');


      console.log('Form data saved successfully to Firestore!');
  
      // Alert user
      alert('Form submitted!');
    } catch (error) {
      console.error('Error saving form data: ', error);
    }
  };
  

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file.type === 'image/png') {
      // Set companyLogoPNG in formData
      setFormData({
        ...formData,
        companyLogoPNG: file,
      });

      // Optionally store the file object if needed

      // Get download URL for the uploaded file
      const reader = new FileReader();
      reader.onload = function (e) {
        setImageURL(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a PNG file.');
    }
  };

  return (
    <div>
      <div className="logos">
        <img src={logo} alt="" />
        <label>
          Upload Image:
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {imageURL && (
            <img
              src={imageURL}
              alt="Uploaded Image"
              style={{ maxWidth: '100%', marginTop: '10px' }}
            />
          )}
        </label>
      </div>
      <h1>NEW MEMBER PRESS RELEASE</h1>
      <p>
        The Canadian Out-of-Home Marketing and Measurement Bureau (COMMB) has added to their roster of association members, which now includes{' '}
        <span className='clickable' onClick={() => handleFieldClick('companyName')}>
          {editField === 'companyName' ? (
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              onBlur={() => setEditField(null)}
              autoFocus
            />
          ) : (
            formData.companyName
          )}
        </span>.
      </p>
      <p>
        {formData.companyName} is a{' '}
        <span className='clickable' onClick={() => handleFieldClick('companyDescription')}>
          {editField === 'companyDescription' ? (
            <input
              type="text"
              value={formData.companyDescription}
              onChange={(e) => handleInputChange('companyDescription', e.target.value)}
              onBlur={() => setEditField(null)}
              autoFocus
            />
          ) : (
            formData.companyDescription
          )}
        </span>. Their network includes{' '}
        <span className='clickable' onClick={() => handleFieldClick('companyOfferings')}>
          {editField === 'companyOfferings' ? (
            <input
              type="text"
              value={formData.companyOfferings}
              onChange={(e) => handleInputChange('companyOfferings', e.target.value)}
              onBlur={() => setEditField(null)}
              autoFocus
            />
          ) : (
            formData.companyOfferings
          )}
        </span>.
      </p>
      <p>
        <span className='clickable' onClick={() => handleFieldClick('personName')}>
          {editField === 'personName' ? (
            <input
              type="text"
              value={formData.personName}
              onChange={(e) => handleInputChange('personName', e.target.value)}
              onBlur={() => setEditField(null)}
              autoFocus
            />
          ) : (
            formData.personName
          )}
        </span>, {' '}
        <span className='clickable' onClick={() => handleFieldClick('personTitle')}>
          {editField === 'personTitle' ? (
            <input
              type="text"
              value={formData.personTitle}
              onChange={(e) => handleInputChange('personTitle', e.target.value)}
              onBlur={() => setEditField(null)}
              autoFocus
            />
          ) : (
            formData.personTitle
          )}
        </span>, shares their excitement about joining COMMB.{' '}{formData.personName}{' '}states,{' "'}
        <span className='clickable' onClick={() => handleFieldClick('quote')}>
          {editField === 'quote' ? (
            <input
              type="text"
              value={formData.quote}
              onChange={(e) => handleInputChange('quote', e.target.value)}
              onBlur={() => setEditField(null)}
              autoFocus
            />
          ) : (
            formData.quote
          )}
        </span>
        {'".'}
      </p>
      <p>
        COMMB, committed to providing measurement and marketing solutions for the Canadian OOH industry, is excited to welcome{' '}
        {formData.companyName} to its membership. They look forward to collaborating closely with their team across various facets of the OOH landscape.
      </p>
      <p>
        <strong>About </strong>
        {formData.companyName}
        <br />
        <span className='clickable' onClick={() => handleFieldClick('boilerplate')}>
          {editField === 'boilerplate' ? (
            <input
              type="text"
              value={formData.boilerplate}
              onChange={(e) => handleInputChange('boilerplate', e.target.value)}
              onBlur={() => setEditField(null)}
              autoFocus
            />
          ) : (
            formData.boilerplate
          )}
        </span>
      </p>
      <p>
        For more information, please contact:
        <br />
        Jennifer Copeland
        <br />
        Director, Brand Communications
        <br />
        jcopeland@commb.ca
      </p>
      {/* Save button (for demonstration, adjust functionality as needed) */}
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default FormTemplate;
