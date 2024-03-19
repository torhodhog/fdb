
import React from "react";

export default function Contact() {


  return (
    <form
      // onSubmit={handleSubmit}
      className="flex flex-col
      mb-28
      mt-28 items-center justify-center w-full max-w-lg mx-auto p-12 bg-gray-800 shadow-xl rounded-lg space-y-4"
    >
      <h1 className="text-3xl font-bold text-white">Kom i kontakt med oss</h1>

      <div className="flex flex-col w-full">
        <label htmlFor="frm-email" className="text-gray-300">
          Email
        </label>
        <input
          id="frm-email"
          type="email"
          name="email"
          className="p-2 rounded bg-gray-700 text-white border border-gray-600"
          required
        />
      </div>

      <div className="flex flex-col w-full">
        <label htmlFor="frm-phone" className="text-gray-300">
          Telefon
        </label>
        <input
          id="frm-phone"
          type="text"
          name="phone"
          className="p-2 rounded bg-gray-700 text-white border border-gray-600"
          required
        />
      </div>

      <div className="flex w-full space-x-2">
        <div className="flex flex-col w-1/2">
          <label htmlFor="frm-first" className="text-gray-300">
            Fornavn
          </label>
          <input
            id="frm-first"
            type="text"
            name="first"
            className="p-2 rounded bg-gray-700 text-white border border-gray-600"
            required
          />
        </div>

        <div className="flex flex-col w-1/2">
          <label htmlFor="frm-last" className="text-gray-300">
            Etternavn
          </label>
          <input
            id="frm-last"
            type="text"
            name="last"
            className="p-2 rounded bg-gray-700 text-white border border-gray-600"
            required
          />
        </div>
      </div>

      <div className="flex flex-col w-full">
        <label htmlFor="frm-message" className="text-gray-300">
          Melding
        </label>
        <textarea
          id="frm-message"
          
          name="message"
          className="p-2 rounded bg-gray-700 text-white border border-gray-600"
        ></textarea>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition duration-300"
      >
        Submit
      </button>
    </form>
  );
}
