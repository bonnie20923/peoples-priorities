import React, { useState, useEffect, useRef } from "react";
import { 
  User, 
  MapPin, 
  BookOpen, 
  Droplet, 
  Activity, 
  Key, 
  Truck, 
  Trash2, 
  Mic, 
  FileText, 
  Camera, 
  Check, 
  Globe, 
  Sparkles,
  RefreshCw,
  Phone,
  ArrowLeft,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { initialWards, sampleImages } from "../data/mockData";

// Translation dictionary
const translations = {
  en: {
    title: "People's Priorities Portal",
    subtitle: "Submit community development requests directly to your MP. Powered by AI translation, speech-to-text, and visual diagnostics.",
    nameLabel: "Your Name",
    namePlaceholder: "Enter your full name",
    phoneLabel: "Phone Number (Optional)",
    phonePlaceholder: "Enter 10-digit mobile number",
    wardLabel: "Select Your Zone / Area",
    wardDefault: "Choose a Zone",
    descLabel: "Describe the Issue / Suggestion",
    descPlaceholder: "Please describe the problem in detail. You can write in your native language...",
    translateBtn: "AI Translate to English",
    translateSuccess: "Translated to English!",
    voiceRecord: "Click to Record Voice",
    voiceRecording: "Recording Audio...",
    voiceStop: "Stop & Transcribe",
    voiceTranscription: "AI Transcription (Original Language)",
    voiceTranslation: "AI Translation (English)",
    photoSelectLabel: "Select a photo representing the issue to run AI Vision:",
    photoScanning: "AI Vision Scanner running...",
    photoScannerTags: "AI Vision Detected Tags",
    photoSeverity: "Severity Index",
    mapPinLabel: "Tag Geographic Location (GPS Option)",
    mapPinDesc: "Click on the grid map to tag GPS coordinates of the issue",
    submitBtn: "Submit Priority to MP Office",
    successMsg: "Thank you, your issue has been logged.",
    gpsCoords: "GPS Location Tagged"
  },
  hi: {
    title: "पीपल्स प्रायोरिटी पोर्टल",
    subtitle: "सामुदायिक विकास आवश्यकताओं को सीधे अपने सांसद को भेजें। एआई अनुवाद, स्पीच-टू-टेक्स्ट और इमेज डायग्नोस्टिक्स द्वारा संचालित।",
    nameLabel: "आपका नाम",
    namePlaceholder: "अपना पूरा नाम दर्ज करें",
    phoneLabel: "फ़ोन नंबर (वैकल्पिक)",
    phonePlaceholder: "10-अंकों का मोबाइल नंबर दर्ज करें",
    wardLabel: "अपने क्षेत्र / ज़ोन का चयन करें",
    wardDefault: "ज़ोन चुनें",
    descLabel: "समस्या / सुझाव का वर्णन करें",
    descPlaceholder: "कृपया समस्या का विस्तार से वर्णन करें। आप अपनी स्थानीय भाषा में लिख सकते हैं...",
    translateBtn: "अंग्रेजी में एआई अनुवाद करें",
    translateSuccess: "अंग्रेजी में अनुवादित!",
    voiceRecord: "आवाज रिकॉर्ड करने के लिए क्लिक करें",
    voiceRecording: "ऑडियो रिकॉर्ड हो रहा है...",
    voiceStop: "रोकें और ट्रांसक्राइब करें",
    voiceTranscription: "एआई ट्रांसक्रिप्शन (मूल भाषा)",
    voiceTranslation: "एआई अनुवाद (अंग्रेजी)",
    photoSelectLabel: "एआई विजन चलाने के लिए समस्या का प्रतिनिधित्व करने वाली फोटो चुनें:",
    photoScanning: "एआई विजन स्कैनर चल रहा है...",
    photoScannerTags: "एआई विजन द्वारा पहचाने गए टैग",
    photoSeverity: "तीव्रता सूचकांक",
    mapPinLabel: "भौगोलिक स्थिति टैग करें (जीपीएस विकल्प)",
    mapPinDesc: "समस्या के जीपीएस निर्देशांक को टैग करने के लिए ग्रिड मैप पर क्लिक करें",
    submitBtn: "सांसद कार्यालय को प्राथमिकता भेजें",
    successMsg: "धन्यवाद, आपकी समस्या दर्ज कर ली गई है।",
    gpsCoords: "जीपीएस स्थान टैग किया गया"
  },
  te: {
    title: "ప్రజల ప్రాధాన్యత పోర్టల్",
    subtitle: "మీ కమ్యూనిటీ అభివృద్ధి అభ్యర్థనలను నేరుగా మీ ఎంపీకి సమర్పించండి. AI అనువాదం, స్పీచ్-టు-టెక్స్ట్ మరియు ఇమేజ్ విశ్లేషణల శక్తితో.",
    nameLabel: "మీ పేరు",
    namePlaceholder: "మీ పూర్తి పేరు నమోదు చేయండి",
    phoneLabel: "ఫోన్ నంబర్ (ఐచ్ఛికం)",
    phonePlaceholder: "10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి",
    wardLabel: "మీ జోన్ / ప్రాంతాన్ని ఎంచుకోండి",
    wardDefault: "జోన్ ఎంచుకోండి",
    descLabel: "సమస్య / సూచనను వివరించండి",
    descPlaceholder: "దయచేసి సమస్యను వివరంగా వివరించండి. మీరు మీ స్థానిక భాషలో రాయవచ్చు...",
    translateBtn: "ఇంగ్లీషులోకి AI అనువాదం",
    translateSuccess: "ఇంగ్లీషులోకి అనువదించబడింది!",
    voiceRecord: "రికార్డ్ చేయడానికి క్లిక్ చేయండి",
    voiceRecording: "ఆడియో రికార్డ్ అవుతోంది...",
    voiceStop: "ఆపి ట్రాన్స్‌క్రైబ్ చేయండి",
    voiceTranscription: "AI ట్రాన్స్‌క్రిప్షన్ (మాతృభాష)",
    voiceTranslation: "AI అనువాదం (ఇంగ్లీష్)",
    photoSelectLabel: "AI విజన్ రన్ చేయడానికి సమస్యను సూచించే ఫోటోను ఎంచుకోండి:",
    photoScanning: "AI విజన్ స్కానర్ రన్ అవుతోంది...",
    photoScannerTags: "AI విజన్ గుర్తించిన ట్యాగ్‌లు",
    photoSeverity: "తీవ్రత స్థాయి",
    mapPinLabel: "భౌగోళిక స్థానాన్ని ట్యాగ్ చేయండి (GPS ఐచ్ఛికం)",
    mapPinDesc: "సమస్య యొక్క GPS కోఆర్డినేట్లను ట్యాగ్ చేయడానికి గ్రిడ్ మ్యాప్‌పై క్లిక్ చేయండి",
    submitBtn: "ఎంపీ కార్యాలయానికి సమర్పించండి",
    successMsg: "ధన్యవాదాలు, మీ సమస్య నమోదు చేయబడింది.",
    gpsCoords: "GPS స్థానం ట్యాగ్ చేయబడింది"
  },
  ta: {
    title: "மக்களின் முன்னுரிமை போர்டல்",
    subtitle: "உங்கள் சமூக மேம்பாட்டு கோரிக்கைகளை நேரடியாக உங்கள் எம்பிக்கு சமர்ப்பிக்கவும். AI மொழிபெயர்ப்பு, ஸ்பீச்-டு-டெக்ஸ்ட் மற்றும் பட பகுப்பாய்வு மூலம் இயக்கப்படுகிறது.",
    nameLabel: "உங்கள் பெயர்",
    namePlaceholder: "முழு பெயரை உள்ளிடவும்",
    phoneLabel: "தொலைபேசி எண் (விருப்பத்தேர்வு)",
    phonePlaceholder: "10-இலக்க மொபைல் எண்ணை உள்ளிடவும்",
    wardLabel: "உங்கள் மண்டலம் அல்லது பகுதியைத் தேர்ந்தெடுக்கவும்",
    wardDefault: "மண்டலத்தைத் தேர்ந்தெடு",
    descLabel: "சிக்கல் அல்லது ஆலோசனையை விவரிக்கவும்",
    descPlaceholder: "சிக்கலை விரிவாக விவரிக்கவும். உங்கள் சொந்த மொழியில் எழுதலாம்...",
    translateBtn: "ஆங்கிலத்திற்கு AI மொழிபெயர்ப்பு",
    translateSuccess: "ஆங்கிலத்திற்கு மொழிபெயர்க்கப்பட்டது!",
    voiceRecord: "பதிவு செய்ய கிளிக் செய்யவும்",
    voiceRecording: "ஒலிப்பதிவு செய்யப்படுகிறது...",
    voiceStop: "நிறுத்தி உரையாக மாற்றுக",
    voiceTranscription: "AI டிரான்ஸ்கிரிப்ஷன் (மூல மொழி)",
    voiceTranslation: "AI மொழிபெயர்ப்பு (ஆங்கிலம்)",
    photoSelectLabel: "AI பார்வையை இயக்க சிக்கலைக் குறிக்கும் புகைப்படத்தைத் தேர்ந்தெடுக்கவும்:",
    photoScanning: "AI பார்வை ஸ்கேனர் இயங்குகிறது...",
    photoScannerTags: "AI பார்வை கண்டறிந்த குறியீடுகள்",
    photoSeverity: "தீவிர குறியீடு",
    mapPinLabel: "புவியியல் இருப்பிடத்தைக் குறிக்கவும் (GPS விருப்பம்)",
    mapPinDesc: "பிரச்சனையின் ஜிபிஎஸ் புள்ளியை அமைக்க வரைபடக் கட்டத்தில் கிளிக் செய்யவும்",
    submitBtn: "முன்னுரிமையை எம்பி அலுவலகத்திற்கு அனுப்பவும்",
    successMsg: "நன்றி, உங்கள் பிரச்சினை பதிவு செய்யப்பட்டுள்ளது.",
    gpsCoords: "GPS இருப்பிடம் குறிக்கப்பட்டது"
  },
  mr: {
    title: "लोकांचे प्राधान्य पोर्टल",
    subtitle: "तुमच्या समुदाय विकासाच्या मागण्या थेट तुमच्या खासदाराकडे पाठवा. एआय भाषांतर, स्पीच-टू-टेक्स्ट आणि इमेज डायग्नोस्टिक्स द्वारे संचलित.",
    nameLabel: "तुमचे नाव",
    namePlaceholder: "पूर्ण नाव प्रविष्ट करा",
    phoneLabel: "फोन नंबर (पर्यायी)",
    phonePlaceholder: "१०-अंकी मोबाईल नंबर टाका",
    wardLabel: "तुमचा क्षेत्र / विभाग निवडा",
    wardDefault: "विभाग निवडा",
    descLabel: "समस्या किंवा सुचवाचे वर्णन करा",
    descPlaceholder: "कृपया समस्येचे सविस्तर वर्णन करा. तुम्ही तुमच्या मातृभाषेत लिहू शकता...",
    translateBtn: "इंग्रजीत एआय भाषांतर करा",
    translateSuccess: "इंग्रजीत भाषांतरित झाले!",
    voiceRecord: "रेकॉर्ड करण्यासाठी क्लिक करा",
    voiceRecording: "ऑडिओ रेकॉर्ड होत आहे...",
    voiceStop: "थांबवा आणि ट्रान्सक्राइब करा",
    voiceTranscription: "एआय ट्रान्सक्रिप्शन (मूळ भाषा)",
    voiceTranslation: "एआय भाषांतर (इंग्रजी)",
    photoSelectLabel: "एआय व्हिजन चालवण्यासाठी समस्येचा फोटो निवडा:",
    photoScanning: "एआय व्हिजन स्कॅनर सुरू आहे...",
    photoScannerTags: "एआय व्हिजन आढळलेले टॅग्ज",
    photoSeverity: "तीव्रता निर्देशांक",
    mapPinLabel: "भौगोलिक स्थान टॅग करा (जीपीएस पर्याय)",
    mapPinDesc: "समस्येचे जीपीएस स्थान निश्चित करण्यासाठी नकाशावर क्लिक करा",
    submitBtn: "खासदार कार्यालयात प्राधान्य सबमिट करा",
    successMsg: "धन्यवाद, तुमची तक्रार नोंदवली गेली आहे.",
    gpsCoords: "जीपीएस स्थान टॅग केले"
  },
  bn: {
    title: "জনগণের অগ্রাধিকার পোর্টাল",
    subtitle: "সরাসরি আপনার সাংসদের কাছে আপনার এলাকার উন্নয়নমূলক আবেদন জমা দিন। এআই অনুবাদ, স্পিচ-টু-টেক্সট এবং ইমেজ ডায়াগনস্টিকস দ্বারা পরিচালিত।",
    nameLabel: "আপনার নাম",
    namePlaceholder: "আপনার পুরো নাম লিখুন",
    phoneLabel: "ফোন নম্বর (ঐচ্ছিক)",
    phonePlaceholder: "১০-ডিজিটের মোবাইল নম্বর দিন",
    wardLabel: "আপনার জোন / এলাকা নির্বাচন করুন",
    wardDefault: "জোন চয়ন করুন",
    descLabel: "समस्या या सलाह का वर्णन करें",
    descPlaceholder: "দয়া করে সমস্যাটি বিস্তারিতভাবে বর্ণনা করুন। আপনি আপনার নিজের ভাষায় লিখতে পারেন...",
    translateBtn: "ইংরেজিতে এআই অনুবাদ করুন",
    translateSuccess: "ইংরেজিতে অনূदित!",
    voiceRecord: "ভয়েস রেকর্ড করতে क्लिक करें",
    voiceRecording: "রেকর্ডিং হচ্ছে...",
    voiceStop: "থামুন এবং লিখুন",
    voiceTranscription: "এআই ট্রান্সক্রিপশন (মূল ভাষা)",
    voiceTranslation: "এআই অনুবাদ (ইংরেজি)",
    photoSelectLabel: "এআই ভিশন চালু করার জন্য সমস্যাটি চিহ্নিত করে এমন ছবি বাছুন:",
    photoScanning: "এআই ভিশন স্ক্যানার চলছে...",
    photoScannerTags: "এআই ভিশন সনাক্তকৃত ট্যাগ",
    photoSeverity: "গুরুত্ব সূচক",
    mapPinLabel: "ভৌগোলিক অবস্থান চিহ্নিত করুন (জিপিএস বিকল্প)",
    mapPinDesc: "সমস্যার জিপিএস স্থানাঙ্ক চিহ্নিত করতে মানচিত্রে ক্লিক করুন",
    submitBtn: "সাংসদ কার্যালয়ে আবেদন পাঠান",
    successMsg: "ধন্যবাদ, আপনার সমস্যাটি সফলভাবে নথিভুক্ত করা হয়েছে।",
    gpsCoords: "জিপিএস অবস্থান চিহ্নিত"
  }
};

const categories = [
  { id: "Water", label: "Water Supply", icon: Droplet, color: "#00f2fe" },
  { id: "Education", label: "Education", icon: BookOpen, color: "#c084fc" },
  { id: "Health", label: "Healthcare", icon: Activity, color: "#f87171" },
  { id: "Roads", label: "Roads & Bridges", icon: MapPin, color: "#fbbf24" },
  { id: "Transport", label: "Public Transit", icon: Truck, color: "#38bdf8" },
  { id: "Electricity", label: "Electricity", icon: Key, color: "#4ade80" },
  { id: "Sanitation", label: "Sanitation", icon: Trash2, color: "#fb7185" }
];

export default function CitizenPortal({ selectedLang, onLangChange, onSubmitSuggestion, onBackToHome }) {
  const t = translations[selectedLang] || translations.en;

  // sequential sub-pages: 'choose_method' (Page 2), 'form' (Page 3), 'confirm' (Page 4)
  const [citizenPage, setCitizenPage] = useState("choose_method");

  // Form states
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [wardId, setWardId] = useState("");
  const [method, setMethod] = useState("Text"); // 'Text', 'Photo', 'Voice'
  const [desc, setDesc] = useState("");
  
  // Custom states
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [transcriptionResult, setTranscriptionResult] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isScanningPhoto, setIsScanningPhoto] = useState(false);
  const [scanCompleted, setScanCompleted] = useState(false);
  const [pinCoords, setPinCoords] = useState(null);

  // Submission metadata state (for Confirmation screen Page 4)
  const [submissionMetadata, setSubmissionMetadata] = useState(null);

  const [customFileName, setCustomFileName] = useState("");
  const [addressQuery, setAddressQuery] = useState("");
  const [addressAlert, setAddressAlert] = useState("");

  const voiceTimerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  // Clear inputs when switching input methods
  useEffect(() => {
    setDesc("");
    setTranslatedText("");
    setTranscriptionResult(null);
    setSelectedPhoto(null);
    setScanCompleted(false);
    setPinCoords(null);
    setCustomFileName("");
    setAddressQuery("");
    setAddressAlert("");
  }, [method]);

  // Voice recording simulation
  useEffect(() => {
    if (isRecording) {
      voiceTimerRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(voiceTimerRef.current);
      setRecordingSeconds(0);
    }
    return () => clearInterval(voiceTimerRef.current);
  }, [isRecording]);

  // Real-time Leaflet OpenStreetMap Initialization
  useEffect(() => {
    if (citizenPage !== "form") return;

    const initMap = () => {
      const container = document.getElementById("citizen-leaflet-map");
      if (!container) return;

      // Avoid double initialization
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
        return;
      }

      const defaultLat = 19.0760;
      const defaultLng = 72.8777;

      // Initialize map object
      const map = window.L.map("citizen-leaflet-map").setView([defaultLat, defaultLng], 12);
      mapInstanceRef.current = map;

      // UseCartoDB Dark Matter tile layer matching dark aesthetics
      window.L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20
      }).addTo(map);

      // Create draggable pin/marker
      const marker = window.L.marker([defaultLat, defaultLng], { draggable: true }).addTo(map);
      markerRef.current = marker;

      // Save initial coords
      setPinCoords({ lat: defaultLat.toFixed(5), lng: defaultLng.toFixed(5) });

      // Drag event updates coordinates state
      marker.on("dragend", () => {
        const position = marker.getLatLng();
        setPinCoords({ lat: position.lat.toFixed(5), lng: position.lng.toFixed(5) });
      });

      // Map click event updates pin and coordinates state
      map.on("click", (e) => {
        const position = e.latlng;
        marker.setLatLng(position);
        setPinCoords({ lat: position.lat.toFixed(5), lng: position.lng.toFixed(5) });
      });
    };

    if (window.L) {
      const t = setTimeout(initMap, 100);
      return () => clearTimeout(t);
    } else {
      // Inject Leaflet CSS
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);

      // Inject Leaflet JS
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = () => {
        initMap();
      };
      document.body.appendChild(script);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, [citizenPage, method]);

  const handleStartRecord = () => {
    setIsRecording(true);
    setTranscriptionResult(null);
  };

  const handleStopRecord = () => {
    setIsRecording(false);
    
    // Simulate AI speech recognition processing
    setTimeout(() => {
      let originalText = "";
      let translated = "";

      // Generate realistic mock transcription based on language
      if (selectedLang === "hi") {
        originalText = "हमारे मोहल्ले में पीने का पानी पिछले तीन दिनों से बहुत मटमैला आ रहा है, जिससे लोग बीमार हो रहे हैं।";
        translated = "Drinking water in our locality has been very muddy for the last three days, making people sick.";
      } else if (selectedLang === "te") {
        originalText = "మా వీధిలో మంచి నీటి పైపు పగిలిపోయి వృధాగా పోతోంది, మురికి కూడా కలుస్తోంది.";
        translated = "The drinking water pipe in our street is broken, causing wastage and contamination.";
      } else if (selectedLang === "ta") {
        originalText = "எங்கள் பகுதியில் இருந்து மாவட்ட மருத்துவமனைக்குச் செல்ல 40 நிமிடங்கள் ஆகிறது. அவசர காலத்திற்கு ஒரு நடமாடும் மருத்துவ வண்டி தேவை.";
        translated = "It takes 40 minutes to go to the district hospital from our area. We need a mobile medical van for emergencies.";
      } else if (selectedLang === "mr") {
        originalText = "आमच्या वस्तीतील रस्ते खूपच खराब झाले आहेत. खड्ड्यांमुळे दुचाकीस्वारांना अपघात होत आहेत. तातडीने दुरुस्ती आवश्यक आहे.";
        translated = "The roads in our settlement are in very bad condition. Potholes are causing accidents for two-wheelers. Urgent repair is necessary.";
      } else if (selectedLang === "bn") {
        originalText = "আমাদের এলাকায় বিদ্যুৎ প্রায়ই চলে যায়। গত সপ্তাহে পাঁচ দিন লোডশেডিং হয়েছে। শিক্ষার্থীরা পড়াশোনা করতে পারছে না।";
        translated = "Electricity goes out frequently in our area. There was load shedding for five days last week. Students are unable to study.";
      } else {
        originalText = "The tap water in Ward 5 is highly contaminated and has a foul smell. The pipeline filter has not been maintained for over 6 months. Urgent intervention needed.";
        translated = "The tap water in Ward 5 is highly contaminated and has a foul smell. The pipeline filter has not been maintained for over 6 months. Urgent intervention needed.";
      }

      setTranscriptionResult({
        original: originalText,
        translated: translated
      });
      setDesc(originalText);
      setTranslatedText(translated);
    }, 1500);
  };

  // Mock Translate Text Action
  const handleTranslate = () => {
    if (!desc) return;
    setIsTranslating(true);

    setTimeout(() => {
      setIsTranslating(false);
      
      let simulatedTranslation = "";
      if (selectedLang === "hi") {
        simulatedTranslation = "[AI Translated] " + desc
          .replace("हमारे वार्ड में", "In our ward")
          .replace("माध्यमिक विद्यालय", "secondary school")
          .replace("बहुत दूर है", "is very far")
          .replace("पानी", "water")
          .replace("गंदा", "dirty")
          .replace("शौचालय", "toilet")
          .replace("सड़क", "road")
          .replace("टूटी", "broken");
      } else {
        simulatedTranslation = `[AI Translated] ${desc} (Processed from local ${selectedLang.toUpperCase()} script)`;
      }
      setTranslatedText(simulatedTranslation);
    }, 1000);
  };

  // Mock Photo selector scanning
  const handleSelectPhoto = (photo) => {
    setSelectedPhoto(photo);
    setIsScanningPhoto(true);
    setScanCompleted(false);

    setTimeout(() => {
      setIsScanningPhoto(false);
      setScanCompleted(true);
      setDesc(`AI Vision scanned image: ${photo.name}. Checked features.`);
      setTranslatedText(`AI Vision verified a high-risk ${photo.category} anomaly: ${photo.aiAnalysis.tags.join(", ")}.`);
    }, 1500);
  };

  const handleCustomPhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setCustomFileName(file.name);
    setIsScanningPhoto(true);
    setScanCompleted(false);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target.result;
      const mockCustomPhoto = {
        id: "custom-upload-" + Date.now(),
        name: file.name,
        url: url,
        category: "Roads", 
        aiAnalysis: {
          tags: ["User Captured Photo", "Structural Defect Identified", "Anomalous Texture"],
          confidence: 93,
          severity: "High",
          boundingBoxes: [
            { label: "Detected Anomaly Edge", x: 20, y: 20, width: 60, height: 60 }
          ]
        }
      };
      
      setTimeout(() => {
        setSelectedPhoto(mockCustomPhoto);
        setIsScanningPhoto(false);
        setScanCompleted(true);
        setDesc(`AI vision processed camera photo file: ${file.name}.`);
        setTranslatedText(`AI Vision verified a high-risk structural anomaly in custom file. Recommended priority intervention.`);
      }, 1500);
    };
    reader.readAsDataURL(file);
  };

  const handleAddressSearch = (e) => {
    e.preventDefault();
    if (!addressQuery.trim()) return;
    
    setAddressAlert("Resolving location coordinates...");
    
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addressQuery)}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const first = data[0];
          const lat = parseFloat(first.lat);
          const lng = parseFloat(first.lon);
          const displayName = first.display_name;
          
          setPinCoords({ lat: lat.toFixed(5), lng: lng.toFixed(5) });
          setAddressAlert(`✓ Resolved: "${displayName.split(",").slice(0, 3).join(",")}"`);
          
          if (mapInstanceRef.current) {
            mapInstanceRef.current.setView([lat, lng], 14);
            if (markerRef.current) {
              markerRef.current.setLatLng([lat, lng]);
            }
          }
          
          if (!desc) {
            setDesc(`Address reported: ${displayName}. Issue observed near this location.`);
          }
        } else {
          setAddressAlert("⚠️ Location not found. Placing default coordinate.");
          
          // default coordinates fallbacks
          const fallbackLat = 19.076 + (Math.random() - 0.5) * 0.05;
          const fallbackLng = 72.877 + (Math.random() - 0.5) * 0.05;
          setPinCoords({ lat: fallbackLat.toFixed(5), lng: fallbackLng.toFixed(5) });
          
          if (mapInstanceRef.current) {
            mapInstanceRef.current.setView([fallbackLat, fallbackLng], 13);
            if (markerRef.current) {
              markerRef.current.setLatLng([fallbackLat, fallbackLng]);
            }
          }
        }
      })
      .catch(() => {
        setAddressAlert("⚠️ Network/CORS error. Placed default coordinates.");
      });
  };

  // Keyword-based AI auto classification helper
  const classifyAI = (textInput, chosenMethod, photoObj) => {
    if (chosenMethod === "Photo" && photoObj) {
      return {
        category: photoObj.category,
        urgency: photoObj.aiAnalysis.severity || "High"
      };
    }

    const t = (textInput || "").toLowerCase();
    let category = "Roads"; // Default category
    let urgency = "High"; // Default urgency

    // Check category triggers
    if (t.includes("water") || t.includes("pipe") || t.includes("leak") || t.includes("drinking") || t.includes("पानी") || t.includes("నీరు") || t.includes("जल")) {
      category = "Water";
    } else if (t.includes("school") || t.includes("teacher") || t.includes("study") || t.includes("class") || t.includes("विद्यालय") || t.includes("బడి") || t.includes("கல்வி")) {
      category = "Education";
    } else if (t.includes("hospital") || t.includes("clinic") || t.includes("doctor") || t.includes("health") || t.includes("medicine") || t.includes("वैद्यकीय") || t.includes("மருத்துவ")) {
      category = "Health";
    } else if (t.includes("electricity") || t.includes("power") || t.includes("light") || t.includes("load shedding") || t.includes("बिजली") || t.includes("కరెంట్")) {
      category = "Electricity";
    } else if (t.includes("garbage") || t.includes("sewage") || t.includes("drain") || t.includes("sanitation") || t.includes("कचरा") || t.includes("చెత్త")) {
      category = "Sanitation";
    } else if (t.includes("bus") || t.includes("transit") || t.includes("transport" ) || t.includes("road") || t.includes("bridge") || t.includes("pothole") || t.includes("सड़क") || t.includes("రస్తా")) {
      category = "Roads";
    }

    // Check urgency triggers
    if (t.includes("urgent") || t.includes("critical") || t.includes("danger") || t.includes("emergency") || t.includes("accident") || t.includes("तुरंत") || t.includes("అత్యవసరం") || t.includes("ஆபத்து")) {
      urgency = "Critical";
    } else if (t.includes("slow") || t.includes("future") || t.includes("later") || t.includes("सकते")) {
      urgency = "Medium";
    }

    return { category, urgency };
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName || !wardId) {
      alert("Please fill in your Name and select your Zone / Area.");
      return;
    }

    // AI classification based on inputs
    const classificationText = translatedText || desc || (selectedPhoto ? selectedPhoto.name : "");
    const aiDetails = classifyAI(classificationText, method, selectedPhoto);

    // Generate unique tracking ID
    const trackingId = "PP-" + Math.floor(100000 + Math.random() * 900000);
    const wardName = initialWards.find(w => w.id === wardId)?.name || wardId;

    // Compose new citizen suggestion object
    const newSubmission = {
      id: `sugg-${Date.now()}`,
      title: `${aiDetails.category} Issue - Reported by ${userName}`,
      userName: userName,
      userPhone: userPhone || "Not Provided",
      wardId: wardId,
      category: aiDetails.category,
      urgency: aiDetails.urgency,
      sentiment: "Negative",
      type: method,
      originalLanguage: selectedLang,
      description: desc || "Voice request transcribed successfully.",
      translatedText: translatedText || desc || `A photographic submission detailing a ${aiDetails.category} issue.`,
      timestamp: new Date().toISOString(),
      mediaUrl: method === "Photo" ? selectedPhoto?.url : null,
      status: "Pending", // initial state
      aiAnalysis: {
        tags: method === "Photo" ? selectedPhoto?.aiAnalysis?.tags : ["Citizen Direct Submission", `${aiDetails.category} Issue`],
        confidence: method === "Photo" ? selectedPhoto?.aiAnalysis?.confidence : 94
      },
      coordinates: pinCoords ? { lat: pinCoords.lat, lng: pinCoords.lng } : null
    };

    // Forward to parent state
    onSubmitSuggestion(newSubmission);

    // Save metadata locally to display on confirmation screen
    setSubmissionMetadata({
      trackingId,
      category: aiDetails.category,
      urgency: aiDetails.urgency,
      userName,
      wardName,
      method
    });

    // Advance to confirmation screen (Page 4)
    setCitizenPage("confirm");
  };

  // Reset form state for another input
  const handleResetForm = () => {
    setUserName("");
    setUserPhone("");
    setWardId("");
    setDesc("");
    setTranslatedText("");
    setTranscriptionResult(null);
    setSelectedPhoto(null);
    setScanCompleted(false);
    setPinCoords(null);
    setSubmissionMetadata(null);
    setCustomFileName("");
    setAddressQuery("");
    setAddressAlert("");
    setCitizenPage("choose_method");
  };

  return (
    <div className="page-container">
      {/* Quick language toggle in header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        {citizenPage !== "choose_method" ? (
          <button type="button" className="btn-nav-back" style={{ marginBottom: 0 }} onClick={() => setCitizenPage(citizenPage === "form" ? "choose_method" : "form")}>
            <ArrowLeft size={16} /> Back
          </button>
        ) : (
          <button type="button" className="btn-nav-back" style={{ marginBottom: 0 }} onClick={onBackToHome}>
            <ArrowLeft size={16} /> Main Menu
          </button>
        )}

        <div className="lang-selector-nav">
          <Globe size={15} className="text-muted" />
          {["en", "hi", "te", "ta", "mr", "bn"].map((lang) => (
            <button
              key={lang}
              type="button"
              className={`lang-btn-nav ${selectedLang === lang ? "active" : ""}`}
              onClick={() => onLangChange(lang)}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* ----------------- PAGE 2: Choose Input Method ----------------- */}
      {citizenPage === "choose_method" && (
        <div className="card-container-center">
          <div className="glass-card-3d" style={{ padding: "2.5rem" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div className="logo-icon-container" style={{ width: "fit-content", margin: "0 auto 1rem auto" }}>
                <Sparkles size={24} className="logo-icon" />
              </div>
              <h2 className="section-title" style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>
                {t.title}
              </h2>
              <p className="section-subtitle">
                {t.subtitle}
              </p>
            </div>

            <div className="input-method-grid">
              {/* Choice 1: Text */}
              <div 
                className="method-choice-card"
                onClick={() => {
                  setMethod("Text");
                  setCitizenPage("form");
                }}
              >
                <FileText />
                <div className="method-choice-title">Type your issue</div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: "1.4" }}>
                  Write out details in your native language.
                </p>
              </div>

              {/* Choice 2: Photo */}
              <div 
                className="method-choice-card"
                onClick={() => {
                  setMethod("Photo");
                  setCitizenPage("form");
                }}
              >
                <Camera />
                <div className="method-choice-title">Upload a photo</div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: "1.4" }}>
                  Select mock pictures to scan with AI Vision.
                </p>
              </div>

              {/* Choice 3: Voice */}
              <div 
                className="method-choice-card"
                onClick={() => {
                  setMethod("Voice");
                  setCitizenPage("form");
                }}
              >
                <Mic />
                <div className="method-choice-title">Record voice</div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: "1.4" }}>
                  Describe the issue verbally. AI transcribes text.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- PAGE 3: Submission Form ----------------- */}
      {citizenPage === "form" && (
        <div className="portal-layout" style={{ gridTemplateColumns: "1fr" }}>
          <div className="glass-card-3d" style={{ maxWidth: "800px", margin: "0 auto", width: "100%" }}>
            <h2 className="section-title" style={{ marginBottom: "1.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem" }}>
              <Sparkles className="logo-icon" style={{ color: "#00f2fe", marginRight: "8px" }} />
              Submit Priority Details - ({method} Mode)
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Name & Phone Info */}
              <div className="form-grid-row">
                <div className="form-group">
                  <label className="input-label">{t.nameLabel}</label>
                  <div style={{ position: "relative" }}>
                    <User size={16} style={{ position: "absolute", left: "12px", top: "14px", color: "var(--text-muted)" }} />
                    <input
                      type="text"
                      required
                      className="text-input-3d"
                      style={{ paddingLeft: "2.5rem" }}
                      placeholder={t.namePlaceholder}
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="input-label">{t.phoneLabel}</label>
                  <div style={{ position: "relative" }}>
                    <Phone size={16} style={{ position: "absolute", left: "12px", top: "14px", color: "var(--text-muted)" }} />
                    <input
                      type="tel"
                      className="text-input-3d"
                      style={{ paddingLeft: "2.5rem" }}
                      placeholder={t.phonePlaceholder}
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Area Zone Selection */}
              <div className="form-group" style={{ marginTop: "1rem" }}>
                <label className="input-label">{t.wardLabel}</label>
                <select
                  required
                  className="text-input-3d"
                  value={wardId}
                  onChange={(e) => setWardId(e.target.value)}
                  style={{ cursor: "pointer" }}
                >
                  <option value="">{t.wardDefault}</option>
                  {initialWards.map((w, idx) => (
                    <option key={w.id} value={w.id}>
                      Zone {idx + 1} - {w.name.split(" - ")[1]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dynamic input content based on selected method */}
              <div style={{ marginTop: "1.5rem", borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem" }}>
                {method === "Text" && (
                  <div className="form-group">
                    <label className="input-label">{t.descLabel}</label>
                    <textarea
                      required
                      className="text-input-3d textarea-3d"
                      placeholder={t.descPlaceholder}
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                    />
                    
                    {desc && (
                      <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
                        <button
                          type="button"
                          className="action-brief-btn-3d"
                          onClick={handleTranslate}
                          disabled={isTranslating}
                        >
                          {isTranslating ? "Translating..." : t.translateBtn}
                        </button>
                      </div>
                    )}

                    {translatedText && (
                      <div className="ai-metadata-box" style={{ marginTop: "1rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", fontWeight: "700", color: "var(--primary)" }}>
                          <Sparkles size={14} />
                          {t.translateSuccess}
                        </div>
                        <p style={{ fontSize: "0.85rem", marginTop: "0.4rem", fontStyle: "italic", color: "var(--text-main)" }}>
                          "{translatedText}"
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {method === "Voice" && (
                  <div className="form-group">
                    <label className="input-label">Record Grievance Details</label>
                    <div className="voice-recorder-box" style={{ background: "rgba(0,0,0,0.2)", borderRadius: "14px", border: "1px solid var(--border-color)", padding: "1.5rem" }}>
                      {!isRecording ? (
                        <button
                          type="button"
                          className="record-btn-3d"
                          onClick={handleStartRecord}
                        >
                          <Mic size={28} />
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="record-btn-3d recording"
                          onClick={handleStopRecord}
                        >
                          <span style={{ fontSize: "0.75rem", fontWeight: "800" }}>STOP</span>
                        </button>
                      )}
                      
                      <span style={{ fontSize: "0.9rem", fontWeight: "700", color: "var(--text-main)" }}>
                        {isRecording ? `${t.voiceRecording} (${recordingSeconds}s)` : t.voiceRecord}
                      </span>

                      {isRecording && (
                        <div className="wave-animation-container">
                          {[1,2,3,4,5,6,7,8,9,10].map((w) => (
                            <div key={w} className="wave-bar" style={{ animationDelay: `${w * 0.1}s` }}></div>
                          ))}
                        </div>
                      )}
                    </div>

                    {transcriptionResult && (
                      <div className="ai-metadata-box" style={{ marginTop: "1.25rem" }}>
                        <div style={{ marginBottom: "0.75rem" }}>
                          <span className="input-label" style={{ fontSize: "0.75rem" }}>{t.voiceTranscription}</span>
                          <p style={{ fontSize: "0.85rem", color: "var(--text-main)", fontStyle: "italic" }}>
                            "{transcriptionResult.original}"
                          </p>
                        </div>
                        <div>
                          <span className="input-label" style={{ fontSize: "0.75rem" }}>{t.voiceTranslation}</span>
                          <p style={{ fontSize: "0.85rem", color: "var(--primary)", fontStyle: "italic", fontWeight: "500" }}>
                            "{transcriptionResult.translated}"
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {method === "Photo" && (
                  <div className="form-group">
                    {/* Camera Upload Trigger Box */}
                    <div style={{ background: "rgba(255, 255, 255, 0.02)", padding: "1rem", borderRadius: "14px", border: "1px solid var(--border-color)", marginBottom: "1.25rem" }}>
                      <label className="input-label" style={{ fontSize: "0.85rem", color: "var(--primary)", marginBottom: "0.4rem" }}>
                        📸 Camera Capture / File Upload:
                      </label>
                      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          id="camera-photo-upload"
                          style={{ display: "none" }}
                          onChange={handleCustomPhotoUpload}
                        />
                        <label
                          htmlFor="camera-photo-upload"
                          className="action-brief-btn-3d"
                          style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.5rem", margin: 0, padding: "0.45rem 1rem", fontSize: "0.8rem" }}
                        >
                          <Camera size={14} /> Capture Photo / Choose Image
                        </label>
                        {customFileName ? (
                          <span style={{ fontSize: "0.8rem", color: "var(--success)", fontWeight: "600" }}>
                            ✓ Loaded: {customFileName.length > 20 ? customFileName.slice(0, 17) + "..." : customFileName}
                          </span>
                        ) : (
                          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                            Upload your own photo or use mock triggers below
                          </span>
                        )}
                      </div>
                    </div>

                    <label className="input-label">{t.photoSelectLabel}</label>
                    <div className="image-selector-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "1rem" }}>
                      {sampleImages.map((img) => (
                        <div
                          key={img.id}
                          className={`image-thumb-card ${selectedPhoto?.id === img.id ? "selected" : ""}`}
                          onClick={() => handleSelectPhoto(img)}
                          style={{ height: "100px" }}
                        >
                          <img src={img.url} alt={img.name} />
                          <div className="image-thumb-title" style={{ fontSize: "0.65rem", padding: "0.2rem" }}>{img.name}</div>
                        </div>
                      ))}
                    </div>

                    {selectedPhoto && (
                      <div className="scanner-display-box" style={{ marginTop: "1rem", position: "relative" }}>
                        <img src={selectedPhoto.url} alt="Analyzing preview" style={{ maxHeight: "250px", width: "100%", objectFit: "cover", borderRadius: "14px" }} />
                        {isScanningPhoto && <div className="scanner-beam"></div>}
                        
                        {scanCompleted && selectedPhoto.aiAnalysis.boundingBoxes.map((box, idx) => (
                          <div
                            key={idx}
                            className="bounding-box-sim"
                            style={{
                              left: `${box.x}%`,
                              top: `${box.y}%`,
                              width: `${box.width}%`,
                              height: `${box.height}%`
                            }}
                          >
                            <div className="bounding-box-label">{box.label}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {scanCompleted && selectedPhoto && (
                      <div className="ai-metadata-box" style={{ marginTop: "1.25rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--primary)" }}>{t.photoScannerTags}:</span>
                          <span style={{ fontSize: "0.75rem" }}>
                            {t.photoSeverity}: <strong style={{ color: "var(--accent)" }}>{selectedPhoto.aiAnalysis.severity}</strong>
                          </span>
                        </div>
                        <div className="ai-tags-container" style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.5rem" }}>
                          <span className="ai-tag-pill confidence">AI Confidence: {selectedPhoto.aiAnalysis.confidence}%</span>
                          {selectedPhoto.aiAnalysis.tags.map((tag, i) => (
                            <span key={i} className="ai-tag-pill">{tag}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Optional GPS map pin drop with address lookup */}
              <div className="form-group" style={{ marginTop: "1.5rem", borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <label className="input-label">{t.mapPinLabel}</label>
                  {pinCoords && (
                    <span style={{ fontSize: "0.75rem", color: "var(--success)", fontWeight: "600" }}>
                      ✓ {t.gpsCoords}: Lat {pinCoords.lat}, Lng {pinCoords.lng}
                    </span>
                  )}
                </div>

                {/* User-friendly Address Geolocation Input */}
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  <input
                    type="text"
                    className="text-input-3d"
                    placeholder="Search address or landmark (e.g., 10, Ganga Market Lane)"
                    value={addressQuery}
                    onChange={(e) => setAddressQuery(e.target.value)}
                    style={{ height: "36px", fontSize: "0.85rem" }}
                  />
                  <button
                    type="button"
                    className="action-brief-btn-3d"
                    onClick={handleAddressSearch}
                    style={{ height: "36px", margin: 0, padding: "0 1rem", fontSize: "0.8rem", whiteSpace: "nowrap" }}
                  >
                    Locate & Pin
                  </button>
                </div>

                {addressAlert && (
                  <div style={{ fontSize: "0.8rem", color: "var(--success)", marginBottom: "0.5rem", fontWeight: "600" }}>
                    {addressAlert}
                  </div>
                )}

                <div 
                  id="citizen-leaflet-map" 
                  style={{ height: "220px", borderRadius: "14px", border: "1px solid var(--border-color)", zIndex: 5, background: "rgba(0,0,0,0.4)" }}
                ></div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="submit-btn-3d"
                style={{ marginTop: "2rem" }}
              >
                <Sparkles size={16} style={{ display: "inline-block", marginRight: "8px", verticalAlign: "middle" }} />
                {t.submitBtn}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ----------------- PAGE 4: Confirmation Page ----------------- */}
      {citizenPage === "confirm" && submissionMetadata && (
        <div className="card-container-center">
          <div className="glass-card-3d" style={{ padding: "3rem 2rem", textAlign: "center" }}>
            <div style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "rgba(0, 230, 118, 0.15)",
              border: "2px solid var(--success)",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "1.5rem",
              boxShadow: "0 0 25px rgba(0, 230, 118, 0.3)"
            }}>
              <Check size={40} style={{ color: "var(--success)" }} />
            </div>

            <h2 className="section-title" style={{ fontSize: "1.75rem", color: "var(--success)", marginBottom: "0.75rem" }}>
              {t.successMsg}
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
              Your development priority has been processed and forwarded to the MP Constituency Command Dashboard.
            </p>

            <div className="tracking-id-container">
              <div>TRACKING ID</div>
              <div style={{ fontSize: "1.5rem", marginTop: "0.3rem" }}>{submissionMetadata.trackingId}</div>
            </div>

            <div style={{ margin: "1.5rem 0" }}>
              <div className="ai-classification-badge">
                <Sparkles size={14} style={{ color: "var(--primary)" }} />
                Category: {submissionMetadata.category}
              </div>
              <div className={`ai-classification-badge`} style={{
                background: submissionMetadata.urgency === "Critical" ? "rgba(255, 74, 90, 0.15)" : "rgba(251, 191, 36, 0.15)",
                borderColor: submissionMetadata.urgency === "Critical" ? "var(--accent)" : "#fbbf24"
              }}>
                <AlertTriangle size={14} />
                Urgency: {submissionMetadata.urgency}
              </div>
            </div>

            <div style={{ borderTop: "1px solid var(--border-color)", padding: "1rem", color: "var(--text-muted)", fontSize: "0.82rem", textAlign: "left", borderRadius: "10px", background: "rgba(0,0,0,0.15)", marginBottom: "2rem" }}>
              <strong>Log Summary:</strong>
              <div style={{ marginTop: "0.4rem" }}>Reporter: {submissionMetadata.userName}</div>
              <div>Zone Location: {submissionMetadata.wardName}</div>
              <div>Input Channel: Portal ({submissionMetadata.method})</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <button 
                type="button" 
                className="submit-btn-3d" 
                onClick={handleResetForm}
                style={{ background: "linear-gradient(135deg, var(--primary), var(--secondary))", color: "var(--text-inverse)" }}
              >
                Submit Another Priority
              </button>
              
              <div style={{ display: "flex", gap: "1rem" }}>
                <button 
                  type="button" 
                  className="modal-btn-sec" 
                  style={{ flex: 1 }}
                  onClick={onBackToHome}
                >
                  Done
                </button>
                <button 
                  type="button" 
                  className="modal-btn-sec" 
                  style={{ flex: 1, color: "var(--primary)", borderColor: "var(--primary-glow)" }}
                  onClick={onBackToHome}
                >
                  Check Status Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
