import React, { useState } from 'react';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';

const FormTemplate = () => {
  // State for managing edit mode
  const [editMode, setEditMode] = useState(false);

  // State for managing form data
  const [companyName, setCompanyName] = useState('Company Name');
  const [companyDescription, setCompanyDescription] = useState('Company Description');
  const [companyOfferings, setCompanyOfferings] = useState('Company Offerings');
  const [personName, setPersonName] = useState('Person Name');
  const [quote, setQuote] = useState('Quote');
  const [boilerplate, setBoilerplate] = useState('Boilerplate');

  // Function to handle toggling edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
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
                    `The Canadian Out-of-Home Marketing and Measurement Bureau (COMMB) has added to their roster of association members, which now includes ${companyName}.\n\n`
                  ),
                  new TextRun(
                    `${companyName} is a ${companyDescription}. Their network includes ${companyOfferings}.\n\n`
                  ),
                  new TextRun(
                    `${personName}, shares their excitement about joining COMMB. ${personName} states, "${quote}"\n\n`
                  ),
                  new TextRun(
                    `COMMB, committed to providing measurement and marketing solutions for the Canadian OOH industry, is excited to welcome ${companyName} to its membership. They look forward to collaborating closely with their team across various facets of the OOH landscape.\n\n`
                  ),
                  new TextRun(`About COMMB\n\n`),
                  new TextRun(
                    `COMMB is the national not-for-profit organization for the Canadian out-of-home (OOH) industry. Our membership base is comprised of advertisers, agencies, programmatic tech stacks, and OOH companies, large and small. COMMB is responsible for the collective marketing and measurement efforts for the OOH industry, developing proprietary audience measurement methodologies for a variety of OOH media formats, and ensuring the voice of OOH is at the forefront of media via broad marketing and communications initiatives.\n\n`
                  ),
                  new TextRun(`About ${companyName}\n\n`),
                  new TextRun(`${boilerplate}\n\n`),
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




  // JSX for rendering form fields and save button
  return (
    <div>
      {/* Toggle edit mode button */}
      <button onClick={toggleEditMode}>{editMode ? 'View Mode' : 'Edit Mode'}</button>

      {/* Render editable fields or static text based on edit mode */}
      <div>
        <p><strong>Company Name:</strong> {editMode ? <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} /> : companyName}</p>
        <p><strong>Company Description:</strong> {editMode ? <input type="text" value={companyDescription} onChange={(e) => setCompanyDescription(e.target.value)} /> : companyDescription}</p>
        <p><strong>Company Offerings:</strong> {editMode ? <input type="text" value={companyOfferings} onChange={(e) => setCompanyOfferings(e.target.value)} /> : companyOfferings}</p>
        <p><strong>Person Name:</strong> {editMode ? <input type="text" value={personName} onChange={(e) => setPersonName(e.target.value)} /> : personName}</p>
        <p><strong>Quote:</strong> {editMode ? <input type="text" value={quote} onChange={(e) => setQuote(e.target.value)} /> : quote}</p>
        <p><strong>Boilerplate:</strong> {editMode ? <input type="text" value={boilerplate} onChange={(e) => setBoilerplate(e.target.value)} /> : boilerplate}</p>
      </div>

      {/* Save button */}
      <button onClick={handleSave}>Save as Word Doc</button>
    </div>
  );
};

export default FormTemplate;
