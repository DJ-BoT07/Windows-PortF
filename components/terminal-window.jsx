"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { BaseWindow } from './base-window';
import { Terminal } from 'lucide-react'; // Import the terminal icon
import { useRouter } from "next/navigation";
import Image from 'next/image';

// Move BLACKLISTED_KEY_CODES outside the component since it's constant
const BLACKLISTED_KEY_CODES = [38, 40, 37, 39, 18, 20, 17, 16, 9, 27, 144];

export function TerminalWindow({ onClose, onMinimize, onMaximize, isMaximized, zIndex, addWindow }) {
  const [userInput, setUserInput] = useState("");
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [currentDirectory, setCurrentDirectory] = useState("C:\\Users\\Guest");
  const router = useRouter();

  // First, add this state near the top of the component
  const [fileSystem, setFileSystem] = useState({
    'C:': {
      'Program Files': {},
      'Users': {
        'Guest': {
          'Desktop': {},
          'Documents': {},
          'Downloads': {}
        }
      },
      'Windows': {
        'System32': {}
      }
    }
  });

  // Move COMMANDS inside useMemo to prevent recreation on every render
  const COMMANDS = useMemo(() => ({
    help: (command) => {
      if (command) {
        const helpTexts = {
          cd: `Changes the current directory.
  
  CD [drive:][path]
  CD ..           - Move to parent directory
  CD \\           - Display current directory
  
  Example: CD Documents`,
        
          dir: `Displays a list of files and subdirectories in a directory.
  
  DIR [drive:][path]
  
  Example: DIR C:\\Users`,
        
          cls: `Clears the screen.
  
  Usage: CLS`,
        
          echo: `Displays messages or turns command echoing on or off.
  
  ECHO [message]
  
  Example: ECHO Hello World`,
        
          exit: `Quits the Command Prompt.
  
  Usage: EXIT`,
        
          time: `Displays the system time.
  
  Usage: TIME`,
        
          date: `Displays the system date.
  
  Usage: DATE`,
        
          ver: `Displays the Windows version.
  
  Usage: VER`,
        
          vol: `Displays the disk volume label and serial number.
  
  Usage: VOL [drive:]`,

          systeminfo: `Displays detailed information about your computer's hardware 
and operating system configuration.
  
  Usage: SYSTEMINFO`,

          tasklist: `Displays a list of currently running processes.
  
  Usage: TASKLIST`,

          ipconfig: `Displays all current TCP/IP network configuration values.
  
  Usage: IPCONFIG`,

          ping: `Tests network connection to a specified host.
  
  Usage: PING hostname
  Example: PING google.com`,

          tree: `Graphically displays the directory structure.
  
  Usage: TREE [drive:][path]`,

          netstat: `Displays active network connections and ports.
  
  Usage: NETSTAT`,

          hostname: `Displays the computer's host name.
  
  Usage: HOSTNAME`,

          mkdir: `Creates a directory.
  
  Usage: MKDIR [drive:]path
  Example: MKDIR newfolder`,

          rmdir: `Removes (deletes) a directory.
  
  Usage: RMDIR [drive:]path
  Example: RMDIR oldfolder`,

          type: `Displays the contents of a text file.
  
  Usage: TYPE [drive:][path]filename
  Example: TYPE readme.txt`,

          projects: `Opens the My Projects window.
  
  Usage: PROJECTS`,

          skills: `Opens the Skills window.
  
  Usage: SKILLS`,

          contact: `Opens the Contact window.
  
  Usage: CONTACT`,

          about: `Opens the About Me window.
  
  Usage: ABOUT`,

          resume: `Opens the Resume window.
  
  Usage: RESUME`,
        };

        return helpTexts[command.toLowerCase()] || `No help available for '${command}'`;
      }

      // General help when no specific command is specified
      return `Microsoft Windows XP [Version 5.1.2600]
Help provides information about Windows commands.

BASIC COMMANDS:
  CD              Changes the current directory
  CLS             Clears the screen
  DIR             Lists files and directories
  EXIT            Exits CMD.EXE
  HELP            Shows help information
  TIME            Shows/sets system time
  DATE            Shows/sets system date
  VER             Shows Windows version

FILE COMMANDS:
  MKDIR           Creates a directory
  RMDIR           Removes a directory
  TYPE            Displays file contents
  TREE            Shows directory structure

NETWORK COMMANDS:
  IPCONFIG        Shows network configuration
  PING            Tests network connection
  NETSTAT         Shows network statistics
  HOSTNAME        Shows computer name

SYSTEM COMMANDS:
  SYSTEMINFO      Shows system information
  TASKLIST        Shows running processes
  VOL             Shows disk information
  ECHO            Displays messages

PORTFOLIO COMMANDS:
  PROJECTS        Opens My Projects window
  SKILLS          Opens Skills window
  CONTACT         Opens Contact window
  ABOUT           Opens About Me window
  RESUME          Opens Resume window

For more information on a specific command, type:
  HELP command-name

Example: HELP CD`;
    },

    ver: () => "Microsoft Windows XP [Version 5.1.2600]",

    dir: () => {
      // Get current directory contents
      const pathArray = currentDirectory.split('\\').filter(Boolean);
      let currentNode = fileSystem['C:']; // Start from C: drive
      
      // Navigate to current directory
      for (let i = 1; i < pathArray.length; i++) {
        const dir = pathArray[i];
        if (!currentNode[dir]) {
          return "The system cannot find the path specified.";
        }
        currentNode = currentNode[dir];
      }
      
      const contents = Object.keys(currentNode);
      
      return `
 Volume in drive C has no label.
 Volume Serial Number is 1234-5678

 Directory of ${currentDirectory}

${new Date().toLocaleDateString()}  08:30 AM    <DIR>          .
${new Date().toLocaleDateString()}  08:30 AM    <DIR>          ..
${contents.map(name => 
  `${new Date().toLocaleDateString()}  08:30 AM    <DIR>          ${name}`
).join('\n')}
               0 File(s)              0 bytes
               ${contents.length + 2} Dir(s)  51,475,456,000 bytes free`;
    },

    cd: (args) => {
      if (!args) return currentDirectory;
      
      let newPath;
      if (args === "..") {
        newPath = currentDirectory.split("\\").slice(0, -1).join("\\");
      } else if (args.startsWith("C:\\")) {
        newPath = args;
      } else {
        newPath = `${currentDirectory}\\${args}`;
      }
      
      // Validate path exists in fileSystem
      const pathArray = newPath.split('\\').filter(Boolean); // Remove empty strings
      let currentNode = fileSystem['C:'];  // Start from C: drive
      
      for (let i = 1; i < pathArray.length; i++) { // Start from 1 to skip 'C:'
        const dir = pathArray[i];
        if (!currentNode[dir]) {
          return "The system cannot find the path specified.";
        }
        currentNode = currentNode[dir];
      }
      
      setCurrentDirectory(newPath);
      return "";
    },

    echo: (args) => args || "",
    
    time: () => new Date().toLocaleTimeString(),
    
    date: () => new Date().toLocaleDateString(),
    
    cls: () => {
      setTerminalOutput([]);
      return "";
    },

    color: () => "Changes console color (not implemented in this version)",

    vol: () => `
 Volume in drive C has no label.
 Volume Serial Number is 1234-5678`,

    exit: () => {
      onClose();
      return "";
    },

    mkdir: (args) => {
      if (!args) return "The syntax of the command is incorrect.";
      const dirName = args.trim();
      
      // Get current path as array
      const pathArray = currentDirectory.split('\\').filter(Boolean); // Remove empty strings
      let currentNode = fileSystem['C:']; // Start from C: drive
      
      // Navigate to current directory in fileSystem
      for (let i = 1; i < pathArray.length; i++) { // Start from 1 to skip 'C:'
        const dir = pathArray[i];
        if (!currentNode[dir]) {
          return "The system cannot find the path specified.";
        }
        currentNode = currentNode[dir];
      }
      
      // Check if directory already exists
      if (currentNode[dirName]) {
        return `A subdirectory or file ${dirName} already exists.`;
      }
      
      // Create new directory
      setFileSystem(prev => {
        const newFS = JSON.parse(JSON.stringify(prev));
        let node = newFS['C:']; // Start from C: drive
        for (let i = 1; i < pathArray.length; i++) {
          node = node[pathArray[i]];
        }
        node[dirName] = {};
        return newFS;
      });
      
      return `Directory '${dirName}' created successfully.`;
    },

    rmdir: (args) => {
      if (!args) return "The syntax of the command is incorrect.";
      const dirName = args.trim();
      
      // Get current path as array and remove empty strings
      const pathArray = currentDirectory.split('\\').filter(Boolean);
      let currentNode = fileSystem['C:']; // Start from C: drive
      
      // Navigate to current directory in fileSystem
      for (let i = 1; i < pathArray.length; i++) {
        const dir = pathArray[i];
        if (!currentNode[dir]) {
          console.log('Navigation failed at:', dir); // Debug log
          return "The system cannot find the path specified.";
        }
        currentNode = currentNode[dir];
      }
      
      // Check if directory exists in current location
      if (!currentNode[dirName]) {
        console.log('Directory not found:', dirName, 'in', currentNode); // Debug log
        return `The system cannot find the directory specified: ${dirName}`;
      }
      
      // Remove directory
      setFileSystem(prev => {
        const newFS = JSON.parse(JSON.stringify(prev));
        let node = newFS['C:']; // Start from C: drive
        
        // Navigate to the current directory
        for (let i = 1; i < pathArray.length; i++) {
          node = node[pathArray[i]];
        }
        
        // Delete the directory
        delete node[dirName];
        return newFS;
      });
      
      return `Directory '${dirName}' was successfully removed.`;
    },

    type: (args) => {
      if (!args) return "The syntax of the command is incorrect.";
      return "File not found.";
    },

    systeminfo: () => `
Host Name:                 DIGVIJAY-PC
OS Name:                   Microsoft Windows XP Professional
OS Version:               5.1.2600
OS Manufacturer:          Microsoft Corporation
Owner:                    Digvijay Mangaonkar (DJ-BoT07)
Role:                     SDE Intern @ Zomato | Final Year B.E. Student
College:                  D.Y. Patil College of Engineering, Akurdi, Pune
CGPA:                     9.48
LeetCode Rating:          1756 | 375+ Problems | Global Rank 389
System Type:              Full-Stack Developer | React / Next.js Specialist
Processor:                Brain v4.0 ~Caffeinated GHz
Specialization:           Frontend Engineering, UI Component Libraries
Windows Directory:        C:\\WINDOWS
System Directory:         C:\\WINDOWS\\System32
Boot Device:              \\Device\\HarddiskVolume1
System Locale:            en-in
Input Locale:             en-in
Time Zone:                (GMT+05:30) India Standard Time`,

    tasklist: () => `
Image Name                   PID    Session Name    Mem Usage
========================= ======== ============== ============
System Idle Process            0    Services           24 K
System                         4    Services          256 K
smss.exe                    368    Services          432 K
csrss.exe                   592    Services          1,156 K
winlogon.exe                616    Services          2,436 K
services.exe                660    Services          3,488 K
explorer.exe               1460    Console          12,560 K`,

    ipconfig: () => `
Windows IP Configuration

Ethernet adapter Local Area Connection:
   Connection-specific DNS Suffix  . : localdomain
   IP Address. . . . . . . . . . . : 192.168.1.100
   Subnet Mask . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . : 192.168.1.1`,

    ping: (args) => {
      if (!args) return "The syntax of the command is incorrect.";
      return `
Pinging ${args} with 32 bytes of data:
Reply from ${args}: bytes=32 time=1ms TTL=128
Reply from ${args}: bytes=32 time=1ms TTL=128
Reply from ${args}: bytes=32 time=1ms TTL=128
Reply from ${args}: bytes=32 time=1ms TTL=128

Ping statistics for ${args}:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 1ms, Maximum = 1ms, Average = 1ms`;
    },

    tree: () => {
      const buildTree = (obj, prefix = '') => {
        let result = '';
        const entries = Object.entries(obj);
        entries.forEach(([key, value], index) => {
          const isLast = index === entries.length - 1;
          const connector = isLast ? '└───' : '├───';
          result += `${prefix}${connector}${key}\n`;
          if (Object.keys(value).length > 0) {
            const newPrefix = prefix + (isLast ? '    ' : '│   ');
            result += buildTree(value, newPrefix);
          }
        });
        return result;
      };

      return `Folder PATH listing\n${buildTree(fileSystem)}`;
    },

    title: (args) => {
      if (args) {
        document.title = args;
        return "";
      }
      return "The syntax of the command is incorrect.";
    },

    hostname: () => "WINDOWS-XP",

    netstat: () => `
Active Connections

  Proto  Local Address          Foreign Address        State
  TCP    127.0.0.1:1234        0.0.0.0:0             LISTENING
  TCP    192.168.1.100:1234    192.168.1.1:445       ESTABLISHED`,

    // Portfolio commands with different window positions
    projects: () => {
      if (addWindow) {
        const position = { x: 100, y: 100 }; // Default position for Projects window
        addWindow('My Projects', getIconForName('My Projects'), position);
        return "Opening My Projects window...";
      }
      return "Error: Cannot open window";
    },

    skills: () => {
      if (addWindow) {
        const position = { x: 150, y: 150 }; // Offset position for Skills window
        addWindow('Skills', getIconForName('Skills'), position);
        return "Opening Skills window...";
      }
      return "Error: Cannot open window";
    },

    contact: () => {
      if (addWindow) {
        const position = { x: 200, y: 200 }; // Offset position for Contact window
        addWindow('Contact', getIconForName('Contact'), position);
        return "Opening Contact window...";
      }
      return "Error: Cannot open window";
    },

    about: () => {
      if (addWindow) {
        const position = { x: 250, y: 250 }; // Offset position for About window
        addWindow('About Me', getIconForName('About Me'), position);
        return "Opening About Me window...";
      }
      return "Error: Cannot open window";
    },

    resume: () => {
      if (addWindow) {
        const position = { x: 300, y: 300 }; // Offset position for Resume window
        addWindow('Resume', getIconForName('Resume'), position);
        return "Opening Resume window...";
      }
      return "Error: Cannot open window";
    },

    // Add this debug command to help us see the file system structure
    debug: () => {
      console.log('Current Directory:', currentDirectory);
      console.log('Current Path Array:', currentDirectory.split('\\').filter(Boolean));
      console.log('File System State:', JSON.stringify(fileSystem, null, 2));
      return `Current Directory: ${currentDirectory}
File System State: ${JSON.stringify(fileSystem, null, 2)}`;
    },
  }), [addWindow, currentDirectory, onClose, fileSystem]); // Added fileSystem to dependencies

  // Move executeCommand inside useCallback with proper dependencies
  const executeCommand = useCallback((input) => {
    if (!input) return;

    setTerminalOutput(prev => [...prev, `${currentDirectory}>${input}`]);

    const [cmd, ...args] = input.trim().toLowerCase().split(" ");
    const argsString = args.join(" ");

    if (!COMMANDS.hasOwnProperty(cmd)) {
      setTerminalOutput(prev => [...prev, 
        `'${cmd}' is not recognized as an internal or external command,`,
        `operable program or batch file.`
      ]);
      return;
    }

    const output = COMMANDS[cmd](argsString);
    if (output) {
      setTerminalOutput(prev => [...prev, output]);
    }
  }, [COMMANDS, currentDirectory]);

  // Update useEffect with all dependencies
  useEffect(() => {
    const currentHandleKey = (event) => {
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

    window.addEventListener("keydown", currentHandleKey);
    return () => {
      window.removeEventListener("keydown", currentHandleKey);
    };
  }, [userInput, executeCommand]); // BLACKLISTED_KEY_CODES is now constant

  useEffect(() => {
    setTerminalOutput([
      `Microsoft Windows XP [Version 5.1.2600]`,
      `(C) Copyright 1985-2001 Microsoft Corp.`,
      ``,
    ]);
  }, []);

  // Add this ref for the terminal output container
  const terminalRef = useRef(null);

  // Add this useEffect to handle auto-scrolling
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput, userInput]); // Scroll when output or input changes

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
          ref={terminalRef} // Add the ref here
          className="flex-1 p-1 bg-black text-white font-[Consolas,monaco] text-sm overflow-auto whitespace-pre-wrap"
          style={{
            fontFamily: "'Lucida Console', Monaco, monospace",
          }}
        >
          {terminalOutput.map((line, i) => (
            <div key={i} className="terminal-line">{line}</div>
          ))}
          <div className="flex">
            <span className="text-white">{currentDirectory}&gt;</span>
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
            autoFocus
          />
        </div>
      </div>
    </BaseWindow>
  );
}
