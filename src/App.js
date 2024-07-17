import React, { useState } from 'react';
import FormTemplate from './Components/FormTemplate';
import Forms from './Components/Forms';

function App() {


 // Function to handle document generation
//  const handleSave = async () => {
//   try {
//     // Create a new Document instance
//     const doc = new Document({
//       sections: [
//         {
//           properties: {},
//           children: [
//             new Paragraph({
//               alignment: AlignmentType.LEFT,
//               children: [
//                 new TextRun({
//                   text: "NEW MEMBER PRESS RELEASE",
//                   bold: true,
//                   font: "Arial",
//                   size: 26, // Size 13 in half-points
//                 }),
//               ],
//               spacing: {
//                 after: 200, // Adding spacing after the paragraph
//               },
//             }),
//             new Paragraph({
//               alignment: AlignmentType.LEFT,
//               children: [
//                 new TextRun({
//                   text: `The Canadian Out-of-Home Marketing and Measurement Bureau (COMMB) has added to their roster of association members, which now includes ${formData.companyName}.`,
//                   font: "Arial",
//                   size: 22,
//                 }),
//               ],
//               spacing: {
//                 after: 200, // Adding spacing after the paragraph
//               },
//             }),
//             new Paragraph({
//               alignment: AlignmentType.LEFT,
//               children: [
//                 new TextRun({
//                   text: `${formData.companyName} is a ${formData.companyDescription}. Their network includes ${formData.companyOfferings}.`,
//                   font: "Arial",
//                   size: 22,
//                 }),
//               ],
//               spacing: {
//                 after: 200, // Adding spacing after the paragraph
//               },
//             }),
//             new Paragraph({
//               alignment: AlignmentType.LEFT,
//               children: [
//                 new TextRun({
//                   text: `${formData.personName}, ${formData.personTitle}, shares their excitement about joining COMMB. ${formData.personName} states, "${formData.quote}".`,
//                   font: "Arial",
//                   size: 22,
//                 }),
//               ],
//               spacing: {
//                 after: 200, // Adding spacing after the paragraph
//               },
//             }),
//             new Paragraph({
//               alignment: AlignmentType.LEFT,
//               children: [
//                 new TextRun({
//                   text: `COMMB, committed to providing measurement and marketing solutions for the Canadian OOH industry, is excited to welcome ${formData.companyName} to its membership. They look forward to collaborating closely with their team across various facets of the OOH landscape.`,
//                   font: "Arial",
//                   size: 22,
//                 }),
//               ],
//               spacing: {
//                 after: 200, // Adding spacing after the paragraph
//               },
//             }),
//             new Paragraph({
//               alignment: AlignmentType.LEFT,
//               children: [
//                 new TextRun({
//                   text: "About COMMB",
//                   bold: true,
//                   font: "Arial",
//                   size: 22,
//                 }),
//               ],
//               spacing: {
//                 after: 200, // Adding spacing after the paragraph
//               },
//             }),
//             new Paragraph({
//               alignment: AlignmentType.LEFT,
//               children: [
//                 new TextRun({
//                   text: `COMMB is the national not-for-profit organization for the Canadian out-of-home (OOH) industry. Our membership base is comprised of advertisers, agencies, programmatic tech stacks, and OOH companies, large and small. COMMB is responsible for the collective marketing and measurement efforts for the OOH industry, developing proprietary audience measurement methodologies for a variety of OOH media formats, and ensuring the voice of OOH is at the forefront of media via broad marketing and communications initiatives.`,
//                   font: "Arial",
//                   size: 22,
//                 }),
//               ],
//               spacing: {
//                 after: 200, // Adding spacing after the paragraph
//               },
//             }),
//             new Paragraph({
//               alignment: AlignmentType.LEFT,
//               children: [
//                 new TextRun({
//                   text: `About `,
//                   font: "Arial",
//                   size: 22,
//                   bold: true,
//                 }),
//                 new TextRun({
//                   text: `${formData.companyName}`,
//                   font: "Arial",
//                   size: 22,
//                 }),
//               ],
//               spacing: {
//                 after: 200, // Adding spacing after the paragraph
//               },
//             }),
//             new Paragraph({
//               alignment: AlignmentType.LEFT,
//               children: [
//                 new TextRun({
//                   text: `${formData.boilerplate}`,
//                   font: "Arial",
//                   size: 22,
//                 }),
//               ],
//               spacing: {
//                 after: 200, // Adding spacing after the paragraph
//               },
//             }),
//             new Paragraph({
//               alignment: AlignmentType.LEFT,
//               children: [
//                 new TextRun({
//                   text: `For more information, please contact:`,
//                   font: "Arial",
//                   size: 22,
//                 }),
//               ],
//             }),
//             new Paragraph({
//               alignment: AlignmentType.LEFT,
//               children: [
//                 new TextRun({
//                   text: `Jennifer Copeland`,
//                   font: "Arial",
//                   size: 22,
//                 }),
//               ],
//             }),
//             new Paragraph({
//               alignment: AlignmentType.LEFT,
//               children: [
//                 new TextRun({
//                   text: `Director, Brand Communications`,
//                   font: "Arial",
//                   size: 22,
//                 }),
//               ],
//             }),
//             new Paragraph({
//               children: [
//                   new ExternalHyperlink({
//                       children: [
//                           new TextRun({
//                               text: "jcopeland@commb.ca",
//                               style: "Hyperlink",
//                               size: 22,
//                               font: "Arial",
//                           }),
//                       ],
//                       link: "mailto:jcopeland@commb.ca",
//                   }),
//               ],
//           })
//           ],
//         },
//       ],
//     });

//     // Pack the document into a blob
//     const blob = await Packer.toBlob(doc);

//     // Save the document using file-saver
//     saveAs(blob, 'press_release.docx');
//   } catch (error) {
//     console.error('Error generating document: ', error);
//   }
// };

  return (
    <div className="App">
      <h1>My App</h1>
      <FormTemplate/>
      <Forms/>
    </div>
  );
}

export default App;
