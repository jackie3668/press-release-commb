import React, { useState } from 'react';
import { db, storage } from '../firebase'; // Import Firebase db and storage
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
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
    logoWidth: null, // Added logoWidth state
    logoHeight: null, // Added logoHeight state
  });
  const [imageURL, setImageURL] = useState(null);
  const [editField, setEditField] = useState(null);
  const [widthTemp, setWidthTemp] = useState(null);
  const [heightTemp, setHeightTemp] = useState(null);

  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
    document.getElementById(key).classList.add('edited')
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
        companyLogoURL: imageURL,
        logoWidth: widthTemp, 
        logoHeight: heightTemp, 
        timestamp: timestamp,
      });

      alert('Form submitted!');
    } catch (error) {
      alert('Error saving data!');
      console.error('Error saving form data: ', error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file.type === 'image/png') {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
          const maxWidth = 400; // Maximum width allowed
          const aspectRatio = img.naturalWidth / img.naturalHeight;
          const width = Math.min(img.naturalWidth, maxWidth);

          const height = width / aspectRatio;
          // Create a canvas element to resize the image
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          setWidthTemp(width);
          setHeightTemp(height);

          // Convert canvas back to blob
          canvas.toBlob((blob) => {
            const resizedFile = new File([blob], file.name, {
              type: 'image/png',
              lastModified: Date.now(),
            });

            // Optionally store the file object if needed
            setImageURL(canvas.toDataURL('image/png'));
          }, 'image/png');
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a PNG file.');
    }
  };

  return (
    <div className='container'>
      <div className="logos">
        <img src={logo} alt="" />
        {imageURL && (
            <img
              src={imageURL}
              alt="Uploaded Image"
              style={{ maxWidth: '100%', marginTop: '10px' }}
            />
          )}
        <label>
          Upload PNG Logo:
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>
      </div>
      <h2>NEW MEMBER PRESS RELEASE</h2>
      <p>
        The Canadian Out-of-Home Marketing and Measurement Bureau (COMMB) has added to their roster of association members, which now includes{' '}
        <span id='companyName' className="clickable" onClick={() => handleFieldClick('companyName')}>
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
        <span id='companyDescription' className="clickable" onClick={() => handleFieldClick('companyDescription')}>
          {editField === 'companyDescription' ? (
            <textarea
              value={formData.companyDescription}
              rows={1}
              onChange={(e) => handleInputChange('companyDescription', e.target.value)}
              onBlur={() => setEditField(null)}
              autoFocus
            />
          ) : (
            formData.companyDescription
          )}
        </span>. Their network includes{' '}
        <span id='companyOfferings' className="clickable" onClick={() => handleFieldClick('companyOfferings')}>
          {editField === 'companyOfferings' ? (
            <textarea
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
        <span id='personName' className="clickable" onClick={() => handleFieldClick('personName')}>
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
        </span>,{' '}
        <span id='personTitle' className="clickable" onClick={() => handleFieldClick('personTitle')}>
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
        </span>, shares their excitement about joining COMMB. {formData.personName} states, "{''}
        <span id='quote' className="clickable" onClick={() => handleFieldClick('quote')}>
          {editField === 'quote' ? (
            <textarea
              value={formData.quote}
              rows={1}
              onChange={(e) => handleInputChange('quote', e.target.value)}
              onBlur={() => setEditField(null)}
              autoFocus
            />
          ) : (
            formData.quote
          )}
        </span>
        ".
      </p>
      <p>
        COMMB, committed to providing measurement and marketing solutions for the Canadian OOH industry, is excited to welcome {formData.companyName} to its membership. They look forward to collaborating closely with their team across various facets of the OOH landscape.
      </p>
      <p>
        <strong>About COMMB</strong>
        <br />
        COMMB is the national not-for-profit organization for the Canadian out-of-home (OOH) industry. Our membership base is comprised of advertisers, agencies, programmatic tech stacks, and OOH companies, large and small. COMMB is responsible for the collective marketing and measurement efforts for the OOH industry, developing proprietary audience measurement methodologies for a variety of OOH media formats, and ensuring the voice of OOH is at the forefront of media via broad marketing and communications initiatives.
      </p>
      <p>
        <strong>About </strong>
        {formData.companyName}
        <br />
        <span id='boilerplate' className="clickable" onClick={() => handleFieldClick('boilerplate')}>
          {editField === 'boilerplate' ? (
            <textarea
              value={formData.boilerplate}
              rows={1}
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
      <button onClick={handleSave}>Submit</button>
    </div>
  );
};

export default FormTemplate;
