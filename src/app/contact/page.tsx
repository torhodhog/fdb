'use client'
import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';  // Importerer toast fra sonner, antar at biblioteket eksporterer en funksjon kalt toast

export default function Contact() {
  const form = useRef<HTMLFormElement | null>(null);
  const [formState, setFormState] = useState({
    user_email: '',
    user_name: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormState({
      user_email: '',
      user_name: '',
      message: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm('service_6lo1mcj', 'template_xu5g40h', form.current, 'TgOIRuM_0f-3pFshq')
        .then(() => {
          toast.success('Melding sendt uten problemer!');
          resetForm();
        }, (error) => {
          toast.error('Failed to send email: ' + error.text);
          console.error('Failed to send email', error.text);
        });
    } else {
      console.error('Form reference is null');
      toast.error('Form reference is not available');
    }
  };

  return (
    <>
      <form
        ref={form}
        onSubmit={handleSubmit}
        className="flex flex-col mb-28 mt-28 items-center justify-center w-full max-w-lg mx-auto p-12 bg-gray-800 shadow-xl rounded-lg space-y-4"
      >
        <h1 className="text-3xl font-bold text-white">Kom i kontakt med oss</h1>

        <div className="flex flex-col w-full">
          <label htmlFor="frm-email" className="text-gray-300">
            Email
          </label>
          <input
            id="frm-email"
            type="email"
            name="user_email"
            value={formState.user_email}
            className="p-2 rounded bg-gray-700 text-white border border-gray-600"
            required
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="frm-first" className="text-gray-300">
            Navn
          </label>
          <input
            id="frm-first"
            type="text"
            name="user_name"
            value={formState.user_name}
            className="p-2 rounded bg-gray-700 text-white border border-gray-600"
            required
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="frm-message" className="text-gray-300">
            Melding
          </label>
          <textarea
            id="frm-message"
            name="message"
            value={formState.message}
            className="p-2 rounded bg-gray-700 text-white border border-gray-600"
            onChange={handleChange}
          ></textarea>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition duration-300"
        >
          Send inn
        </button>
      </form>

      <div className="flex justify-center items-center flex-col gap-y-3 mb-8">
        <p>
          <FontAwesomeIcon icon={faMapMarkerAlt} color="green" /> Brunestykket 2, 5039 Bergen
        </p>
        <p>
          <FontAwesomeIcon icon={faEnvelope} color="green" /> Mail: fdb@fotballdraktbutikken.com
        </p>
        <p>
          <FontAwesomeIcon icon={faPhone} color="green" /> Telefon: +47 979 39 973
        </p>
      </div>
    </>
  );
}
