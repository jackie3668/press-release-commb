import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Import your Firestore instance
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore methods
import { Document, Packer, Paragraph, TextRun, ImageRun, ExternalHyperlink } from 'docx';
import { saveAs } from 'file-saver';
import logo from './image1.png';

const Forms = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const formsCollection = collection(db, 'press-release');
        const snapshot = await getDocs(formsCollection);
        const formsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp.toDate().toLocaleString(), // Convert Firestore timestamp to a readable format
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
      // Fetch logo and convert to array buffer (Replace with actual logo URL or path)
      const response1 = await fetch(logo); // Assuming 'logo' is your placeholder image path
      const blob1 = await response1.blob();
      const arrayBuffer1 = await blob1.arrayBuffer();

      // Fetch company logo and convert to base64
      const imageUrl = formData.companyLogoURL;
      const response2 = await fetch(imageUrl);
      const blob2 = await response2.blob();
      const arrayBuffer2 = await blob2.arrayBuffer();
      // Construct document with images and text
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                alignment: 'left',
                children: [
                  new ImageRun({
                    type: 'png', 
                    data: arrayBuffer1,
                    transformation: {
                      width: 300,
                      height: 100,
                    },
                  }),
                  new ImageRun({
                    type: 'png', // Adjust the type as per your image type
                    data: arrayBuffer2,
                    transformation: {
                      width: formData.logoWidth,
                      height: formData.logoHeight,
                    },
                  }),
                ],
                spacing: {
                  after: 200,
                },
              }),
              new Paragraph({
                alignment: 'left',
                children: [
                  new TextRun({
                    text: 'NEW MEMBER PRESS RELEASE',
                    bold: true,
                    font: 'Arial',
                    size: 26,
                  }),
                ],
                spacing: {
                  after: 200,
                },
              }),
              new Paragraph({
                alignment: 'left',
                children: [
                  new TextRun({
                    text: `The Canadian Out-of-Home Marketing and Measurement Bureau (COMMB) has added to their roster of association members, which now includes ${formData.companyName}.`,
                    font: 'Arial',
                    size: 22,
                  }),
                ],
                spacing: {
                  after: 200,
                },
              }),
              new Paragraph({
                alignment: 'left',
                children: [
                  new TextRun({
                    text: `${formData.companyName} is a ${formData.companyDescription}. Their network includes ${formData.companyOfferings}.`,
                    font: 'Arial',
                    size: 22,
                  }),
                ],
                spacing: {
                  after: 200,
                },
              }),
              new Paragraph({
                alignment: 'left',
                children: [
                  new TextRun({
                    text: `${formData.personName}, ${formData.personTitle}, shares their excitement about joining COMMB. ${formData.personName} states, "${formData.quote}".`,
                    font: 'Arial',
                    size: 22,
                  }),
                ],
                spacing: {
                  after: 200,
                },
              }),
              new Paragraph({
                alignment: 'left',
                children: [
                  new TextRun({
                    text: `COMMB, committed to providing measurement and marketing solutions for the Canadian OOH industry, is excited to welcome ${formData.companyName} to its membership. They look forward to collaborating closely with their team across various facets of the OOH landscape.`,
                    font: 'Arial',
                    size: 22,
                  }),
                ],
                spacing: {
                  after: 200,
                },
              }),
              new Paragraph({
                alignment: 'left',
                children: [
                  new TextRun({
                    text: 'About COMMB',
                    bold: true,
                    font: 'Arial',
                    size: 22,
                  }),
                ],
                spacing: {
                  after: 200,
                },
              }),
              new Paragraph({
                alignment: 'left',
                children: [
                  new TextRun({
                    text: `COMMB is the national not-for-profit organization for the Canadian out-of-home (OOH) industry. Our membership base is comprised of advertisers, agencies, programmatic tech stacks, and OOH companies, large and small. COMMB is responsible for the collective marketing and measurement efforts for the OOH industry, developing proprietary audience measurement methodologies for a variety of OOH media formats, and ensuring the voice of OOH is at the forefront of media via broad marketing and communications initiatives.`,
                    font: 'Arial',
                    size: 22,
                  }),
                ],
                spacing: {
                  after: 200,
                },
              }),
              new Paragraph({
                alignment: 'left',
                children: [
                  new TextRun({
                    text: `About `,
                    font: 'Arial',
                    size: 22,
                    bold: true,
                  }),
                  new TextRun({
                    text: `${formData.companyName}`,
                    font: 'Arial',
                    size: 22,
                  }),
                ],
                spacing: {
                  after: 200,
                },
              }),
              new Paragraph({
                alignment: 'left',
                children: [
                  new TextRun({
                    text: `${formData.boilerplate}`,
                    font: 'Arial',
                    size: 22,
                  }),
                ],
                spacing: {
                  after: 200,
                },
              }),
              new Paragraph({
                alignment: 'left',
                children: [
                  new TextRun({
                    text: 'For more information, please contact:',
                    font: 'Arial',
                    size: 22,
                    bold: true
                  }),
                ],
              }),
              new Paragraph({
                alignment: 'left',
                children: [
                  new TextRun({
                    text: 'Jennifer Copeland',
                    font: 'Arial',
                    size: 22,
                  }),
                ],
              }),
              new Paragraph({
                alignment: 'left',
                children: [
                  new TextRun({
                    text: 'Director, Brand Communications',
                    font: 'Arial',
                    size: 22,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                    new ExternalHyperlink({
                        children: [
                            new TextRun({
                                text: "jcopeland@commb.ca",
                                style: "Hyperlink",
                                font: 'Arial',
                                size: 22,
                                underline: true,
                            }),
                        ],
                        link: 'mailto:jcopeland@commb.ca'
                    }),
                ],
              }),
            
            ],
          },
        ],
      });

      // Pack the document into a blob and save
      const docBlob = await Packer.toBlob(doc);
      saveAs(docBlob, 'output.docx');
      console.log('Document created successfully');
    } catch (error) {
      console.error('Error generating document: ', error);
    }
  };

  return (
    <div className='export'>
      <h2>Submitted PR</h2>
      <table border="1">
        <tbody>
          {forms.map((form, rowIndex) => (
            <tr key={rowIndex}>
              <td>{form.companyName}</td>
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
