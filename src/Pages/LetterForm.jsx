import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Document, Packer, Paragraph, TextRun, AlignmentType, Footer } from 'docx';
import fileDownload from 'js-file-download';

const LetterForm = () => {
  const navigate = useNavigate();
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

  const senderOptions = {
    names: ['Finsbury Law Solicitors', 'Other Name'],
    addresses: ['123 Law St, London, UK', '456 Justice Ave, London, UK'],
    phones: ['+44 1234 567890', '+44 9876 543210'],
    emails: ['info@finsburylaw.com', 'contact@finsburylaw.com'],
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    if (value === 'custom') {
      setFormData({ ...formData, [name]: '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const formatAddress = (address) => {
    return address
      .split('\n')
      .map(line => {
        const words = line.trim().split(' ');
        return words.map(word => {
          if (word.match(/^[A-Z0-9]+$/)) {
            return word.toUpperCase();
          }
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
      }).join(', ');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedSenderAddress = formatAddress(formData.senderAddress);
    const formattedRecipientAddress = formatAddress(formData.recipientAddress);

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: formData.senderName,
                  bold: true,
                  font: "Times New Roman",
                  size: 20,
                }),
              ],
              alignment: AlignmentType.RIGHT,
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
              alignment: AlignmentType.RIGHT,
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
              alignment: AlignmentType.RIGHT,
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
              alignment: AlignmentType.RIGHT,
            }),
            new Paragraph({
              text: new Date().toLocaleDateString(),
              alignment: AlignmentType.LEFT,
              font: "Times New Roman",
              size: 24,
              spacing: { after: 240 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Dear ${formData.recipientName},`,
                  font: "Times New Roman",
                  size: 24,
                }),
              ],
              spacing: { after: 240 },
            }),
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
                spacing: { after: index === formattedRecipientAddress.split(', ').length - 1 ? 240 : 120 },
              })
            ),
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
              spacing: { before: 240, after: 240 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: formData.body,
                  font: "Times New Roman",
                  size: 24,
                }),
              ],
              spacing: { after: 240 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: formData.closing,
                  bold: true,
                  font: "Times New Roman",
                  size: 24,
                }),
              ],
              spacing: { before: 120, after: 240 },
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

    // Generate the DOCX file
    const blob = await Packer.toBlob(doc);
    fileDownload(blob, 'Formal_Letter.docx');

    // Optionally, navigate back to the customer details page after generating the document
    navigate(-1); // Go back to the previous page

  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Generate Formal Letter</h2>
      <button
        onClick={() => navigate(-1)} // Navigate back on button click
        className="bg-gray-300 text-black rounded-lg px-4 py-2 mb-4"
      >
        Go Back
      </button>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Sender Information */}
        <div>
          <h3 className="font-medium">Sender Information</h3>
          <label className="font-medium">Sender Name</label>
          <select
            name="senderName"
            value={formData.senderName}
            onChange={handleSelectChange}
            className="border rounded-lg p-2 w-full"
          >
            <option value="">Select or enter...</option>
            {senderOptions.names.map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
            <option value="custom">Custom</option>
          </select>
          {formData.senderName === '' && (
            <input
              type="text"
              placeholder="Enter your own sender name"
              value={formData.senderName}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full mt-2"
            />
          )}
        </div>

        <div>
          <label className="font-medium">Sender Address</label>
          <select
            name="senderAddress"
            value={formData.senderAddress}
            onChange={handleSelectChange}
            className="border rounded-lg p-2 w-full"
          >
            <option value="">Select or enter...</option>
            {senderOptions.addresses.map((address, index) => (
              <option key={index} value={address}>{address}</option>
            ))}
            <option value="custom">Custom</option>
          </select>
          {formData.senderAddress === '' && (
            <textarea
              name="senderAddress"
              placeholder="Enter your own sender address"
              value={formData.senderAddress}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full mt-2"
            />
          )}
        </div>

        <div>
          <label className="font-medium">Sender Phone</label>
          <select
            name="senderPhone"
            value={formData.senderPhone}
            onChange={handleSelectChange}
            className="border rounded-lg p-2 w-full"
          >
            <option value="">Select or enter...</option>
            {senderOptions.phones.map((phone, index) => (
              <option key={index} value={phone}>{phone}</option>
            ))}
            <option value="custom">Custom</option>
          </select>
          {formData.senderPhone === '' && (
            <input
              type="text"
              placeholder="Enter your own sender phone"
              value={formData.senderPhone}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full mt-2"
            />
          )}
        </div>

        <div>
          <label className="font-medium">Sender Email</label>
          <select
            name="senderEmail"
            value={formData.senderEmail}
            onChange={handleSelectChange}
            className="border rounded-lg p-2 w-full"
          >
            <option value="">Select or enter...</option>
            {senderOptions.emails.map((email, index) => (
              <option key={index} value={email}>{email}</option>
            ))}
            <option value="custom">Custom</option>
          </select>
          {formData.senderEmail === '' && (
            <input
              type="email"
              placeholder="Enter your own sender email"
              value={formData.senderEmail}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full mt-2"
            />
          )}
        </div>

        {/* Recipient Information */}
        <div>
          <label className="font-medium">Recipient Name</label>
          <input
            type="text"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="font-medium">Recipient Address</label>
          <textarea
            name="recipientAddress"
            value={formData.recipientAddress}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="font-medium">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="font-medium">Body</label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            className="border rounded-lg p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="font-medium">Closing</label>
          <input
            type="text"
            name="closing"
            value={formData.closing}
            onChange={handleChange}
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
