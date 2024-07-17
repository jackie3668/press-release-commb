import React, { useState } from 'react';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import './FormTemplate.css';

const FormTemplate = () => {
  // State for managing form data
  const [formData, setFormData] = useState({
    companyName: 'Insert Company Name',
    companyDescription: 'Insert Company Description',
    companyOfferings: 'Insert Company Offerings',
    personName: 'Insert Person Name',
    quote: 'Insert Quote',
    boilerplate: 'Insert Boilerplate',
  });

  // State to track which field is being edited
  const [editField, setEditField] = useState(null);

  // Function to handle input changes
  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value
    });
  };

  // Function to handle document generation
  const handleSave = async () => {
    try {
      // Create a new Document instance
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                children: [
                  new TextRun(`NEW MEMBER PRESS RELEASE\n\n`),
                  new TextRun(
                    `The Canadian Out-of-Home Marketing and Measurement Bureau (COMMB) has added to their roster of association members, which now includes ${formData.companyName}.\n\n`
                  ),
                  new TextRun(
                    `${formData.companyName} is a ${formData.companyDescription}. Their network includes ${formData.companyOfferings}.\n\n`
                  ),
                  new TextRun(
                    `${formData.personName}, shares their excitement about joining COMMB. ${formData.personName} states, "${formData.quote}"\n\n`
                  ),
                  new TextRun(
                    `COMMB, committed to providing measurement and marketing solutions for the Canadian OOH industry, is excited to welcome ${formData.companyName} to its membership. They look forward to collaborating closely with their team across various facets of the OOH landscape.\n\n`
                  ),
                  new TextRun(`About COMMB\n\n`),
                  new TextRun(
                    `COMMB is the national not-for-profit organization for the Canadian out-of-home (OOH) industry. Our membership base is comprised of advertisers, agencies, programmatic tech stacks, and OOH companies, large and small. COMMB is responsible for the collective marketing and measurement efforts for the OOH industry, developing proprietary audience measurement methodologies for a variety of OOH media formats, and ensuring the voice of OOH is at the forefront of media via broad marketing and communications initiatives.\n\n`
                  ),
                  new TextRun(`About ${formData.companyName}\n\n`),
                  new TextRun(`${formData.boilerplate}\n\n`),
                  new TextRun(
                    `For more information, please contact:\nJennifer Copeland\nDirector, Brand Communications\njcopeland@commb.ca`
                  ),
                ],
              }),
            ],
          },
        ],
      });

      // Pack the document into a blob
      const blob = await Packer.toBlob(doc);

      // Save the document using file-saver
      saveAs(blob, 'press_release.docx');
    } catch (error) {
      console.error('Error generating document: ', error);
    }
  };

  // Function to handle clicking on a field to edit
  const handleFieldClick = (field) => {
    setEditField(field);
  };

  // JSX for rendering press release with editable fields
  return (
    <div>
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
        </span> is a{' '}
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
        </span>, shares their excitement about joining COMMB.{' '}
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
      </p>
      <p>
        COMMB, committed to providing measurement and marketing solutions for the Canadian OOH industry, is excited to welcome{' '}
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
        </span> to its membership. They look forward to collaborating closely with their team across various facets of the OOH landscape.
      </p>
      <p>
        <strong>About COMMB</strong>
        <br />
        COMMB is the national not-for-profit organization for the Canadian out-of-home (OOH) industry. Our membership base is comprised of advertisers, agencies, programmatic tech stacks, and OOH companies, large and small. COMMB is responsible for the collective marketing and measurement efforts for the OOH industry, developing proprietary audience measurement methodologies for a variety of OOH media formats, and ensuring the voice of OOH is at the forefront of media via broad marketing and communications initiatives.
      </p>
      <p>
        <strong>About </strong>
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
        </span>
        <br />
        {formData.boilerplate}
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
      <button onClick={handleSave}>Save as Word Doc</button>
    </div>
  );
};

export default FormTemplate;
