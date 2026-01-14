'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ContactPageFormProps {
  translations: {
    fields: {
      name: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      phone: { label: string; optional: string; placeholder: string };
      message: { label: string; placeholder: string };
    };
    privacy: {
      text: string;
      privacyPolicy: string;
      and: string;
      userTerms: string;
    };
    submit: {
      sending: string;
      button: string;
    };
    messages: {
      success: string;
      error: string;
      failedToSend: string;
    };
  };
}

export default function ContactPageForm({ translations }: ContactPageFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    agreeToTerms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || translations.messages.failedToSend);
      }

      // Success
      setSubmitStatus({
        type: 'success',
        message: translations.messages.success,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        agreeToTerms: false,
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : translations.messages.error,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div className="bg-white rounded-[20px] p-6 md:p-8 w-full lg:max-w-[616px] h-auto md:min-h-[548px]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-[16px]">
        {/* Name Field */}
        <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-primary font-sans text-[14px] leading-[20px] font-semibold tracking-[-0.004em]"
            >
              {translations.fields.name.label}
            </label>
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder={translations.fields.name.placeholder}
              value={formData.name}
              onChange={handleChange}
              className="w-full h-[40px] px-4 pl-11 bg-transparent rounded-[10px] border border-[#E4E4E4] outline-none text-grey-text placeholder:text-[#A3A3A3] placeholder:text-[14px] placeholder:leading-[20px] placeholder:tracking-[-0.004em] font-sans text-[16px] leading-[138%] tracking-[-0.004em]"
              required
            />
            <Image
              src="/icons/user-3-fill.svg"
              alt=""
              width={20}
              height={20}
              className="absolute left-4 top-1/2 -translate-y-1/2"
            />
          </div>
        </div>

        {/* Business Email Field */}
        <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-primary font-sans text-[14px] leading-[20px] font-semibold tracking-[-0.004em]"
            >
              {translations.fields.email.label}
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                placeholder={translations.fields.email.placeholder}
              value={formData.email}
              onChange={handleChange}
              className="w-full h-[40px] px-4 pl-11 bg-transparent rounded-[10px] border border-[#E4E4E4] outline-none text-grey-text placeholder:text-[#A3A3A3] placeholder:text-[14px] placeholder:leading-[20px] placeholder:tracking-[-0.004em] font-sans text-[16px] leading-[138%] tracking-[-0.004em]"
              required
            />
            <Image
              src="/icons/mail-fill.svg"
              alt=""
              width={20}
              height={20}
              className="absolute left-4 top-1/2 -translate-y-1/2"
            />
          </div>
        </div>

        {/* Phone Number Field */}
        <div className="flex flex-col gap-2">
            <label
              htmlFor="phone"
              className="text-primary font-sans text-[14px] leading-[20px] font-semibold tracking-[-0.004em]"
            >
              {translations.fields.phone.label}{' '}
              <span className="text-grey-text/60 font-normal">{translations.fields.phone.optional}</span>
            </label>
            <div className="relative">
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder={translations.fields.phone.placeholder}
              value={formData.phone}
              onChange={handleChange}
              className="w-full h-[40px] px-4 pl-11 bg-transparent rounded-[10px] border border-[#E4E4E4] outline-none text-grey-text placeholder:text-[#A3A3A3] placeholder:text-[14px] placeholder:leading-[20px] placeholder:tracking-[-0.004em] font-sans text-[16px] leading-[138%] tracking-[-0.004em]"
            />
            <Image
              src="/icons/phone-fill.svg"
              alt=""
              width={20}
              height={20}
              className="absolute left-4 top-1/2 -translate-y-1/2"
            />
          </div>
        </div>

        {/* Message Field */}
        <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="text-primary font-sans text-[14px] leading-[20px] font-semibold tracking-[-0.004em]"
            >
              {translations.fields.message.label}
            </label>
            <div className="relative">
              <textarea
                id="message"
                name="message"
                placeholder={translations.fields.message.placeholder}
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 pt-4 bg-transparent rounded-[10px] border border-[#E4E4E4] outline-none text-grey-text placeholder:text-[#A3A3A3] placeholder:text-[14px] placeholder:leading-[20px] placeholder:tracking-[-0.004em] font-sans text-[16px] leading-[138%] tracking-[-0.004em] resize-none"
              required
            />
          </div>
        </div>

        {/* Privacy Policy Checkbox */}
        <div className="flex items-start gap-[24px]">
          <input
            id="terms"
            name="agreeToTerms"
            type="checkbox"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="mt-1 w-4 h-4 rounded border-grey-light accent-primary cursor-pointer"
            required
          />
          <label
            htmlFor="terms"
            className="text-primary font-sans text-[14px] leading-[20px] tracking-[-0.004em] cursor-pointer"
          >
            {translations.privacy.text}{' '}
            <Link
              href="/privacy-policy"
              className="underline hover:text-primary-light"
            >
              {translations.privacy.privacyPolicy}
            </Link>{' '}
            {translations.privacy.and}{' '}
            <Link
              href="/user-terms"
              className="underline hover:text-primary-light"
            >
              {translations.privacy.userTerms}
            </Link>
          </label>
        </div>

        {/* Status Message */}
        {submitStatus.type && (
          <div
            className={`p-4 rounded-[10px] text-sm ${
              submitStatus.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {submitStatus.message}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!formData.agreeToTerms || isSubmitting}
          className="w-full h-[40px] bg-primary text-white rounded-[10px] font-instrument-sans font-semibold text-[14px] leading-[143%] tracking-normal hover:bg-primary-light transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? translations.submit.sending : translations.submit.button}
        </button>
      </form>
    </div>
  );
}
