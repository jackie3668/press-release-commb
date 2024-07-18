import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Import your Firestore instance
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore methods
import { Document, Packer, Paragraph, TextRun, AlignmentType, ExternalHyperlink, ImageRun} from 'docx';
import { saveAs } from 'file-saver';
import { getDownloadURL, ref } from "firebase/storage";
import logo from './image1.png'

const Forms = () => {
  const [forms, setForms] = useState([]);
  const [fileData, setFileData] = useState(null);

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
      // Fetch logo and convert to array buffer
      const response = await fetch(logo); // Replace 'logo' with your actual logo URL or path
      const blob1 = await response.blob();
      const arrayBuffer1 = await blob1.arrayBuffer();
  
      // Fetch company logo and convert to array buffer
      const imageUrl = formData.companyLogoURL;
      const fetchOptions = {
        method: 'GET',
        headers: {},
        mode: 'cors',
        credentials: 'same-origin',
      };
  
      // Fetch company logo image and convert to array buffer
      const response2 = await fetch(imageUrl, fetchOptions);
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
                  // First image with arrayBuffer1
                  new ImageRun({
                    type: 'png',
                    data: arrayBuffer1,
                    transformation: {
                      width: 100,
                      height: 100,
                    },
                  }),
                  // Second image with arrayBuffer2
                  new ImageRun({
                    type: 'png',
                    data: arrayBuffer2,
                    transformation: {
                      width: 100,
                      height: 100,
                    },
                  }),
                ],
                spacing: {
                  after: 200,
                },
              }),
              // Other paragraphs and text runs
              new Paragraph({
                alignment: 'left',
                children: [
                  new TextRun({
                    text: "NEW MEMBER PRESS RELEASE",
                    bold: true,
                    font: "Arial",
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
                    font: "Arial",
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
                    font: "Arial",
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
                    font: "Arial",
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
                    font: "Arial",
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
                    text: "About COMMB",
                    bold: true,
                    font: "Arial",
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
                    font: "Arial",
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
                  after: 200,
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
                  after: 200,
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
            ],
          },
        ],
      });
  
      // Pack the document into a blob and save
      const docBlob = await Packer.toBlob(doc);
      saveAs(docBlob, 'output.docx');
      console.log('Document created successfully');
      console.log('Document created successfully');
    } catch (error) {
      console.error('Error generating document: ', error);
    }
  };

  const handleImage = async (formData) => {
    const imageElement = document.getElementById(formData.companyName);
    console.log(imageElement);
  };
  
  // const fetchImageAsUint8Array = async (imageUrl, name) => {
  //   console.log(imageUrl, name);
  //   try {
  //     // Create a reference to the file you want to download
  //      const fileRef = ref(storage, `images/${companyName}`);

  //     // Get the download URL
  //     const url = await getDownloadURL(fileRef);
  //     setFileUrl(url);
  //   } catch (error) {
  //     console.error("Error fetching file:", error);
  //   }
  // };
  
  
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
                <img id={form.companyName} src={form.companyLogoURL ?form.companyLogoURL : '' } alt="" />
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
