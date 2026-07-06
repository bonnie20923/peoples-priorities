// Mock Data for CivicPriority - AI for Constituency Development Planning

export const initialWards = [
  {
    id: "ward-1",
    name: "Ward 1 - Ganga Nagar",
    population: 48500,
    literacyRate: 72,
    waterQualityIndex: 58, // Low WQI = Water Gap
    schoolEnrollmentRate: 84,
    avgSchoolTravelDistance: 3.8, // Long distance = Education Gap
    hospitalBedsPer1000: 0.6, // Low bed count = Health Gap
    avgHealthCentreTravelTime: 32, // High travel time = Health Gap
    unemploymentRate: 9.4,
    roadQualityIndex: 4.2, // Low quality = Road Gap
    powerDeficit: 15, // High deficit = Power Gap
    coordinates: { x: 250, y: 150, radius: 60 }
  },
  {
    id: "ward-2",
    name: "Ward 2 - Vikas Nagar",
    population: 34200,
    literacyRate: 89,
    waterQualityIndex: 82,
    schoolEnrollmentRate: 96,
    avgSchoolTravelDistance: 1.2,
    hospitalBedsPer1000: 2.1,
    avgHealthCentreTravelTime: 12,
    unemploymentRate: 4.8,
    roadQualityIndex: 7.8,
    powerDeficit: 4,
    coordinates: { x: 400, y: 180, radius: 50 }
  },
  {
    id: "ward-3",
    name: "Ward 3 - Shanti Nagar",
    population: 62000,
    literacyRate: 65,
    waterQualityIndex: 45, // Critical Water Gap
    schoolEnrollmentRate: 71, // Low Enrollment = Education Gap
    avgSchoolTravelDistance: 4.5, // High Travel Distance = Education Gap
    hospitalBedsPer1000: 0.4, // Critical Health Gap
    avgHealthCentreTravelTime: 45, // Critical Health Gap
    unemploymentRate: 12.1,
    roadQualityIndex: 3.1, // Critical Road Gap
    powerDeficit: 22, // Critical Power Gap
    coordinates: { x: 320, y: 320, radius: 75 }
  },
  {
    id: "ward-4",
    name: "Ward 4 - Udyog Nagar",
    population: 51000,
    literacyRate: 78,
    waterQualityIndex: 68,
    schoolEnrollmentRate: 88,
    avgSchoolTravelDistance: 2.1,
    hospitalBedsPer1000: 1.4,
    avgHealthCentreTravelTime: 18,
    unemploymentRate: 7.2,
    roadQualityIndex: 5.9,
    powerDeficit: 8,
    coordinates: { x: 180, y: 280, radius: 55 }
  },
  {
    id: "ward-5",
    name: "Ward 5 - Janata Colony",
    population: 56800,
    literacyRate: 59, // Lowest Literacy = Education Gap
    waterQualityIndex: 52, // Water Gap
    schoolEnrollmentRate: 68, // Education Gap
    avgSchoolTravelDistance: 5.2, // Highest School Distance = Education Gap
    hospitalBedsPer1000: 0.8, // Health Gap
    avgHealthCentreTravelTime: 28,
    unemploymentRate: 14.5,
    roadQualityIndex: 3.5, // Road Gap
    powerDeficit: 18, // Power Gap
    coordinates: { x: 450, y: 300, radius: 65 }
  }
];

export const sampleImages = [
  {
    id: "img-road",
    name: "Broken Highway & Potholes",
    url: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?w=500&auto=format&fit=crop&q=60",
    category: "Roads",
    aiAnalysis: {
      tags: ["Deep Pothole", "Cracked Asphalt", "Water Logging", "Damaged Sub-base"],
      confidence: 96,
      severity: "High",
      boundingBoxes: [
        { label: "Pothole (Primary)", x: 20, y: 35, width: 45, height: 30 },
        { label: "Surface Fissure", x: 70, y: 20, width: 20, height: 40 }
      ]
    }
  },
  {
    id: "img-water",
    name: "Burst Water Main Leakage",
    url: "https://images.unsplash.com/photo-1542013936693-8848e574047a?w=500&auto=format&fit=crop&q=60",
    category: "Water",
    aiAnalysis: {
      tags: ["High Pressure Leak", "Wastage of Drinking Water", "Corroded Metal Pipe"],
      confidence: 98,
      severity: "Critical",
      boundingBoxes: [
        { label: "Ruptured Pipe Joint", x: 40, y: 40, width: 25, height: 25 },
        { label: "Water Flooding Zone", x: 10, y: 60, width: 80, height: 35 }
      ]
    }
  },
  {
    id: "img-school",
    name: "Damaged Primary School Ceiling",
    url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500&auto=format&fit=crop&q=60",
    category: "Education",
    aiAnalysis: {
      tags: ["Crumbling Plaster", "Exposed Rebar", "Water Seepage Mold", "Safety Hazard"],
      confidence: 93,
      severity: "Critical",
      boundingBoxes: [
        { label: "Exposed Steel Reinforcement", x: 30, y: 15, width: 40, height: 25 },
        { label: "Structural Plaster Fall", x: 15, y: 45, width: 50, height: 35 }
      ]
    }
  },
  {
    id: "img-garbage",
    name: "Overflowing Community Garbage Bin",
    url: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=500&auto=format&fit=crop&q=60",
    category: "Sanitation",
    aiAnalysis: {
      tags: ["Solid Waste Accumulation", "Stagnant Odor Hazard", "No Segregation", "Feral Animal Activity"],
      confidence: 95,
      severity: "Medium",
      boundingBoxes: [
        { label: "Overflowing Dumpster", x: 25, y: 20, width: 50, height: 60 },
        { label: "Scattered Plastics", x: 5, y: 75, width: 90, height: 20 }
      ]
    }
  },
  {
    id: "img-power",
    name: "Hanging Electrical Transformer Cables",
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&auto=format&fit=crop&q=60",
    category: "Electricity",
    aiAnalysis: {
      tags: ["Loose Transformer Loop", "Uninsulated High-Voltage Wire", "No Protective Mesh Fence"],
      confidence: 91,
      severity: "Critical",
      boundingBoxes: [
        { label: "Dangling High-Tension Wire", x: 45, y: 10, width: 35, height: 75 },
        { label: "Sparking Contact Point", x: 30, y: 25, width: 15, height: 15 }
      ]
    }
  }
];

export const initialSuggestions = [
  {
    id: "sugg-101",
    title: "Secondary School Upgrades & Staffing",
    userName: "Rajesh Kumar",
    wardId: "ward-5",
    category: "Education",
    urgency: "Critical",
    sentiment: "Negative",
    type: "Text",
    originalLanguage: "hi",
    description: "हमारे वार्ड में माध्यमिक विद्यालय बहुत दूर है। बच्चों को ५ किलोमीटर पैदल जाना पड़ता है। स्कूल में कोई पक्का शौचालय भी नहीं है, खासकर लड़कियों के लिए।",
    translatedText: "The secondary school in our ward is very far. Children have to walk 5 km. There is no proper toilet in the school, especially for girls.",
    timestamp: "2026-07-04T10:30:00Z",
    aiAnalysis: {
      tags: ["School Infrastructure Gap", "Girl Child Sanitation", "High Travel Distance"],
      confidence: 94
    }
  },
  {
    id: "sugg-102",
    title: "Contaminated Drinking Water Supply",
    userName: "Lakshmi Prasanna",
    wardId: "ward-3",
    category: "Water",
    urgency: "Critical",
    sentiment: "Negative",
    type: "Voice",
    originalLanguage: "te",
    transcription: "గత రెండు వారాలుగా మా వీధిలో తాగునీరు రంగు మారి వస్తోంది. పిల్లలకి జ్వరాలు వస్తున్నాయి. దయచేసి నీటి పైపులైన్లు పరిశీలించండి.",
    description: "గత రెండు వారాలుగా మా వీధిలో తాగునీరు రంగు మారి వస్తోంది. పిల్లలకి జ్వరాలు వస్తున్నాయి. దయచేసి నీటి పైపులైన్లు పరిశీలించండి.",
    translatedText: "For the last two weeks, the drinking water in our street has been discolored. Children are getting fevers. Please inspect the water pipelines.",
    timestamp: "2026-07-04T09:15:00Z",
    aiAnalysis: {
      tags: ["Contaminated Water Source", "Public Health Epidemic Risk", "Corroded Pipe Network"],
      confidence: 97
    }
  },
  {
    id: "sugg-103",
    title: "Broken Bridge on Main Access Road",
    userName: "Aniruddha Das",
    wardId: "ward-1",
    category: "Roads",
    urgency: "High",
    sentiment: "Negative",
    type: "Photo",
    originalLanguage: "bn",
    description: "বর্ষার জলে গঙ্গা নগর খালের ব্রিজের একপাশ ভেঙে পড়েছে। বড় গাড়ি যাতায়াত করতে পারছে না, রোগী নিয়ে হাসপাতাল যেতে সমস্যা হচ্ছে।",
    translatedText: "One side of the Ganga Nagar canal bridge collapsed due to monsoon rains. Large vehicles cannot pass, causing problems taking patients to the hospital.",
    timestamp: "2026-07-03T18:40:00Z",
    mediaUrl: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?w=500&auto=format&fit=crop&q=60",
    aiAnalysis: {
      tags: ["Collapsed Bridge Edge", "Emergency Transport Blocking", "Structural Damage"],
      confidence: 95
    }
  },
  {
    id: "sugg-104",
    title: "Frequent Power Outages in Primary Health Centre",
    userName: "Mohammed Ali",
    wardId: "ward-3",
    category: "Electricity",
    urgency: "Critical",
    sentiment: "Negative",
    type: "Text",
    originalLanguage: "en",
    description: "The primary health clinic in Ward 3 has daily power outages lasting 4-6 hours. Vaccines and life-saving medicines stored in refrigerators are getting spoiled.",
    translatedText: "The primary health clinic in Ward 3 has daily power outages lasting 4-6 hours. Vaccines and life-saving medicines stored in refrigerators are getting spoiled.",
    timestamp: "2026-07-03T14:10:00Z",
    aiAnalysis: {
      tags: ["Health Centre Power Deficit", "Cold Chain Spoilage", "Power Infrastructure Fail"],
      confidence: 96
    }
  },
  {
    id: "sugg-105",
    title: "Need for Mobile Medical Unit",
    userName: "Karthik Srinivasan",
    wardId: "ward-1",
    category: "Health",
    urgency: "High",
    sentiment: "Neutral",
    type: "Voice",
    originalLanguage: "ta",
    transcription: "எங்கள் பகுதியில் இருந்து மாவட்ட மருத்துவமனைக்குச் செல்ல 40 நிமிடங்கள் ஆகிறது. அவசர காலத்திற்கு ஒரு நடமாடும் மருத்துவ வண்டி தேவை.",
    description: "எங்கள் பகுதியில் இருந்து மாவட்ட மருத்துவமனைக்குச் செல்ல 40 நிமிடங்கள் ஆகிறது. அவசர காலத்திற்கு ஒரு நடமாடும் மருத்துவ வண்டி தேவை.",
    translatedText: "It takes 40 minutes to go to the district hospital from our area. We need a mobile medical van for emergencies.",
    timestamp: "2026-07-02T11:22:00Z",
    aiAnalysis: {
      tags: ["Critical Hospital Transit Time", "Mobile Medical Care Requirement"],
      confidence: 92
    }
  },
  {
    id: "sugg-106",
    title: "Absence of Street Lights & Safety Concerns",
    userName: "Prerna Deshmukh",
    wardId: "ward-5",
    category: "Electricity",
    urgency: "Medium",
    sentiment: "Negative",
    type: "Text",
    originalLanguage: "mr",
    description: "जनता कॉलनीच्या मुख्य रस्त्यावर पथदिवे नाहीत. संध्याकाळनंतर खूप अंधार असतो, त्यामुळे महिला आणि मुलींच्या सुरक्षेचा मोठा प्रश्न निर्माण झाला आहे.",
    translatedText: "There are no streetlights on the main road of Janata Colony. It is very dark after evening, raising a big safety issue for women and girls.",
    timestamp: "2026-07-02T08:05:00Z",
    aiAnalysis: {
      tags: ["Missing Street Lighting", "Women Safety Hazards"],
      confidence: 90
    }
  },
  {
    id: "sugg-107",
    title: "Sewage Overflow Near Community Well",
    userName: "Sanjay Patil",
    wardId: "ward-4",
    category: "Sanitation",
    urgency: "High",
    sentiment: "Negative",
    type: "Photo",
    originalLanguage: "mr",
    description: "ड्रेनेज लाईन चोक-अप झाल्यामुळे सांडपाणी रस्त्यावर वाहत आहे आणि जवळच्या विहिरीत मिसळत आहे. कॉलनीत आजार पसरण्याची भीती आहे.",
    translatedText: "Due to a choked drainage line, wastewater is flowing onto the road and mixing into the nearby well. There is fear of disease spreading in the colony.",
    timestamp: "2026-07-01T15:30:00Z",
    mediaUrl: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=500&auto=format&fit=crop&q=60",
    aiAnalysis: {
      tags: ["Sewer Network Overload", "Drinking Well Contamination", "Epidemic Vulnerability"],
      confidence: 93
    }
  },
  {
    id: "sugg-108",
    title: "Buses Don't Stop at Ward Junction",
    userName: "Ramanathan Chettiar",
    wardId: "ward-5",
    category: "Transport",
    urgency: "Medium",
    sentiment: "Negative",
    type: "Text",
    originalLanguage: "ta",
    description: "அரசு பேருந்துகள் எங்கள் வார்டு சந்திப்பில் நிற்பதில்லை. கல்லூரி மாணவர்கள் மற்றும் வேலைக்குச் செல்வோர் 3 கிமீ நடந்து செல்ல வேண்டியுள்ளது.",
    translatedText: "Government buses do not stop at our ward junction. College students and office-goers have to walk 3 km.",
    timestamp: "2026-06-30T10:00:00Z",
    aiAnalysis: {
      tags: ["Public Transit Skipping", "Student Commute Hardship"],
      confidence: 89
    }
  }
];

// Mock WhatsApp / Messaging App Submissions
export const whatsappMessages = [
  {
    id: "wa-001",
    platform: "WhatsApp",
    phone: "+91 98765 43210",
    userName: "Ramesh Babu",
    wardId: "ward-3",
    category: "Water",
    urgency: "Critical",
    originalLanguage: "te",
    message: "Mee MP gari daggara oka muda. Maa colony lo neeru 4 roju la vasthundi ledu. Pilla lu idi vaadu thunnaru. Please chudandi.",
    translatedText: "An appeal to the respected MP. Water has not come to our colony for 4 days. Children are suffering. Please look into this.",
    timestamp: "2026-07-04T07:15:00Z",
    aiTags: ["No Water Supply", "Multi-day Outage", "Child Welfare Impact"],
    confidence: 94,
    mediaUrl: null
  },
  {
    id: "wa-002",
    platform: "WhatsApp",
    phone: "+91 87654 32109",
    userName: "Meena Kumari",
    wardId: "ward-5",
    category: "Education",
    urgency: "High",
    originalLanguage: "hi",
    message: "Namaskar ji. Hamare bachon ke school mein 3 teachers ki jagah sirf 1 teacher hai. Padhaayi nahi ho rahi. Kuch karein please.",
    translatedText: "Greetings. In our children's school, there is only 1 teacher instead of 3. Studies are not happening. Please do something.",
    timestamp: "2026-07-04T08:30:00Z",
    aiTags: ["Teacher Shortage", "School Staffing Gap", "Learning Disruption"],
    confidence: 91,
    mediaUrl: null
  },
  {
    id: "wa-003",
    platform: "Telegram",
    phone: "@ward3_residents",
    userName: "Residents' Group - Ward 3",
    wardId: "ward-3",
    category: "Health",
    urgency: "Critical",
    originalLanguage: "en",
    message: "URGENT: The PHC doctor hasn't shown up for 8 consecutive days. Patients are being redirected 45 mins away. 3 pregnant women affected this week.",
    translatedText: "URGENT: The PHC doctor hasn't shown up for 8 consecutive days. Patients are being redirected 45 mins away. 3 pregnant women affected this week.",
    timestamp: "2026-07-03T22:00:00Z",
    aiTags: ["Doctor Absenteeism", "Maternal Health Risk", "Healthcare Access Crisis"],
    confidence: 98,
    mediaUrl: null
  },
  {
    id: "wa-004",
    platform: "WhatsApp",
    phone: "+91 76543 21098",
    userName: "Abdul Razzak",
    wardId: "ward-1",
    category: "Roads",
    urgency: "High",
    originalLanguage: "mr",
    message: "Saheb, ganga nagar che pul khup dhokadayak ahe. Kaal ek riksha tithun padli. Krupaya lavakar daruri dnyaptipatra pathva.",
    translatedText: "Sir, the Ganga Nagar bridge is very dangerous. Yesterday a rickshaw fell there. Please urgently send a notice for repair.",
    timestamp: "2026-07-03T17:45:00Z",
    aiTags: ["Bridge Safety Hazard", "Vehicle Accident Risk", "Infrastructure Emergency"],
    confidence: 96,
    mediaUrl: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: "wa-005",
    platform: "SMS",
    phone: "+91 65432 10987",
    userName: "Suresh Naidu",
    wardId: "ward-4",
    category: "Electricity",
    urgency: "Medium",
    originalLanguage: "en",
    message: "We have 8hr load shedding daily in Udyog Nagar. Small businesses and home industries are collapsing. Please escalate to DISCOM.",
    translatedText: "We have 8hr load shedding daily in Udyog Nagar. Small businesses and home industries are collapsing. Please escalate to DISCOM.",
    timestamp: "2026-07-02T14:20:00Z",
    aiTags: ["Prolonged Load Shedding", "Small Business Impact", "DISCOM Complaint"],
    confidence: 90,
    mediaUrl: null
  },
  {
    id: "wa-006",
    platform: "Telegram",
    phone: "@shantinagar_community",
    userName: "Shanti Nagar Community",
    wardId: "ward-3",
    category: "Sanitation",
    urgency: "Critical",
    originalLanguage: "en",
    message: "Garbage not collected for 12 days. Open dump near school gate is breeding mosquitoes. Dengue cases reported in last 2 weeks - 6 children hospitalised.",
    translatedText: "Garbage not collected for 12 days. Open dump near school gate is breeding mosquitoes. Dengue cases reported in last 2 weeks - 6 children hospitalised.",
    timestamp: "2026-07-04T06:00:00Z",
    aiTags: ["Waste Collection Failure", "Dengue Outbreak Risk", "Child Health Emergency"],
    confidence: 97,
    mediaUrl: null
  }
];

export const projectTemplates = {
  "Water": {
    title: "Centralized RO Water Plant & Pipeline Restoration",
    baseBudget: 1800000,
    timeframe: "4 Months",
    rationale: "Addresses urgent safe drinking water demands, directly aiming to decrease water-deficit-related distribution failure and improving the Water Quality Index (WQI).",
    description: "Install a solar-powered RO water purification plant with a capacity of 10,000 LPH and replace 2.5 km of leaking and rusted secondary pipes."
  },
  "Education": {
    title: "Primary & Secondary School Infrastructure Upgrade Drive",
    baseBudget: 2500000,
    timeframe: "6 Months",
    rationale: "Designed to tackle severe travel distance issues and improve female student sanitation facilities, boosting local enrollment rates and safety.",
    description: "Construct 4 new modern smart classrooms, separate boys and girls toilet blocks, and provision a dedicated 14-seater student shuttle van."
  },
  "Roads": {
    title: "Main Access Road Reconstruction & Stormwater Drainage System",
    baseBudget: 3200000,
    timeframe: "5 Months",
    rationale: "Resolves high-urgency reports of waterlogged routes and collapsed bridges, enhancing economic transit and health emergency logistics.",
    description: "Lay heavy-duty bituminous road along a 3 km stretch, construct concrete storm drains on both sides, and rebuild the canal bridge deck."
  },
  "Health": {
    title: "Community Health Centre Extension & Mobile Medical Service",
    baseBudget: 2200000,
    timeframe: "3 Months",
    rationale: "Reduces health clinic travel transit times significantly and supplements the critical hospital bed gap for vulnerable demographic sections.",
    description: "Add an emergency stabilization wing with 5 beds to the local PHC and launch a weekly mobile clinic van equipped with point-of-care diagnostics."
  },
  "Electricity": {
    title: "Solar Grid Backup Integration & Smart Streetlighting Network",
    baseBudget: 1500000,
    timeframe: "3 Months",
    rationale: "Reduces dark-zone safety issues and covers the severe power deficit during peak hours at local clinics and public intersections.",
    description: "Install 250 smart auto-dimming LED streetlights and deploy a 50kW solar panel array with lithium battery backup at the primary health centre."
  },
  "Sanitation": {
    title: "Modern Sewage Treatment Plant & Solid Waste Segregation Yards",
    baseBudget: 2100000,
    timeframe: "4 Months",
    rationale: "Combats toxic drainage overflows near drinking water supplies, improving sanitation, hygiene and preventing enteric disease outbreaks.",
    description: "Clean and line 1.8 km of open sewers, build a localized 100 KLD biodigester tank, and install 4 community waste segregation collection stalls."
  },
  "Transport": {
    title: "Public Transit Hub & Smart Mini-Terminal Construction",
    baseBudget: 1200000,
    timeframe: "3 Months",
    rationale: "Restores official public transport routing and provides safety shelters for children, seniors, and daily wage workers.",
    description: "Build an active bus shelter with real-time route display monitors, lighting, and seating, and coordinate scheduled local bus stops."
  },
  "VocationalCentre": {
    title: "Skill Development Vocational Training Centre",
    baseBudget: 1900000,
    timeframe: "5 Months",
    rationale: "Addresses youth unemployment gaps in low-literacy wards. Compared against school upgrade demand, a vocational centre targets the 18-35 age group with zero schooling alternatives. Prioritized when unemployment > 10% and literacy < 70%.",
    description: "Establish a 200-seat modern vocational institute offering certified courses in IT, tailoring, construction trades, electrical fitting, and plumbing — with placement support and industry tie-ups."
  }
};

export const defaultPrioritiesList = [
  {
    id: "proj-1",
    title: "Water Quality Restoration Scheme",
    category: "Water",
    wardId: "ward-3",
    demandCount: 34,
    gapScore: 82, // High gap
    estimatedBudget: 1800000,
    beneficiaries: 12000,
    rationale: "Directly solves Ward 3's critical WQI score of 45 (which is 35% below state average) and resolves complaints regarding waterborne infections.",
    briefTemplate: `Dear Department of Public Health Engineering,

Subject: Sanction for Water Quality Restoration Scheme - Ward 3 (Shanti Nagar)

Under the MP Constituency Development Scheme (MPLADS), I hereby grant in-principle administrative approval for the construction of a Centralized RO Water Purification Plant and restoration of corresponding pipelines.

Key Metrics Backed by AI Analytics:
- Primary Ward: Ward 3 - Shanti Nagar (Population: 62,000)
- Citizen Demands Aggregated: High volume of complaints regarding discolored drinking water.
- Infrastructure Metric: Water Quality Index is at 45 (Critical).
- Total Estimated Cost: INR 18,00,000
- Targeted Beneficiaries: 12,000 residents

Please prepare the detailed project report (DPR) and tender documents within 15 days.

Sincerely,
Member of Parliament`
  },
  {
    id: "proj-2",
    title: "Secondary School Construction & Transit Service",
    category: "Education",
    wardId: "ward-5",
    demandCount: 45,
    gapScore: 78,
    estimatedBudget: 2500000,
    beneficiaries: 8500,
    rationale: "Ward 5 has the lowest literacy rate (59%) and highest travel distance (5.2km) to secondary educational institutions.",
    briefTemplate: `Dear Department of School Education,

Subject: Sanction for Secondary School Upgrades and Transit Service - Ward 5 (Janata Colony)

Under the MPLAD Scheme, I hereby authorize the upgrades to local primary/secondary school facilities and the procurement of a student shuttle.

Key Metrics Backed by AI Analytics:
- Primary Ward: Ward 5 - Janata Colony (Population: 56,800)
- Citizen Demands Aggregated: Requests citing lack of nearby schools and safety concerns for girl students walking long distances.
- Infrastructure Metric: Average School Travel Distance is 5.2 km (highest in constituency).
- Total Estimated Cost: INR 25,00,000
- Targeted Beneficiaries: 8,500 children

Please initiate the procurement and civil work estimates immediately.

Sincerely,
Member of Parliament`
  },
  {
    id: "proj-3",
    title: "Primary Health Centre Solar Grid & Infrastructure Update",
    category: "Electricity",
    wardId: "ward-3",
    demandCount: 28,
    gapScore: 75,
    estimatedBudget: 1500000,
    beneficiaries: 15000,
    rationale: "Ward 3 suffers from a 22% peak power deficit, disrupting vaccine storage at health centers. Solved via hybrid solar-battery setups.",
    briefTemplate: `Dear Department of Power / Renewable Energy Agency,

Subject: Installation of Solar Grid Backup at Primary Health Centre - Ward 3

Under the MPLADS guidelines, I approve the allocation of funds for integrating a hybrid solar-battery backup grid at the Ward 3 Primary Health Centre.

Key Metrics Backed by AI Analytics:
- Primary Ward: Ward 3 - Shanti Nagar (Population: 62,000)
- Citizen Demands Aggregated: Frequent complaints on vaccine wastage due to 4-6 hr daily power outages.
- Infrastructure Metric: Power Deficit of 22%.
- Total Estimated Cost: INR 15,00,000
- Targeted Beneficiaries: 15,000 health centre visitors annually

Kindly draft technical feasibility layouts.

Sincerely,
Member of Parliament`
  },
  {
    id: "proj-4",
    title: "Access Road & Canal Bridge Reconstruction",
    category: "Roads",
    wardId: "ward-1",
    demandCount: 31,
    gapScore: 68,
    estimatedBudget: 3200000,
    beneficiaries: 9500,
    rationale: "Reconstructs the main link road and bridge in Ganga Nagar (road index 4.2), addressing complaints about monsoon washouts.",
    briefTemplate: `Dear Department of Public Works (PWD),

Subject: Re-laying of Access Road and Canal Bridge Reconstruction - Ward 1

Under the MPLADS guidelines, I sanction the reconstruction of the collapsed Ganga Nagar canal bridge and re-laying of the main access road.

Key Metrics Backed by AI Analytics:
- Primary Ward: Ward 1 - Ganga Nagar (Population: 48,500)
- Citizen Demands Aggregated: Photos and letters showing severe potholes and bridge edge collapse hindering patient transits.
- Infrastructure Metric: Road Quality Index is at 4.2 out of 10.
- Total Estimated Cost: INR 32,00,000
- Targeted Beneficiaries: 9,500 residents

Please call for civil engineering tenders at the earliest.

Sincerely,
Member of Parliament`
  }
];
