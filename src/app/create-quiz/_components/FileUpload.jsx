"use client";

import React, { useEffect, useRef, useState } from "react";
import { pdfjs } from "react-pdf";
import { Inbox } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import TextToSpeech from "@/components/TextToSpeech"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const FileUpload = ({token}) => {
  const [pdfText, setPdfText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(3);
  const router = useRouter();

  useEffect(() => {
    if (selectedFile) {
      handleUpload();
    }
  }, [selectedFile]);

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const loadingTask = pdfjs.getDocument(
          URL.createObjectURL(selectedFile)
        );
        const pdf = await loadingTask.promise;
        const totalNumPages = pdf.numPages;
        let extractedText = "";

        for (let pageNum = 1; pageNum <= totalNumPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const pageText = await page.getTextContent();

          pageText.items.forEach((item) => {
            if ("str" in item) {
              extractedText += item.str + " ";
            }
          });
        }
        setPdfText(extractedText);
      } catch (error) {
        console.error("Error converting PDF to text:", error);
      }
    }
  };

  const fileInputRef = useRef();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      window.alert("Please select a PDF file.");
    }
  };

  const handleGenerate = async () => {
    if (token="pro" || token > 0 ) {
      try {
        setIsLoading(true);
        const res = await axios.post("/api/pdf-questions", { pdfText, amount });
        router.push(`/manage-quiz`);

      } catch (e) {
        console.error("Error generating quiz:", e.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      router.push('/premium');
    }
  };

  useEffect(() => {
    localStorage.setItem("pdfText", pdfText);
  }, [pdfText]);

  return (
    <div>
      {!selectedFile ? (
        <div className="flex justify-center items-center  cursor-pointer w-auto border">
          <div
            className="bg-slate-200 mt-24 mb-32  shadow-md p-5 rounded-lg h-[200px] w-[300px] flex flex-col items-center justify-center hover:bg-gray-300  border-gray-700"
            onDrop={handleFileChange}
            onClick={() => fileInputRef.current?.click()}
          >
            <Inbox className="w-10 h-10 text-blue-500" />
            <p className="mt-2 text-sm text-slate-400">
              Drop PDF Here or Click to Upload
            </p>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef}
            />
          </div>
        </div>
      ) : (
        <div className="p-3 flex gap-5">
          <div className="flex w-full h-[80vh] justify-center items-center cursor-pointer flex-col ">
            <div
              className="bg-slate-200 shadow-md p-5 rounded-lg h-[200px] w-[300px] flex flex-col items-center justify-center hover:bg-gray-300"
              onDrop={handleFileChange}
            >
              <Inbox className="w-10 h-10 text-blue-500" />
              <p className="mt-2 text-sm text-slate-400">
                {selectedFile
                  ? selectedFile.name
                  : "Drop PDF Here or Click to Upload"}
              </p>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 mb-2">
                Number of questions
                <input
                  className="p-2 form-input mt-1 block w-full transition duration-300 ease-in-out border-b-2 rounded-lg hover:outline-none bg-slate-100 border-gray-300 focus:border-blue-500"
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </label>
            </div>
            <div
              className="bg-blue-500 text-white px-3 py-1 mt-2 rounded-md"
              onClick={handleGenerate}
            >
              {isLoading ? "Generating..." : "Generate Quiz"}
            </div>
          </div>
          <div>
            <div className="bg-slate-200  px-5 py-2 rounded-lg items-center">
              <h1 className="font-bold text-2xl mt-2">Extracted Text</h1>
              <p className="shadow-md rounded-lg w-[50vw] overflow-y-auto -mt-8 mb-2">
                <TextToSpeech text={pdfText} setPdfText={setPdfText} />
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
