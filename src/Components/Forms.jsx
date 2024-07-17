import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Import your Firestore instance
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore methods
import { Document, Packer, Paragraph, TextRun, AlignmentType, ExternalHyperlink, ImageRun} from 'docx';
import { saveAs } from 'file-saver';

const Forms = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const formsCollection = collection(db, 'press-release');
        const snapshot = await getDocs(formsCollection);
        const formsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp.toDate().toLocaleString() // Convert Firestore timestamp to a readable format
        }));
        setForms(formsData);
      } catch (error) {
        console.error('Error fetching forms: ', error);
      }
    };

    fetchForms();
  }, []);

  const handleExport = async (formData) => {
    try {
      // Create a new Document instance
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                alignment: 'left',
                children: [
                  new TextRun({
                    text: "NEW MEMBER PRESS RELEASE",
                    bold: true,
                    font: "Arial",
                    size: 26, // Size 13 in half-points
                  }),
                ],
                spacing: {
                  after: 200, // Adding spacing after the paragraph
                },
              }),
              new Paragraph({
                alignment: 'left',
                children: [
                  new TextRun({
                    text: `The Canadian Out-of-Home Marketing and Measurement Bureau (COMMB) has added to their roster of association members, which now includes ${formData.companyName}.`,
                    font: "Arial",
                    size: 22,
                  }),
                ],
                spacing: {
                  after: 200, // Adding spacing after the paragraph
                },
              }),
              new Paragraph({
                alignment: 'left',
                children: [
                  new TextRun({
                    text: `${formData.companyName} is a ${formData.companyDescription}. Their network includes ${formData.companyOfferings}.`,
                    font: "Arial",
                    size: 22,
                  }),
                ],
                spacing: {
                  after: 200, // Adding spacing after the paragraph
                },
              }),
              new Paragraph({
                alignment: 'left',
                children: [
                  new TextRun({
                    text: `${formData.personName}, ${formData.personTitle}, shares their excitement about joining COMMB. ${formData.personName} states, "${formData.quote}".`,
                    font: "Arial",
                    size: 22,
                  }),
                ],
                spacing: {
                  after: 200, // Adding spacing after the paragraph
                },
              }),
              new Paragraph({
                alignment: 'left',
                children: [
                  new TextRun({
                    text: `COMMB, committed to providing measurement and marketing solutions for the Canadian OOH industry, is excited to welcome ${formData.companyName} to its membership. They look forward to collaborating closely with their team across various facets of the OOH landscape.`,
                    font: "Arial",
                    size: 22,
                  }),
                ],
                spacing: {
                  after: 200, // Adding spacing after the paragraph
                },
              }),
              new Paragraph({
                alignment: 'left',
                children: [
                  new TextRun({
                    text: "About COMMB",
                    bold: true,
                    font: "Arial",
                    size: 22,
                  }),
                ],
                spacing: {
                  after: 200, // Adding spacing after the paragraph
                },
              }),
              new Paragraph({
                alignment: 'left',
                children: [
                  new TextRun({
                    text: `COMMB is the national not-for-profit organization for the Canadian out-of-home (OOH) industry. Our membership base is comprised of advertisers, agencies, programmatic tech stacks, and OOH companies, large and small. COMMB is responsible for the collective marketing and measurement efforts for the OOH industry, developing proprietary audience measurement methodologies for a variety of OOH media formats, and ensuring the voice of OOH is at the forefront of media via broad marketing and communications initiatives.`,
                    font: "Arial",
                    size: 22,
                  }),
                ],
                spacing: {
                  after: 200, // Adding spacing after the paragraph
                },
              }),
              new Paragraph({
                alignment: 'left',
                children: [
                  new TextRun({
                    text: `About `,
                    font: "Arial",
                    size: 22,
                    bold: true,
                  }),
                  new TextRun({
                    text: `${formData.companyName}`,
                    font: "Arial",
                    size: 22,
                  }),
                ],
                spacing: {
                  after: 200, // Adding spacing after the paragraph
                },
              }),
              new Paragraph({
                alignment: 'left',
                children: [
                  new TextRun({
                    text: `${formData.boilerplate}`,
                    font: "Arial",
                    size: 22,
                  }),
                ],
                spacing: {
                  after: 200, // Adding spacing after the paragraph
                },
              }),
              new Paragraph({
                alignment: 'left',
                children: [
                  new TextRun({
                    text: `For more information, please contact:`,
                    font: "Arial",
                    size: 22,
                  }),
                ],
              }),
              new Paragraph({
                alignment: 'left',
                children: [
                  new TextRun({
                    text: `Jennifer Copeland`,
                    font: "Arial",
                    size: 22,
                  }),
                ],
              }),
              new Paragraph({
                alignment: 'left',
                children: [
                  new TextRun({
                    text: `Director, Brand Communications`,
                    font: "Arial",
                    size: 22,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "jcopeland@commb.ca",
                    style: "Hyperlink",
                    size: 22,
                    font: "Arial",
                  }),
                ],
              }),
              // Render the image if companyLogoURL exists
              formData.companyLogoURL && new Paragraph({
                alignment: 'left',
                children: [
                  new TextRun({
                    text: "Company Logo:",
                    bold: true,
                    font: "Arial",
                    size: 22,
                  }),
                  new TextRun({
                    text: " ",
                  }),
                  new ExternalHyperlink({
                    url: formData.companyLogoURL,
                    children: [
                      new ImageRun({
                        type: 'gif', // Adjust type as per your image type
                        data: await fetchImageAsUint8Array(formData.companyLogoURL),
                        transformation: {
                          width: 100,
                          height: 100,
                        },
                      }),
                    ],
                  }),
                ],
                spacing: {
                  after: 200, // Adding spacing after the paragraph
                },
              }),
            ],
          },
        ],
      });

      // Pack the document into a blob
      const blob = await Packer.toBlob(doc);

      // Save the document using file-saver
      saveAs(blob, `${formData.companyName}_press_release.docx`);
    } catch (error) {
      console.error('Error generating document: ', error);
    }
  };

  const fetchImageAsUint8Array = async (imageUrl) => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Example of a CORS proxy
    const proxyImageUrl = proxyUrl + imageUrl;
  
    try {
      const response = await fetch(proxyImageUrl);
      if (!response.ok) {
        throw new Error(`Error fetching image: ${response.statusText}`);
      }
      const blob = await response.blob();
      return await new Response(blob).arrayBuffer();
    } catch (error) {
      console.error('Error fetching image: ', error);
      throw error; // Rethrow the error for higher level handling
    }
  };
  
  return (
    <div>
      <h2>Forms Data</h2>
      <table border="1">
        <thead>
          <tr>
            {forms.length > 0 &&
              Object.keys(forms[0]).map((key, index) => (
                <th key={index}>{key}</th>
              ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((form, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(form).map((value, colIndex) => (
                <td key={colIndex}>{value}</td>
              ))}
              <td>
                <button onClick={() => handleExport(form)}>Export</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Forms;
