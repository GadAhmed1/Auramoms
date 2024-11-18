import Swal from "sweetalert2"; // Import Swal for displaying alerts
import { SiGmail } from "react-icons/si"; // Import Gmail icon from react-icons
import { IoIosSend } from "react-icons/io"; // Import Send icon from react-icons
import { useRef } from "react"; // Import useRef hook from React for handling form reference
import emailjs from "@emailjs/browser"; // Import emailjs for sending emails via forms

// Define the ContactForm_Email functional component
const ContactForm_Email = () => {
  const form = useRef(); // Create a ref for the form element

  // Function to send email using EmailJS
  const sendEmail = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // {***** I'm waiting for Ms. Shaimaa to send the email and password to complete this task. *************}
    emailjs
      .sendForm("service_y2yq4vb", "template_ojm3k4o", form.current, {
        publicKey: "JrF8Q31pqwc0idNVV", // Provide the correct publicKey from EmailJS
      })
      .then(
        () => {
          console.log("SUCCESS!"); // Log success message when email is sent
        },
        (error) => {
          console.log("FAILED...", error.text); // Log error message if email sending fails
        }
      );

    // Display success message using SweetAlert
    Swal.fire({
      title: "Message Was Sent!", // Success title
      text: "We will reply to you in the next 24 hours", // Success message
      icon: "success", // Show success icon
    });
  };

  return (
    // Main container with background color and full screen height
    <main className=" h-screen">
      <section className="">
        {/* Grid layout for responsive design */}
        <div className="flexCenter py-10">
          {/* Contact form container with padding, rounded corners, and shadow */}
          <div className="my-2 mx-20 mb-16 p-10 lg:w-[600px] md:w-96 sm:w-80 xs:w-80 rounded-2xl border-2 shadow-2xl shadow-BabyBlueColor">
            {/* Contact header with icons */}
            <div className="flexCenter gap-2 text-2xl font-semibold ">
              <span className="">Contact Our</span>
              <SiGmail className="text-red-600" /> {/* Gmail icon */}
            </div>

            <div className="">
              {/* Form with ref attribute and onSubmit event handler */}
              <form
                ref={form}
                className="py-10"
                onSubmit={sendEmail}
                autoSave="true"
              >
                {/* Name input field */}
                <input
                  autoFocus
                  required
                  name="user_name"
                  type="text"
                  placeholder="Name"
                  className="mb-5 w-full rounded-md py-1.5 pl-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                {/* Email input field */}
                <input
                  name="user_email"
                  type="email"
                  placeholder="Your email"
                  required
                  className="mb-5  w-full  rounded-md py-1.5 pl-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                {/* Subject input field */}
                <input
                  name="user_subject"
                  type="text"
                  required
                  placeholder="Subject"
                  className="mb-5  w-full rounded-md py-1.5 pl-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                {/* Message textarea field */}
                <textarea
                  required
                  name="message"
                  placeholder="Message"
                  className="ps-1  w-full rounded-md border py-1"
                />

                {/* Buttons for Submit and Reset */}
                <div className="flexCenter mt-5 gap-2">
                  {/* Submit button with hover effects */}
                  <button
                    type="submit"
                    className=" flexCenter px-6 py-1 bg-blue-600 text-white rounded-lg text-xl cursor-pointer hover:bg-BabyBlueColor hover:text-black transition-all"
                  >
                    Send <IoIosSend className="mt-1 ms-1" /> {/* Send icon */}
                  </button>

                  {/* Reset button with hover effects */}
                  <button
                    type="reset"
                    className="flexCenter px-6 py-1 bg-red-600 hover:bg-PinkColor text-white rounded-lg text-xl cursor-pointer hover:text-black transition-all"
                  >
                    Reset
                  </button>
                </div>

                {/* Social media icons displayed after form */}
                <div className=" flexCenter mt-8"></div>
              </form>
            </div>
          </div>

          {/* Placeholder for image (add src attribute for the image) */}
        </div>
      </section>
    </main>
  );
};

export default ContactForm_Email; // Export the ContactForm_Email component as default
