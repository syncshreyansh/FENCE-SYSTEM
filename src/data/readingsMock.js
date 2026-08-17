export const mockReadings = [
  {
    id: 'DEV-001', zone: 'Kanha', status: 'normal', x: 15, y: 30,
    classification: 'Normal', dutyCycle: 3.2, tamper: 'Sealed',
    online: true, lastSeen: '18s ago', mlConfidence: 89,
    violationDuration: null, allTimeViolations: 0, thisMonthViolations: 0,
    gps: { lat: 22.5124, lng: 80.6234, sector: 'Sector 2-A' },
    battery: 92, signal: -68, comms: 'GSM', installDate: 'Mar 12, 2025',
    riskLevel: 'LOW',
    history: [
      { time: '11:43:10 AM', dutyCycle: 3.2, classification: 'Normal', confidence: 89, tamper: 'Sealed', signal: -68 },
      { time: '11:42:40 AM', dutyCycle: 2.9, classification: 'Normal', confidence: 87, tamper: 'Sealed', signal: -69 },
      { time: '11:42:10 AM', dutyCycle: 3.4, classification: 'Normal', confidence: 91, tamper: 'Sealed', signal: -67 },
      { time: '11:41:40 AM', dutyCycle: 3.1, classification: 'Normal', confidence: 88, tamper: 'Sealed', signal: -70 },
      { time: '11:41:10 AM', dutyCycle: 2.8, classification: 'Normal', confidence: 86, tamper: 'Sealed', signal: -68 },
    ]
  },
  {
    id: 'DEV-002', zone: 'Kanha', status: 'violation', x: 25, y: 45,
    classification: 'Illegal Tap', dutyCycle: 94.3, tamper: 'Case Opened',
    online: true, lastSeen: '23s ago', mlConfidence: 94,
    violationDuration: '2h 14m', violationStart: 'Aug 16, 09:42 AM',
    allTimeViolations: 7, thisMonthViolations: 3,
    gps: { lat: 22.4521, lng: 80.6712, sector: 'Sector 4-B' },
    battery: 78, signal: -72, comms: 'GSM', installDate: 'Jan 08, 2025',
    riskLevel: 'HIGH',
    history: [
      { time: '11:43:02 AM', dutyCycle: 94.3, classification: 'Illegal Tap', confidence: 94, tamper: 'Case Opened', signal: -72 },
      { time: '11:42:32 AM', dutyCycle: 93.8, classification: 'Illegal Tap', confidence: 92, tamper: 'Case Opened', signal: -73 },
      { time: '11:42:02 AM', dutyCycle: 94.1, classification: 'Illegal Tap', confidence: 95, tamper: 'Case Opened', signal: -71 },
      { time: '11:41:32 AM', dutyCycle: 93.5, classification: 'Illegal Tap', confidence: 91, tamper: 'Case Opened', signal: -74 },
      { time: '11:41:02 AM', dutyCycle: 94.7, classification: 'Illegal Tap', confidence: 93, tamper: 'Case Opened', signal: -72 },
      { time: '09:41:55 AM', dutyCycle: 2.9,  classification: 'Normal',      confidence: 88, tamper: 'Sealed',      signal: -68 },
      { time: '09:41:25 AM', dutyCycle: 3.1,  classification: 'Normal',      confidence: 89, tamper: 'Sealed',      signal: -69 },
      { time: '09:40:55 AM', dutyCycle: 2.7,  classification: 'Normal',      confidence: 87, tamper: 'Sealed',      signal: -70 },
      { time: '09:40:25 AM', dutyCycle: 3.3,  classification: 'Normal',      confidence: 90, tamper: 'Sealed',      signal: -68 },
      { time: '09:39:55 AM', dutyCycle: 2.8,  classification: 'Normal',      confidence: 86, tamper: 'Sealed',      signal: -71 },
    ]
  },
  {
    id: 'DEV-003', zone: 'Kanha', status: 'offline', x: 10, y: 60,
    classification: 'Unknown', dutyCycle: null, tamper: 'Unknown',
    online: false, lastSeen: '47 min ago', mlConfidence: null,
    violationDuration: null, allTimeViolations: 2, thisMonthViolations: 0,
    gps: { lat: 22.3892, lng: 80.5901, sector: 'Sector 1-C' },
    battery: 12, signal: null, comms: 'GSM', installDate: 'Feb 20, 2025',
    riskLevel: 'MEDIUM',
    history: []
  },
  {
    id: 'DEV-004', zone: 'Kanha', status: 'normal', x: 35, y: 20,
    classification: 'Appliance Load', dutyCycle: 2.8, tamper: 'Sealed',
    online: true, lastSeen: '11s ago', mlConfidence: 82,
    violationDuration: null, allTimeViolations: 0, thisMonthViolations: 0,
    gps: { lat: 22.5831, lng: 80.7102, sector: 'Sector 3-A' },
    battery: 85, signal: -65, comms: 'LoRa', installDate: 'Apr 05, 2025',
    riskLevel: 'LOW',
    history: [
      { time: '11:43:05 AM', dutyCycle: 2.8, classification: 'Appliance Load', confidence: 82, tamper: 'Sealed', signal: -65 },
      { time: '11:42:35 AM', dutyCycle: 2.6, classification: 'Appliance Load', confidence: 81, tamper: 'Sealed', signal: -66 },
      { time: '11:42:05 AM', dutyCycle: 3.0, classification: 'Appliance Load', confidence: 83, tamper: 'Sealed', signal: -64 },
    ]
  },
  {
    id: 'DEV-005', zone: 'Kanha', status: 'normal', x: 40, y: 70,
    classification: 'Normal', dutyCycle: 4.1, tamper: 'Sealed',
    online: true, lastSeen: '5s ago', mlConfidence: 91,
    violationDuration: null, allTimeViolations: 1, thisMonthViolations: 0,
    gps: { lat: 22.3211, lng: 80.6489, sector: 'Sector 5-D' },
    battery: 67, signal: -79, comms: 'GSM', installDate: 'Nov 14, 2024',
    riskLevel: 'LOW',
    history: [
      { time: '11:43:08 AM', dutyCycle: 4.1, classification: 'Normal', confidence: 91, tamper: 'Sealed', signal: -79 },
      { time: '11:42:38 AM', dutyCycle: 3.8, classification: 'Normal', confidence: 90, tamper: 'Sealed', signal: -80 },
      { time: '11:42:08 AM', dutyCycle: 4.3, classification: 'Normal', confidence: 92, tamper: 'Sealed', signal: -78 },
    ]
  },
  {
    id: 'DEV-101', zone: 'Sonitpur', status: 'normal', x: 65, y: 20,
    classification: 'Normal', dutyCycle: 2.4, tamper: 'Sealed',
    online: true, lastSeen: '31s ago', mlConfidence: 93,
    violationDuration: null, allTimeViolations: 0, thisMonthViolations: 0,
    gps: { lat: 22.6102, lng: 80.8234, sector: 'Sector A-1' },
    battery: 91, signal: -61, comms: 'GSM', installDate: 'Dec 01, 2024',
    riskLevel: 'LOW',
    history: [
      { time: '11:43:01 AM', dutyCycle: 2.4, classification: 'Normal', confidence: 93, tamper: 'Sealed', signal: -61 },
    ]
  },
  {
    id: 'DEV-102', zone: 'Sonitpur', status: 'violation', x: 75, y: 50,
    classification: 'Illegal Tap', dutyCycle: 91.2, tamper: 'Case Opened',
    online: true, lastSeen: '8s ago', mlConfidence: 97,
    violationDuration: '5h 31m', violationStart: 'Aug 16, 06:12 AM',
    allTimeViolations: 12, thisMonthViolations: 4,
    gps: { lat: 22.5543, lng: 80.9102, sector: 'Sector B-3' },
    battery: 44, signal: -85, comms: 'GSM', installDate: 'Sep 10, 2024',
    riskLevel: 'HIGH',
    history: [
      { time: '11:43:04 AM', dutyCycle: 91.2, classification: 'Illegal Tap', confidence: 97, tamper: 'Case Opened', signal: -85 },
      { time: '11:42:34 AM', dutyCycle: 90.8, classification: 'Illegal Tap', confidence: 96, tamper: 'Case Opened', signal: -86 },
      { time: '11:42:04 AM', dutyCycle: 91.5, classification: 'Illegal Tap', confidence: 97, tamper: 'Case Opened', signal: -84 },
      { time: '11:41:34 AM', dutyCycle: 90.5, classification: 'Illegal Tap', confidence: 95, tamper: 'Case Opened', signal: -87 },
      { time: '11:41:04 AM', dutyCycle: 91.8, classification: 'Illegal Tap', confidence: 96, tamper: 'Case Opened', signal: -85 },
    ]
  },
  {
    id: 'DEV-103', zone: 'Sonitpur', status: 'normal', x: 85, y: 35,
    classification: 'Normal', dutyCycle: 1.9, tamper: 'Sealed',
    online: true, lastSeen: '44s ago', mlConfidence: 88,
    violationDuration: null, allTimeViolations: 0, thisMonthViolations: 0,
    gps: { lat: 22.6891, lng: 80.9821, sector: 'Sector C-2' },
    battery: 76, signal: -70, comms: 'LoRa', installDate: 'Jan 22, 2025',
    riskLevel: 'LOW',
    history: []
  },
  {
    id: 'DEV-104', zone: 'Sonitpur', status: 'normal', x: 60, y: 80,
    classification: 'Normal', dutyCycle: 3.7, tamper: 'Sealed',
    online: true, lastSeen: '2s ago', mlConfidence: 90,
    violationDuration: null, allTimeViolations: 1, thisMonthViolations: 0,
    gps: { lat: 22.4312, lng: 80.8790, sector: 'Sector D-4' },
    battery: 58, signal: -77, comms: 'GSM', installDate: 'Oct 30, 2024',
    riskLevel: 'LOW',
    history: []
  },
  {
    id: 'DEV-105', zone: 'Sonitpur', status: 'violation', x: 90, y: 65,
    classification: 'Illegal Tap', dutyCycle: 88.6, tamper: 'Sealed',
    online: true, lastSeen: '15s ago', mlConfidence: 88,
    violationDuration: '1h 02m', violationStart: 'Aug 16, 10:41 AM',
    allTimeViolations: 4, thisMonthViolations: 2,
    gps: { lat: 22.3789, lng: 80.9501, sector: 'Sector E-1' },
    battery: 33, signal: -95, comms: 'GSM', installDate: 'Jul 15, 2024',
    riskLevel: 'HIGH',
    history: [
      { time: '11:43:06 AM', dutyCycle: 88.6, classification: 'Illegal Tap', confidence: 88, tamper: 'Sealed', signal: -95 },
      { time: '11:42:36 AM', dutyCycle: 87.9, classification: 'Illegal Tap', confidence: 87, tamper: 'Sealed', signal: -96 },
      { time: '11:42:06 AM', dutyCycle: 89.2, classification: 'Illegal Tap', confidence: 89, tamper: 'Sealed', signal: -94 },
    ]
  },
];
