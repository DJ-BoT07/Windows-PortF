"use client";

import React, { useState, useEffect } from "react";
import { BaseWindow } from './base-window';
import { Terminal } from 'lucide-react'; // Import the terminal icon
import { useRouter } from "next/navigation";

export function TerminalWindow({ onClose, onMinimize, onMaximize, isMaximized, zIndex }) {
  const [userInput, setUserInput] = useState("");
  const [terminalOutput, setTerminalOutput] = useState([]);
  const router = useRouter();

  const BLACKLISTED_KEY_CODES = [38, 40, 37, 39, 18, 20, 17, 16, 9, 27, 144];
  const COMMANDS = {
    help: 'The page you want to visit does not exist, or it may have been deleted, or the wrong address was entered. To see the commands, enter the word <span class="text-[#fa615c]">commands</span>',
    exit: "",
    report: '<span class="text-green-500">This page report has been successfully sent to support.</span>',
    commands: 'List of commands: <span class="text-[#fa615c]"> help</span>, <span class="text-[#fa615c]"> exit</span> , <span class="text-[#fa615c]"> report</span>, <span class="text-[#fa615c]"> dashboard</span> , <span class="text-[#fa615c]"> home</span>, <span class="text-[#fa615c]"> time</span>, <span class="text-[#fa615c]"> date</span>, <span class="text-[#fa615c]"> weather</span>, <span class="text-[#fa615c]"> about</span>, <span class="text-[#fa615c]"> motivate</span>, <span class="text-[#fa615c]"> meme</span>, <span class="text-[#fa615c]"> fact</span>',
    cls: "",
    dashboard: "",
    home: "",
    time: () => new Date().toLocaleTimeString(),
    date: () => new Date().toLocaleDateString(),
    weather: '<span class="text-yellow-500">Current weather: Sunny, 25°C</span>',
    about: '<span class="text-blue-500">This is a fictional terminal for fun purposes. Built with Next.js and Tailwind CSS.</span>',
    motivate: '<span class="text-green-500">"The only way to do great work is to love what you do." - Steve Jobs</span>',
    meme: '<span class="text-pink-500">Why don’t scientists trust atoms? Because they make up everything!</span>',
    fact: '<span class="text-orange-500">Did you know? Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still edible!</span>',
  };

  useEffect(() => {
    // Set initial terminal message
    setTerminalOutput([
      `<p>Microsoft Windows XP [Version 5.1.2600]</p>`,
      `<p>C:\\Windows\\system32\\cmd.exe</p>`,
      `<p>(c) Copyright 1985-2001 Microsoft Corp.</p>`,
      `<p>&nbsp;</p>`
    ]);
  }, []);

  const executeCommand = (input) => {
    if (!input) return;

    // Add command to output with proper formatting
    setTerminalOutput(prev => [...prev, `<p>C:\\Users\\Guest>${input}</p>`]);

    let output;

    if (!COMMANDS.hasOwnProperty(input)) {
      output = `'${input}' is not recognized as an internal or external command,\noperable program or batch file.`;
    } else if (input === "cls" || input === "clear") {
      setTerminalOutput([
        `<p>Microsoft Windows XP [Version 5.1.2600]</p>`,
        `<p>C:\\Windows\\system32\\cmd.exe</p>`,
        `<p>(c) Copyright 1985-2001 Microsoft Corp.</p>`,
        `<p>&nbsp;</p>`
      ]);
      return;
    } else if (input === "close" || input === "exit") {
      router.push("/");
      return;
    } else if (input === "report") {
      setTerminalOutput((prev) => [...prev, `<p>${COMMANDS[input]}</p>`]);
      return;
    } else if (input === "dashboard") {
      setTerminalOutput((prev) => [
        ...prev,
        `<p>Navigating to Dashboard.....</p>`,
      ]);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
      return;
    } else if (input === "home") {
      setTerminalOutput((prev) => [
        ...prev,
        `<p>Navigating to Home....</p>`,
      ]);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else if (input === "time") {
      output = COMMANDS[input]();
    } else if (input === "date") {
      output = COMMANDS[input]();
    } else {
      output = COMMANDS[input];
    }

    if (output) {
      setTerminalOutput(prev => [...prev, `<p>${output}</p>`]);
    }
  };

  const handleKey = (event) => {
    if (BLACKLISTED_KEY_CODES.includes(event.keyCode)) return;
    event.preventDefault();

    const currentKey = event.key;
    if (currentKey === "Enter") {
      executeCommand(userInput.trim());
      setUserInput("");
    } else if (currentKey === "Backspace") {
      setUserInput((prev) => prev.slice(0, -1));
    } else {
      setUserInput((prev) => prev + currentKey);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [userInput]);

  return (
    <BaseWindow
      title="Command Prompt"
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      isMaximized={isMaximized}
      zIndex={zIndex}
    >
      <div className="flex flex-col h-full">
        <div 
          className="flex-1 p-1 bg-black text-white font-[Consolas,monaco] text-sm overflow-auto whitespace-pre-wrap"
          style={{
            fontFamily: "'Lucida Console', Monaco, monospace",
          }}
        >
          <div
            id="code"
            className="terminal-output"
            dangerouslySetInnerHTML={{
              __html: terminalOutput.join(""),
            }}
          />
          <div className="flex">
            <span className="text-white">C:\Users\Guest&gt;</span>
            <span
              id="userInput"
              className="ml-1 relative"
            >
              {userInput}
              <span className="absolute inset-y-0 right-0 w-2 bg-white animate-pulse"></span>
            </span>
          </div>
          <input
            type="text"
            id="Keyboard"
            className="opacity-0 absolute"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
        </div>
      </div>
    </BaseWindow>
  );
}
