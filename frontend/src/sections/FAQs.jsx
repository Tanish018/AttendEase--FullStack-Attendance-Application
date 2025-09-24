import { useState, useRef, useEffect } from "react";

function AccordionItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState("0px");
  const contentRef = useRef(null);

  useEffect(() => {
    if (open) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight("0px");
    }
  }, [open]);

  return (
    <div className="border rounded-lg mb-3 shadow-md ">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-3 font-medium text-gray-800 flex justify-between items-center"
      >
        {question}
        <span className="text-xl">{open ? "−" : "+"}</span>
      </button>

      {/* Animated dropdown */}
      <div
        ref={contentRef}
        style={{ maxHeight: height }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div className="px-4 pb-4 text-gray-600 text-sm">{answer}</div>
      </div>
    </div>
  );
}

const FAQ = () => {
  const faqs = [
    {
      q: "What is AttendEase?",
      a: "AttendEase is a smart attendance management application designed to automate student attendance using technologies like facial recognition or RFID. It helps schools, especially in rural areas, save time, reduce errors, and streamline administrative processes.",
    },
    {
      q: "Why is AttendEase important for rural schools?",
      a: "Rural schools often rely on manual attendance systems, which are slow, error-prone, and take away valuable teaching time. AttendEase provides an easy-to-use digital solution that improves accuracy and saves resources while requiring minimal infrastructure.",
    },
    {
      q: "How does the facial recognition feature work?",
      a: "Facial recognition technology in AttendEase identifies students by scanning their faces through a camera or smartphone. Once a student's face is recognized, their attendance is automatically marked, reducing the need for manual roll calls.",
    },
    {
      q: "Is AttendEase expensive to implement?",
      a: "No, AttendEase is designed to be a low-cost solution, keeping rural schools and budget constraints in mind. It requires only basic devices like smartphones or inexpensive RFID scanners.",
    },
    {
      q: "Do teachers or staff need technical expertise to use AttendEase?",
      a: "Not at all! AttendEase has a user-friendly interface and requires minimal training. Teachers and school administrators can quickly adapt to the system.",
    },
    {
      q: "Can AttendEase generate reports for government programs like mid-day meals?",
      a: "Yes. AttendEase automatically generates accurate attendance reports, which can be used for government schemes and audits, such as mid-day meal distribution, scholarship tracking, and performance monitoring.",
    },
    {
      q: "How do you prevent proxy attendance or 'buddy punching'?",
      a: "Face recognition ensure that only the right student can mark attendance.",
    },
    {
      q: "How secure is the student data?",
      a: "Data privacy is a top priority. AttendEase uses secure encryption protocols to protect all personal and attendance data, complying with relevant government guidelines.",
    },
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-12 scale-105">
      <div className="text-center max-w-3xl mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
          Frequently Asked <span className="text-blue-600">Questions</span>
        </h2>
        <p className="text-gray-600 mt-2">
          Get answers to common questions about AttendEase's features,
          security, and implementation.
        </p>
      </div>

      <div className="w-full max-w-3xl bg-white">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} question={faq.q} answer={faq.a} />
        ))}
      </div>
    </section>
  );
}

export default FAQ;