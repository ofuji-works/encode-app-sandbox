"use client";

import { useState } from "react";
import { useEncode } from "../hooks/useEncode";
import { post } from "../api";

export default function Home() {
  const [file, setFile] = useState<File>();
  const [encodedFile, setEncodedFile] = useState<string>();
  const { loaded, encode } = useEncode();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!file) {
        throw new Error("No file selected");
      }

      const buffer = new Uint8Array(await file.arrayBuffer());
      const data = await encode(buffer, "output.wav");

      if (!data) {
        throw new Error("Failed to encode");
      }

      setEncodedFile(URL.createObjectURL(data));

      const formData = new FormData();
      formData.append("file", data, "output.wav");
      post(formData);
    } catch (e) {
      console.error(e);
    }
  };

  if (!loaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Encode</button>
      <audio controls src={encodedFile} />
    </div>
  );
}
