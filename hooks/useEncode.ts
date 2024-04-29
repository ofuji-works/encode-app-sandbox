import { useEffect, useState, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

export const useEncode = () => {
  const [loaded, setLoaded] = useState(false);
  const init = () => {
    if (typeof window !== "undefined") {
      return new FFmpeg();
    }
    return null;
  };
  const ffmpegRef = useRef(init());
  const messageRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const baseUrl = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";
    const ffmpeg = ffmpegRef.current;

    if (!ffmpeg) {
      return;
    }

    ffmpeg.on("log", ({ message }) => {
      if (messageRef.current) {
        messageRef.current.textContent = message;
      }
    });

    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseUrl}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseUrl}/ffmpeg-core.wasm`,
        "application/wasm",
      ),
    });
    setLoaded(true);
  };

  const encode = async (input: Uint8Array, output: string) => {
    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg) {
      return;
    }
    await ffmpeg.writeFile("input.webm", input);
    await ffmpeg.exec(["-i", "input.webm", output]);
    const data = await ffmpeg.readFile(output);

    if (typeof data === "string") {
      return;
    }

    return new Blob([data.buffer], { type: "audio/wav" });
  };

  return { loaded, ffmpegRef, messageRef, encode };
};
