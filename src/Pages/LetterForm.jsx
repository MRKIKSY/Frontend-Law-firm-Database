import React, { useState } from 'react';
import { Document, Packer, Paragraph, TextRun, AlignmentType, Footer } from 'docx';
import fileDownload from 'js-file-download';

const LetterForm = () => {
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientAddress: '',
    subject: '',
    body: '',
    closing: 'Yours sincerely,',
    senderName: '',
    senderAddress: '',
    senderPhone: '',
    senderEmail: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const formatAddress = (address) => {
    return address
      .split('\n')
      .map(line => {
        const words = line.trim().split(' ');
        const formattedLine = words.map(word => {
          if (word.match(/^[A-Z0-9]+$/)) {
            return word.toUpperCase(); // Capitalize postcode
          }
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(); // Capitalize first letter of each word
        }).join(' ');
        return formattedLine;
      }).join(', '); // Join lines with a comma
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format sender and recipient addresses
    const formattedSenderAddress = formatAddress(formData.senderAddress);
    const formattedRecipientAddress = formatAddress(formData.recipientAddress);

    // Create the document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            // Sender Information Header
            new Paragraph({
              children: [
                new TextRun({
                  text: `${formData.senderName}`, // Use sender name
                  bold: true,
                  font: "Times New Roman",
                  size: 20,
                }),
              ],
              alignment: AlignmentType.RIGHT, // Align to the right
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: formattedSenderAddress,
                  bold: true,
                  font: "Times New Roman",
                  size: 20,
                }),
              ],
              alignment: AlignmentType.RIGHT, // Align to the right
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Telephone: ${formData.senderPhone}`,
                  bold: true,
                  font: "Times New Roman",
                  size: 20,
                }),
              ],
              alignment: AlignmentType.RIGHT, // Align to the right
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Email: ${formData.senderEmail}`,
                  bold: true,
                  font: "Times New Roman",
                  size: 20,
                }),
              ],
              alignment: AlignmentType.RIGHT, // Align to the right
            }),
            new Paragraph({
              text: new Date().toLocaleDateString(),
              alignment: AlignmentType.LEFT,
              font: "Times New Roman",
              size: 24,
              spacing: { after: 240 }, // Space after date
            }),
            // Recipient Information
            new Paragraph({
              children: [
                new TextRun({
                  text: `Dear ${formData.recipientName},`,
                  font: "Times New Roman",
                  size: 24,
                }),
              ],
              spacing: { after: 240 }, // Space after greeting
            }),
            // Recipient Address
            ...formattedRecipientAddress.split(', ').map((line, index) => 
              new Paragraph({
                children: [
                  new TextRun({
                    text: line.trim(),
                    font: "Times New Roman",
                    size: 24,
                  }),
                ],
                alignment: AlignmentType.LEFT,
                spacing: { after: index === formattedRecipientAddress.split(', ').length - 1 ? 240 : 120 }, // Space after last line
              })
            ),
            // Subject
            new Paragraph({
              children: [
                new TextRun({
                  text: formData.subject.toUpperCase(),
                  bold: true,
                  font: "Times New Roman",
                  size: 24,
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { before: 240, after: 240 }, // Space before and after subject
            }),
            // Body
            new Paragraph({
              children: [
                new TextRun({
                  text: formData.body,
                  font: "Times New Roman",
                  size: 24,
                }),
              ],
              spacing: { after: 240 }, // Space after body
            }),
            // Closing
            new Paragraph({
              children: [
                new TextRun({
                  text: formData.closing,
                  bold: true,
                  font: "Times New Roman",
                  size: 24,
                }),
              ],
              spacing: { before: 120, after: 240 }, // Space before closing
            }),
          ]
        }
      ],
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Page 1 out of 1",
                  alignment: AlignmentType.CENTER,
                }),
              ],
            }),
          ],
        }),
      },
    });

    // Convert the document to a Blob and trigger the download
    const blob = await Packer.toBlob(doc);
    fileDownload(blob, 'Formal_Letter.docx');
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Generate Formal Letter</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Sender Information Inputs */}
        <div>
          <h3 className="font-medium">Sender Information</h3>
          <label className="font-medium">Sender Name</label>
          <input
            type="text"
            name="senderName"
            value={formData.senderName}
            onChange={handleChange}
            required
            className="border rounded-lg p-2 w-full"
          />
        </div>
        <div>
          <label className="font-medium">Sender Address</label>
          <textarea
            name="senderAddress"
            value={formData.senderAddress}
            onChange={handleChange}
            required
            className="border rounded-lg p-2 w-full"
          />
        </div>
        <div>
          <label className="font-medium">Sender Phone</label>
          <input
            type="text"
            name="senderPhone"
            value={formData.senderPhone}
            onChange={handleChange}
            required
            className="border rounded-lg p-2 w-full"
          />
        </div>
        <div>
          <label className="font-medium">Sender Email</label>
          <input
            type="email"
            name="senderEmail"
            value={formData.senderEmail}
            onChange={handleChange}
            required
            className="border rounded-lg p-2 w-full"
          />
        </div>
        {/* Recipient Information Inputs */}
        <div>
          <h3 className="font-medium">Recipient Information</h3>
          <label className="font-medium">Recipient Name</label>
          <input
            type="text"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            required
            className="border rounded-lg p-2 w-full"
          />
        </div>
        <div>
          <label className="font-medium">Recipient Address (Format: Line1\nLine2\nPostcode)</label>
          <textarea
            name="recipientAddress"
            value={formData.recipientAddress}
            onChange={handleChange}
            required
            className="border rounded-lg p-2 w-full"
          />
        </div>
        <div>
          <label className="font-medium">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="border rounded-lg p-2 w-full"
          />
        </div>
        <div>
          <label className="font-medium">Body</label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            required
            className="border rounded-lg p-2 w-full"
          />
        </div>
        <div>
          <label className="font-medium">Closing</label>
          <input
            type="text"
            name="closing"
            value={formData.closing}
            onChange={handleChange}
            required
            className="border rounded-lg p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg px-4 py-2"
        >
          Generate Letter
        </button>
      </form>
    </div>
  );
};

export default LetterForm;
