import { useState } from "react";
import emailjs from "@emailjs/browser";
import { sendLeadToCRM, getContactSettings } from "../../services/crmApi";
import { useTranslation } from "react-i18next";

import "./Contact.css";

import contatImg from "../../assets/ChatGPT Image Sep 17, 2026, 09_29_26 AM.png";

const countries = [
  {
    key: "eg",
    code: "+20",
    flag: "https://flagcdn.com/w40/eg.png",
  },
  {
    key: "sa",
    code: "+966",
    flag: "https://flagcdn.com/w40/sa.png",
  },
  {
    key: "ae",
    code: "+971",
    flag: "https://flagcdn.com/w40/ae.png",
  },
  {
    key: "kw",
    code: "+965",
    flag: "https://flagcdn.com/w40/kw.png",
  },
  {
    key: "qa",
    code: "+974",
    flag: "https://flagcdn.com/w40/qa.png",
  },
  {
    key: "bh",
    code: "+973",
    flag: "https://flagcdn.com/w40/bh.png",
  },
  {
    key: "om",
    code: "+968",
    flag: "https://flagcdn.com/w40/om.png",
  },
  {
    key: "jo",
    code: "+962",
    flag: "https://flagcdn.com/w40/jo.png",
  },
  {
    key: "gb",
    code: "+44",
    flag: "https://flagcdn.com/w40/gb.png",
  },
  {
    key: "us",
    code: "+1",
    flag: "https://flagcdn.com/w40/us.png",
  },
];

const Contact = () => {
  const { t } = useTranslation();
  const countryName = (country) => t(`contact.countries.${country.key}`);

  const [countryCode, setCountryCode] = useState("+20");
  const [countryOpen, setCountryOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    details: "",
  });

  const selectedCountry =
    countries.find((country) => country.code === countryCode) ||
    countries[0];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullPhone = `${countryCode}${formData.phone}`;

    try {
      // الطلبات تروح فين؟ (من لوحة التحكم): crm | email | both
      const settings = await getContactSettings();

      if (settings.mode === "crm" || settings.mode === "both") {
        await sendLeadToCRM({ name: formData.name, phone: fullPhone }, settings);
      }

      if (settings.mode === "email" || settings.mode === "both") {
        await emailjs.send(
          "service_x1ity4b",
          "template_kvj6omi",
          {
            name: formData.name,
            phone: fullPhone,
            service: formData.service,
            details: formData.details,
          },
          { publicKey: "Bw35TVd4L_HMieFsl" }
        );
      }

      alert(t("contact.success"));

      setFormData({
        name: "",
        phone: "",
        service: "",
        details: "",
      });

      setCountryCode("+20");
      setCountryOpen(false);
    } catch (error) {
      console.log("CRM ERROR:", error);
      alert(`${t("contact.error")} ${error.message || error.text || ""}`);
    }
  };

  return (
    <div id="Contact" className="Contact rounded-b-3xl overflow-hidden">
      <div className="Contact-shadow"></div>

      <div className="container">
        <div className="mt-10 px-4 sm:px-7 md:px-14 py-7 md:py-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl relative z-4 mb-5 text-primary font-extraPold">
            {t("contact.title")}
          </h2>

          <div className="grid grid-cols-1 contact-content md:grid-cols-2 gap-8 md:gap-10">

            {/* Contact Image */}
            <div className="contact-info relative min-h-[250px] sm:min-h-[300px] md:min-h-[400px]">
              <img
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                src={contatImg}
                alt="Contact"
              />
            </div>

            {/* Contact Form */}
            <div
              className="rounded-4xl"
              data-aos="fade-right"
              data-aos-offset="0"
              data-aos-once="true"
              data-aos-delay="600"
            >
              <form
                className="space-y-4"
                onSubmit={handleSubmit}
              >

                {/* Name */}
                <input
                  type="text"
                  name="name"
                  placeholder={t("contact.name")}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="
                    bg-transparent
                    border
                    border-gray-600
                    w-full
                    block
                    rounded-lg
                    p-3
                    outline-none
                    focus:border-primary
                    transition-all
                    duration-300
                  "
                />

                {/* Phone */}
                <div className="flex items-stretch gap-2 w-full">

                  {/* Country Dropdown */}
                  <div className="relative w-[115px] sm:w-[125px] shrink-0">

                    <button
                      type="button"
                      onClick={() => setCountryOpen((prev) => !prev)}
                      className="
                        w-full
                        h-full
                        min-h-[50px]

                        bg-transparent

                        border
                        border-gray-600

                        rounded-lg

                        px-2

                        flex
                        items-center
                        justify-center

                        gap-2

                        outline-none
                        cursor-pointer

                        focus:border-primary

                        transition-all
                        duration-300
                      "
                    >
                      <img
                        src={selectedCountry.flag}
                        alt={countryName(selectedCountry)}
                        className="
                          w-6
                          h-4
                          object-cover
                          rounded-[2px]
                          shrink-0
                        "
                      />

                      <span className="text-sm">
                        {selectedCountry.code}
                      </span>

                      <span
                        className={`
                          text-[10px]
                          transition-transform
                          duration-200

                          ${
                            countryOpen
                              ? "rotate-180"
                              : ""
                          }
                        `}
                      >
                        ▼
                      </span>
                    </button>

                    {/* Dropdown */}
                    {countryOpen && (
                      <div
                        className="
                          absolute
                          top-[calc(100%+6px)]
                          end-0

                          z-50

                          w-[200px]

                          bg-white

                          border
                          border-gray-200

                          rounded-lg

                          shadow-xl

                          overflow-hidden
                        "
                      >
                        {countries.map((country) => (
                          <button
                            key={`${country.key}-${country.code}`}
                            type="button"
                            onClick={() => {
                              setCountryCode(country.code);
                              setCountryOpen(false);
                            }}
                            className="
                              w-full

                              px-3
                              py-2.5

                              flex
                              items-center

                              gap-3

                              text-start

                              bg-white

                              hover:bg-gray-100

                              transition-all
                              duration-200

                              cursor-pointer
                            "
                          >
                            <img
                              src={country.flag}
                              alt={countryName(country)}
                              className="
                                w-6
                                h-4

                                object-cover

                                rounded-[2px]

                                shrink-0
                              "
                            />

                            <span className="flex-1 text-sm text-black">
                              {countryName(country)}
                            </span>

                            <span className="text-sm text-gray-500">
                              {country.code}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Phone Number */}
                  <input
                    type="tel"
                    dir={document.documentElement.dir || "rtl"}
                    name="phone"
                    placeholder={t("contact.phone")}
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    inputMode="tel"
                    className="
                      flex-1
                      min-w-0

                      bg-transparent

                      border
                      border-gray-600

                      rounded-lg

                      p-3

                      text-start

                      outline-none

                      focus:border-primary

                      transition-all
                      duration-300
                    "
                  />
                </div>

                {/* Service */}
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="
                    bg-transparent

                    border
                    border-gray-600

                    rounded-lg

                    p-3

                    w-full

                    outline-none

                    cursor-pointer

                    focus:border-primary

                    transition-all
                    duration-300
                  "
                >
                  <option
                    value=""
                    disabled
                    className="bg-white text-black"
                  >
                    {t("contact.chooseService")}
                  </option>

                  <option
                    value="التكنولوجيا والبرمجيات"
                    className="bg-white text-black"
                  >
                    {t("contact.serviceTech")}
                  </option>

                  <option
                    value="التطوير العقاري والتشييد"
                    className="bg-white text-black"
                  >
                    {t("contact.serviceRealEstate")}
                  </option>

                  <option
                    value="السياحة والفنادق"
                    className="bg-white text-black"
                  >
                    {t("contact.serviceTourism")}
                  </option>
                </select>

                {/* Details */}
                <textarea
                  name="details"
                  placeholder={t("contact.details")}
                  value={formData.details}
                  onChange={handleChange}
                  rows="5"
                  className="
                    bg-transparent

                    border
                    border-gray-600

                    w-full
                    block

                    rounded-lg

                    p-3

                    outline-none

                    resize-none

                    focus:border-primary

                    transition-all
                    duration-300
                  "
                />

                {/* Submit */}
                <button
                  type="submit"
                  className="
                    bg-primary

                    mx-auto
                    block

                    text-white

                    cursor-pointer

                    w-full

                    rounded-lg

                    p-3

                    hover:bg-navy

                    transition-all
                    duration-300
                  "
                >
                  {t("contact.submit")}
                </button>

              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;