import pptxgen from 'pptxgenjs';

export async function generateVoxBricsPPTX() {
  const pptx = new pptxgen();

  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Team CyberVerse';
  pptx.company = 'CyberVerse - VoxBRICS Digital Public Good';
  pptx.title = 'VoxBRICS: Multilingual Citizen Intelligence & Predictive Urban Planning';

  // Theme Colors
  const BG_DARK = '0B1120';
  const BG_CARD = '1E293B';
  const ACCENT_EMERALD = '10B981';
  const ACCENT_CYAN = '06B6D4';
  const ACCENT_GOLD = 'F59E0B';
  const TEXT_WHITE = 'FFFFFF';
  const TEXT_MUTED = '94A3B8';

  // -------------------------------------------------------------
  // SLIDE 1: TITLE SLIDE
  // -------------------------------------------------------------
  const slide1 = pptx.addSlide();
  slide1.background = { color: BG_DARK };

  slide1.addText('PROJECT VOXBRICS', {
    x: 0.8,
    y: 1.2,
    w: 8.0,
    h: 0.4,
    fontSize: 14,
    fontFace: 'Arial',
    color: ACCENT_EMERALD,
    bold: true,
    charSpacing: 3
  });

  slide1.addText('Multilingual Citizen Intelligence &\nPredictive Urban Infrastructure Planning', {
    x: 0.8,
    y: 1.7,
    w: 11.5,
    h: 1.8,
    fontSize: 32,
    fontFace: 'Arial',
    color: TEXT_WHITE,
    bold: true,
    lineSpacing: 38
  });

  slide1.addText('A Digital Public Good (DPG) bridging Grassroots Citizen Needs with Sovereign Capital Allocations across BRICS Nations (UN SDG 6 & 11 Aligned)', {
    x: 0.8,
    y: 3.7,
    w: 11.5,
    h: 0.8,
    fontSize: 14,
    fontFace: 'Arial',
    color: TEXT_MUTED
  });

  // Team Credits Box
  slide1.addShape(pptx.ShapeType.rect, {
    x: 0.8,
    y: 4.8,
    w: 11.7,
    h: 1.8,
    fill: { color: BG_CARD },
    line: { color: '334155', width: 1 }
  });

  slide1.addText('DEVELOPED & PRESENTED BY: TEAM CYBERVERSE', {
    x: 1.1,
    y: 5.0,
    w: 9.0,
    h: 0.3,
    fontSize: 12,
    fontFace: 'Arial',
    color: ACCENT_CYAN,
    bold: true
  });

  slide1.addText('Team Members:\n• Aryan Kumawat\n• Rajguru Sevda\n• Chaitanya Shripad Kulkarni', {
    x: 1.1,
    y: 5.35,
    w: 8.0,
    h: 1.1,
    fontSize: 13,
    fontFace: 'Arial',
    color: TEXT_WHITE,
    bold: true
  });

  // -------------------------------------------------------------
  // SLIDE 2: EXECUTIVE SUMMARY (YE KYA HAI?)
  // -------------------------------------------------------------
  const slide2 = pptx.addSlide();
  slide2.background = { color: BG_DARK };

  slide2.addText('01. WHAT IS VOXBRICS? (YE KYA HAI?)', {
    x: 0.8,
    y: 0.6,
    w: 10.0,
    h: 0.4,
    fontSize: 12,
    fontFace: 'Arial',
    color: ACCENT_EMERALD,
    bold: true
  });

  slide2.addText('An Open-Access Digital Public Good for Inclusive Governance', {
    x: 0.8,
    y: 1.0,
    w: 11.5,
    h: 0.6,
    fontSize: 24,
    fontFace: 'Arial',
    color: TEXT_WHITE,
    bold: true
  });

  const cardsSlide2 = [
    {
      title: 'Multimodal Citizen Voice Intake',
      desc: 'Allows citizens across India, Brazil, South Africa, Russia, China & BRICS+ to report water crises, grid outages, and flood risks in their local languages via Voice, WhatsApp, or SMS.',
      color: ACCENT_EMERALD
    },
    {
      title: 'Geospatial Deficit Hotspots',
      desc: 'AI clusters raw citizen voice reports onto authentic GIS spatial coordinate maps, cross-referenced with demographic vulnerability ratios and infrastructure deficit indices.',
      color: ACCENT_CYAN
    },
    {
      title: 'Policymaker Capital Dossiers',
      desc: 'Transforms fragmented citizen telemetry into bankable public investment dossiers aligned with the New Development Bank (NDB) and municipal master plans.',
      color: ACCENT_GOLD
    }
  ];

  cardsSlide2.forEach((card, idx) => {
    const xPos = 0.8 + idx * 4.0;
    slide2.addShape(pptx.ShapeType.rect, {
      x: xPos,
      y: 1.9,
      w: 3.7,
      h: 4.5,
      fill: { color: BG_CARD },
      line: { color: '334155', width: 1 }
    });

    slide2.addText(card.title, {
      x: xPos + 0.3,
      y: 2.2,
      w: 3.1,
      h: 0.8,
      fontSize: 16,
      fontFace: 'Arial',
      color: card.color,
      bold: true
    });

    slide2.addText(card.desc, {
      x: xPos + 0.3,
      y: 3.1,
      w: 3.1,
      h: 3.0,
      fontSize: 13,
      fontFace: 'Arial',
      color: TEXT_MUTED,
      lineSpacing: 20
    });
  });

  // -------------------------------------------------------------
  // SLIDE 3: PROBLEM STATEMENT (YE KYO HAI?)
  // -------------------------------------------------------------
  const slide3 = pptx.addSlide();
  slide3.background = { color: BG_DARK };

  slide3.addText('02. THE CORE PROBLEM (YE KYO HAI?)', {
    x: 0.8,
    y: 0.6,
    w: 10.0,
    h: 0.4,
    fontSize: 12,
    fontFace: 'Arial',
    color: ACCENT_EMERALD,
    bold: true
  });

  slide3.addText('The Broken Feedback Loop in Global South Infrastructure', {
    x: 0.8,
    y: 1.0,
    w: 11.5,
    h: 0.6,
    fontSize: 24,
    fontFace: 'Arial',
    color: TEXT_WHITE,
    bold: true
  });

  const problems = [
    {
      header: '1. Language & Literacy Barriers',
      detail: 'Over 65% of rural peri-urban residents in BRICS nations cannot navigate complex English/bureaucratic web portals to report acute community distress.'
    },
    {
      header: '2. Top-Down Municipal Blindspots',
      detail: 'Traditional urban planning is top-down and takes 3-5 years to detect chronic infrastructure failure, leading to dry handpumps and overflowing storm drains.'
    },
    {
      header: '3. Spam & Verification Vulnerability',
      detail: 'Public grievance portals get overrun by spam, fake news, or commercial bots, drowning out genuine village emergencies.'
    },
    {
      header: '4. Disconnect from Sovereign Financing',
      detail: 'Multilateral funds like the New Development Bank (NDB) lack grassroots spatial verification to deploy local-currency green bonds where urgency is greatest.'
    }
  ];

  problems.forEach((p, idx) => {
    const yPos = 1.9 + idx * 1.25;
    slide3.addShape(pptx.ShapeType.rect, {
      x: 0.8,
      y: yPos,
      w: 11.7,
      h: 1.1,
      fill: { color: BG_CARD },
      line: { color: '334155', width: 1 }
    });

    slide3.addText(p.header, {
      x: 1.1,
      y: yPos + 0.15,
      w: 11.0,
      h: 0.35,
      fontSize: 14,
      fontFace: 'Arial',
      color: ACCENT_CYAN,
      bold: true
    });

    slide3.addText(p.detail, {
      x: 1.1,
      y: yPos + 0.52,
      w: 11.0,
      h: 0.45,
      fontSize: 12,
      fontFace: 'Arial',
      color: TEXT_MUTED
    });
  });

  // -------------------------------------------------------------
  // SLIDE 4: PURPOSE & TARGET AUDIENCE (KIS LIYE HAI?)
  // -------------------------------------------------------------
  const slide4 = pptx.addSlide();
  slide4.background = { color: BG_DARK };

  slide4.addText('03. MISSION & BENEFICIARIES (KIS LIYE HAI?)', {
    x: 0.8,
    y: 0.6,
    w: 10.0,
    h: 0.4,
    fontSize: 12,
    fontFace: 'Arial',
    color: ACCENT_EMERALD,
    bold: true
  });

  slide4.addText('Empowering Citizens & Modernizing National Policy', {
    x: 0.8,
    y: 1.0,
    w: 11.5,
    h: 0.6,
    fontSize: 24,
    fontFace: 'Arial',
    color: TEXT_WHITE,
    bold: true
  });

  const beneficiaries = [
    {
      role: 'FOR GRASSROOTS CITIZENS',
      items: [
        '• Voice-first reporting in native tongue (Hindi, Portuguese, Zulu, Amharic, etc.)',
        '• Transparent tracking of reported grievances in personal dashboard',
        '• Whistleblower privacy with anonymous reporting support',
        '• Direct voice audio replies via real-time Text-to-Speech'
      ],
      color: ACCENT_EMERALD
    },
    {
      role: 'FOR MUNICIPAL POLICYMAKERS & NDB',
      items: [
        '• Real-time heat maps of unserviced settlements & aquifer depletion',
        '• Grounded CapEx proposals cross-checked with Google Search & Maps',
        '• Multi-turn strategic chat consultation using Gemini 3.1 Pro',
        '• 10-Year predictive urban modeling (2026-2035) with climate risk stress'
      ],
      color: ACCENT_CYAN
    }
  ];

  beneficiaries.forEach((b, idx) => {
    const xPos = 0.8 + idx * 6.0;
    slide4.addShape(pptx.ShapeType.rect, {
      x: xPos,
      y: 1.9,
      w: 5.7,
      h: 4.5,
      fill: { color: BG_CARD },
      line: { color: '334155', width: 1 }
    });

    slide4.addText(b.role, {
      x: xPos + 0.4,
      y: 2.2,
      w: 5.0,
      h: 0.4,
      fontSize: 15,
      fontFace: 'Arial',
      color: b.color,
      bold: true
    });

    slide4.addText(b.items.join('\n\n'), {
      x: xPos + 0.4,
      y: 2.8,
      w: 5.0,
      h: 3.2,
      fontSize: 13,
      fontFace: 'Arial',
      color: TEXT_WHITE,
      lineSpacing: 22
    });
  });

  // -------------------------------------------------------------
  // SLIDE 5: SYSTEM ARCHITECTURE & HOW IT WORKS (KESE KAAM KARTA HAI?)
  // -------------------------------------------------------------
  const slide5 = pptx.addSlide();
  slide5.background = { color: BG_DARK };

  slide5.addText('04. HOW IT WORKS (KESE KAAM KARTA HAI?)', {
    x: 0.8,
    y: 0.6,
    w: 10.0,
    h: 0.4,
    fontSize: 12,
    fontFace: 'Arial',
    color: ACCENT_EMERALD,
    bold: true
  });

  slide5.addText('End-to-End Pipeline: Voice Ingestion to CapEx Deployment', {
    x: 0.8,
    y: 1.0,
    w: 11.5,
    h: 0.6,
    fontSize: 24,
    fontFace: 'Arial',
    color: TEXT_WHITE,
    bold: true
  });

  const steps = [
    { num: 'STEP 1', title: 'Multimodal Intake', desc: 'Audio recording captured in-browser or via SMS/WhatsApp gateways; transcribed into native text using gemini-3.5-transcribe.' },
    { num: 'STEP 2', title: 'Anti-Spam Verification', desc: 'Grounded against live web & infrastructure records to filter out gibberish, fake reports, and commercial spam.' },
    { num: 'STEP 3', title: 'GIS Spatial Clustering', desc: 'Normalized into latitude/longitude coordinate bounds; clustered with census demographics & deficit indices.' },
    { num: 'STEP 4', title: 'Bankable Dossier Creation', desc: 'Gemini 3.5 Flash generates 3-phase procurement milestones, budgets ($M USD), and NDB co-financing plans.' },
    { num: 'STEP 5', title: 'Predictive Forecasting', desc: 'Interactive simulation models population growth, aquifer stress, and per-citizen cost up to year 2035.' }
  ];

  steps.forEach((s, idx) => {
    const xPos = 0.8 + idx * 2.4;
    slide5.addShape(pptx.ShapeType.rect, {
      x: xPos,
      y: 1.9,
      w: 2.2,
      h: 4.5,
      fill: { color: BG_CARD },
      line: { color: '334155', width: 1 }
    });

    slide5.addText(s.num, {
      x: xPos + 0.15,
      y: 2.1,
      w: 1.9,
      h: 0.3,
      fontSize: 11,
      fontFace: 'Arial',
      color: ACCENT_GOLD,
      bold: true
    });

    slide5.addText(s.title, {
      x: xPos + 0.15,
      y: 2.5,
      w: 1.9,
      h: 0.6,
      fontSize: 14,
      fontFace: 'Arial',
      color: TEXT_WHITE,
      bold: true
    });

    slide5.addText(s.desc, {
      x: xPos + 0.15,
      y: 3.3,
      w: 1.9,
      h: 2.8,
      fontSize: 11.5,
      fontFace: 'Arial',
      color: TEXT_MUTED,
      lineSpacing: 18
    });
  });

  // -------------------------------------------------------------
  // SLIDE 6: TECH STACK & GOOGLE AI MODELS (IN ME KYA USE HUA HAI?)
  // -------------------------------------------------------------
  const slide6 = pptx.addSlide();
  slide6.background = { color: BG_DARK };

  slide6.addText('05. TECHNOLOGY STACK & AI MODELS (KYA USE HUA HAI?)', {
    x: 0.8,
    y: 0.6,
    w: 10.0,
    h: 0.4,
    fontSize: 12,
    fontFace: 'Arial',
    color: ACCENT_EMERALD,
    bold: true
  });

  slide6.addText('Modern Web Stack & Google GenAI Intelligence Suite', {
    x: 0.8,
    y: 1.0,
    w: 11.5,
    h: 0.6,
    fontSize: 24,
    fontFace: 'Arial',
    color: TEXT_WHITE,
    bold: true
  });

  const techBlocks = [
    {
      category: 'AI & SPEECH INTELLIGENCE',
      color: ACCENT_CYAN,
      items: [
        '• gemini-3.5-transcribe: Native dialect speech transcription',
        '• gemini-3.5-flash: Grounded analysis with Google Search & Maps',
        '• gemini-3.8-flash-tts: Audible spoken briefings for citizens',
        '• gemini-3.8-live: Ultra-low latency spoken voice consultation',
        '• gemini-3.1-pro-preview: Multi-turn strategic municipal advisory',
        '• gemini-3.1-flash-lite: Real-time telemetry extraction & sentiment'
      ]
    },
    {
      category: 'CLOUD, DATABASE & APPLICATION',
      color: ACCENT_EMERALD,
      items: [
        '• Google Firebase Firestore: Real-time NoSQL snapshot database',
        '• Firebase Authentication: Secure Google Sign-In with verified badge check',
        '• React 19 + TypeScript: Modular, type-safe reactive frontend',
        '• Tailwind CSS: Dark, Light, and BRICS Sovereign Gold 3-in-1 theme system',
        '• GIS Map Layer: True latitude/longitude coordinate placement',
        '• Web Audio API: Zero-latency microphone streaming & visualizer'
      ]
    }
  ];

  techBlocks.forEach((tb, idx) => {
    const xPos = 0.8 + idx * 6.0;
    slide6.addShape(pptx.ShapeType.rect, {
      x: xPos,
      y: 1.9,
      w: 5.7,
      h: 4.5,
      fill: { color: BG_CARD },
      line: { color: '334155', width: 1 }
    });

    slide6.addText(tb.category, {
      x: xPos + 0.4,
      y: 2.2,
      w: 5.0,
      h: 0.4,
      fontSize: 14,
      fontFace: 'Arial',
      color: tb.color,
      bold: true
    });

    slide6.addText(tb.items.join('\n\n'), {
      x: xPos + 0.4,
      y: 2.7,
      w: 5.0,
      h: 3.4,
      fontSize: 12,
      fontFace: 'Arial',
      color: TEXT_WHITE,
      lineSpacing: 18
    });
  });

  // -------------------------------------------------------------
  // SLIDE 7: HOW TO SCALE (IS KO SCALE KESE KARENGE?)
  // -------------------------------------------------------------
  const slide7 = pptx.addSlide();
  slide7.background = { color: BG_DARK };

  slide7.addText('06. SCALABILITY & EXPANSION ROADMAP (SCALE KESE KARENGE?)', {
    x: 0.8,
    y: 0.6,
    w: 10.0,
    h: 0.4,
    fontSize: 12,
    fontFace: 'Arial',
    color: ACCENT_EMERALD,
    bold: true
  });

  slide7.addText('Scaling Across Municipalities & Multilateral Institutions', {
    x: 0.8,
    y: 1.0,
    w: 11.5,
    h: 0.6,
    fontSize: 24,
    fontFace: 'Arial',
    color: TEXT_WHITE,
    bold: true
  });

  const scaleSteps = [
    {
      phase: 'PHASE 1: NATIONWIDE EXPANSION',
      points: [
        '• Partnering with village Panchayats in India & Favelas in Brazil',
        '• Free toll-free IVR voice number for 2G phone users without internet',
        '• WhatsApp Business Bot deployed across regional municipal wards'
      ]
    },
    {
      phase: 'PHASE 2: IOT & SATELLITE TELEMETRY',
      points: [
        '• Cross-correlating citizen water complaints with Copernicus/NASA groundwater satellite data',
        '• IoT smart meters connected to the Firestore ledger for automatic leak confirmation'
      ]
    },
    {
      phase: 'PHASE 3: MULTILATERAL DEPLOYMENT',
      points: [
        '• Integration into the New Development Bank (NDB) annual sovereign loan approvals',
        '• Adoption by BRICS+ expanded states (UAE, Egypt, Ethiopia, Iran, Saudi Arabia)'
      ]
    }
  ];

  scaleSteps.forEach((st, idx) => {
    const yPos = 1.9 + idx * 1.5;
    slide7.addShape(pptx.ShapeType.rect, {
      x: 0.8,
      y: yPos,
      w: 11.7,
      h: 1.35,
      fill: { color: BG_CARD },
      line: { color: '334155', width: 1 }
    });

    slide7.addText(st.phase, {
      x: 1.1,
      y: yPos + 0.15,
      w: 11.0,
      h: 0.35,
      fontSize: 14,
      fontFace: 'Arial',
      color: ACCENT_GOLD,
      bold: true
    });

    slide7.addText(st.points.join('\n'), {
      x: 1.1,
      y: yPos + 0.55,
      w: 11.0,
      h: 0.7,
      fontSize: 12,
      fontFace: 'Arial',
      color: TEXT_MUTED,
      lineSpacing: 18
    });
  });

  // -------------------------------------------------------------
  // SLIDE 8: CONCLUSION & TEAM CREDITS
  // -------------------------------------------------------------
  const slide8 = pptx.addSlide();
  slide8.background = { color: BG_DARK };

  slide8.addText('CONCLUSION & IMPACT', {
    x: 0.8,
    y: 0.8,
    w: 10.0,
    h: 0.4,
    fontSize: 14,
    fontFace: 'Arial',
    color: ACCENT_EMERALD,
    bold: true
  });

  slide8.addText('Transforming Public Voices into Tangible Global Infrastructure', {
    x: 0.8,
    y: 1.3,
    w: 11.5,
    h: 1.0,
    fontSize: 28,
    fontFace: 'Arial',
    color: TEXT_WHITE,
    bold: true
  });

  slide8.addText('VoxBRICS proves that AI and Digital Public Goods can democratize municipal governance, eliminate ghost grievances through search grounding, and guide billions in climate-resilient capital expenditures directly to communities in need.', {
    x: 0.8,
    y: 2.5,
    w: 11.5,
    h: 1.2,
    fontSize: 15,
    fontFace: 'Arial',
    color: TEXT_MUTED,
    lineSpacing: 24
  });

  slide8.addShape(pptx.ShapeType.rect, {
    x: 0.8,
    y: 4.2,
    w: 11.7,
    h: 2.2,
    fill: { color: BG_CARD },
    line: { color: ACCENT_CYAN, width: 1.5 }
  });

  slide8.addText('TEAM CYBERVERSE', {
    x: 1.1,
    y: 4.4,
    w: 11.0,
    h: 0.4,
    fontSize: 16,
    fontFace: 'Arial',
    color: ACCENT_CYAN,
    bold: true
  });

  slide8.addText('1. Aryan Kumawat — Project Lead, AI Engineering & Architecture\n2. Rajguru Sevda — Full-Stack Systems & GIS Spatial Integration\n3. Chaitanya Shripad Kulkarni — Cloud Infrastructure, Data Models & DPG Standards', {
    x: 1.1,
    y: 4.9,
    w: 11.0,
    h: 1.3,
    fontSize: 14,
    fontFace: 'Arial',
    color: TEXT_WHITE,
    lineSpacing: 22
  });

  // Export to base64 / download file
  await pptx.writeFile({ fileName: 'VoxBRICS_Presentation_Team_CyberVerse.pptx' });
}
