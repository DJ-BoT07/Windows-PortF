import React, { useState } from 'react';
import { BaseWindow } from './base-window';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, Linkedin, Github, Twitter } from 'lucide-react';

export function ContactWindow({ onClose, onMinimize, onMaximize, isMaximized, zIndex }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BaseWindow 
      title="Contact" 
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      isMaximized={isMaximized}
      zIndex={zIndex}
    >
      <div className="p-6 bg-[#ECE9D8] h-full overflow-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#0054E3]">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <Mail className="mr-2 h-4 w-4 text-[#0054E3]" />
              <a href="mailto:djmangaonkar7@gmail.com" className="text-blue-600 hover:underline">djmangaonkar7@gmail.com</a>
            </div>
            <div className="flex items-center">
              <Linkedin className="mr-2 h-4 w-4 text-[#0054E3]" />
              <a href="https://www.linkedin.com/in/dj-mangaonkar-07k/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">linkedin.com/in/dj-mangaonkar-07k/</a>
            </div>
            <div className="flex items-center">
              <Github className="mr-2 h-4 w-4 text-[#0054E3]" />
              <a href="https://github.com/DJ-BoT07" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">github.com/DJ-BoT07</a>
            </div>
            <div className="flex items-center">
              <Twitter className="mr-2 h-4 w-4 text-[#0054E3]" />
              <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@yourhandle</a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-[#0054E3]">Send me a message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Your email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Your message" rows={4} required />
              </div>
              <Button type="submit" className="bg-[#0054E3] hover:bg-[#003399]" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
              {submitStatus === 'success' && <p className="text-green-600">Message sent successfully!</p>}
              {submitStatus === 'error' && <p className="text-red-600">Error sending message. Please try again.</p>}
            </form>
          </CardContent>
        </Card>
      </div>
    </BaseWindow>
  );
}