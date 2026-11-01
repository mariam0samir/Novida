import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  ar: {
    translation: {
      navbar: {
        home: "الرئيسية",
        whoWeAre: "من نحن",

        about: "عن نوفيدا",
        chairmanMessage: "كلمة رئيس مجلس الإدارة",
        boardMembers: "أعضاء مجلس الإدارة",
        financials: "التقارير والإفصاحات",

        sectors: "قطاعاتنا",
        hospitality: "السياحة والفنادق",
        realEstate: "التطوير العقاري والتشييد والبناء",
        technology: "التكنولوجيا والبرمجيات",

        projects: "مشروعاتنا",

        news: "آخر الأخبار",
        contact: "تواصل معنا",
      },

      aboutShowcase: {
        headerDescription:
          "سواء كنت تبحث عن فرص استثمارية في القطاع العقاري، أو حلول تكنولوجية مبتكرة، أو خدمات مرتبطة بسوق المال والبورصة، أو فرص في قطاع السياحة والفنادق، فإن نوفيدا تجمع بين الخبرة والرؤية الاستثمارية لتقديم فرص متنوعة تدعم النمو وتخلق قيمة مستدامة.",

        intro: {
          title: "نصنع فرصًا استثمارية متنوعة برؤية متكاملة",

          paragraph1:
            "تعمل نوفيدا وفق رؤية استثمارية تقوم على تنويع مجالات النشاط والاستفادة من الفرص الواعدة في عدد من القطاعات الحيوية، من بينها التطوير العقاري والتشييد، والتكنولوجيا والبرمجيات، وخدمات سوق المال والبورصة، إلى جانب السياحة والفنادق.",

          paragraph2:
            "ومن خلال هذا التنوع، تسعى نوفيدا إلى بناء محفظة استثمارية متوازنة تدعم النمو وتخلق قيمة مستدامة، مع التركيز على جودة التنفيذ والكفاءة التشغيلية والقدرة على التوسع في فرص استثمارية جديدة.",
        },

        section1: {
          title: "رؤية استثمارية متكاملة",

          description:
            "تعتمد نوفيدا على دراسة الفرص الاستثمارية بعناية وربطها باحتياجات السوق ومتغيراته، بما يدعم تطوير استثمارات ومشروعات قادرة على تحقيق قيمة اقتصادية مستدامة على المدى الطويل.",
        },

        section2: {
          title: "تنوع القطاعات",

          description:
            "تمتد أنشطة نوفيدا عبر قطاعات التطوير العقاري والتشييد، والتكنولوجيا والبرمجيات، وخدمات سوق المال والبورصة، إلى جانب السياحة والفنادق، بما يساهم في تنويع فرص الاستثمار ومصادر النمو.",
        },

        section3: {
          title: "التميز في التنفيذ",

          description:
            "تسعى نوفيدا إلى تحقيق أعلى مستويات الكفاءة وجودة التنفيذ من خلال تطوير مشروعات وخدمات تتوافق مع احتياجات السوق، والاستفادة من التكنولوجيا والخبرات المتخصصة في دعم عمليات التطوير والنمو.",
        },

        section4: {
          title: "قيمة مستدامة",

          description:
            "تركز نوفيدا على بناء استثمارات قادرة على تحقيق قيمة طويلة الأجل من خلال الكفاءة التشغيلية، وتنويع الاستثمارات، واقتناص الفرص الواعدة، وتطوير نموذج أعمال يدعم النمو والاستدامة.",
        },
      },

      chairmanMessage: {
        pageTitle: "كلمة رئيس مجلس الإدارة",

        headerDescription:
          "رسالة تعكس رؤية نوفيدا للاستثمار والتنمية، ونهجها في بناء فرص متنوعة وخلق قيمة مستدامة عبر قطاعاتها المختلفة.",

        label: "رسالة رئيس مجلس الإدارة",

        title:
          "نؤمن بأن الاستثمار الحقيقي يبدأ برؤية واضحة ويستمر ببناء قيمة مستدامة.",

        name: "هاجر محمد عبد الوهاب محمد",

        position: "رئيس مجلس الإدارة",

        paragraph1:
          "في نوفيدا، ننطلق من رؤية استثمارية تهدف إلى بناء كيان متنوع وقادر على الاستفادة من الفرص الواعدة في عدد من القطاعات الحيوية، بما يواكب تطورات السوق ويدعم خطط النمو على المدى الطويل.",

        paragraph2:
          "نؤمن بأن تنوع أنشطتنا بين التطوير العقاري والتشييد، والتكنولوجيا والبرمجيات، وخدمات سوق المال والبورصة، إلى جانب السياحة والفنادق، يمنحنا قدرة أكبر على بناء محفظة استثمارية متوازنة وأكثر مرونة في مواجهة تغيرات الأسواق.",

        paragraph3:
          "ونضع في مقدمة أولوياتنا جودة التنفيذ والكفاءة التشغيلية والالتزام بالحوكمة ودراسة الفرص الاستثمارية بعناية، مع الحرص على الاستفادة من التكنولوجيا والخبرات المتخصصة في تطوير أعمالنا وتحقيق قيمة حقيقية ومستدامة.",

        paragraph4:
          "نتطلع إلى مواصلة مسيرة نوفيدا من خلال التوسع المدروس، وبناء شراكات فعالة، واقتناص الفرص التي تتوافق مع رؤيتنا الاستثمارية وتدعم قدرتنا على النمو وصناعة مستقبل أكثر استدامة.",
      },

      ourProjects: {
        title: "مشروعاتنا",

        slides: {
          slide1: {
            title: "التطوير العقاري",

            description:
              "حلول ومشروعات عقارية متميزة تركز على فرص الاستثمار والتنمية المستدامة.",
          },

          slide2: {
            title: "التكنولوجيا والبرمجيات",

            description:
              "حلول رقمية وتقنية مبتكرة تدعم الشركات والمؤسسات في رحلة التطوير والتحول الرقمي.",
          },

          slide3: {
            title: "السياحة والفنادق",

            description:
              "مشروعات وخدمات سياحية وفندقية تركز على تقديم تجارب متميزة في الضيافة والسياحة.",
          },

          slide4: {
            title: "التكنولوجيا",

            description:
              "حلول تقنية حديثة تساعد على تطوير الأعمال وتحسين الكفاءة التشغيلية.",
          },

          slide5: {
            title: "الاستثمار العقاري",

            description:
              "فرص استثمارية عقارية متنوعة تهدف إلى تحقيق نمو وقيمة مستدامة على المدى الطويل.",
          },
        },
      },

      home: {
        heroLine1: "نصنع",
        heroLine2: "مجتمعات",
        heroLine3: "تمنحك حياة أكثر ثراءً",
      },

      banner: {
        title: "الآن يمكنك حجز وحدتك أونلاين!",
        line1: "يمكنك الآن جدولة اجتماع أونلاين مع مستشاري العقارات  لدينا",
        line2: "وحجز الوحدة المناسبة لكم من خلال المنصة الإلكترونية الخاصة بمبيعات المجموعة.",
        button: "تواصل معنا",
      },

      about: {
        label: "عن نوفيدا",
        title: "رؤية استثمارية تتجاوز حدود قطاع واحد",
        paragraph1:
          "تعمل نوفيدا عبر عدة قطاعات استراتيجية من خلال منهج استثماري متكامل يربط بين دراسة الفرصة وتطويرها وتنفيذها وتشغيلها، بما يخلق قيمة مستدامة للشركاء والمستثمرين.",
        paragraph2:
          "نجمع بين خبرات التكنولوجيا والتطوير العقاري والتشييد والسياحة والفنادق تحت مظلة واحدة، لنقدم مشروعات وخدمات تواكب متطلبات السوق وتدعم فرص النمو.",
        button: "اعرف المزيد عن نوفيدا",
      },

      sector2: {
        label: "القطاع الثاني",
        title: "التطوير العقاري والتشييد",
        description:
          "من امتلاك الأرض وتطويرها إلى التنفيذ والتشطيب والإدارة والتشغيل، نعمل على المشروعات السكنية والإدارية والتجارية برؤية استثمارية طويلة المدى.",
        items: {
          item1: "الاستثمار والتطوير العقاري",
          item2: "المشروعات السكنية",
          item3: "المشروعات التجارية",
          item4: "تطوير الأراضي والعقارات",
          item5: "المشروعات الإدارية",
          item6: "المقاولات العامة",
        },
      },

      sector3: {
        label: "القطاع الثالث",
        title: "السياحة والفنادق",
        description:
          "تطوير وإدارة وتشغيل الفنادق والمنتجعات والقرى السياحية، مع خدمات ضيافة وإعاشة تلبي معايير التشغيل الفندقي الحديث.",
        items: {
          item1: "إنشاء وتطوير الفنادق",
          item2: "المنتجعات والقرى السياحية",
          item3: "الخدمات الفندقية",
          item4: "تنظيم البرامج والرحلات السياحية",
          item5: "إدارة وتشغيل الفنادق",
          item6: "المشروعات السياحية",
          item7: "خدمات الضيافة والإعاشة",
          item8: "إدارة المنشآت الفندقية",
        },
      },

      contact: {
        title: "سجّل اهتمامك",
        name: "الاسم",
        nameRequired: "الاسم *",
        phone: "رقم الهاتف",
        phoneRequired: "* رقم الهاتف",
        chooseService: "اختر الخدمة",
        serviceTech: "التكنولوجيا والبرمجيات",
        serviceRealEstate: "التطوير العقاري والتشييد",
        serviceTourism: "السياحة والفنادق",
        details: "تفاصيل الطلب",
        submit: "إرسال الطلب",
        success: "تم إرسال طلبك بنجاح",
        error: "حدث خطأ:",
        countries: {
          eg: "مصر",
          sa: "السعودية",
          ae: "الإمارات",
          kw: "الكويت",
          qa: "قطر",
          bh: "البحرين",
          om: "عُمان",
          jo: "الأردن",
          gb: "بريطانيا",
          us: "أمريكا",
        },
      },

      footer: {
        about:
          "مجموعة استثمارية تعمل عبر قطاعات التكنولوجيا والتطوير العقاري والتشييد والسياحة والفنادق برؤية متكاملة.",
        quickLinks: "روابط سريعة",
        aboutNovida: "عن نوفيدا",
        sectors: "قطاعاتنا",
        services: "الخدمات",
        projects: "المشروعات",
        tech: "التكنولوجيا والبرمجيات",
        realEstate: "التطوير العقاري والتشييد",
        tourism: "السياحة والفنادق",
        contactTitle: "بيانات التواصل",
        phone: "الهاتف:",
        email: "البريد الإلكتروني:",
        address: "العنوان: القاهرة، جمهورية مصر العربية",
        follow: "Follow us on social media",
      },

      sectorsSection: {
        label: "قطاعاتنا",
        title: "قطاعاتنا",
        subtitle: "استثمارات متنوعة برؤية متكاملة",
        discover: "اكتشف القطاع←",
      },

      leadership: {
        titleLine1: "القياده",
        titleLine2: "التي تقود التقدم",
        subtitle: "مجلس الاداره",
      },

      news: {
        latestTitle: "آخر أخبارنا",
        pageTitle: "آخر الأخبار",
        learnMore: "اعرف المزيد",
        home: "الرئيسية",
        news: "الأخبار",
        date: "التاريخ",
        notFound: "الخبر غير موجود",
      },

      /*
        ===========================================
        REPORTS & DISCLOSURES
        ===========================================
      */

      reports: {
        pageTitle: "التقارير والإفصاحات",

        description:
          "اطلع على تقارير وقرارات مجلس الإدارة ومحاضر ونتائج اجتماعات الجمعيات العامة لشركة نوفيدا.",

        breadcrumb: {
          home: "الرئيسية",
          investors: "علاقات المستثمرين",
          current: "التقارير والإفصاحات",
        },

        /*
          =========================================
          BOARD OF DIRECTORS
          =========================================
        */

        board: {
          title: "مجلس الإدارة",

          items: {
            report1: {
              title: "محضر اجتماع مجلس الإدارة",
            },

            report2: {
              title: "قرار مجلس الإدارة",
            },

            report3: {
              title: "محضر اجتماع مجلس الإدارة",
            },
          },
        },

        /*
          =========================================
          GENERAL ASSEMBLIES
          =========================================
        */

        generalAssembly: {
          title: "الجمعيات العامة",

          items: {
            report1: {
              title: "محضر اجتماع الجمعية العامة",
            },

            report2: {
              title: "نتائج اجتماع الجمعية العامة",
            },

            report3: {
              title: "دعوة الجمعية العامة",
            },
          },
        },

        filters: {
          year: "تصفية حسب السنة",
          allYears: "كل السنوات",

          sort: "ترتيب حسب",
          newest: "الأحدث أولاً",
          oldest: "الأقدم أولاً",
        },

        noResults:
          "لا توجد تقارير متاحة في هذا القسم.",
      },
    },
  },

  /*
    ===========================================
    ENGLISH
    ===========================================
  */

  en: {
    translation: {
      navbar: {
        home: "Home",
        whoWeAre: "Who We Are",

        about: "About Novida",
        chairmanMessage: "Chairman's Message",
        boardMembers: "Board of Directors",
        financials: "Reports & Disclosures",

        sectors: "Our Sectors",
        hospitality: "Tourism & Hospitality",
        realEstate: "Real Estate & Construction",
        technology: "Technology & Software",

        projects: "Our Projects",

        news: "Latest News",
        contact: "Contact Us",
      },

      aboutShowcase: {
        headerDescription:
          "Whether you are exploring investment opportunities in real estate, innovative technology solutions, capital markets and stock exchange services, or opportunities in tourism and hospitality, Novida brings together investment vision and diversified expertise to support growth and create sustainable value.",

        intro: {
          title: "Creating Diverse Investment Opportunities",

          paragraph1:
            "Novida follows an investment vision focused on diversifying its activities and identifying promising opportunities across key sectors, including real estate and construction, technology and software, capital markets and stock exchange services, as well as tourism and hospitality.",

          paragraph2:
            "Through this diversified approach, Novida aims to build a balanced investment portfolio that supports growth and creates sustainable value, with a strong focus on execution quality, operational efficiency, and the ability to expand into new investment opportunities.",
        },

        section1: {
          title: "An Integrated Investment Vision",

          description:
            "Novida carefully evaluates investment opportunities and aligns them with evolving market needs and trends, supporting the development of investments and projects capable of creating sustainable long-term economic value.",
        },

        section2: {
          title: "Diversified Sectors",

          description:
            "Novida operates across real estate and construction, technology and software, capital markets and stock exchange services, as well as tourism and hospitality, creating diversified investment opportunities and multiple sources of growth.",
        },

        section3: {
          title: "Excellence in Execution",

          description:
            "Novida is committed to achieving high levels of efficiency and execution quality by developing projects and services that respond to market needs while leveraging technology and specialized expertise to support development and growth.",
        },

        section4: {
          title: "Sustainable Value",

          description:
            "Novida focuses on building investments capable of generating long-term value through operational efficiency, investment diversification, identifying promising opportunities, and developing a business model that supports sustainable growth.",
        },
      },

      chairmanMessage: {
        pageTitle: "Chairman's Message",

        headerDescription:
          "A message reflecting Novida's investment vision, diversified approach, and commitment to creating sustainable value across its sectors.",

        label: "Chairman's Message",

        title:
          "We believe that meaningful investment begins with a clear vision and grows through sustainable value creation.",

        name: "Hager Mohamed Abdel Wahab Mohamed",

        position: "Chairwoman",

        paragraph1:
          "At Novida, we are guided by an investment vision focused on building a diversified and resilient business capable of identifying promising opportunities across key sectors while responding to market developments and supporting long-term growth.",

        paragraph2:
          "We believe that the diversity of our activities across real estate and construction, technology and software, capital markets and stock exchange services, as well as tourism and hospitality, strengthens our ability to build a balanced investment portfolio and respond effectively to changing market conditions.",

        paragraph3:
          "Execution quality, operational efficiency, strong governance, and careful assessment of investment opportunities remain at the heart of our approach. We also continue to leverage technology and specialized expertise to strengthen our operations and create sustainable long-term value.",

        paragraph4:
          "We look forward to continuing Novida's journey through disciplined expansion, effective partnerships, and investment opportunities that align with our vision and support sustainable growth.",
      },

      ourProjects: {
        title: "Our Projects",

        slides: {
          slide1: {
            title: "Real Estate",

            description:
              "Premium real estate projects and solutions focused on investment opportunities and sustainable development.",
          },

          slide2: {
            title: "Technology & Software",

            description:
              "Innovative digital and technology solutions that support businesses throughout their digital transformation journey.",
          },

          slide3: {
            title: "Tourism & Hospitality",

            description:
              "Tourism and hospitality projects focused on delivering exceptional experiences and high-quality services.",
          },

          slide4: {
            title: "Technology",

            description:
              "Modern technology solutions designed to support business development and improve operational efficiency.",
          },

          slide5: {
            title: "Real Estate Investment",

            description:
              "Diversified real estate investment opportunities designed to support long-term growth and sustainable value creation.",
          },
        },
      },

      home: {
        heroLine1: "We build",
        heroLine2: "communities",
        heroLine3: "that give you a richer life",
      },

      banner: {
        title: "Now you can book your unit online!",
        line1: "You can now schedule an online meeting with our real estate advisors",
        line2: "and book the right unit for you through the group's online sales platform.",
        button: "Contact us",
      },

      about: {
        label: "About Novida",
        title: "An investment vision beyond a single sector",
        paragraph1:
          "Novida operates across several strategic sectors through an integrated investment approach that connects identifying an opportunity with developing, executing and operating it, creating sustainable value for partners and investors.",
        paragraph2:
          "We bring together expertise in technology, real estate development and construction, and tourism and hospitality under one umbrella, delivering projects and services that meet market needs and support growth opportunities.",
        button: "Learn more about Novida",
      },

      sector2: {
        label: "Second Sector",
        title: "Real Estate Development & Construction",
        description:
          "From acquiring and developing land to execution, finishing, management and operation, we work on residential, administrative and commercial projects with a long-term investment vision.",
        items: {
          item1: "Real estate investment & development",
          item2: "Residential projects",
          item3: "Commercial projects",
          item4: "Land & property development",
          item5: "Administrative projects",
          item6: "General contracting",
        },
      },

      sector3: {
        label: "Third Sector",
        title: "Tourism & Hospitality",
        description:
          "Developing, managing and operating hotels, resorts and tourist villages, with hospitality and catering services that meet modern hotel operating standards.",
        items: {
          item1: "Hotel construction & development",
          item2: "Resorts & tourist villages",
          item3: "Hotel services",
          item4: "Tour programs & trips",
          item5: "Hotel management & operation",
          item6: "Tourism projects",
          item7: "Hospitality & catering services",
          item8: "Hotel facility management",
        },
      },

      contact: {
        title: "Register Your Interest",
        name: "Name",
        nameRequired: "Name *",
        phone: "Phone number",
        phoneRequired: "Phone number *",
        chooseService: "Choose a service",
        serviceTech: "Technology & Software",
        serviceRealEstate: "Real Estate Development & Construction",
        serviceTourism: "Tourism & Hospitality",
        details: "Request details",
        submit: "Send request",
        success: "Your request has been sent successfully",
        error: "An error occurred:",
        countries: {
          eg: "Egypt",
          sa: "Saudi Arabia",
          ae: "UAE",
          kw: "Kuwait",
          qa: "Qatar",
          bh: "Bahrain",
          om: "Oman",
          jo: "Jordan",
          gb: "United Kingdom",
          us: "United States",
        },
      },

      footer: {
        about:
          "An investment group operating across technology, real estate development and construction, and tourism and hospitality with an integrated vision.",
        quickLinks: "Quick Links",
        aboutNovida: "About Novida",
        sectors: "Our Sectors",
        services: "Services",
        projects: "Projects",
        tech: "Technology & Software",
        realEstate: "Real Estate & Construction",
        tourism: "Tourism & Hospitality",
        contactTitle: "Contact Details",
        phone: "Phone:",
        email: "Email:",
        address: "Address: Cairo, Egypt",
        follow: "Follow us on social media",
      },

      sectorsSection: {
        label: "Our Sectors",
        title: "Our Sectors",
        subtitle: "Diversified investments with an integrated vision",
        discover: "Discover the sector →",
      },

      leadership: {
        titleLine1: "The Leadership",
        titleLine2: "Driving Progress",
        subtitle: "Board of Directors",
      },

      news: {
        latestTitle: "Our Latest News",
        pageTitle: "Latest News",
        learnMore: "Learn more",
        home: "Home",
        news: "News",
        date: "Date",
        notFound: "News item not found",
      },

      /*
        ===========================================
        REPORTS & DISCLOSURES
        ===========================================
      */

      reports: {
        pageTitle: "Reports & Disclosures",

        description:
          "Explore Novida's Board of Directors reports and resolutions, as well as General Assembly meeting minutes and results.",

        breadcrumb: {
          home: "Home",
          investors: "Investor Relations",
          current: "Reports & Disclosures",
        },

        /*
          =========================================
          BOARD OF DIRECTORS
          =========================================
        */

        board: {
          title: "Board of Directors",

          items: {
            report1: {
              title: "Board of Directors Meeting Minutes",
            },

            report2: {
              title: "Board of Directors Resolution",
            },

            report3: {
              title: "Board of Directors Meeting Minutes",
            },
          },
        },

        /*
          =========================================
          GENERAL ASSEMBLIES
          =========================================
        */

        generalAssembly: {
          title: "General Assemblies",

          items: {
            report1: {
              title: "General Assembly Meeting Minutes",
            },

            report2: {
              title: "General Assembly Meeting Results",
            },

            report3: {
              title: "General Assembly Meeting Invitation",
            },
          },
        },

        filters: {
          year: "Filter by Year",
          allYears: "All Years",

          sort: "Sort by",
          newest: "Newest First",
          oldest: "Oldest First",
        },

        noResults:
          "No reports are available in this section.",
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,

    lng: "ar",

    fallbackLng: "ar",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;