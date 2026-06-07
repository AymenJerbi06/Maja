const STORAGE_KEY = "majaVancouverWebsiteState";
const acceptedPasswords = new Set(["husband", "mayno", "maynou", "futurehusband", "goat"]);

const screens = [
  "maja-intro",
  "maja-warning",
  "maja-beauty",
  "maja-magic",
  "myth",
  "finder",
  "system",
  "paths",
  "schools",
  "budget",
  "paperwork",
  "playground",
  "canada",
  "aymen",
  "window",
  "deadlines",
  "decision",
  "success",
];

const CAD_TO_PLN_RATE = 2.62;
const CAD_TO_PLN_SOURCE =
  "Approximate cross-rate from ECB reference rates on 5 June 2026: EUR/PLN 4.2338 and EUR/CAD 1.6159.";

const routes = [
  {
    id: "aymen-transfer",
    title: "Aymen's Favorite: College + University Transfer",
    badge: "Aymen's real path",
    tags: ["chemistry", "math", "drawing", "reading", "nature", "travel", "unsure"],
    short: "Start at college, build credits carefully, then transfer to a university and finish the degree there.",
    long:
      "This is the route Aymen actually followed: high school to Columbia College, about 50 transferable credits, choosing his major there, then applying to SFU and carrying those credits into the SFU degree.",
    costNote:
      "Aymen example: Columbia College lists international tuition at $640 CAD per credit effective September 2026, so 50 credits is about $32,000 CAD before fees, then the remaining credits are completed at SFU.",
    caveat:
      "Important: Aymen did this for Computer Science. For chemistry, engineering, design, or another direction, the same college + university idea may still be useful, but the best college and final university should be chosen around that specific major.",
    journey: [
      ["College", "Begin with transferable university-level courses and learn the Canadian system with less pressure."],
      ["Major choice", "Use the first 30-50 credits to understand the subject, grades, requirements, and transfer options."],
      ["University", "Apply to the target university, transfer accepted credits, and finish the remaining degree requirements there."],
      ["Graduation", "Graduate with the university diploma even though not every credit was completed at that university."],
    ],
    schools: ["columbia", "sfu", "douglas", "langara"],
    nextFilter: "Best if she wants a practical, cost-aware route with time to understand the system.",
  },
  {
    id: "science-transfer",
    title: "Science / University Transfer",
    tags: ["chemistry", "math", "nature", "unsure"],
    short: "Start with math, science, and English foundations, then move toward a university science direction.",
    long: "A calmer first year that keeps chemistry, environmental science, health science, and science degrees open while Maja discovers what feels right.",
    costNote: "College-first science transfer routes often start around $20,000-$21,000 CAD for 30 credits before living costs and extra fees.",
    journey: [
      ["Foundation", "Take first-year math, science, chemistry, and English courses."],
      ["University", "Use those courses toward a science direction if they match the future program."],
      ["Graduation", "Finish the degree checklist: major courses plus electives, writing, breadth, and required credits."],
    ],
    schools: ["douglas", "langara", "kpu"],
    nextFilter: "Do you prefer lab work, design, or problem-solving?",
  },
  {
    id: "engineering",
    title: "Engineering / Mechanical-style Explorer",
    tags: ["math", "drawing", "chemistry"],
    short: "Math, design, physics, chemistry, CAD, product thinking, and serious problem-solving.",
    long: "A technical route for someone who likes logic and design. It can lead toward mechanical-style engineering, mechatronics, sustainable energy, product design, or applied technology.",
    costNote: "Direct university engineering can be much higher: current examples range roughly from $57,303-$66,199 CAD for first-year estimates or full-course-load tuition before every personal cost.",
    journey: [
      ["Foundation", "Build math, physics, chemistry, computing, drawing/design, and problem-solving skills."],
      ["University", "Choose the engineering or applied-technology direction that fits best."],
      ["Graduation", "Complete roughly 120+ credits, including technical courses, labs, electives, and complementary studies."],
    ],
    schools: ["sfu", "ubc", "bcit", "fic", "douglas"],
    nextFilter: "More engineering or more creative design?",
  },
  {
    id: "design-tech",
    title: "Design + Technology",
    tags: ["drawing", "reading", "travel"],
    short: "For drawing, visual thinking, storytelling, UX/UI, product design, architecture-related ideas, or interactive arts.",
    long: "This route connects creativity with useful technology: visual thinking, interaction, UX/UI, product design, communication, and architecture-related ideas.",
    costNote: "A college-first design or communication route may be around $20,000-$25,000 CAD for a full study year before living costs, while art/design university tuition is program-specific.",
    journey: [
      ["Foundation", "Start with drawing, design, communication, English, and digital-thinking courses."],
      ["University", "Move toward design, interactive arts, product thinking, or communication technology."],
      ["Graduation", "Build a portfolio and complete the degree or diploma requirements for the chosen creative path."],
    ],
    schools: ["emily-carr", "kpu", "sfu", "langara"],
    nextFilter: "Digital design, art school, or communication?",
  },
  {
    id: "chemistry",
    title: "Chemistry / Science",
    tags: ["chemistry", "nature", "math"],
    short: "Chemistry, environmental science, sustainability, health science, materials, or lab-oriented pathways.",
    long: "This connects science with the natural world Maja loves. It can begin through transfer courses, then move toward a university science program if it still feels right.",
    costNote: "For chemistry, a public college plus university transfer route may begin around $20,000-$21,000 CAD for 30 credits before living costs, depending on course choices.",
    journey: [
      ["Foundation", "Take chemistry, math, biology or physics, English, and lab-based first-year courses."],
      ["University", "Choose chemistry, environmental science, health science, sustainability, or materials."],
      ["Graduation", "Finish science requirements, labs, electives, and any co-op or research options that fit."],
    ],
    schools: ["douglas", "langara", "kpu", "sfu", "ubc"],
    nextFilter: "More lab science or outdoor/environmental work?",
  },
  {
    id: "flexible",
    title: "Flexible Exploratory Year",
    tags: ["unsure", "reading", "travel", "nature"],
    short: "Start with useful courses, keep options open, and let the major become clearer with evidence.",
    long: "Best if she is not fully sure. Choose useful first-year courses, keep options open, and let the major become clearer with time.",
    costNote: "A flexible first year is usually easier to compare through college options first, often around $20,000-$25,000 CAD before living costs and fees.",
    journey: [
      ["Foundation", "Take a careful mix of English, math/science, and exploratory courses."],
      ["University", "Use the first year to discover whether science, engineering, design, or another path feels right."],
      ["Graduation", "Commit later with more information and less panic."],
    ],
    schools: ["douglas", "langara", "kpu"],
    nextFilter: "Budget-friendly route or closest to Aymen?",
  },
];

const schools = [
  {
    id: "columbia",
    name: "Columbia College -> SFU Transfer",
    fit: "Aymen's actual route, college credits first, SFU degree later",
    cost: "$640 CAD/credit effective September 2026; 50 credits about $32,000 CAD before fees",
    tags: ["cheap", "flexible", "close", "science", "engineering", "design"],
    rough: "Aymen used this route for Computer Science: college first, then transfer into SFU.",
    pros: [
      "Lets a student learn the Canadian system before direct university pressure",
      "Credits can transfer forward when planned carefully",
      "Can still lead to an SFU diploma if the remaining degree requirements are completed at SFU",
    ],
    cautions: [
      "Aymen's exact Columbia -> SFU route was for Computer Science",
      "Chemistry, engineering, or design may need a different college/university combination",
      "Transferable courses must be checked before registering",
    ],
    intake: "University Transfer intake and course availability need current checking.",
    action: "Use Aymen's path as the model, then choose the exact college/university around Maja's major.",
    source: "https://www.columbiacollege.ca/admissions/tuition-fees",
  },
  {
    id: "douglas",
    name: "Douglas College",
    fit: "Flexible start, university transfer, science/math exploration",
    cost: "$20,472 CAD for 30 credits plus mandatory fees",
    tags: ["cheap", "flexible", "science", "engineering"],
    rough: "Lower-risk and often cheaper than direct university.",
    pros: ["Strong transfer option", "Good for science/math exploration", "Official 30-credit tuition estimate is clear"],
    cautions: ["Must plan transferable courses carefully", "Deadlines and seat availability still matter"],
    intake: "Program-specific. Check current international application dates before planning.",
    action: "Compare transferable science/math courses and January/Winter possibilities.",
    source: "https://www.douglascollege.ca/fees-and-finances/tuition-and-fee-estimator/tuition-and-fees-international-students",
  },
  {
    id: "langara",
    name: "Langara College",
    fit: "University transfer, science, arts, exploratory first year",
    cost: "$676.96 CAD/credit effective May 1, 2026; 30 credits about $20,309 before other fees",
    tags: ["cheap", "flexible", "science", "design"],
    rough: "A strong Vancouver transfer college for undecided students.",
    pros: ["Known transfer pathway culture", "Good for first-year exploration", "Vancouver location"],
    cautions: ["Course availability varies", "Intake deadlines vary by term"],
    intake: "Semester and course availability need checking program-by-program.",
    action: "Use BC Transfer Guide with possible first-year science/design courses.",
    source: "https://langara.ca/student-services/enrolment-services/tuition-fees/international-student-tuition-fees",
  },
  {
    id: "kpu",
    name: "KPU",
    fit: "Applied programs, design/science, flexible and practical",
    cost: "$15,032.60-$24,840.14 CAD/year tuition + mandatory fees",
    tags: ["cheap", "flexible", "design", "science"],
    rough: "Practical, applied, and often a calmer way to test directions.",
    pros: ["Applied learning", "Design and science possibilities", "Lower-cost range compared with direct university"],
    cautions: ["Requirements are program-by-program", "Campus/location may affect commute"],
    intake: "Check each KPU program for terms, deadlines, and seat availability.",
    action: "Compare design/science options and full-time credit loads.",
    source: "https://www.kpu.ca/international/future-students/cost",
  },
  {
    id: "sfu",
    name: "SFU Direct",
    fit: "Mechatronics, Sustainable Energy Engineering, computing/design-related options",
    cost: "SFU first-year estimate: about $57,303 CAD including living/residence assumptions",
    tags: ["close", "engineering", "design", "science"],
    rough: "Closest to Aymen and a serious university path.",
    pros: ["Aymen is at SFU", "Strong university option", "Engineering and design-adjacent programs exist"],
    cautions: ["Bigger financial planning step", "Stronger admissions expectations"],
    intake: "Direct university entry is more deadline-sensitive. Check program admission dates.",
    action: "Compare admission requirements with transfer-first routes.",
    source: "https://www.sfu.ca/students/admission/fees-scholarships.html",
  },
  {
    id: "ubc",
    name: "UBC Engineering",
    fit: "Traditional engineering, mechanical engineering possibility",
    cost: "2026/27 international Applied Science full-course-load tuition: $66,199.66 before living costs",
    tags: ["engineering", "science"],
    rough: "Prestigious and strong, but financially demanding and competitive.",
    pros: ["World-class engineering reputation", "Clear mechanical engineering pathway later", "Strong science ecosystem"],
    cautions: ["Requires a very careful budget", "Competitive admissions", "Not the gentle route"],
    intake: "Usually a direct, competitive application cycle. Verify deadlines early.",
    action: "Treat as a high-ambition option, not the only option.",
    source: "https://students.ubc.ca/finances/tuition-fees/undergraduate-tuition-fees/",
  },
  {
    id: "fic",
    name: "Fraser International College → SFU",
    fit: "Pathway-style route to SFU",
    cost: "International Year One 30 credits listed around $39,162 CAD for Fall 2025-Summer 2026 fees",
    tags: ["close", "engineering", "science"],
    rough: "A pathway option connected to SFU.",
    pros: ["SFU pathway", "May feel more structured", "Close to Aymen's campus world"],
    cautions: ["Needs a bigger budget than public colleges", "Pathway terms need careful reading"],
    intake: "Check current FIC terms and program fit.",
    action: "Compare against Douglas/Langara/KPU transfer routes.",
    source: "https://www.fraseric.ca/admissions/fees/",
  },
  {
    id: "emily-carr",
    name: "Emily Carr / Design Route",
    fit: "Drawing, visual creativity, design, art/technology",
    cost: "Program-specific; verify current tuition",
    tags: ["design"],
    rough: "Best if drawing and design become central.",
    pros: ["Creative environment", "Strong visual/design identity", "Good for art and design focus"],
    cautions: ["Not ideal if she chooses engineering/science", "Portfolio expectations may matter"],
    intake: "Program-specific and portfolio-sensitive.",
    action: "Only prioritize if design feels emotionally and academically central.",
    source: "https://www.ecuad.ca/admissions/tuition-fees",
  },
  {
    id: "bcit",
    name: "BCIT Engineering-related",
    fit: "Practical hands-on engineering/technology",
    cost: "Program-specific; verify current intake and fees",
    tags: ["engineering"],
    rough: "Very practical and career-oriented.",
    pros: ["Hands-on", "Career-oriented", "Good for applied technology"],
    cautions: ["Some programs have fixed intakes", "Competitive and structured"],
    intake: "Check each program. Some options may not have January intake.",
    action: "Use it as a practical comparison point.",
    source: "https://www.bcit.ca/admission/tuition-fees/",
  },
];

const budgetData = {
  careful: {
    title: "Careful student budget",
    rows: [
      ["Shared rent", "$900-$1,300/month"],
      ["Groceries", "$350-$550/month"],
      ["Phone/utilities/personal", "$250-$550/month"],
      ["Transit", "Often included through U-Pass for many full-time students"],
      ["Monthly living total", "$1,600-$2,400"],
    ],
  },
  realistic: {
    title: "Realistic Vancouver budget",
    rows: [
      ["Shared rent", "$1,200-$1,700/month"],
      ["Groceries", "$500-$700/month"],
      ["Phone/utilities/personal", "$400-$800/month"],
      ["Transit", "Often included through U-Pass for many full-time students"],
      ["Monthly living total", "$2,200-$3,200"],
    ],
  },
};

const paperworkItems = [
  {
    title: "Choose the program and term",
    detail: "Pick the program, check whether it accepts international students, and confirm whether January, May/Summer, or September is realistic.",
  },
  {
    title: "Check admission requirements",
    detail: "Look for required high-school subjects, minimum grades, math/science prerequisites, English requirements, portfolio requirements, and program-specific forms.",
  },
  {
    title: "Prepare academic documents",
    detail: "Gather transcripts, diplomas, official translations if needed, grading explanations, and any in-progress course information the school asks for.",
  },
  {
    title: "Prepare English proof if needed",
    detail: "Some schools require IELTS/TOEFL/Duolingo or an accepted English-language waiver. The exact rule depends on the school and program.",
  },
  {
    title: "Apply and pay the application fee",
    detail: "Most BC public institutions use EducationPlannerBC. Some private/pathway programs use their own application portal.",
  },
  {
    title: "Receive and accept the offer",
    detail: "If admitted, the school sends an offer or Letter of Acceptance. A deposit may be needed to hold the seat or move to the next step.",
  },
  {
    title: "PAL/TAL if required",
    detail: "For most post-secondary study permit applications, the school helps with a Provincial or Territorial Attestation Letter after the offer/deposit process.",
  },
  {
    title: "Proof of funds",
    detail: "IRCC wants proof for tuition, living expenses, and travel. Bank statements, sponsor proof, scholarships, and other accepted documents may be used.",
  },
  {
    title: "Study permit application",
    detail: "Upload the acceptance letter, identity documents, funds proof, PAL/TAL if needed, letter of explanation, and any country-specific documents.",
  },
  {
    title: "Biometrics, medical, police certificate",
    detail: "IRCC may ask for biometrics, a medical exam, or a police certificate depending on the case. Some documents should be prepared early.",
  },
  {
    title: "Housing and arrival plan",
    detail: "Plan where to live, how to pay deposits safely, when to arrive, health insurance, phone, transit, and the first-week checklist.",
  },
];

const deadlineExamples = [
  {
    school: "SFU Spring 2027",
    dates: "Applications open July 1, 2026; application deadline September 15, 2026; document deadline October 1, 2026.",
    note: "Useful for a January start example.",
    source: "https://www.sfu.ca/students/admission/apply/dates-deadlines/high-school/spring-term.html",
  },
  {
    school: "SFU Summer 2027",
    dates: "Applications open December 1, 2026; application deadline January 15, 2027; document deadline February 1, 2027.",
    note: "Useful for a May/Summer start example.",
    source: "https://www.sfu.ca/students/admission/apply/dates-deadlines/high-school/summer-term/",
  },
  {
    school: "Douglas College",
    dates: "Summer 2026 apply by January 31, 2026; Fall 2026 apply by May 31, 2026; Winter 2027 apply by September 30, 2026.",
    note: "Some programs can fill early.",
    source: "https://www.douglascollege.ca/international-students/prospective-students/admissions/application",
  },
  {
    school: "Langara Regular Studies",
    dates: "International deadlines are commonly Spring September 30, Summer January 31, and Fall May 31.",
    note: "Program-specific deadlines can override the general dates.",
    source: "https://langara.ca/apply/apply-regular-studies",
  },
  {
    school: "KPU International",
    dates: "Spring opens February 1 and closes no later than November 1; Summer opens June 1 and closes no later than March 1; Fall opens October 1 and closes no later than July 1.",
    note: "Limited-intake programs have earlier deadlines.",
    source: "https://www.kpu.ca/admission/deadlines-international",
  },
  {
    school: "UBC",
    dates: "For the 2026 cycle, January 15, 2026 was the main application deadline for Winter Session and most Summer Session applicants.",
    note: "UBC Engineering is usually a September-start direct-entry route.",
    source: "https://you.ubc.ca/applying-ubc/dates-deadlines/",
  },
  {
    school: "BCIT",
    dates: "Deadlines are program-specific. Some programs list Winter international deadlines around November 1 and Fall international deadlines around July 2.",
    note: "Always check the exact BCIT program page.",
    source: "https://www.bcit.ca/admission/program-availability/",
  },
  {
    school: "Fraser International College",
    dates: "FIC lists January, May, and September intakes for several pathway programs; Spring 2027 classes begin January 11, 2027.",
    note: "Useful as an SFU pathway comparison.",
    source: "https://www.fraseric.ca/academics/important-dates/",
  },
];

const vancouverPhotos = Array.from({ length: 14 }, (_, index) => ({
  src: `photos/${index + 1}.jpg`,
  alt: `Aymen's personal Vancouver photo ${index + 1}`,
}));

const activities = [
  {
    id: "moon",
    title: "Moon watching",
    category: "night",
    caption: "One day, no telescope needed. Just you, me, the moon, and a conversation that goes way longer than planned.",
    location: "Any quiet sky",
    cost: "free",
  },
  {
    id: "sunsets",
    title: "Sunset beach",
    category: "nature",
    caption: "Reserved for one Polish moon girl and one Tunisian overthinker.",
    location: "Kitsilano / English Bay",
    cost: "free",
  },
  {
    id: "mountains",
    title: "Mountain day",
    category: "adventure",
    caption: "For when the city becomes too loud and the mountains start making sense.",
    location: "North Shore / Whistler",
    cost: "$$",
  },
  {
    id: "stanley",
    title: "Stanley Park walk",
    category: "nature",
    caption: "Trees, water, long talks, and pretending the walk is not romantic.",
    location: "Stanley Park",
    cost: "free",
  },
  {
    id: "qe",
    title: "Queen Elizabeth Park",
    category: "drawing",
    caption: "A place for sketches, flowers, and Aymen trying not to distract you.",
    location: "Queen Elizabeth Park",
    cost: "free",
  },
  {
    id: "cafes",
    title: "Rainy café study date",
    category: "study",
    caption: "Pretending to study, then actually studying, then talking about life.",
    location: "Vancouver cafés",
    cost: "$",
  },
  {
    id: "libraries",
    title: "Library missions",
    category: "study",
    caption: "Books, quiet tables, and the dangerous idea that productivity can be cute.",
    location: "SFU / VPL",
    cost: "free",
  },
  {
    id: "drawing",
    title: "Drawing spots",
    category: "drawing",
    caption: "Places where the view does half the work and Maja does the beautiful part.",
    location: "Parks, beaches, campuses",
    cost: "free",
  },
  {
    id: "food",
    title: "Cheap food missions",
    category: "food",
    caption: "A serious academic investigation into where happiness is cheapest.",
    location: "Everywhere",
    cost: "$",
  },
];

const localizedCopy = {
  en: {
    documentTitle: "Maja's Vancouver Possibility",
    navBack: "Back",
    navNext: "Next",
    navStartOver: "Start over",
    gate: {
      kicker: "For one person only",
      title: "Hello wifey",
      lead: "This website is made for Maja.",
      leadBefore: "This website is made for",
      leadName: "Maja",
      photoAlt: "Maja",
      photoCaption: "This beautiful girl.",
      languageTitle: "Choose language",
      passwordLabel: "Password",
      hint: "Hint: nickname for Aymen.",
      placeholder: "Enter the nickname",
      open: "Open",
      waiting: "The little universe is waiting.",
      wrong: "Hmm... close, but the real ones know the nickname.",
      granted: "Access granted. Welcome to a possible future.",
    },
    majaIntro: {
      kicker: "Before everything",
      title: "So first of all...",
      lead: "Let's introduce Maja properly.",
      question: "Who is Maja?",
      answer: "Maja is...",
    },
    majaWarning: {
      kicker: "Warning",
      title: "Content May Steal Hearts",
      lead:
        "What you are about to witness is pure sweetness. Possible side effects include smiling too much, falling for her beautiful eyes, and needing emotional recovery tea.",
      panelTitle: "Important sweetness warning",
      panelBody:
        "By continuing, Aymen accepts no responsibility whatsoever for what may happen to your heart when you read about this person or see her beautiful eyes.",
      accept: "Accept and continue",
    },
    majaBeauty: {
      kicker: "Introducing Maja",
      title: "Maja Is...",
      lead:
        "Maja is the most beautiful, most caring, sweetest girl, with the most beautiful eyes, the cutest laugh, a cute smile, and a personality as beautiful as her looks.",
      body:
        "She has a kind soul. She is a Pisces. She was born on February 24, she is 19 years old, and she is currently living in Poland.",
      photoAlt: "Maja",
      photoCaption: "This beautiful girl.",
      traits: [
        ["Angel in disguise", "Suspiciously sweet, suspiciously pretty, and somehow still real."],
        ["Mossad agent", "This is an inside joke, but the evidence remains concerning."],
        ["Probably a witch", "Ever since Aymen met her, she captured his heart a little too effectively."],
      ],
    },
    majaMagic: {
      kicker: "What the universe should know",
      title: "More Evidence About Maja",
      lead:
        "She likes math, drawing, the moon, nature, and meaningful beautiful things. She is outgoing, emotional, sweet, curious, and full of little details that make her feel impossible to replace.",
      cards: [
        ["Nature", "She notices beauty in the world, especially the kind that feels quiet and meaningful."],
        ["Art + math", "She has both a creative side and a smart analytical side, which is honestly unfair."],
        ["Husband note", "Her husband likes her a lot, cares deeply about her feelings and interests, and wishes to meet her one day soon. Very soon. Very, very, very, very soon."],
      ],
      final:
        "He cannot really picture himself with any other person but her, because her beautiful eyes are the most beautiful thing he has seen yet in this world.",
    },
    myth: {
      kicker: "Discovery 1",
      title: "The September Myth",
      lead: "Welcome, Maja. Before the romantic Vancouver daydreaming, there is one practical question worth checking first.",
      question: "Can international students only start in September?",
      yes: "Yes",
      maybe: "Wait... maybe not?",
      revealDefault: "Choose an answer and the map will unfold.",
      revealTitle: "The plot twist:",
      revealBody:
        "September is not the only possible beginning. Some programs can start in January or another term. The exact answer depends on the school and program, but the point is simple: waiting a full year may not be the only option.",
      disclaimer:
        "Important: exact intakes depend on the institution, program, seat availability, deadlines, and study permit timing.",
    },
    finder: {
      kicker: "Discovery 2",
      title: "Maja Path Finder",
      lead: "What sounds like you? Pick as many as you want. This step is only about your interests, not schools or decisions yet.",
      selectionNote: "Your selected interests are saved for the final review.",
      guideTitle: "How the next screens work",
      steps: [
        "First, the website explains how Canadian university actually works.",
        "<strong>Choose route</strong> saves the academic path that feels most interesting.",
        "<strong>Aymen, explain</strong> saves the question so Aymen knows what to explain later.",
      ],
    },
    system: {
      kicker: "Discovery 3",
      title: "How Canadian University Works",
      lead:
        "The Canadian system can look strange from outside. This page is the calm translation before any school names, costs, or deadlines appear.",
      cards: [
        ["Programs are built from credits", "A bachelor's degree often needs about 120 credits or more. Engineering programs can be heavier. A normal course is usually 3 credits; courses with labs can be 4 credits or more."],
        ["Not every course is your major", "Even engineering or science students usually need writing, humanities, language, social science, breadth, or complementary courses. You graduate only when the full checklist is complete."],
        ["College can be a first step", "Some students begin at a college, take university-level courses, then move into a university degree. The important part is choosing courses that the future university can accept."],
        ["Transfer means carrying courses forward", "If a course transfers, it may count toward the next school's degree. This is why course planning matters. One wrong course is not the end of the world, but good planning saves time and money."],
        ["Applications check requirements", "Schools may ask for transcripts, translations, English proof, math or science prerequisites, a portfolio for design, an application fee, and sometimes program-specific forms."],
        ["International students plan twice", "First comes school admission. Then comes the study permit: acceptance letter, PAL/TAL if required, proof of funds, identity documents, and enough time for processing."],
      ],
      explain:
        "If any of this feels unclear, save the question for Aymen. It will appear in the final review and can be sent to him later through Resend.",
      buttons: ["Aymen, explain credits", "Aymen, explain transfer", "Aymen, explain requirements"],
      saveButtonHint: "tap to save",
      savedButtonLabel: "saved",
      savedNoteDefault: "Tap any option to save it for the final email.",
      savedNoteSelected: "Saved for Aymen: {items}. These questions will be included in the email.",
    },
    paths: {
      kicker: "Discovery 4",
      title: "Recommended Academic Paths",
      lead:
        "Now that the system makes more sense, the route options can appear. They are shown as simple journeys: foundation, university, then graduation. The exact school names come after this.",
      selectionNote: "Choose one route. That choice is saved and reviewed before submitting.",
      suggestedRoute: "Suggested route",
      chooseRoute: "Choose route",
      chosenRoute: "Chosen route",
      explain: "Aymen, explain",
      savedForAymen: "Saved for Aymen",
    },
    schools: {
      kicker: "Discovery 5",
      title: "School Options",
      lead: "Now the names can appear. Short version first; tap a card if you want the cost, cautions, sources, and next action.",
      selectionNote: "Filters only help browsing. Only schools you save for comparison are sent at the end.",
      currency:
        "PLN estimates are approximate, using about 1 CAD = 2.62 PLN from recent ECB reference rates. Final payments always use the school's real payment rate.",
      filters: ["All", "Budget-friendly", "Closest to Aymen", "Most flexible", "Best for engineering", "Best for design"],
      summary: "Cost, cautions, and next action",
      pros: "Pros",
      cautions: "Cautions",
      intake: "Possible intake note:",
      action: "Next action:",
      source: "Official source",
      save: "Save for comparison",
      saved: "Saved for comparison",
      explain: "Aymen, explain this school",
    },
    budget: {
      kicker: "Discovery 6",
      title: "Cost Reality Without Fear",
      lead: "Vancouver asks for careful financial planning. I will not pretend it is tiny. But we can compare the options calmly and plan it properly.",
      selectionNote: "Choose the budget view you want Aymen to see in the final email.",
      tabs: ["Careful budget", "Realistic Vancouver budget"],
      noteTitle: "Study permit and money reality",
      note:
        "IRCC requires proof of tuition, living expenses, and travel. For applications on or after September 1, 2025, the baseline living-expense amount outside Quebec is $22,895 CAD, about 59,985 PLN at the approximate rate used here, for one applicant, excluding tuition and travel. Treat it as a minimum, not comfortable Vancouver spending.",
      currency: "PLN estimates use about 1 CAD = 2.62 PLN. They are here for intuition, not for payment or visa calculations.",
      list: [
        "Tuition is usually paid by term or according to the school's fee deadline.",
        "A deposit may be needed to accept an offer or unlock next steps like PAL/TAL.",
        "Proof of funds can include bank statements, sponsor support, scholarships, or other accepted proof.",
        "The study permit is separate from school admission; acceptance does not automatically mean visa approval.",
      ],
      link: "Check the official IRCC proof-of-funds page",
      comparisonKicker: "Cost context",
      comparisonTitle: "Vancouver is not the only serious budget",
      comparisonLead:
        "Chicago may sound familiar, but many U.S. university paths can ask for a much bigger yearly budget than a Vancouver college-first route. The fair question is not \"is Vancouver free?\" It is \"which path gives Maja the most support, flexibility, and value for the money?\"",
      comparisonList: [
        "Some Chicago private university examples list tuition alone around $48,000-$72,000 USD before the full living budget is added.",
        "A Vancouver college-first path can begin with a lower tuition base in CAD, then transfer into university later if the courses are planned well.",
        "In Vancouver, Maja would also know someone already involved in student life, course planning, transfers, deadlines, and everyday campus questions.",
      ],
      comparisonLinks: ["Northwestern 2026-2027 costs", "DePaul undergraduate tuition", "DePaul cost of attendance", "UIC tuition reference"],
    },
    paperwork: {
      kicker: "Discovery 6 continued",
      title: "Application And Study Permit Map",
      lead:
        "This is the practical part, but it does not have to feel like paperwork. Think of it like a small treasure map: every stop brings Maja closer to Vancouver and studying here.",
      stopLabel: "Map stop",
      destinationLabel: "Destination",
      treasureTitle: "Treasure: Vancouver + studying here",
      treasureBody:
        "When the school plan, documents, funds, study permit, housing, and arrival details are ready, the treasure is simple: Maja arrives prepared, less confused, and with someone in Vancouver ready to help her understand the student world.",
    },
    playground: {
      kicker: "Discovery 7",
      title: "Vancouver As Her Playground",
      lead:
        "You said you love everything involving nature. Vancouver is basically nature showing off: ocean, mountains, rain, forests, sunsets, beaches, and places where we can sit at night and talk under the moon.",
      walkTitle: "Aymen's same-day Vancouver walk",
      walk1:
        "These are photos Aymen took personally in Vancouver. They were taken on the same day, without even using transit. Around 15,000 steps were enough to move between downtown, beaches, water, parks, mountains, nature, and open sky.",
      walk2: "The point is simple: in Vancouver, beautiful places are close to each other. A normal day can quietly turn into an adventure.",
      saved:
        "Your yes/maybe/Aymen-explain answers here will be saved for the final review and can be sent to Aymen by email later.",
      photo: "Photo",
      photoOf: "of",
      photoCaption: "taken by Aymen in Vancouver",
      fullscreen: "Full screen",
      previousPhoto: "Previous Vancouver photo",
      nextPhoto: "Next Vancouver photo",
      closeFullscreen: "Close fullscreen",
    },
    canada: {
      kicker: "Discovery 8",
      title: "Why This Is Not Just About Canada",
      lead:
        "Canada has real flaws, real costs, and real questions. But sometimes a place becomes more meaningful because of the person you explore it with.",
      body:
        "If Vancouver raises concerns about family, future children, money, distance, or belonging, those concerns deserve a real conversation instead of a quick answer.",
      noteTitle: "Honesty note",
      note: "Vancouver is beautiful, financially serious, complicated, and worth understanding properly.",
    },
    husband: {
      kicker: "Discovery 9",
      title: "The Husband Reason",
      lead:
        "Final reason: your husband is here. He likes your personality, your eyes, your weirdness, your honesty, your respect for yourself, your love for the moon, and the way you notice beauty most people ignore.",
      body:
        "He misses his wife. He wants to watch the moon with you, help you compare universities, get lost in cafes, talk about everything at night, and make Vancouver feel a little less far from home.",
      valuesTitle: "Small husband resume",
      values: [
        "Well-educated, well-mannered, and serious about building a good future.",
        "Respects his family and parents, and puts career, family, religious values, principles, and ethics above everything.",
        "Sweet, charming, caring, and the type of person who gives everything for the people he truly cares about, especially her.",
        "Handsome, active, healthy, muscular, with soccer legs, abs, biceps, and enough confidence to say this twice.",
        "Plays soccer in Canada too, so she can watch him play and politely destroy other teams.",
      ],
      effort:
        "Most importantly, this is not a random person playing games, manipulating her, or love-bombing her for a funny time. He is genuinely interested in her: her beautiful eyes, her cute laugh, her mind, and the person she is. When she was on a boat trip, he spent that whole time thinking, implementing, styling, and building this website because she asked for a list of universities and he did not want to make it boring. He wanted to make it an experience, because the effort shows how much she matters to him.",
      caption: "Little husband, attempting charm before he even knew what Vancouver was.",
      alt: "Aymen as a child",
    },
    window: {
      kicker: "Discovery 10",
      title: "Things We Can Talk About",
      lead:
        "Any concern can be talked about later if you want: money, family, distance, school, deadlines, fear, excitement, all of it. This website is here to show effort, care, and interest, while leaving room for every question.",
      guideTitle: "Pick anything you want us to talk through",
      guideBody:
        "Each selected topic will be saved for the final review, so your husband knows what you may want to discuss later.",
      choose: "Save this topic",
      chosen: "Saved for husband",
      topics: [
        ["money", "Money and budget", "Tuition, rent, deposits, proof of funds, scholarships, work rules, and realistic monthly life."],
        ["family", "Family questions", "What your family would need to know, what would feel safe, and which worries deserve real respect."],
        ["distance", "Distance from home", "Missing family, staying connected, loneliness, and what would make Vancouver feel less far away."],
        ["school", "School and majors", "Which program would fit you, which courses matter, and when husband should explain the route calmly."],
        ["study-permit", "Study permit steps", "Acceptance letter, PAL/TAL if needed, proof of funds, documents, timing, and what each step means."],
        ["housing", "Housing and daily life", "Where to live, monthly budget, groceries, transit, phone plan, campus life, and ordinary routines."],
        ["feelings", "Fear and excitement", "The emotional part: doubts, hope, pressure, curiosity, and what would make this feel safe."],
      ],
    },
    deadlines: {
      kicker: "Discovery 11",
      title: "Deadline Awareness",
      lead:
        "Deadlines are not here to rush you. They are here so the calendar feels visible instead of mysterious.",
      panelTitle: "Example application windows",
      panelBody:
        "These are examples from current official pages or recent posted cycles. Program rules can change, so the final check should always happen on the school website before applying.",
    },
    decision: {
      kicker: "Decision screen",
      title: "Do you accept exploring the Vancouver possibility?",
      lead: "Before you choose, here is the little review of what you selected.",
      commentTitle: "Comments before submitting",
      commentBody: "Write anything you want Aymen to receive with your answers. This will be included in the email.",
      commentPlaceholder: "Questions, thoughts, concerns, jokes, anything...",
      accept: "I accept the mission",
      decline: "Not yet",
      respect: "Okay, I want to think about it.",
    },
    success: {
      kicker: "Final page",
      acceptedHeadline: "Congratulations, Maja.",
      declinedHeadline: "Take your time, Maja.",
      acceptedSubtitle: "Aymen has been notified that you accepted the Vancouver possibility.",
      declinedSubtitle: "Aymen has been notified that you want time to think. That answer is respected.",
      chosenPath: "Chosen path",
      possibleSchools: "Possible schools",
      nextStep: "Next step",
      acceptedNext: "Compare January/Winter options and transfer routes.",
      declinedNext: "Keep the conversation gentle and revisit the map only if it feels right.",
      finalLine: "Thank you for going through the website. Your answers are saved and ready for the Resend email hook Aymen will connect later.",
    },
    review: {
      decisionPrefix: "These answers will be saved in English and can be sent to Aymen through Resend later.",
      successPrefix: "Here is what you chose.",
      interests: "Interests",
      academicRoute: "Academic route",
      savedSchools: "Saved schools",
      suggestedSchools: "Suggested schools to compare",
      budgetView: "Budget view",
      activities: "Vancouver activities",
      talkTopics: "Things to talk about",
      explainRequests: "Aymen explain requests",
      comments: "Comments before submitting",
      emptyInterests: "Nothing selected yet",
      emptySchools: "No school saved yet",
      emptyActivities: "No Vancouver activities selected yet",
      emptyTalkTopics: "No talk topics selected yet",
      emptyExplain: "No explain requests saved yet",
      emptyComments: "No comments written yet",
    },
    declineMessages: [
      "Really? Please think about it.",
      "Are you sure? Maybe give the idea one more gentle thought.",
      "Please, please think about it again.",
      "Okay, one more tiny reconsideration before deciding?",
      "I hear you. If it is still not yet, you can choose time to think.",
    ],
  },
  pl: {
    documentTitle: "Vancouver dla Mai",
    navBack: "Wstecz",
    navNext: "Dalej",
    navStartOver: "Od początku",
    gate: {
      kicker: "Tylko dla jednej osoby",
      title: "Hello wifey",
      lead: "Ta strona jest zrobiona dla Mai.",
      leadBefore: "Ta strona jest zrobiona dla",
      leadName: "Mai",
      photoAlt: "Maja",
      photoCaption: "Ta piękna dziewczyna.",
      languageTitle: "Wybierz język",
      passwordLabel: "Hasło",
      hint: "Podpowiedź: przezwisko Aymena.",
      placeholder: "Wpisz przezwisko",
      open: "Otwórz",
      waiting: "Mały wszechświat czeka.",
      wrong: "Hmm... blisko, ale prawdziwi znają przezwisko.",
      granted: "Dostęp przyznany. Witaj w możliwej przyszłości.",
    },
    majaIntro: {
      kicker: "Zanim zaczniemy",
      title: "Najpierw...",
      lead: "Przedstawmy Maję porządnie.",
      question: "Kim jest Maja?",
      answer: "Maja jest...",
    },
    majaWarning: {
      kicker: "Ostrzeżenie",
      title: "Ta treść może kraść serca",
      lead:
        "To, co zaraz zobaczysz, to czysta słodycz. Możliwe skutki uboczne: za dużo uśmiechu, zakochanie się w jej pięknych oczach i potrzeba herbaty na emocjonalną regenerację.",
      panelTitle: "Ważne ostrzeżenie o słodyczy",
      panelBody:
        "Kontynuując, Aymen nie bierze żadnej odpowiedzialności za to, co może stać się z Twoim sercem, kiedy przeczytasz o tej osobie albo zobaczysz jej piękne oczy.",
      accept: "Akceptuję i idę dalej",
    },
    majaBeauty: {
      kicker: "Przedstawiamy Maję",
      title: "Maja Jest...",
      lead:
        "Maja jest najpiękniejsza, najbardziej troskliwa i najsłodsza, ma najpiękniejsze oczy, najuroczy śmiech, uroczy uśmiech i osobowość tak piękną jak jej wygląd.",
      body:
        "Ma dobre serce. Jej znak zodiaku to Ryby. Urodziła się 24 lutego, ma 19 lat i obecnie mieszka w Polsce.",
      photoAlt: "Maja",
      photoCaption: "Ta piękna dziewczyna.",
      traits: [
        ["Anioł w przebraniu", "Podejrzanie słodka, podejrzanie piękna i jakoś naprawdę istnieje."],
        ["Agentka Mossadu", "To żart między nimi, ale dowody nadal są niepokojące."],
        ["Prawdopodobnie wiedźma", "Odkąd Aymen ją poznał, trochę zbyt skutecznie przejęła jego serce."],
      ],
    },
    majaMagic: {
      kicker: "Co wszechświat powinien wiedzieć",
      title: "Więcej Dowodów O Mai",
      lead:
        "Lubi matematykę, rysowanie, księżyc, naturę i piękne rzeczy z sensem. Jest otwarta, emocjonalna, słodka, ciekawa świata i pełna małych szczegółów, przez które wydaje się niemożliwa do zastąpienia.",
      cards: [
        ["Natura", "Zauważa piękno w świecie, szczególnie takie ciche i znaczące."],
        ["Sztuka + matematyka", "Ma jednocześnie kreatywną i analityczną stronę, co jest szczerze niesprawiedliwe."],
        ["Notatka od męża", "Jej mąż bardzo ją lubi, bardzo dba o jej uczucia i zainteresowania, i chce ją spotkać pewnego dnia niedługo. Bardzo niedługo. Bardzo, bardzo, bardzo, bardzo niedługo."],
      ],
      final:
        "On naprawdę nie potrafi wyobrazić sobie siebie z kimkolwiek innym niż ona, bo jej piękne oczy są najpiękniejszą rzeczą, jaką dotąd widział na tym świecie.",
    },
    myth: {
      kicker: "Odkrycie 1",
      title: "Mit września",
      lead: "Witaj, Maja. Zanim zacznie się romantyczne marzenie o Vancouver, warto sprawdzić jedno praktyczne pytanie.",
      question: "Czy studenci międzynarodowi mogą zaczynać tylko we wrześniu?",
      yes: "Tak",
      maybe: "Poczekaj... może nie?",
      revealDefault: "Wybierz odpowiedź, a mapa zacznie się rozwijać.",
      revealTitle: "Zwrot akcji:",
      revealBody:
        "wrzesień nie jest jedynym możliwym początkiem. Niektóre programy mogą zaczynać się w styczniu albo w innym semestrze. Dokładna odpowiedź zależy od szkoły i programu, ale sens jest prosty: czekanie całego roku może nie być jedyną opcją.",
      disclaimer:
        "Ważne: dokładne terminy rozpoczęcia zależą od instytucji, programu, dostępnych miejsc, terminów aplikacji i czasu potrzebnego na study permit.",
    },
    finder: {
      kicker: "Odkrycie 2",
      title: "Maja Path Finder",
      lead: "Co brzmi jak Ty? Wybierz tyle rzeczy, ile chcesz. Ten krok dotyczy tylko Twoich zainteresowań, jeszcze nie szkół ani decyzji.",
      selectionNote: "Wybrane zainteresowania zostaną zapisane do końcowego przeglądu.",
      guideTitle: "Jak działają następne ekrany",
      steps: [
        "Najpierw strona wyjaśnia, jak naprawdę działa kanadyjski system uniwersytecki.",
        "<strong>Wybierz ścieżkę</strong> zapisuje ścieżkę akademicką, która wydaje się najciekawsza.",
        "<strong>Aymen, wyjaśnij</strong> zapisuje pytanie, żeby Aymen wiedział, co później wyjaśnić.",
      ],
    },
    system: {
      kicker: "Odkrycie 3",
      title: "Jak działa uniwersytet w Kanadzie",
      lead:
        "Kanadyjski system może wyglądać dziwnie z zewnątrz. Ta część spokojnie tłumaczy go, zanim pojawią się nazwy szkół, koszty i terminy.",
      cards: [
        ["Programy składają się z kredytów", "Licencjat często wymaga około 120 kredytów albo więcej. Programy inżynierskie mogą być cięższe. Normalny kurs ma zwykle 3 kredyty, a kursy z laboratoriami mogą mieć 4 kredyty albo więcej."],
        ["Nie każdy kurs jest z Twojego kierunku", "Nawet studenci inżynierii albo nauk ścisłych zwykle muszą zaliczyć pisanie, humanistykę, język, nauki społeczne, kursy uzupełniające albo breadth courses. Dyplom dostaje się dopiero po ukończeniu całej listy wymagań."],
        ["College może być pierwszym krokiem", "Niektórzy studenci zaczynają w college'u, biorą kursy na poziomie uniwersyteckim, a potem przechodzą na uniwersytet. Najważniejsze jest wybranie kursów, które przyszły uniwersytet może zaakceptować."],
        ["Transfer oznacza przeniesienie kursów dalej", "Jeśli kurs się transferuje, może liczyć się do dyplomu w następnej szkole. Dlatego planowanie kursów ma znaczenie. Jeden zły kurs to nie koniec świata, ale dobre planowanie oszczędza czas i pieniądze."],
        ["Aplikacje sprawdzają wymagania", "Szkoły mogą prosić o transkrypty, tłumaczenia, dowód znajomości angielskiego, wymagane kursy z matematyki albo nauk ścisłych, portfolio dla designu, opłatę aplikacyjną i czasem formularze dla konkretnego programu."],
        ["Student międzynarodowy planuje dwa razy", "Najpierw jest przyjęcie do szkoły. Potem study permit: letter of acceptance, PAL/TAL jeśli wymagane, proof of funds, dokumenty tożsamości i wystarczająco dużo czasu na proces."],
      ],
      explain:
        "Jeśli coś z tego jest niejasne, zapisz pytanie dla Aymena. Pojawi się w końcowym podsumowaniu i później może zostać wysłane do niego przez Resend.",
      buttons: ["Aymen, wyjaśnij kredyty", "Aymen, wyjaśnij transfer", "Aymen, wyjaśnij wymagania"],
      saveButtonHint: "zapisz",
      savedButtonLabel: "zapisane",
      savedNoteDefault: "Dotknij dowolnej opcji, żeby zapisać ją do końcowego e-maila.",
      savedNoteSelected: "Zapisane dla Aymena: {items}. Te pytania zostaną dodane do e-maila.",
    },
    paths: {
      kicker: "Odkrycie 4",
      title: "Polecane ścieżki akademickie",
      lead:
        "Teraz, kiedy system ma więcej sensu, mogą pojawić się opcje. Są pokazane jako proste podróże: podstawa, uniwersytet, ukończenie. Dokładne nazwy szkół pojawią się później.",
      selectionNote: "Wybierz jedną ścieżkę. Ten wybór zostanie zapisany i pokazany przed wysłaniem.",
      suggestedRoute: "Sugerowana ścieżka",
      chooseRoute: "Wybierz ścieżkę",
      chosenRoute: "Wybrana ścieżka",
      explain: "Aymen, wyjaśnij",
      savedForAymen: "Zapisane dla Aymena",
    },
    schools: {
      kicker: "Odkrycie 5",
      title: "Opcje szkół",
      lead: "Teraz mogą pojawić się nazwy. Najpierw krótka wersja; kliknij kartę, jeśli chcesz zobaczyć koszt, uwagi, źródła i następny krok.",
      selectionNote: "Filtry pomagają tylko przeglądać. Do końcowego e-maila trafią tylko szkoły zapisane do porównania.",
      currency:
        "Szacunki w PLN są przybliżone, przy użyciu około 1 CAD = 2,62 PLN według niedawnych kursów referencyjnych ECB. Rzeczywiste płatności zawsze zależą od prawdziwego kursu płatności szkoły.",
      filters: ["Wszystkie", "Najbardziej budżetowe", "Najbliżej Aymena", "Najbardziej elastyczne", "Najlepsze dla inżynierii", "Najlepsze dla designu"],
      summary: "Koszt, uwagi i następny krok",
      pros: "Plusy",
      cautions: "Na co uważać",
      intake: "Uwaga o możliwym terminie:",
      action: "Następny krok:",
      source: "Oficjalne źródło",
      save: "Zapisz do porównania",
      saved: "Zapisane do porównania",
      explain: "Aymen, wyjaśnij tę szkołę",
    },
    budget: {
      kicker: "Odkrycie 6",
      title: "Koszty bez straszenia",
      lead: "Vancouver wymaga uważnego planowania finansów. Nie będę udawać, że to drobiazg. Ale można spokojnie porównać opcje i dobrze to zaplanować.",
      selectionNote: "Wybierz widok budżetu, który Aymen ma zobaczyć w końcowym e-mailu.",
      tabs: ["Ostrożny budżet", "Realistyczny budżet Vancouver"],
      noteTitle: "Study permit i rzeczywistość finansowa",
      note:
        "IRCC wymaga dowodu środków na czesne, koszty życia i podróż. Dla aplikacji składanych 1 września 2025 albo później podstawowa kwota kosztów życia poza Quebeciem wynosi $22,895 CAD, czyli około 59,985 PLN przy użytym tutaj przybliżonym kursie, dla jednej osoby, bez czesnego i podróży. Traktuj to jako minimum, nie jako wygodny budżet na Vancouver.",
      currency: "Szacunki w PLN używają około 1 CAD = 2,62 PLN. Są tutaj dla intuicji, nie do płatności ani obliczeń wizowych.",
      list: [
        "Czesne zwykle płaci się za semestr albo według terminu płatności szkoły.",
        "Depozyt może być potrzebny, żeby zaakceptować ofertę albo odblokować następne kroki, takie jak PAL/TAL.",
        "Proof of funds może obejmować wyciągi bankowe, wsparcie sponsora, stypendia albo inne akceptowane dowody.",
        "Study permit jest oddzielny od przyjęcia do szkoły; przyjęcie nie oznacza automatycznie zgody wizowej.",
      ],
      link: "Sprawdź oficjalną stronę IRCC o proof of funds",
      comparisonKicker: "Kontekst kosztów",
      comparisonTitle: "Vancouver nie jest jedyną poważną decyzją budżetową",
      comparisonLead:
        "Chicago może brzmieć znajomo, ale wiele ścieżek uniwersyteckich w USA może wymagać dużo większego rocznego budżetu niż ścieżka college-first w Vancouver. Uczciwe pytanie nie brzmi: „czy Vancouver jest za darmo?”. Brzmi: „która droga daje Mai najwięcej wsparcia, elastyczności i wartości za te pieniądze?”",
      comparisonList: [
        "Niektóre prywatne przykłady uniwersytetów w Chicago pokazują samo czesne około $48,000-$72,000 USD, zanim doliczy się pełny budżet życia.",
        "Ścieżka college-first w Vancouver może zacząć się od niższej bazy czesnego w CAD, a potem przejść na uniwersytet, jeśli kursy są dobrze zaplanowane.",
        "W Vancouver Maja znałaby też kogoś, kto już żyje studenckim życiem i może pomóc z planowaniem kursów, transferem, terminami i codziennymi pytaniami kampusowymi.",
      ],
      comparisonLinks: ["Koszty Northwestern 2026-2027", "Czesne DePaul undergraduate", "Cost of attendance DePaul", "Czesne UIC"],
    },
    paperwork: {
      kicker: "Odkrycie 6 ciąg dalszy",
      title: "Mapa aplikacji i study permit",
      lead:
        "To jest część praktyczna, ale nie musi brzmieć jak papierologia. Pomyśl o tym jak o małej mapie skarbu: każdy przystanek przybliża Maję do Vancouver i studiowania tutaj.",
      stopLabel: "Przystanek na mapie",
      destinationLabel: "Cel podróży",
      treasureTitle: "Skarb: Vancouver + studia tutaj",
      treasureBody:
        "Kiedy plan szkoły, dokumenty, środki, study permit, mieszkanie i przylot są gotowe, skarb jest prosty: Maja przyjeżdża przygotowana, mniej zagubiona i z kimś w Vancouver, kto pomoże jej zrozumieć studencki świat.",
    },
    playground: {
      kicker: "Odkrycie 7",
      title: "Vancouver jako jej plac zabaw",
      lead:
        "Mówiłaś, że kochasz wszystko, co związane z naturą. Vancouver to trochę natura, która się popisuje: ocean, góry, deszcz, lasy, zachody słońca, plaże i miejsca, gdzie można siedzieć nocą i rozmawiać pod księżycem.",
      walkTitle: "Vancouverski spacer Aymena tego samego dnia",
      walk1:
        "Te zdjęcia Aymen zrobił osobiście w Vancouver. Zostały zrobione tego samego dnia, nawet bez używania transportu. Około 15 000 kroków wystarczyło, żeby przejść między downtown, plażami, wodą, parkami, górami, naturą i otwartym niebem.",
      walk2: "Sens jest prosty: w Vancouver piękne miejsca są blisko siebie. Zwykły dzień może cicho zmienić się w przygodę.",
      saved:
        "Twoje odpowiedzi tak/może/Aymen-wyjaśnij zostaną zapisane do końcowego podsumowania i później mogą zostać wysłane Aymenowi mailem.",
      photo: "Zdjęcie",
      photoOf: "z",
      photoCaption: "zrobione przez Aymena w Vancouver",
      fullscreen: "Pełny ekran",
      previousPhoto: "Poprzednie zdjęcie z Vancouver",
      nextPhoto: "Następne zdjęcie z Vancouver",
      closeFullscreen: "Zamknij pełny ekran",
    },
    canada: {
      kicker: "Odkrycie 8",
      title: "Dlaczego nie chodzi tylko o Kanadę",
      lead:
        "Kanada ma prawdziwe wady, prawdziwe koszty i prawdziwe pytania. Ale czasem miejsce staje się ważniejsze przez osobę, z którą się je odkrywa.",
      body:
        "Jeśli Vancouver budzi obawy o rodzinę, przyszłe dzieci, pieniądze, odległość albo poczucie przynależności, te obawy zasługują na prawdziwą rozmowę, nie szybką odpowiedź.",
      noteTitle: "Uczciwa uwaga",
      note: "Vancouver jest piękne, finansowo poważne, skomplikowane i warte porządnego zrozumienia.",
    },
    husband: {
      kicker: "Odkrycie 9",
      title: "Powód: mąż",
      lead:
        "Ostatni powód: Twój mąż tu jest. Lubi Twoją osobowość, Twoje oczy, Twoją dziwność, Twoją szczerość, Twój szacunek do samej siebie, Twoją miłość do księżyca i to, jak zauważasz piękno, którego większość ludzi nie widzi.",
      body:
        "Tęskni za swoją żoną. Chce patrzeć z Tobą na księżyc, pomagać Ci porównywać uniwersytety, gubić się w kawiarniach, rozmawiać nocą o wszystkim i sprawić, żeby Vancouver wydawało się trochę mniej daleko od domu.",
      caption: "Mały mąż, próbujący czarować, zanim jeszcze wiedział, czym jest Vancouver.",
      valuesTitle: "Małe CV męża",
      values: [
        "Jest dobrze wykształcony, dobrze wychowany i poważnie myśli o budowaniu dobrej przyszłości.",
        "Szanuje swoją rodzinę i rodziców, a karierę, rodzinę, wartości religijne, zasady i etykę stawia ponad wszystko.",
        "Jest słodki, czarujący, troskliwy i jest typem osoby, która daje z siebie wszystko dla rzeczy i ludzi, na których naprawdę mu zależy, szczególnie dla niej.",
        "Jest przystojny, aktywny, zdrowo je, jest umięśniony, ma piłkarskie nogi, brzuch, bicepsy i wystarczająco pewności siebie, żeby powiedzieć to dwa razy.",
        "Gra też w piłkę nożną w Kanadzie, więc może oglądać, jak gra i grzecznie niszczy inne drużyny.",
      ],
      effort:
        "Najważniejsze: to nie jest przypadkowa osoba, która chce grać w gierki, manipulować nią albo love-bombować ją dla zabawy. On naprawdę i szczerze jest nią zainteresowany: jej pięknymi oczami, jej uroczym śmiechem, jej umysłem i osobą, którą jest. Kiedy była na wycieczce łodzią, on przez cały ten czas myślał, implementował, stylował i budował tę stronę, bo poprosiła o listę uniwersytetów, a on nie chciał, żeby było nudno. Chciał zrobić z tego doświadczenie, bo ten wysiłek pokazuje, jak bardzo ona jest dla niego ważna.",
      alt: "Aymen jako dziecko",
    },
    window: {
      kicker: "Odkrycie 10",
      title: "Rzeczy, o których możemy porozmawiać",
      lead:
        "O każdej obawie można porozmawiać później, jeśli chcesz: pieniądze, rodzina, odległość, szkoła, terminy, strach, ekscytacja, wszystko. Ta strona ma pokazać wysiłek, troskę i zainteresowanie, zostawiając miejsce na każde pytanie.",
      guideTitle: "Wybierz wszystko, o czym chcesz porozmawiać",
      guideBody:
        "Każdy wybrany temat zostanie zapisany w końcowym podsumowaniu, żeby mąż wiedział, o czym możesz chcieć porozmawiać później.",
      choose: "Zapisz ten temat",
      chosen: "Zapisane dla męża",
      topics: [
        ["money", "Pieniądze i budżet", "Czesne, czynsz, depozyty, proof of funds, stypendia, zasady pracy i realistyczne miesięczne życie."],
        ["family", "Pytania rodzinne", "Co Twoja rodzina musiałaby wiedzieć, co dawałoby poczucie bezpieczeństwa i które obawy zasługują na prawdziwy szacunek."],
        ["distance", "Odległość od domu", "Tęsknota za rodziną, kontakt z bliskimi, samotność i co mogłoby sprawić, że Vancouver będzie mniej daleko."],
        ["school", "Szkoła i kierunki", "Który program pasowałby do Ciebie, które kursy są ważne i kiedy mąż powinien spokojnie wyjaśnić trasę."],
        ["study-permit", "Kroki study permit", "Letter of acceptance, PAL/TAL jeśli potrzebne, proof of funds, dokumenty, terminy i co oznacza każdy krok."],
        ["housing", "Mieszkanie i codzienne życie", "Gdzie mieszkać, miesięczny budżet, zakupy, transit, telefon, kampus i zwykłe rutyny."],
        ["feelings", "Strach i ekscytacja", "Część emocjonalna: wątpliwości, nadzieja, presja, ciekawość i co sprawiłoby, że to będzie bezpieczne."],
      ],
    },
    deadlines: {
      kicker: "Odkrycie 11",
      title: "Świadomość terminów",
      lead:
        "Terminy nie są tutaj po to, żeby Cię poganiać. Są tutaj po to, żeby kalendarz był widoczny, a nie tajemniczy.",
      panelTitle: "Przykładowe okna aplikacji",
      panelBody:
        "To przykłady z aktualnych oficjalnych stron albo niedawno opublikowanych cykli. Zasady programów mogą się zmieniać, więc ostateczne sprawdzenie zawsze powinno odbyć się na stronie szkoły przed aplikacją.",
    },
    decision: {
      kicker: "Ekran decyzji",
      title: "Czy akceptujesz odkrywanie możliwości Vancouver?",
      lead: "Zanim wybierzesz, tutaj jest mały przegląd tego, co zaznaczyłaś.",
      commentTitle: "Komentarz przed wysłaniem",
      commentBody: "Napisz cokolwiek chcesz, żeby Aymen dostał razem z Twoimi odpowiedziami. To będzie dodane do e-maila.",
      commentPlaceholder: "Pytania, myśli, obawy, żarty, cokolwiek...",
      accept: "Akceptuję misję",
      decline: "Jeszcze nie",
      respect: "Dobrze, chcę o tym pomyśleć.",
    },
    success: {
      kicker: "Ostatnia strona",
      acceptedHeadline: "Gratulacje, Maja.",
      declinedHeadline: "Nie spiesz się, Maja.",
      acceptedSubtitle: "Aymen dostał informację, że zaakceptowałaś możliwość Vancouver.",
      declinedSubtitle: "Aymen dostał informację, że chcesz czasu do namysłu. Ta odpowiedź jest uszanowana.",
      chosenPath: "Wybrana ścieżka",
      possibleSchools: "Możliwe szkoły",
      nextStep: "Następny krok",
      acceptedNext: "Porównać opcje styczniowe/zimowe i ścieżki transferowe.",
      declinedNext: "Zostawić rozmowę łagodną i wrócić do mapy tylko wtedy, kiedy będzie to dobrze brzmiało.",
      finalLine: "Dziękuję, że przeszłaś przez tę stronę. Twoje odpowiedzi są zapisane i gotowe na Resend email hook, który Aymen później podłączy.",
    },
    review: {
      decisionPrefix: "Te odpowiedzi zostaną zapisane po angielsku i później mogą zostać wysłane Aymenowi przez Resend.",
      successPrefix: "Oto, co wybrałaś.",
      interests: "Zainteresowania",
      academicRoute: "Ścieżka akademicka",
      savedSchools: "Zapisane szkoły",
      suggestedSchools: "Sugerowane szkoły do porównania",
      budgetView: "Widok budżetu",
      activities: "Aktywności w Vancouver",
      talkTopics: "Rzeczy do rozmowy",
      explainRequests: "Prośby o wyjaśnienie dla Aymena",
      comments: "Komentarz przed wysłaniem",
      emptyInterests: "Jeszcze nic nie wybrano",
      emptySchools: "Nie zapisano jeszcze żadnej szkoły",
      emptyActivities: "Nie wybrano jeszcze aktywności w Vancouver",
      emptyTalkTopics: "Nie wybrano jeszcze tematów rozmowy",
      emptyExplain: "Nie zapisano jeszcze próśb o wyjaśnienie",
      emptyComments: "Nie napisano jeszcze komentarza",
    },
    declineMessages: [
      "Naprawdę? Proszę, pomyśl o tym.",
      "Jesteś pewna? Może daj tej myśli jeszcze jedną spokojną szansę.",
      "Proszę, proszę, pomyśl o tym jeszcze raz.",
      "Dobrze, jeszcze jedno małe zastanowienie przed decyzją?",
      "Rozumiem. Jeśli nadal jeszcze nie, możesz wybrać czas do namysłu.",
    ],
  },
};

const polishRoutes = {
  "aymen-transfer": {
    title: "Ulubiona ścieżka Aymena: college + uniwersytet",
    badge: "Prawdziwa ścieżka Aymena",
    long:
      "To jest ścieżka, którą Aymen naprawdę przeszedł: po high school poszedł do Columbia College, zrobił około 50 transferowalnych kredytów, wybrał tam major, potem aplikował do SFU i przeniósł te kredyty do dyplomu SFU.",
    costNote:
      "Przykład Aymena: Columbia College podaje czesne dla studentów międzynarodowych jako $640 CAD za kredyt od września 2026, więc 50 kredytów to około $32,000 CAD przed opłatami, a pozostałe kredyty kończy się już w SFU.",
    caveat:
      "Ważne: Aymen zrobił to dla Computer Science. Dla chemii, inżynierii, designu albo innego kierunku ta sama idea college + uniwersytet może nadal być bardzo pomocna, ale najlepszy college i docelowy uniwersytet powinny być dobrane pod konkretny kierunek.",
    journey: [
      ["College", "Zacząć od transferowalnych kursów uniwersyteckich i nauczyć się kanadyjskiego systemu z mniejszą presją."],
      ["Wybór kierunku", "Użyć pierwszych 30-50 kredytów, żeby zrozumieć przedmiot, oceny, wymagania i opcje transferu."],
      ["Uniwersytet", "Aplikować na docelowy uniwersytet, przenieść zaakceptowane kredyty i skończyć pozostałe wymagania dyplomu tam."],
      ["Dyplom", "Dostać dyplom uniwersytetu, nawet jeśli nie każdy kredyt był zrobiony na tym uniwersytecie."],
    ],
  },
  "science-transfer": {
    title: "Nauki ścisłe / transfer uniwersytecki",
    long: "Spokojniejszy pierwszy rok, który zostawia otwartą chemię, environmental science, health science i inne kierunki naukowe, kiedy Maja sprawdza, co naprawdę pasuje.",
    costNote: "Ścieżki science transfer przez college często zaczynają się od około $20,000-$21,000 CAD za 30 kredytów przed kosztami życia i dodatkowymi opłatami.",
    journey: [
      ["Podstawa", "Wziąć pierwszoroczne kursy z matematyki, nauk ścisłych, chemii i angielskiego."],
      ["Uniwersytet", "Użyć tych kursów w kierunku science, jeśli pasują do przyszłego programu."],
      ["Dyplom", "Ukończyć listę wymagań: kursy major, electives, pisanie, breadth i wymagane kredyty."],
    ],
  },
  engineering: {
    title: "Inżynieria / mechaniczny eksplorator",
    long: "Techniczna ścieżka dla kogoś, kto lubi logikę i design. Może prowadzić w stronę mechanical-style engineering, mechatronics, sustainable energy, product design albo applied technology.",
    costNote: "Bezpośrednia inżynieria na uniwersytecie może wymagać dużo większego budżetu: obecne przykłady są mniej więcej od $57,303-$66,199 CAD za pierwszy rok albo pełne czesne przed wszystkimi kosztami osobistymi.",
    journey: [
      ["Podstawa", "Budować matematykę, fizykę, chemię, computing, rysunek/design i rozwiązywanie problemów."],
      ["Uniwersytet", "Wybrać kierunek inżynierski albo applied-technology, który najlepiej pasuje."],
      ["Dyplom", "Ukończyć około 120+ kredytów, w tym kursy techniczne, laboratoria, electives i complementary studies."],
    ],
  },
  "design-tech": {
    title: "Design + technologia",
    long: "Ta ścieżka łączy kreatywność z użyteczną technologią: visual thinking, interaction, UX/UI, product design, communication i pomysły powiązane z architekturą.",
    costNote: "Ścieżka design/communication przez college może kosztować około $20,000-$25,000 CAD za pełny rok nauki przed kosztami życia, a czesne art/design university zależy od programu.",
    journey: [
      ["Podstawa", "Zacząć od rysunku, designu, komunikacji, angielskiego i digital-thinking courses."],
      ["Uniwersytet", "Przejść w stronę designu, interactive arts, product thinking albo communication technology."],
      ["Dyplom", "Zbudować portfolio i ukończyć wymagania dyplomu albo programu w wybranej kreatywnej ścieżce."],
    ],
  },
  chemistry: {
    title: "Chemia / science",
    long: "To łączy naukę ze światem natury, który Maja kocha. Może zacząć się od kursów transferowych, a potem przejść w stronę programu science na uniwersytecie, jeśli nadal będzie to dobrze brzmiało.",
    costNote: "Dla chemii publiczny college + transfer na uniwersytet może zaczynać się od około $20,000-$21,000 CAD za 30 kredytów przed kosztami życia, zależnie od wyboru kursów.",
    journey: [
      ["Podstawa", "Wziąć chemię, matematykę, biologię albo fizykę, angielski i kursy z laboratoriami."],
      ["Uniwersytet", "Wybrać chemię, environmental science, health science, sustainability albo materials."],
      ["Dyplom", "Ukończyć wymagania science, laboratoria, electives i ewentualne co-op albo research options."],
    ],
  },
  flexible: {
    title: "Elastyczny rok eksploracyjny",
    long: "Najlepsze, jeśli nie jest w pełni pewna. Wybrać przydatne kursy pierwszego roku, zostawić opcje otwarte i pozwolić, żeby kierunek stał się jaśniejszy z czasem.",
    costNote: "Elastyczny pierwszy rok zwykle łatwiej porównać przez opcje college'u, często około $20,000-$25,000 CAD przed kosztami życia i opłatami.",
    journey: [
      ["Podstawa", "Wziąć ostrożną mieszankę angielskiego, matematyki/science i kursów eksploracyjnych."],
      ["Uniwersytet", "Użyć pierwszego roku, żeby odkryć, czy science, inżynieria, design albo inna ścieżka naprawdę pasuje."],
      ["Dyplom", "Zdecydować później, z większą ilością informacji i mniejszą paniką."],
    ],
  },
};

const polishSchools = {
  columbia: {
    fit: "Prawdziwa ścieżka Aymena, najpierw kredyty w college'u, później dyplom SFU",
    rough: "Aymen użył tej ścieżki dla Computer Science: najpierw college, potem transfer do SFU.",
    pros: [
      "Pozwala nauczyć się kanadyjskiego systemu przed presją bezpośredniego uniwersytetu",
      "Kredyty mogą zostać przeniesione dalej, jeśli są dobrze zaplanowane",
      "Może nadal prowadzić do dyplomu SFU, jeśli pozostałe wymagania dyplomu są ukończone w SFU",
    ],
    cautions: [
      "Dokładna ścieżka Columbia -> SFU Aymena była dla Computer Science",
      "Chemia, inżynieria albo design mogą wymagać innej kombinacji college/uniwersytet",
      "Transferowalne kursy trzeba sprawdzić przed rejestracją",
    ],
    intake: "University Transfer intake i dostępność kursów trzeba sprawdzić aktualnie.",
    action: "Użyć ścieżki Aymena jako modelu, a potem dobrać dokładny college/uniwersytet pod kierunek Mai.",
  },
  douglas: {
    fit: "Elastyczny start, transfer uniwersytecki, eksploracja science/math",
    rough: "Mniej ryzykowna i często tańsza opcja niż bezpośredni uniwersytet.",
    pros: ["Silna opcja transferu", "Dobra do eksploracji science/math", "Oficjalny szacunek za 30 kredytów jest jasny"],
    cautions: ["Trzeba ostrożnie planować transferowalne kursy", "Terminy i dostępność miejsc nadal mają znaczenie"],
    intake: "Zależne od programu. Przed planowaniem trzeba sprawdzić aktualne international application dates.",
    action: "Porównać transferowalne kursy science/math i możliwości styczniowe/zimowe.",
  },
  langara: {
    fit: "Transfer uniwersytecki, science, arts, eksploracyjny pierwszy rok",
    rough: "Silny college transferowy w Vancouver dla niezdecydowanych studentów.",
    pros: ["Znana kultura transferu", "Dobre miejsce na eksplorację pierwszego roku", "Lokalizacja w Vancouver"],
    cautions: ["Dostępność kursów się zmienia", "Terminy intake różnią się zależnie od semestru"],
    intake: "Semestry i dostępność kursów trzeba sprawdzić program po programie.",
    action: "Użyć BC Transfer Guide z możliwymi kursami pierwszego roku science/design.",
  },
  kpu: {
    fit: "Programy praktyczne, design/science, elastyczne i zastosowane",
    rough: "Praktyczna i często spokojniejsza droga do testowania kierunków.",
    pros: ["Applied learning", "Możliwości designu i science", "Niższy zakres kosztów niż bezpośredni uniwersytet"],
    cautions: ["Wymagania są zależne od programu", "Campus/lokalizacja może wpływać na dojazd"],
    intake: "Sprawdzić każdy program KPU pod kątem terminów, wymagań i dostępności miejsc.",
    action: "Porównać opcje design/science i pełny load kredytów.",
  },
  sfu: {
    fit: "Mechatronics, Sustainable Energy Engineering, opcje computing/design",
    rough: "Najbliżej Aymena i poważna ścieżka uniwersytecka.",
    pros: ["Aymen jest w SFU", "Silna opcja uniwersytecka", "Istnieją programy inżynierskie i design-adjacent"],
    cautions: ["Wyższy koszt", "Silniejsze oczekiwania rekrutacyjne"],
    intake: "Bezpośrednie wejście na uniwersytet jest bardziej wrażliwe na terminy. Sprawdzić daty przyjęć programu.",
    action: "Porównać wymagania przyjęcia z trasami transfer-first.",
  },
  ubc: {
    fit: "Tradycyjna inżynieria, możliwość mechanical engineering",
    rough: "Prestiżowe i silne, ale wymagające finansowo i konkurencyjne.",
    pros: ["Światowa reputacja inżynierii", "Jasna ścieżka do mechanical engineering później", "Silne środowisko science"],
    cautions: ["Wymaga bardzo uważnego budżetu", "Konkurencyjne przyjęcia", "Nie jest to delikatna ścieżka"],
    intake: "Zwykle bezpośredni, konkurencyjny cykl aplikacyjny. Terminy trzeba sprawdzić wcześnie.",
    action: "Traktować jako ambitną opcję, nie jedyną opcję.",
  },
  fic: {
    fit: "Pathway-style route do SFU",
    rough: "Opcja pathway powiązana z SFU.",
    pros: ["Pathway do SFU", "Może wydawać się bardziej uporządkowane", "Blisko świata kampusu Aymena"],
    cautions: ["Droższe niż publiczne college'e", "Warunki pathway trzeba czytać ostrożnie"],
    intake: "Sprawdzić aktualne terminy FIC i dopasowanie programu.",
    action: "Porównać z trasami transferowymi Douglas/Langara/KPU.",
  },
  "emily-carr": {
    fit: "Rysunek, kreatywność wizualna, design, art/technology",
    rough: "Najlepsze, jeśli rysunek i design staną się centralne.",
    pros: ["Kreatywne środowisko", "Silna tożsamość visual/design", "Dobre dla art and design focus"],
    cautions: ["Nieidealne, jeśli wybierze inżynierię/science", "Portfolio może mieć znaczenie"],
    intake: "Zależne od programu i portfolio.",
    action: "Priorytet tylko wtedy, jeśli design czuje się centralny emocjonalnie i akademicko.",
  },
  bcit: {
    fit: "Praktyczna inżynieria/technologia hands-on",
    rough: "Bardzo praktyczne i nastawione na karierę.",
    pros: ["Hands-on", "Career-oriented", "Dobre dla applied technology"],
    cautions: ["Niektóre programy mają stałe intakes", "Konkurencyjne i uporządkowane"],
    intake: "Sprawdzić każdy program. Niektóre opcje mogą nie mieć January intake.",
    action: "Użyć jako praktycznego punktu porównania.",
  },
};

const polishBudget = {
  careful: {
    title: "Ostrożny budżet studencki",
    rows: [
      ["Współdzielony czynsz", "$900-$1,300/miesiąc"],
      ["Jedzenie", "$350-$550/miesiąc"],
      ["Telefon/media/osobiste", "$250-$550/miesiąc"],
      ["Transport", "Często wliczony przez U-Pass dla wielu studentów full-time"],
      ["Miesięczne koszty życia", "$1,600-$2,400"],
    ],
  },
  realistic: {
    title: "Realistyczny budżet Vancouver",
    rows: [
      ["Współdzielony czynsz", "$1,200-$1,700/miesiąc"],
      ["Jedzenie", "$500-$700/miesiąc"],
      ["Telefon/media/osobiste", "$400-$800/miesiąc"],
      ["Transport", "Często wliczony przez U-Pass dla wielu studentów full-time"],
      ["Miesięczne koszty życia", "$2,200-$3,200"],
    ],
  },
};

const polishPaperworkItems = [
  ["Wybierz program i semestr", "Wybrać program, sprawdzić, czy przyjmuje studentów międzynarodowych, i potwierdzić, czy January, May/Summer albo September jest realistyczne."],
  ["Sprawdź wymagania przyjęcia", "Sprawdzić wymagane przedmioty ze szkoły średniej, minimalne oceny, wymagania z matematyki/science, angielski, portfolio i formularze programu."],
  ["Przygotuj dokumenty akademickie", "Zebrać transkrypty, dyplomy, oficjalne tłumaczenia jeśli potrzebne, wyjaśnienie systemu ocen i informacje o kursach w trakcie."],
  ["Przygotuj dowód angielskiego, jeśli potrzebny", "Niektóre szkoły wymagają IELTS/TOEFL/Duolingo albo uznawanego zwolnienia. Dokładna zasada zależy od szkoły i programu."],
  ["Aplikuj i zapłać opłatę aplikacyjną", "Większość publicznych instytucji BC używa EducationPlannerBC. Niektóre private/pathway programs mają własny portal."],
  ["Otrzymaj i zaakceptuj ofertę", "Jeśli zostanie przyjęta, szkoła wysyła offer albo Letter of Acceptance. Depozyt może być potrzebny, żeby zatrzymać miejsce albo przejść dalej."],
  ["PAL/TAL jeśli wymagane", "Dla większości post-secondary study permit applications szkoła pomaga z Provincial/Territorial Attestation Letter po ofercie/depozycie."],
  ["Proof of funds", "IRCC chce dowodu środków na czesne, koszty życia i podróż. Mogą to być wyciągi bankowe, sponsor, stypendia albo inne akceptowane dokumenty."],
  ["Aplikacja o study permit", "Wgrać acceptance letter, dokumenty tożsamości, proof of funds, PAL/TAL jeśli potrzebne, letter of explanation i dokumenty zależne od kraju."],
  ["Biometrics, medical, police certificate", "IRCC może poprosić o biometrics, badanie medyczne albo police certificate zależnie od sytuacji. Niektóre dokumenty warto przygotować wcześnie."],
  ["Plan mieszkania i przylotu", "Zaplanować gdzie mieszkać, jak bezpiecznie płacić depozyty, kiedy przylecieć, health insurance, telefon, transit i checklistę pierwszego tygodnia."],
];

const polishActivities = {
  moon: { category: "noc", title: "Oglądanie księżyca", location: "Jakiekolwiek ciche niebo" },
  sunsets: { category: "natura", title: "Zachód słońca na plaży", location: "Kitsilano / English Bay" },
  mountains: { category: "przygoda", title: "Dzień w górach", location: "North Shore / Whistler" },
  stanley: { category: "natura", title: "Spacer po Stanley Park", location: "Stanley Park" },
  qe: { category: "rysunek", title: "Queen Elizabeth Park", location: "Queen Elizabeth Park" },
  cafes: { category: "nauka", title: "Deszczowa randka w kawiarni", location: "Kawiarnie w Vancouver" },
  libraries: { category: "nauka", title: "Misje biblioteczne", location: "SFU / VPL" },
  drawing: { category: "rysunek", title: "Miejsca do rysowania", location: "Parki, plaże, kampusy" },
  food: { category: "jedzenie", title: "Tanie misje jedzeniowe", location: "Wszędzie" },
};

const polishDeadlines = [
  ["SFU Spring 2027", "Aplikacje otwierają się 1 lipca 2026; deadline aplikacji 15 września 2026; deadline dokumentów 1 października 2026.", "Przydatny przykład startu w styczniu."],
  ["SFU Summer 2027", "Aplikacje otwierają się 1 grudnia 2026; deadline aplikacji 15 stycznia 2027; deadline dokumentów 1 lutego 2027.", "Przydatny przykład startu w maju/lecie."],
  ["Douglas College", "Summer 2026 aplikuj do 31 stycznia 2026; Fall 2026 do 31 maja 2026; Winter 2027 do 30 września 2026.", "Niektóre programy mogą wypełnić miejsca wcześniej."],
  ["Langara Regular Studies", "International deadlines często są: Spring 30 września, Summer 31 stycznia i Fall 31 maja.", "Terminy konkretnego programu mogą zastąpić ogólne daty."],
  ["KPU International", "Spring otwiera się 1 lutego i zamyka najpóźniej 1 listopada; Summer otwiera się 1 czerwca i zamyka najpóźniej 1 marca; Fall otwiera się 1 października i zamyka najpóźniej 1 lipca.", "Limited-intake programs mają wcześniejsze deadline'y."],
  ["UBC", "Dla cyklu 2026, 15 stycznia 2026 był głównym deadline'em aplikacji dla Winter Session i większości kandydatów Summer Session.", "UBC Engineering zwykle jest bezpośrednią ścieżką startującą we wrześniu."],
  ["BCIT", "Deadline'y są zależne od programu. Niektóre programy pokazują Winter international deadlines około 1 listopada i Fall international deadlines około 2 lipca.", "Zawsze sprawdzić dokładną stronę programu BCIT."],
  ["Fraser International College", "FIC pokazuje January, May i September intakes dla kilku pathway programs; Spring 2027 classes begin 11 stycznia 2027.", "Przydatne jako porównanie pathway do SFU."],
];

const defaultState = {
  passwordAccepted: false,
  language: "en",
  currentScreen: "maja-intro",
  mythAnswer: "",
  interests: [],
  selectedPath: "",
  selectedSchools: [],
  explainRequests: {},
  activities: {},
  talkTopics: {},
  budgetView: "careful",
  galleryIndex: 0,
  galleryFullscreen: false,
  declineAttempts: 0,
  notYetClicked: false,
  notYetClickCount: 0,
  notYetLastClickedAt: "",
  submissionComment: "",
  finalDecision: null,
  createdAt: new Date().toISOString(),
};

let state = loadState();

const gate = document.querySelector("#gate");
const journey = document.querySelector("#journey");
const progressLabel = document.querySelector("#progressLabel");
const progressFill = document.querySelector("#progressFill");
const backButton = document.querySelector("#backButton");
const nextButton = document.querySelector("#nextButton");
const debugPanel = document.querySelector("#debugPanel");
const debugOutput = document.querySelector("#debugOutput");

function loadState() {
  try {
    return { ...defaultState, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  renderDebug();
}

function normalizePassword(value) {
  return value.trim().toLowerCase().replace(/\s+/g, "");
}

function currentLanguage() {
  return state.language === "pl" ? "pl" : "en";
}

function ui() {
  return localizedCopy[currentLanguage()];
}

function isPolish() {
  return currentLanguage() === "pl";
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

function setHtml(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.innerHTML = value;
}

function renderGateDedication() {
  const copy = ui().gate;
  const element = document.querySelector(".gate-dedication");
  if (!element) return;

  element.innerHTML = `
    ${copy.leadBefore} <span class="maja-name-target">${copy.leadName}</span>.
  `;
  setText("#majaPhotoCaption", copy.photoCaption);
}

let lastPhotoHeartAt = 0;

function emitPhotoHeart(event) {
  const figure = event.currentTarget;
  const image = figure.querySelector("img");
  const layer = figure.querySelector(".photo-heart-layer");
  if (!image || !layer) return;

  const rect = image.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

  const now = performance.now();
  if (now - lastPhotoHeartAt < 70) return;
  lastPhotoHeartAt = now;

  const heart = document.createElement("span");
  heart.className = "photo-heart";
  heart.textContent = "♥";
  heart.style.setProperty("--heart-x", `${x}px`);
  heart.style.setProperty("--heart-y", `${y}px`);
  heart.style.setProperty("--heart-drift", `${Math.round(Math.random() * 36 - 18)}px`);
  heart.style.setProperty("--heart-size", `${Math.round(Math.random() * 10 + 17)}px`);

  layer.appendChild(heart);
  window.setTimeout(() => heart.remove(), 1000);
}

function setButtonTexts(selector, values) {
  document.querySelectorAll(selector).forEach((button, index) => {
    if (values[index]) button.textContent = values[index];
  });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderSystemExplainButtons() {
  const copy = ui().system;
  const selectedLabels = [];

  document.querySelectorAll("#system [data-explain-id]").forEach((button, index) => {
    const saved = Boolean(state.explainRequests[button.dataset.explainId]);
    const label = copy.buttons[index] || button.dataset.explainLabel || button.textContent;

    button.classList.toggle("is-selected", saved);
    button.setAttribute("aria-pressed", saved ? "true" : "false");
    button.dataset.saveHint = saved ? copy.savedButtonLabel : copy.saveButtonHint;
    button.textContent = label;

    if (saved) selectedLabels.push(label);
  });

  const note = document.querySelector("#systemExplainSavedNote");
  if (!note) return;

  note.classList.toggle("is-active", selectedLabels.length > 0);
  note.textContent = selectedLabels.length
    ? copy.savedNoteSelected.replace("{items}", selectedLabels.join(", "))
    : copy.savedNoteDefault;
}

function localizedRoute(route, key) {
  return isPolish() ? polishRoutes[route.id]?.[key] || route[key] : route[key];
}

function localizedJourney(route) {
  return isPolish() ? polishRoutes[route.id]?.journey || route.journey : route.journey;
}

function localizedSchool(school, key) {
  return isPolish() ? polishSchools[school.id]?.[key] || school[key] : school[key];
}

function localizedSchoolList(school, key) {
  return isPolish() ? polishSchools[school.id]?.[key] || school[key] : school[key];
}

function localizedBudget() {
  return isPolish() ? polishBudget : budgetData;
}

function localizedActivity(activity, key) {
  return isPolish() ? polishActivities[activity.id]?.[key] || activity[key] : activity[key];
}

function localizedPaperworkItem(item, index) {
  if (!isPolish()) return item;
  const translated = polishPaperworkItems[index];
  return translated ? { title: translated[0], detail: translated[1] } : item;
}

function localizedDeadline(item, index) {
  if (!isPolish()) return item;
  const translated = polishDeadlines[index];
  return translated ? { ...item, school: translated[0], dates: translated[1], note: translated[2] } : item;
}

function getTalkTopicRows(language = currentLanguage()) {
  return localizedCopy[language]?.window?.topics || localizedCopy.en.window.topics;
}

function getTalkTopicLabel(topicId, language = currentLanguage()) {
  const row = getTalkTopicRows(language).find((item) => item[0] === topicId);
  return row ? row[1] : topicId;
}

function getSelectedTalkTopicLabels(language = currentLanguage()) {
  return Object.keys(state.talkTopics || {})
    .filter((topicId) => state.talkTopics[topicId])
    .map((topicId) => getTalkTopicLabel(topicId, language));
}

function getSelectedTalkTopicPayload() {
  return Object.keys(state.talkTopics || {})
    .filter((topicId) => state.talkTopics[topicId])
    .map((topicId) => ({
      id: topicId,
      label: getTalkTopicLabel(topicId, "en"),
      selectedAt: state.talkTopics[topicId]?.selectedAt || null,
    }));
}

function renderMythReveal() {
  const copy = ui().myth;
  const reveal = document.querySelector("#mythReveal");
  if (!reveal) return;

  if (!state.mythAnswer) {
    reveal.innerHTML = `<p>${copy.revealDefault}</p>`;
    return;
  }

  reveal.innerHTML = `
    <p><strong>${copy.revealTitle}</strong> ${copy.revealBody}</p>
  `;
}

function applyLanguageContent() {
  const copy = ui();

  document.documentElement.lang = currentLanguage();
  document.title = copy.documentTitle;
  setText(".tiny-label", isPolish() ? "Możliwość Vancouver dla Mai" : "Maja's Vancouver possibility");

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.language === currentLanguage());
  });

  setText(".gate-copy > .kicker", copy.gate.kicker);
  setText(".gate-copy h1", copy.gate.title);
  renderGateDedication();
  const majaIntroImage = document.querySelector(".maja-intro-photo img");
  if (majaIntroImage) majaIntroImage.alt = copy.gate.photoAlt;
  document.querySelectorAll(".maja-profile-photo img").forEach((image) => {
    image.alt = copy.majaBeauty.photoAlt;
  });
  document.querySelectorAll(".maja-profile-photo .maja-photo-badge").forEach((caption) => {
    caption.textContent = copy.majaBeauty.photoCaption;
  });
  setText(".language-picker .mini-title", copy.gate.languageTitle);
  setText("#passwordForm label", copy.gate.passwordLabel);
  setText("#passwordForm .hint", copy.gate.hint);
  const passwordInput = document.querySelector("#passwordInput");
  if (passwordInput) passwordInput.placeholder = copy.gate.placeholder;
  setText("#passwordForm button[type='submit']", copy.gate.open);
  const passwordMessage = document.querySelector("#passwordMessage");
  if (passwordMessage && (!state.passwordAccepted || passwordMessage.textContent.includes("waiting") || passwordMessage.textContent.includes("czeka"))) {
    passwordMessage.textContent = copy.gate.waiting;
  }

  setText("#maja-intro .kicker", copy.majaIntro.kicker);
  setText("#maja-intro h2", copy.majaIntro.title);
  setText("#maja-intro .lead", copy.majaIntro.lead);
  setText("#maja-intro .maja-question-line span", copy.majaIntro.question);
  setText("#maja-intro .maja-question-line strong", copy.majaIntro.answer);

  setText("#maja-warning .kicker", copy.majaWarning.kicker);
  setText("#maja-warning h2", copy.majaWarning.title);
  setText("#maja-warning .lead", copy.majaWarning.lead);
  setText("#maja-warning .warning-panel strong", copy.majaWarning.panelTitle);
  setText("#maja-warning .warning-panel p", copy.majaWarning.panelBody);
  setText("#maja-warning [data-maja-warning-accept]", copy.majaWarning.accept);

  setText("#maja-beauty .kicker", copy.majaBeauty.kicker);
  setText("#maja-beauty h2", copy.majaBeauty.title);
  setText("#maja-beauty .lead", copy.majaBeauty.lead);
  const majaBeautyBody = document.querySelector("#maja-beauty .split-card > div > p:not(.kicker):not(.lead)");
  if (majaBeautyBody) majaBeautyBody.textContent = copy.majaBeauty.body;
  document.querySelectorAll("#maja-beauty .maja-trait-grid article").forEach((card, index) => {
    const item = copy.majaBeauty.traits[index];
    if (!item) return;
    card.querySelector("strong").textContent = item[0];
    card.querySelector("p").textContent = item[1];
  });

  setText("#maja-magic .kicker", copy.majaMagic.kicker);
  setText("#maja-magic h2", copy.majaMagic.title);
  setText("#maja-magic .lead", copy.majaMagic.lead);
  document.querySelectorAll("#maja-magic .maja-soft-grid article").forEach((card, index) => {
    const item = copy.majaMagic.cards[index];
    if (!item) return;
    card.querySelector("span").textContent = item[0];
    card.querySelector("p").textContent = item[1];
  });
  setText("#maja-magic .maja-final-note", copy.majaMagic.final);

  setText("#myth .kicker", copy.myth.kicker);
  setText("#myth h2", copy.myth.title);
  setText("#myth .lead", copy.myth.lead);
  setText("#myth .question-card h3", copy.myth.question);
  setButtonTexts("#myth [data-myth-answer]", [copy.myth.yes, copy.myth.maybe]);
  setText("#myth .disclaimer", copy.myth.disclaimer);
  renderMythReveal();

  setText("#finder .kicker", copy.finder.kicker);
  setText("#finder h2", copy.finder.title);
  setText("#finder .lead", copy.finder.lead);
  setText("#finder .selection-note", copy.finder.selectionNote);
  setText("#finder .flow-guide .mini-title", copy.finder.guideTitle);
  document.querySelectorAll("#finder .flow-steps article p").forEach((paragraph, index) => {
    paragraph.innerHTML = copy.finder.steps[index] || paragraph.innerHTML;
  });

  setText("#system .kicker", copy.system.kicker);
  setText("#system h2", copy.system.title);
  setText("#system .lead", copy.system.lead);
  document.querySelectorAll("#system .system-grid article").forEach((card, index) => {
    const item = copy.system.cards[index];
    if (!item) return;
    card.querySelector("h3").textContent = item[0];
    card.querySelector("p").textContent = item[1];
  });
  setText("#system .explain-panel > p:first-child", copy.system.explain);
  renderSystemExplainButtons();

  setText("#paths .kicker", copy.paths.kicker);
  setText("#paths h2", copy.paths.title);
  setText("#paths .lead", copy.paths.lead);
  setText("#paths .selection-note", copy.paths.selectionNote);

  setText("#schools .kicker", copy.schools.kicker);
  setText("#schools h2", copy.schools.title);
  setText("#schools .lead", copy.schools.lead);
  setText("#schools .selection-note", copy.schools.selectionNote);
  setText("#schools .currency-note", copy.schools.currency);
  setButtonTexts("#compareRow button", copy.schools.filters);

  setText("#budget .kicker", copy.budget.kicker);
  setText("#budget h2", copy.budget.title);
  setText("#budget .lead", copy.budget.lead);
  setText("#budget .selection-note", copy.budget.selectionNote);
  setButtonTexts("#budget .tab-button", copy.budget.tabs);
  setText("#budget .honesty-note h3", copy.budget.noteTitle);
  setText("#budget .honesty-note > p:not(.currency-note)", copy.budget.note);
  setText("#budget .honesty-note .currency-note", copy.budget.currency);
  document.querySelectorAll("#budget .honesty-note .soft-list li").forEach((item, index) => {
    item.textContent = copy.budget.list[index] || item.textContent;
  });
  setText("#budget .honesty-note a", copy.budget.link);
  setText("#budgetComparison .mini-title", copy.budget.comparisonKicker);
  setText("#budgetComparison h3", copy.budget.comparisonTitle);
  setText("#budgetComparison .comparison-lead", copy.budget.comparisonLead);
  document.querySelectorAll("#budgetComparison .soft-list li").forEach((item, index) => {
    item.textContent = copy.budget.comparisonList[index] || item.textContent;
  });
  document.querySelectorAll("#budgetComparisonLinks a").forEach((link, index) => {
    link.textContent = copy.budget.comparisonLinks[index] || link.textContent;
  });

  setText("#paperwork .kicker", copy.paperwork.kicker);
  setText("#paperwork h2", copy.paperwork.title);
  setText("#paperwork .lead", copy.paperwork.lead);

  setText("#playground .kicker", copy.playground.kicker);
  setText("#playground h2", copy.playground.title);
  setText("#playground .lead", copy.playground.lead);
  setText("#playground .personal-walk h3", copy.playground.walkTitle);
  const walkParagraphs = document.querySelectorAll("#playground .personal-walk p");
  if (walkParagraphs[0]) walkParagraphs[0].textContent = copy.playground.walk1;
  if (walkParagraphs[1]) walkParagraphs[1].textContent = copy.playground.walk2;
  setText("#playground .saved-note", copy.playground.saved);

  setText("#canada .kicker", copy.canada.kicker);
  setText("#canada h2", copy.canada.title);
  setText("#canada .lead", copy.canada.lead);
  const canadaBody = document.querySelector("#canada .split-card > div > p:not(.kicker):not(.lead)");
  if (canadaBody) canadaBody.textContent = copy.canada.body;
  setText("#canada .quote-card p", copy.canada.noteTitle);
  setText("#canada .quote-card strong", copy.canada.note);

  setText("#aymen .kicker", copy.husband.kicker);
  setText("#aymen h2", copy.husband.title);
  setText("#aymen .lead", copy.husband.lead);
  const husbandBody = document.querySelector("#aymen .split-card > div > p:not(.kicker):not(.lead)");
  if (husbandBody) husbandBody.textContent = copy.husband.body;
  setText("#aymen .husband-values .mini-title", copy.husband.valuesTitle);
  document.querySelectorAll("#aymen .husband-values li").forEach((item, index) => {
    item.textContent = copy.husband.values[index] || item.textContent;
  });
  setText("#aymen .husband-effort", copy.husband.effort);
  setText("#aymen figcaption", copy.husband.caption);
  const husbandImage = document.querySelector("#aymen img");
  if (husbandImage) husbandImage.alt = copy.husband.alt;

  setText("#window .kicker", copy.window.kicker);
  setText("#window h2", copy.window.title);
  setText("#window .lead", copy.window.lead);
  setText("#window .talk-guide .mini-title", copy.window.guideTitle);
  setText("#window .talk-guide p:not(.mini-title)", copy.window.guideBody);
  renderTalkTopics();

  setText("#deadlines .kicker", copy.deadlines.kicker);
  setText("#deadlines h2", copy.deadlines.title);
  setText("#deadlines .lead", copy.deadlines.lead);
  setText("#deadlines .deadline-panel h3", copy.deadlines.panelTitle);
  setText("#deadlines .deadline-panel > p", copy.deadlines.panelBody);

  setText("#decision .kicker", copy.decision.kicker);
  setText("#decision h2", copy.decision.title);
  setText("#decision .lead", copy.decision.lead);
  setText("#decision .submission-comment-panel label", copy.decision.commentTitle);
  setText("#decision .submission-comment-panel p", copy.decision.commentBody);
  const decisionComment = document.querySelector("#decisionComment");
  if (decisionComment) decisionComment.placeholder = copy.decision.commentPlaceholder;
  setText("#acceptDecision", copy.decision.accept);
  setText("#declineDecision", copy.decision.decline);
  setText("#respectDecision", copy.decision.respect);
  if (state.declineAttempts > 0) {
    setText("#declineMessage", copy.declineMessages[Math.min(state.declineAttempts - 1, copy.declineMessages.length - 1)]);
  }

  setText("#success .kicker", copy.success.kicker);
  setText("#success .summary-grid article:nth-child(1) .mini-title", copy.success.chosenPath);
  setText("#success .summary-grid article:nth-child(2) .mini-title", copy.success.possibleSchools);
  setText("#success .summary-grid article:nth-child(3) .mini-title", copy.success.nextStep);
  setText("#success .final-line", copy.success.finalLine);

  setText("#backButton", copy.navBack);
  setText("#nextButton", state.currentScreen === "success" ? copy.navStartOver : copy.navNext);
}

function showApp() {
  gate.classList.remove("is-active");
  gate.hidden = true;
  journey.hidden = false;
  showScreen(state.currentScreen || screens[0]);
}

function showGate() {
  gate.hidden = false;
  gate.classList.add("is-active");
  journey.hidden = true;
}

function showScreen(id) {
  const safeId = screens.includes(id) ? id : screens[0];
  state.currentScreen = safeId;

  document.querySelectorAll("[data-screen]").forEach((screen) => {
    screen.classList.toggle("is-active", screen.id === safeId);
  });

  const index = screens.indexOf(safeId);
  progressLabel.textContent = `${index + 1} / ${screens.length}`;
  progressFill.style.width = `${((index + 1) / screens.length) * 100}%`;
  backButton.disabled = index === 0;
  nextButton.textContent = safeId === "success" ? ui().navStartOver : ui().navNext;
  nextButton.hidden = safeId === "decision" || safeId === "maja-warning";

  if (safeId === "decision") renderDecisionReview();
  if (safeId === "success") renderSuccess();
  applyLanguageContent();
  updateDecisionButtonState();

  saveState();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function nextScreen() {
  if (state.currentScreen === "success") {
    state = { ...defaultState, passwordAccepted: true, language: state.language, createdAt: state.createdAt };
    saveState();
    renderAll();
    showScreen(screens[0]);
    return;
  }

  const index = screens.indexOf(state.currentScreen);
  showScreen(screens[Math.min(screens.length - 1, index + 1)]);
}

function previousScreen() {
  const index = screens.indexOf(state.currentScreen);
  showScreen(screens[Math.max(0, index - 1)]);
}

function getRouteById(id) {
  return routes.find((route) => route.id === id) || routes.find((route) => route.id === "flexible");
}

function getSchoolById(id) {
  return schools.find((school) => school.id === id);
}

function getInterestLabel(id) {
  const labels = isPolish()
    ? {
        chemistry: "Chemia",
        math: "Matematyka",
        drawing: "Rysunek / design",
        reading: "Czytanie / angielski",
        nature: "Natura",
        travel: "Podróże / odkrywanie",
        unsure: "Jeszcze nie wiem",
      }
    : {
    chemistry: "Chemistry",
    math: "Math",
    drawing: "Drawing / Design",
    reading: "Reading / English",
    nature: "Nature",
    travel: "Travel / Exploration",
    unsure: "Not sure yet",
  };
  return labels[id] || id;
}

function getInterestButtonLabel(id) {
  const icons = {
    chemistry: "🔬",
    math: "📐",
    drawing: "🎨",
    reading: "📚",
    nature: "🌿",
    travel: "🧭",
    unsure: "🌙",
  };
  return `${getInterestLabel(id)} ${icons[id] || ""}`.trim();
}

function getActivityChoiceLabel(choice) {
  const labels = isPolish()
    ? { yes: "tak", maybe: "może", explain: "Aymen, wyjaśnij" }
    : { yes: "yes", maybe: "maybe", explain: "Aymen, explain" };
  return labels[choice] || choice;
}

function listOrEmpty(items, emptyText) {
  return items.length ? items.join(", ") : emptyText;
}

function parseMoneyAmount(value) {
  return Number(value.replace(/,/g, ""));
}

function formatPln(amount) {
  return Math.round(amount).toLocaleString("en-CA");
}

function addPlnEstimate(text) {
  const estimateLabel = isPolish() ? "ok." : "approx.";
  return text.replace(
    /\$([\d,]+(?:\.\d+)?)(?:\s*-\s*\$?([\d,]+(?:\.\d+)?))?(?:\s*CAD)?/g,
    (match, firstValue, secondValue) => {
      const firstAmount = parseMoneyAmount(firstValue);
      const firstPln = formatPln(firstAmount * CAD_TO_PLN_RATE);

      if (secondValue) {
        const secondAmount = parseMoneyAmount(secondValue);
        const secondPln = formatPln(secondAmount * CAD_TO_PLN_RATE);
        return `$${firstValue}-$${secondValue} CAD (${estimateLabel} ${firstPln}-${secondPln} PLN)`;
      }

      return `$${firstValue} CAD (${estimateLabel} ${firstPln} PLN)`;
    },
  );
}

function getRecommendedRoutes() {
  const aymenRoute = routes.find((route) => route.id === "aymen-transfer");
  const selected = new Set(state.interests);
  const scored = routes.map((route) => {
    const score = route.tags.reduce((total, tag) => total + (selected.has(tag) ? 2 : 0), 0);
    return { ...route, score };
  });

  const recommended = !state.interests.length
    ? routes.filter((route) => ["flexible", "science-transfer", "design-tech"].includes(route.id))
    : scored
        .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
        .filter((route) => route.score > 0);

  return [aymenRoute, ...recommended.filter((route) => route.id !== "aymen-transfer")].filter(Boolean).slice(0, 4);
}

function setSelectedPath(pathId) {
  state.selectedPath = pathId;
  saveState();
  renderAll();
}

function toggleSchool(schoolId) {
  if (state.selectedSchools.includes(schoolId)) {
    state.selectedSchools = state.selectedSchools.filter((id) => id !== schoolId);
  } else {
    state.selectedSchools.push(schoolId);
  }
  saveState();
  renderSchoolCards();
}

function renderPathGrid() {
  const pathGrid = document.querySelector("#pathGrid");
  const recommended = getRecommendedRoutes();
  const copy = ui().paths;

  pathGrid.innerHTML = recommended
    .map((route) => {
      const selected = state.selectedPath === route.id ? " is-selected" : "";
      const explainId = `path-${route.id}`;
      const explainSaved = state.explainRequests[explainId] ? " is-selected" : "";
      return `
        <article class="path-card${selected}">
          <div>
            <p class="mini-title">${localizedRoute(route, "badge") || copy.suggestedRoute}</p>
            <h3>${localizedRoute(route, "title")}</h3>
            <p>${localizedRoute(route, "long")}</p>
            ${route.costNote ? `<p class="route-cost">${addPlnEstimate(localizedRoute(route, "costNote"))}</p>` : ""}
            ${route.caveat ? `<p class="route-caveat">${localizedRoute(route, "caveat")}</p>` : ""}
            <ol class="route-journey">
              ${localizedJourney(route)
                .map(
                  ([label, copy]) => `
                    <li>
                      <span>${label}</span>
                      <p>${copy}</p>
                    </li>
                  `,
                )
                .join("")}
            </ol>
          </div>
          <div class="path-actions">
            <button class="secondary-button" data-select-route="${route.id}">${selected ? copy.chosenRoute : copy.chooseRoute}</button>
            <button class="text-button explain-button${explainSaved}" data-explain-id="${explainId}" data-explain-label="Explain the ${route.title} academic path">${explainSaved ? copy.savedForAymen : copy.explain}</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderSchoolCards(filter = document.querySelector(".filter-button.is-active")?.dataset.filter || "all") {
  const schoolCards = document.querySelector("#schoolCards");
  const visibleSchools = filter === "all" ? schools : schools.filter((school) => school.tags.includes(filter));
  const copy = ui().schools;

  schoolCards.innerHTML = visibleSchools
    .map((school) => {
      const checked = state.selectedSchools.includes(school.id) ? " is-selected" : "";
      const explainId = `school-${school.id}`;
      const explainSaved = state.explainRequests[explainId] ? " is-selected" : "";
      return `
        <article class="school-card${checked}">
          <div class="school-card-top">
            <p class="mini-title">${localizedSchool(school, "fit")}</p>
            <h3>${school.name}</h3>
            <p>${localizedSchool(school, "rough")}</p>
            <strong>${addPlnEstimate(school.cost)}</strong>
          </div>
          <details>
            <summary>${copy.summary}</summary>
            <div class="detail-grid">
              <div>
                <p class="detail-heading">${copy.pros}</p>
                <ul>${localizedSchoolList(school, "pros").map((item) => `<li>${item}</li>`).join("")}</ul>
              </div>
              <div>
                <p class="detail-heading">${copy.cautions}</p>
                <ul>${localizedSchoolList(school, "cautions").map((item) => `<li>${item}</li>`).join("")}</ul>
              </div>
            </div>
            <p><strong>${copy.intake}</strong> ${localizedSchool(school, "intake")}</p>
            <p><strong>${copy.action}</strong> ${localizedSchool(school, "action")}</p>
            <a href="${school.source}" target="_blank" rel="noreferrer">${copy.source}</a>
          </details>
          <button class="text-button" data-toggle-school="${school.id}">${checked ? copy.saved : copy.save}</button>
          <button class="text-button explain-button${explainSaved}" data-explain-id="${explainId}" data-explain-label="Explain ${school.name}">${explainSaved ? ui().paths.savedForAymen : copy.explain}</button>
        </article>
      `;
    })
    .join("");
}

function renderBudget() {
  const data = localizedBudget();
  const budget = data[state.budgetView] || data.careful;
  const budgetCard = document.querySelector("#budgetCard");

  document.querySelectorAll(".tab-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.budget === state.budgetView);
  });

  budgetCard.innerHTML = `
    <h3>${budget.title}</h3>
    <div class="budget-table">
      ${budget.rows
        .map(
          ([label, value]) => `
            <div>
              <span>${label}</span>
              <strong>${addPlnEstimate(value)}</strong>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderPaperwork() {
  const list = document.querySelector("#paperworkList");
  const copy = ui().paperwork;
  list.innerHTML = paperworkItems
    .map(
      (item, index) => `
        <article class="map-step" style="--delay: ${index * 0.06}s">
          <span class="map-marker">${String(index + 1).padStart(2, "0")}</span>
          <div>
            <p class="mini-title">${copy.stopLabel}</p>
            <h3>${localizedPaperworkItem(item, index).title}</h3>
            <p>${localizedPaperworkItem(item, index).detail}</p>
          </div>
        </article>
      `,
    )
    .join("") +
    `
      <article class="map-treasure" style="--delay: ${paperworkItems.length * 0.06}s">
        <span class="map-marker">X</span>
        <div>
          <p class="mini-title">${copy.destinationLabel}</p>
          <h3>${copy.treasureTitle}</h3>
          <p>${copy.treasureBody}</p>
        </div>
      </article>
    `;
}

function renderDeadlineCards() {
  const grid = document.querySelector("#deadlineCards");
  if (!grid) return;

  grid.innerHTML = deadlineExamples
    .map(
      (item, index) => {
        const localized = localizedDeadline(item, index);
        return `
        <article class="deadline-card">
          <p class="mini-title">${localized.school}</p>
          <h3>${localized.dates}</h3>
          <p>${localized.note}</p>
          <a href="${item.source}" target="_blank" rel="noreferrer">${ui().schools.source}</a>
        </article>
      `;
      },
    )
    .join("");
}

function toggleTalkTopic(topicId) {
  state.talkTopics = state.talkTopics || {};

  if (state.talkTopics[topicId]) {
    delete state.talkTopics[topicId];
  } else {
    state.talkTopics[topicId] = {
      label: getTalkTopicLabel(topicId, "en"),
      selectedAt: new Date().toISOString(),
    };
  }

  saveState();
  renderTalkTopics();
  renderDecisionReview();
}

function renderTalkTopics() {
  const grid = document.querySelector("#talkTopicGrid");
  if (!grid) return;

  const copy = ui().window;
  grid.innerHTML = getTalkTopicRows()
    .map(([id, title, detail], index) => {
      const selected = Boolean(state.talkTopics?.[id]);
      return `
        <article class="talk-card${selected ? " is-selected" : ""}">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <h3>${title}</h3>
          <p>${detail}</p>
          <button class="secondary-button" data-talk-topic="${id}">
            ${selected ? copy.chosen : copy.choose}
          </button>
        </article>
      `;
    })
    .join("");
}

function getGalleryIndex() {
  const count = vancouverPhotos.length;
  return ((state.galleryIndex || 0) % count + count) % count;
}

function setGalleryIndex(index) {
  state.galleryIndex = ((index % vancouverPhotos.length) + vancouverPhotos.length) % vancouverPhotos.length;
  saveState();
  renderVancouverGallery();
}

function moveGallery(direction) {
  setGalleryIndex(getGalleryIndex() + direction);
}

function setGalleryFullscreen(isOpen) {
  state.galleryFullscreen = isOpen;
  document.body.classList.toggle("gallery-lightbox-open", isOpen);
  saveState();
  renderVancouverGallery();
}

function handleGalleryInteraction(event) {
  const galleryAction = event.target.closest("[data-gallery-action]");
  if (galleryAction && event.currentTarget.contains(galleryAction)) {
    const action = galleryAction.dataset.galleryAction;

    event.preventDefault();
    event.stopPropagation();

    if (action === "prev") moveGallery(-1);
    if (action === "next") moveGallery(1);
    if (action === "fullscreen") setGalleryFullscreen(true);
    if (action === "close-fullscreen") setGalleryFullscreen(false);
    return true;
  }

  const galleryIndexButton = event.target.closest("[data-gallery-index]");
  if (galleryIndexButton && event.currentTarget.contains(galleryIndexButton)) {
    event.preventDefault();
    event.stopPropagation();
    setGalleryIndex(Number(galleryIndexButton.dataset.galleryIndex));
    return true;
  }

  return false;
}

function renderVancouverGallery() {
  const gallery = document.querySelector("#vancouverGallery");
  const lightboxRoot = document.querySelector("#galleryLightboxRoot");
  if (!gallery) return;

  const copy = ui().playground;
  const index = getGalleryIndex();
  const photo = vancouverPhotos[index];
  const slideMarkup = `
    <figure class="vancouver-slide">
      <img src="${photo.src}" alt="${photo.alt}" />
      <figcaption>${copy.photo} ${index + 1} ${copy.photoOf} ${vancouverPhotos.length} - ${copy.photoCaption}</figcaption>
    </figure>
  `;

  const thumbnailMarkup = vancouverPhotos
    .map(
      (item, itemIndex) => `
        <button class="gallery-dot${itemIndex === index ? " is-selected" : ""}" data-gallery-index="${itemIndex}" aria-label="Show photo ${itemIndex + 1}">
          <img src="${item.src}" alt="" loading="lazy" />
        </button>
      `,
    )
    .join("");

  const sliderMarkup = `
    <section class="photo-slider" aria-label="Personal Vancouver photo slider">
      <div class="slider-frame">
        <button class="slider-button slider-button-left" data-gallery-action="prev" aria-label="${copy.previousPhoto}">&lsaquo;</button>
        ${slideMarkup}
        <button class="slider-button slider-button-right" data-gallery-action="next" aria-label="${copy.nextPhoto}">&rsaquo;</button>
        <button class="fullscreen-button" data-gallery-action="fullscreen">${copy.fullscreen}</button>
      </div>
      <div class="slider-footer">
        <span>${index + 1} / ${vancouverPhotos.length}</span>
        <div class="gallery-dots">${thumbnailMarkup}</div>
      </div>
    </section>
  `;

  const lightboxMarkup = state.galleryFullscreen
    ? `
      <div class="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Fullscreen Vancouver photos">
        <button class="lightbox-close" data-gallery-action="close-fullscreen" aria-label="${copy.closeFullscreen}">&times;</button>
        <button class="slider-button slider-button-left" data-gallery-action="prev" aria-label="${copy.previousPhoto}">&lsaquo;</button>
        ${slideMarkup}
        <button class="slider-button slider-button-right" data-gallery-action="next" aria-label="${copy.nextPhoto}">&rsaquo;</button>
        <div class="lightbox-footer">
          <span>${index + 1} / ${vancouverPhotos.length}</span>
          <div class="gallery-dots">${thumbnailMarkup}</div>
        </div>
      </div>
    `
    : "";

  document.body.classList.toggle("gallery-lightbox-open", state.galleryFullscreen);
  gallery.innerHTML = sliderMarkup;
  gallery.onclick = handleGalleryInteraction;

  if (lightboxRoot) {
    lightboxRoot.innerHTML = lightboxMarkup;
    lightboxRoot.onclick = handleGalleryInteraction;
  }
}

function setActivity(activityId, value) {
  state.activities[activityId] = value;
  saveState();
  renderActivities();
}

function toggleExplainRequest(id, label) {
  if (state.explainRequests[id]) {
    delete state.explainRequests[id];
  } else {
    state.explainRequests[id] = {
      label,
      savedAt: new Date().toISOString(),
    };
  }

  saveState();
  renderAll();
}

function renderActivitiesLegacy() {
  const grid = document.querySelector("#activityGrid");
  grid.innerHTML = activities
    .map((activity) => {
      const selected = state.activities[activity.id] || "";
      const explanation =
        selected === "explain"
          ? `<p class="activity-explain">Saved for Aymen to explain later.</p>`
          : "";

      return `
        <article class="activity-card">
          <div>
            <p class="mini-title">${activity.category} · ${activity.cost}</p>
            <h3>${activity.title}</h3>
            <p>${activity.location}</p>
          </div>
          ${explanation}
          <div class="activity-actions">
            <button class="${selected === "yes" ? "is-selected" : ""}" data-activity="${activity.id}" data-choice="yes">yes</button>
            <button class="${selected === "maybe" ? "is-selected" : ""}" data-activity="${activity.id}" data-choice="maybe">maybe</button>
            <button class="${selected === "explain" ? "is-selected" : ""}" data-activity="${activity.id}" data-choice="explain">Aymen, explain</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function buildReviewHtmlLegacy(context = "decision") {
  const path = getRouteById(state.selectedPath || "flexible");
  const savedSchools = state.selectedSchools.map(getSchoolById).filter(Boolean);
  const recommendedSchools = path.schools.map(getSchoolById).filter(Boolean).slice(0, 4);
  const schoolsToShow = savedSchools.length ? savedSchools : recommendedSchools;
  const activityAnswers = Object.entries(state.activities)
    .map(([id, choice]) => {
      const activity = activities.find((item) => item.id === id);
      return activity ? `${activity.title}: ${getActivityChoiceLabel(choice)}` : "";
    })
    .filter(Boolean);
  const explainRequests = Object.values(state.explainRequests).map((item) => item.label);
  const prefix =
    context === "success"
      ? "Here is what you chose."
      : "These answers will be saved and can be sent to Aymen through Resend later.";

  return `
    <h3>${prefix}</h3>
    <div class="review-grid">
      <article>
        <p class="mini-title">Interests</p>
        <strong>${listOrEmpty(state.interests.map(getInterestLabel), "Nothing selected yet")}</strong>
      </article>
      <article>
        <p class="mini-title">Academic route</p>
        <strong>${path.title}</strong>
      </article>
      <article>
        <p class="mini-title">${savedSchools.length ? "Saved schools" : "Suggested schools to compare"}</p>
        <strong>${listOrEmpty(schoolsToShow.map((school) => school.name), "No school saved yet")}</strong>
      </article>
      <article>
        <p class="mini-title">Budget view</p>
        <strong>${budgetData[state.budgetView]?.title || "Careful student budget"}</strong>
      </article>
      <article>
        <p class="mini-title">Vancouver activities</p>
        <strong>${listOrEmpty(activityAnswers, "No Vancouver activities selected yet")}</strong>
      </article>
      <article>
        <p class="mini-title">Aymen explain requests</p>
        <strong>${listOrEmpty(explainRequests, "No explain requests saved yet")}</strong>
      </article>
    </div>
  `;
}

function renderActivities() {
  const grid = document.querySelector("#activityGrid");
  const labels = isPolish()
    ? { yes: "tak", maybe: "może", explain: "Aymen, wyjaśnij", saved: "Zapisane, żeby Aymen wyjaśnił później." }
    : { yes: "yes", maybe: "maybe", explain: "Aymen, explain", saved: "Saved for Aymen to explain later." };

  grid.innerHTML = activities
    .map((activity) => {
      const selected = state.activities[activity.id] || "";
      const explanation = selected === "explain" ? `<p class="activity-explain">${labels.saved}</p>` : "";

      return `
        <article class="activity-card">
          <div>
            <p class="mini-title">${localizedActivity(activity, "category")} · ${activity.cost}</p>
            <h3>${localizedActivity(activity, "title")}</h3>
            <p>${localizedActivity(activity, "location")}</p>
          </div>
          ${explanation}
          <div class="activity-actions">
            <button class="${selected === "yes" ? "is-selected" : ""}" data-activity="${activity.id}" data-choice="yes">${labels.yes}</button>
            <button class="${selected === "maybe" ? "is-selected" : ""}" data-activity="${activity.id}" data-choice="maybe">${labels.maybe}</button>
            <button class="${selected === "explain" ? "is-selected" : ""}" data-activity="${activity.id}" data-choice="explain">${labels.explain}</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function buildReviewHtml(context = "decision") {
  const path = getRouteById(state.selectedPath || "flexible");
  const savedSchools = state.selectedSchools.map(getSchoolById).filter(Boolean);
  const recommendedSchools = path.schools.map(getSchoolById).filter(Boolean).slice(0, 4);
  const schoolsToShow = savedSchools.length ? savedSchools : recommendedSchools;
  const copy = ui().review;
  const activityAnswers = Object.entries(state.activities)
    .map(([id, choice]) => {
      const activity = activities.find((item) => item.id === id);
      return activity ? `${localizedActivity(activity, "title")}: ${getActivityChoiceLabel(choice)}` : "";
    })
    .filter(Boolean);
  const selectedTalkTopics = getSelectedTalkTopicLabels();
  const explainRequests = Object.values(state.explainRequests).map((item) => item.label);
  const prefix = context === "success" ? copy.successPrefix : copy.decisionPrefix;

  return `
    <h3>${prefix}</h3>
    <div class="review-grid">
      <article>
        <p class="mini-title">${copy.interests}</p>
        <strong>${listOrEmpty(state.interests.map(getInterestLabel), copy.emptyInterests)}</strong>
      </article>
      <article>
        <p class="mini-title">${copy.academicRoute}</p>
        <strong>${localizedRoute(path, "title")}</strong>
      </article>
      <article>
        <p class="mini-title">${savedSchools.length ? copy.savedSchools : copy.suggestedSchools}</p>
        <strong>${listOrEmpty(schoolsToShow.map((school) => school.name), copy.emptySchools)}</strong>
      </article>
      <article>
        <p class="mini-title">${copy.budgetView}</p>
        <strong>${localizedBudget()[state.budgetView]?.title || localizedBudget().careful.title}</strong>
      </article>
      <article>
        <p class="mini-title">${copy.activities}</p>
        <strong>${listOrEmpty(activityAnswers, copy.emptyActivities)}</strong>
      </article>
      <article>
        <p class="mini-title">${copy.talkTopics}</p>
        <strong>${listOrEmpty(selectedTalkTopics, copy.emptyTalkTopics)}</strong>
      </article>
      <article>
        <p class="mini-title">${copy.explainRequests}</p>
        <strong>${listOrEmpty(explainRequests, copy.emptyExplain)}</strong>
      </article>
      <article>
        <p class="mini-title">${copy.comments}</p>
        <strong>${state.submissionComment?.trim() ? escapeHtml(state.submissionComment.trim()) : copy.emptyComments}</strong>
      </article>
    </div>
  `;
}

function renderDecisionComment() {
  const textarea = document.querySelector("#decisionComment");
  if (!textarea) return;

  if (document.activeElement !== textarea && textarea.value !== (state.submissionComment || "")) {
    textarea.value = state.submissionComment || "";
  }
}

function renderDecisionReview() {
  const panel = document.querySelector("#decisionReview");
  if (!panel) return;
  panel.innerHTML = buildReviewHtml("decision");
}

function renderSuccess() {
  const path = getRouteById(state.selectedPath || "flexible");
  const selectedSchools = state.selectedSchools.length
    ? state.selectedSchools.map(getSchoolById).filter(Boolean)
    : path.schools.map(getSchoolById).filter(Boolean).slice(0, 4);
  const accepted = state.finalDecision?.accepted;
  const copy = ui().success;

  document.querySelector("#successHeadline").textContent = accepted ? copy.acceptedHeadline : copy.declinedHeadline;
  document.querySelector("#successSubtitle").textContent = accepted
    ? copy.acceptedSubtitle
    : copy.declinedSubtitle;
  document.querySelector("#summaryPath").textContent = localizedRoute(path, "title");
  document.querySelector("#summarySchools").textContent = selectedSchools.map((school) => school.name).join(" + ");
  document.querySelector("#summaryNext").textContent = accepted
    ? copy.acceptedNext
    : copy.declinedNext;

  const successReview = document.querySelector("#successReview");
  if (successReview) {
    successReview.innerHTML = buildReviewHtml("success");
  }
}

function renderDebug() {
  if (!debugPanel || debugPanel.hidden) return;
  debugOutput.textContent = JSON.stringify(
    {
      users: { name: "Maja", passwordAccepted: state.passwordAccepted, language: currentLanguage(), createdAt: state.createdAt },
      quizAnswers: {
        interests: state.interests,
        selectedPath: state.selectedPath,
        selectedSchools: state.selectedSchools,
        explainRequests: state.explainRequests,
      },
      activities: state.activities,
      talkTopics: {
        selected: state.talkTopics || {},
        selectedLabelsEnglish: getSelectedTalkTopicLabels("en"),
      },
      notYet: {
        clicked: state.notYetClicked,
        clickCount: state.notYetClickCount,
        lastClickedAt: state.notYetLastClickedAt,
      },
      submissionComment: state.submissionComment,
      currency: {
        cadToPlnRate: CAD_TO_PLN_RATE,
        note: CAD_TO_PLN_SOURCE,
      },
      finalDecision: state.finalDecision,
    },
    null,
    2,
  );
}

function renderAll() {
  applyLanguageContent();

  document.querySelectorAll(".interest-chip").forEach((button) => {
    button.classList.toggle("is-selected", state.interests.includes(button.dataset.interest));
    button.textContent = getInterestButtonLabel(button.dataset.interest);
  });

  renderPathGrid();
  renderSchoolCards();
  renderBudget();
  renderPaperwork();
  renderDeadlineCards();
  renderTalkTopics();
  renderVancouverGallery();
  renderActivities();
  renderDecisionReview();
  renderDecisionComment();
  updateDecisionButtonState();
  renderDebug();
}

document.querySelector("#passwordForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("#passwordInput");
  const message = document.querySelector("#passwordMessage");
  const normalized = normalizePassword(input.value);

  if (!acceptedPasswords.has(normalized)) {
    message.textContent = ui().gate.wrong;
    input.select();
    return;
  }

  state.passwordAccepted = true;
  message.textContent = ui().gate.granted;
  saveState();
  window.setTimeout(showApp, 450);
});

document.querySelectorAll("[data-language]").forEach((button) => {
  button.addEventListener("click", () => {
    state.language = button.dataset.language === "pl" ? "pl" : "en";
    saveState();
    renderAll();
  });
});

document.querySelectorAll("[data-myth-answer]").forEach((button) => {
  button.addEventListener("click", () => {
    state.mythAnswer = button.dataset.mythAnswer;
    saveState();
    renderMythReveal();
  });
});

document.querySelector("#interestGrid").addEventListener("click", (event) => {
  const button = event.target.closest("[data-interest]");
  if (!button) return;

  const interest = button.dataset.interest;
  if (state.interests.includes(interest)) {
    state.interests = state.interests.filter((item) => item !== interest);
  } else {
    state.interests.push(interest);
  }

  saveState();
  renderAll();
});

document.addEventListener("click", (event) => {
  if (handleGalleryInteraction(event)) return;

  const explainButton = event.target.closest("[data-explain-id]");
  if (explainButton) {
    toggleExplainRequest(explainButton.dataset.explainId, explainButton.dataset.explainLabel);
    return;
  }

  const majaWarningAccept = event.target.closest("[data-maja-warning-accept]");
  if (majaWarningAccept) {
    nextScreen();
    return;
  }

  const routeButton = event.target.closest("[data-select-route]");
  if (routeButton) {
    setSelectedPath(routeButton.dataset.selectRoute);
    return;
  }

  const schoolButton = event.target.closest("[data-toggle-school]");
  if (schoolButton) {
    toggleSchool(schoolButton.dataset.toggleSchool);
    return;
  }

  const talkTopicButton = event.target.closest("[data-talk-topic]");
  if (talkTopicButton) {
    toggleTalkTopic(talkTopicButton.dataset.talkTopic);
    return;
  }

  const activityButton = event.target.closest("[data-activity]");
  if (activityButton) {
    setActivity(activityButton.dataset.activity, activityButton.dataset.choice);
  }
});

document.addEventListener("keydown", (event) => {
  if (!state.galleryFullscreen) return;

  if (event.key === "Escape") setGalleryFullscreen(false);
  if (event.key === "ArrowLeft") moveGallery(-1);
  if (event.key === "ArrowRight") moveGallery(1);
});

document.querySelector("#compareRow").addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;

  document.querySelectorAll(".filter-button").forEach((filterButton) => {
    filterButton.classList.toggle("is-active", filterButton === button);
  });
  renderSchoolCards(button.dataset.filter);
});

document.querySelectorAll(".tab-button").forEach((button) => {
  button.addEventListener("click", () => {
    state.budgetView = button.dataset.budget;
    saveState();
    renderBudget();
  });
});

document.querySelector("#decisionComment")?.addEventListener("input", (event) => {
  state.submissionComment = event.target.value;
  saveState();
  renderDecisionReview();
});

backButton.addEventListener("click", previousScreen);
nextButton.addEventListener("click", nextScreen);
document.querySelector("[data-maja-warning-accept]")?.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  nextScreen();
});

const declineButton = document.querySelector("#declineDecision");
const acceptButton = document.querySelector("#acceptDecision");
const respectButton = document.querySelector("#respectDecision");
const declineMessage = document.querySelector("#declineMessage");
const declineMessages = [
  "Really? Please think about it.",
  "Are you sure? Maybe give the idea one more gentle thought.",
  "Please, please think about it again.",
  "Okay, one more tiny reconsideration before deciding?",
  "I hear you. If it is still not yet, you can choose time to think.",
];

function updateDecisionButtonState() {
  const card = document.querySelector("#decision .decision-card");
  if (!card) return;

  card.classList.remove("decline-step-1", "decline-step-2", "decline-step-3", "decline-step-4", "decline-step-5");
  if (state.declineAttempts > 0) {
    card.classList.add(`decline-step-${Math.min(state.declineAttempts, 5)}`);
    respectButton.hidden = state.declineAttempts < 5;
  } else {
    declineButton.style.position = "";
    declineButton.style.left = "";
    declineButton.style.top = "";
    declineMessage.textContent = "";
    respectButton.hidden = true;
  }
}

function moveDeclineButton({ countClick = true } = {}) {
  if (countClick) {
    state.declineAttempts += 1;
    state.notYetClicked = true;
    state.notYetClickCount = state.declineAttempts;
    state.notYetLastClickedAt = new Date().toISOString();
  }

  updateDecisionButtonState();

  const parent = declineButton.parentElement;
  const parentBox = parent.getBoundingClientRect();
  const acceptBox = acceptButton.getBoundingClientRect();
  const buttonBox = declineButton.getBoundingClientRect();
  const maxX = Math.max(0, parentBox.width - buttonBox.width);
  const maxY = Math.max(0, parentBox.height - buttonBox.height);
  let x = 0;
  let y = 0;

  for (let attempt = 0; attempt < 25; attempt += 1) {
    x = Math.round(Math.random() * maxX);
    y = Math.round(Math.random() * Math.max(maxY, 86));

    const candidate = {
      left: parentBox.left + x,
      right: parentBox.left + x + buttonBox.width,
      top: parentBox.top + y,
      bottom: parentBox.top + y + buttonBox.height,
    };

    const overlapsAccept =
      candidate.left < acceptBox.right + 12 &&
      candidate.right > acceptBox.left - 12 &&
      candidate.top < acceptBox.bottom + 12 &&
      candidate.bottom > acceptBox.top - 12;

    if (!overlapsAccept) break;
  }

  declineButton.style.position = "absolute";
  declineButton.style.left = `${x}px`;
  declineButton.style.top = `${y}px`;

  if (countClick) {
    const messages = ui().declineMessages;
    declineMessage.textContent = messages[Math.min(state.declineAttempts - 1, messages.length - 1)];
  }

  if (state.declineAttempts >= 5) {
    respectButton.hidden = false;
  }

  saveState();
}

declineButton.addEventListener("pointerenter", () => {
  if (matchMedia("(hover: hover)").matches && state.declineAttempts < 2) {
    moveDeclineButton({ countClick: false });
  }
});

declineButton.addEventListener("click", (event) => {
  event.preventDefault();
  moveDeclineButton();
});

function getActivityAnswersPayload() {
  return Object.entries(state.activities)
    .map(([id, choice]) => {
      const activity = activities.find((item) => item.id === id);
      if (!activity) return null;
      return {
        id,
        title: activity.title,
        choice,
      };
    })
    .filter(Boolean);
}

function getFinalEmailPayload() {
  const path = getRouteById(state.selectedPath || "flexible");
  const selectedSchools = state.selectedSchools.map(getSchoolById).filter(Boolean);

  return {
    submittedAt: new Date().toISOString(),
    user: {
      name: "Maja",
      language: currentLanguage(),
    },
    finalDecision: state.finalDecision,
    answers: {
      interests: state.interests.map((id) => ({
        id,
        label: {
          chemistry: "Chemistry",
          math: "Math",
          drawing: "Drawing / Design",
          reading: "Reading / English",
          nature: "Nature",
          travel: "Travel / Exploration",
          unsure: "Not sure yet",
        }[id] || id,
      })),
      academicRoute: {
        id: path.id,
        title: path.title,
      },
      savedSchools: selectedSchools.map((school) => ({
        id: school.id,
        name: school.name,
        type: school.type,
      })),
      budgetView: {
        id: state.budgetView,
        title: budgetData[state.budgetView]?.title || budgetData.careful.title,
      },
      vancouverActivities: getActivityAnswersPayload(),
      talkTopics: getSelectedTalkTopicPayload(),
      explainRequests: Object.values(state.explainRequests),
      submissionComment: state.submissionComment.trim(),
      notYet: {
        clicked: state.notYetClicked,
        clickCount: state.notYetClickCount,
        lastClickedAt: state.notYetLastClickedAt,
      },
    },
  };
}

async function sendDecisionEmail() {
  if (!state.finalDecision) return;

  state.finalDecision.emailSending = true;
  saveState();

  try {
    const response = await fetch("/api/send-decision", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(getFinalEmailPayload()),
    });
    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(result.error || "Email request failed.");
    }

    state.finalDecision.emailSent = true;
    state.finalDecision.emailSending = false;
    state.finalDecision.emailError = "";
    state.finalDecision.emailProviderId = result.id || "";
  } catch (error) {
    state.finalDecision.emailSent = false;
    state.finalDecision.emailSending = false;
    state.finalDecision.emailError = error.message || "Email could not be sent.";
  }

  saveState();
  renderSuccess();
}

acceptButton.addEventListener("click", async () => {
  state.finalDecision = {
    accepted: true,
    selectedPath: state.selectedPath || "flexible",
    timestamp: new Date().toISOString(),
    emailSent: false,
    resendReady: true,
    talkTopics: getSelectedTalkTopicPayload(),
    notYetClicked: state.notYetClicked,
    notYetClickCount: state.notYetClickCount,
    notYetLastClickedAt: state.notYetLastClickedAt,
    submissionComment: state.submissionComment.trim(),
  };
  saveState();
  showScreen("success");
  await sendDecisionEmail();
});

respectButton.addEventListener("click", async () => {
  state.finalDecision = {
    accepted: false,
    selectedPath: state.selectedPath || "flexible",
    timestamp: new Date().toISOString(),
    emailSent: false,
    resendReady: true,
    talkTopics: getSelectedTalkTopicPayload(),
    notYetClicked: state.notYetClicked,
    notYetClickCount: state.notYetClickCount,
    notYetLastClickedAt: state.notYetLastClickedAt,
    submissionComment: state.submissionComment.trim(),
    note: "Maja wants to think about it.",
  };
  saveState();
  showScreen("success");
  await sendDecisionEmail();
});

document.querySelectorAll(".maja-intro-photo").forEach((photo) => {
  photo.addEventListener("pointermove", emitPhotoHeart);
});

document.querySelector("#closeDebug").addEventListener("click", () => {
  debugPanel.hidden = true;
});

const params = new URLSearchParams(window.location.search);

if (params.get("reset") === "1") {
  state = { ...defaultState, createdAt: new Date().toISOString() };
  saveState();
}

if (params.get("debug") === "1") {
  debugPanel.hidden = false;
}

if (params.get("debug") === "1" && params.get("unlock") === "1") {
  state = {
    ...defaultState,
    passwordAccepted: true,
    currentScreen: screens[0],
    createdAt: new Date().toISOString(),
  };
  saveState();
}

renderAll();

if (state.passwordAccepted) {
  showApp();
} else {
  showGate();
}
