import React, { useState } from 'react';
import { BaseWindow } from './base-window';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Send, User, MessageSquare, Globe, Github, Linkedin, FileText, AlertCircle } from 'lucide-react';

export function ContactWindow({ onClose, onMinimize, onMaximize, isMaximized, zIndex }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState(null);
  const [activeTab, setActiveTab] = useState('form');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // Here you would typically send the email
      // For now, let's simulate a success after 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const quickLinks = [
    { 
      icon: <Mail size={16} />, 
      text: 'djmangaonkar7@gmail.com',
      action: () => window.location.href = 'mailto:djmangaonkar7@gmail.com'
    },
    { 
      icon: <Phone size={16} />, 
      text: '+91 8010174858',
      action: () => window.location.href = 'tel:+918010174858'
    },
    { 
      icon: <Github size={16} />, 
      text: 'GitHub Profile',
      action: () => window.open('https://github.com/DJ-BoT07', '_blank')
    },
    { 
      icon: <Globe size={16} />, 
      text: 'Portfolio Website',
      action: () => window.open('https://djport07.netlify.app/', '_blank')
    },
    { 
      icon: <Linkedin size={16} />, 
      text: 'LinkedIn Profile',
      action: () => window.open('https://www.linkedin.com/in/digvijay-mangaonkar-8b314a249/', '_blank')
    }
  ];

  return (
    <BaseWindow
      title="Contact Me"
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      isMaximized={isMaximized}
      zIndex={zIndex}
    >
      <div className="flex h-full bg-[#ECE9D8]">
        {/* Left Sidebar */}
        <div className="w-48 bg-[#ECE9D8] border-r border-[#ACA899] p-2">
          <div className="bg-gradient-to-r from-[#0054E3] to-[#2E81EF] text-white px-3 py-2 rounded-t">
            <span className="text-sm font-bold">Contact Options</span>
          </div>
          <div className="border border-[#ACA899] border-t-0 bg-white rounded-b">
            <button
              className={`w-full flex items-center px-3 py-2 ${
                activeTab === 'form' ? 'bg-[#316AC5] text-white' : 'hover:bg-[#E5F1FB] text-[#1B57AA]'
              }`}
              onClick={() => setActiveTab('form')}
            >
              <MessageSquare size={16} className="mr-2" />
              <span className="text-sm">Send Message</span>
            </button>
            <button
              className={`w-full flex items-center px-3 py-2 ${
                activeTab === 'info' ? 'bg-[#316AC5] text-white' : 'hover:bg-[#E5F1FB] text-[#1B57AA]'
              }`}
              onClick={() => setActiveTab('info')}
            >
              <FileText size={16} className="mr-2" />
              <span className="text-sm">Contact Info</span>
            </button>
          </div>

          {/* Quick Links */}
          <div className="mt-4">
            <div className="bg-[#4B6FBA] text-white px-3 py-1.5 text-sm font-bold">
              Quick Links
            </div>
            <div className="bg-[#EBF3FE] border border-[#ACA899] border-t-0 p-2 space-y-2">
              {quickLinks.map((link, index) => (
                <motion.button
                  key={index}
                  className="flex items-center w-full text-[#0645AD] hover:underline text-xs text-left"
                  onClick={link.action}
                  whileHover={{ x: 2 }}
                >
                  <span className="mr-2">{link.icon}</span>
                  {link.text}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 bg-white overflow-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'form' ? (
              <motion.form
                key="form"
                className="space-y-4"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div>
                  <label className="flex items-center text-[#1B57AA] mb-1">
                    <User size={16} className="mr-2" />
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-[#ACA899] rounded focus:border-[#316AC5] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="flex items-center text-[#1B57AA] mb-1">
                    <Mail size={16} className="mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-[#ACA899] rounded focus:border-[#316AC5] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="flex items-center text-[#1B57AA] mb-1">
                    <FileText size={16} className="mr-2" />
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-2 border border-[#ACA899] rounded focus:border-[#316AC5] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="flex items-center text-[#1B57AA] mb-1">
                    <MessageSquare size={16} className="mr-2" />
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full p-2 border border-[#ACA899] rounded focus:border-[#316AC5] focus:outline-none resize-none"
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  className="flex items-center justify-center w-full p-2 bg-[#316AC5] text-white rounded hover:bg-[#2582EA] disabled:opacity-50"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={16} className="mr-2" />
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </motion.button>

                {status && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded ${
                      status === 'success' 
                        ? 'bg-green-100 text-green-700' 
                        : status === 'error'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <AlertCircle size={16} className="mr-2" />
                      {status === 'success' 
                        ? 'Message sent successfully!' 
                        : status === 'error'
                        ? 'Failed to send message. Please try again.'
                        : 'Sending message...'}
                    </div>
                  </motion.div>
                )}
              </motion.form>
            ) : (
              <motion.div
                key="info"
                className="space-y-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="bg-[#EBF4FD] border border-[#B6D5F3] rounded p-4">
                  <h3 className="text-[#1B57AA] font-bold mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    {quickLinks.map((link, index) => (
                      <motion.button
                        key={index}
                        className="flex items-center w-full p-2 hover:bg-white rounded transition-colors"
                        onClick={link.action}
                        whileHover={{ x: 2 }}
                      >
                        <span className="w-8 h-8 bg-[#D1E6F9] rounded flex items-center justify-center mr-3">
                          {link.icon}
                        </span>
                        <span className="text-sm">{link.text}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </BaseWindow>
  );
}