import React, { useState } from 'react';
import { db, storage } from '../firebase'; // Import Firebase db and storage
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import logo from './image1.png'; // Placeholder logo image

const FormTemplate = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    companyDescription: '',
    companyOfferings: '',
    personFullName: '',
    personTitle: '',
    personName: '',
    quote: '',
    boilerplate: '',
    companyLogoPNG: null, // Added companyLogoPNG state
    companyLogoURL: null,
    logoWidth: null,
    logoHeight: null,
  });
  const [formDataPlaceholder, setFormDataPlaceholder] = useState({
    companyName: 'Insert Company Name',
    companyDescription: 'Insert Company Description',
    companyOfferings: 'Insert Company Offerings',
    personFullName: 'Insert Person Full Name',
    personTitle: 'Insert Person Title',
    personName: 'Insert Person Name',
    quote: 'Insert Quote',
    boilerplate: 'Insert Boilerplate',
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
    setFormDataPlaceholder({
      ...formDataPlaceholder,
      [key]: value,
    });
    document.getElementById(key).classList.add('edited');
  };

  const handleFieldClick = (field) => {
    setEditField(field);
  };

  const handleSave = async () => {
    try {
      const timestamp = serverTimestamp();
      const storageBucket = 'press-release-24';
      const companyName = formData.companyName;
      const path = 'gs://' + storageBucket + '/images/' + companyName;

      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, formData.companyLogoPNG);
      const downloadURL = await getDownloadURL(snapshot.ref);

      setFormData({
        ...formData,
        companyLogoURL: downloadURL,
        logoWidth: widthTemp,
        logoHeight: heightTemp,
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
          const maxWidth = 400;
          const aspectRatio = img.naturalWidth / img.naturalHeight;
          const width = Math.min(img.naturalWidth, maxWidth);
          const height = width / aspectRatio;

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          setWidthTemp(width);
          setHeightTemp(height);

          canvas.toBlob((blob) => {
            const resizedFile = new File([blob], file.name, {
              type: 'image/png',
              lastModified: Date.now(),
            });

            setImageURL(canvas.toDataURL('image/png'));
            setFormData({
              ...formData,
              companyLogoPNG: resizedFile,
            });
          }, 'image/png');
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a PNG file.');
    }
  };

  const handleEnterKey = (e, key) => {
    if (e.key === 'Enter') {
      handleInputChange(key, e.target.value);
      setEditField(null);
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
              onKeyDown={(e) => handleEnterKey(e, 'companyName')}
              onBlur={() => setEditField(null)}
              autoFocus
            />
          ) : (formDataPlaceholder.companyName)}
        </span>.
      </p>
      <p>
        {formDataPlaceholder.companyName} is a{' '}
        <span id='companyDescription' className="clickable" onClick={() => handleFieldClick('companyDescription')}>
          {editField === 'companyDescription' ? (
            <textarea
              value={formData.companyDescription}
              rows={1}
              onChange={(e) => handleInputChange('companyDescription', e.target.value)}
              onKeyDown={(e) => handleEnterKey(e, 'companyDescription')}
              onBlur={() => setEditField(null)}
              autoFocus
            />
          ) : (formDataPlaceholder.companyDescription)}
        </span>. Their network includes{' '}
        <span id='companyOfferings' className="clickable" onClick={() => handleFieldClick('companyOfferings')}>
          {editField === 'companyOfferings' ? (
            <textarea
              value={formData.companyOfferings}
              onChange={(e) => handleInputChange('companyOfferings', e.target.value)}
              onKeyDown={(e) => handleEnterKey(e, 'companyOfferings')}
              onBlur={() => setEditField(null)}
              autoFocus
            />
          ) : (formDataPlaceholder.companyOfferings)}
        </span>.
      </p>
      <p>
        <span id='personFullName' className="clickable" onClick={() => handleFieldClick('personFullName')}>
          {editField === 'personFullName' ? (
            <input
              type="text"
              value={formData.personFullName}
              onChange={(e) => handleInputChange('personFullName', e.target.value)}
              onKeyDown={(e) => handleEnterKey(e, 'personFullName')}
              onBlur={() => setEditField(null)}
              autoFocus
            />
          ) : (formDataPlaceholder.personFullName)}
        </span>
        ,{' '}
        <span id='personTitle' className="clickable" onClick={() => handleFieldClick('personTitle')}>
          {editField === 'personTitle' ? (
            <input
              type="text"
              value={formData.personTitle}
              onChange={(e) => handleInputChange('personTitle', e.target.value)}
              onKeyDown={(e) => handleEnterKey(e, 'personTitle')}
              onBlur={() => setEditField(null)}
              autoFocus
            />
          ) : (formDataPlaceholder.personTitle)}
        </span>, shares their excitement about joining COMMB.{' '}
        <span id='personName' className="clickable" onClick={() => handleFieldClick('personName')}>
          {editField === 'personName' ? (
            <input
              type="text"
              value={formData.personName}
              onChange={(e) => handleInputChange('personName', e.target.value)}
              onKeyDown={(e) => handleEnterKey(e, 'personName')}
              onBlur={() => setEditField(null)}
              autoFocus
            />
          ) : (formDataPlaceholder.personName)}
        </span> states, "{''}
        <span id='quote' className="clickable" onClick={() => handleFieldClick('quote')}>
          {editField === 'quote' ? (
            <textarea
              value={formData.quote}
              rows={1}
              onChange={(e) => handleInputChange('quote', e.target.value)}
              onKeyDown={(e) => handleEnterKey(e, 'quote')}
              onBlur={() => setEditField(null)}
              autoFocus
            />
          ) : (formDataPlaceholder.quote)}
        </span>
        ".
      </p>
      <p>
        COMMB, committed to providing measurement and marketing solutions for the Canadian OOH industry, is excited to welcome {formDataPlaceholder.companyName} to its membership. They look forward to collaborating closely with their team across various facets of the OOH landscape.
      </p>
      <p>
        <strong>About COMMB</strong>
        <br />
        COMMB is the national not-for-profit organization for the Canadian out-of-home (OOH) industry. Our membership base is comprised of advertisers, agencies, programmatic tech stacks, and OOH companies, large and small. COMMB is responsible for the collective marketing and measurement efforts for the OOH industry, developing proprietary audience measurement methodologies for a variety of OOH media formats, and ensuring the voice of OOH is at the forefront of media via broad marketing and communications initiatives.
      </p>
      <p>
        <strong>About </strong>
        {formDataPlaceholder.companyName}
        <br />
        <span id='boilerplate' className="clickable" onClick={() => handleFieldClick('boilerplate')}>
          {editField === 'boilerplate' ? (
            <textarea
              value={formData.boilerplate}
              rows={1}
              onChange={(e) => handleInputChange('boilerplate', e.target.value)}
              onKeyDown={(e) => handleEnterKey(e, 'boilerplate')}
              onBlur={() => setEditField(null)}
              autoFocus
            />
          ) : (formDataPlaceholder.boilerplate)}
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
