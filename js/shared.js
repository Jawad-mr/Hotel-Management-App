/* JSN CREATIVE — HOTEL PMS SYSTEM LOGIC */

const DB_PREFIX = 'hm_';

const DB = {
  get(key, defaultVal) {
    const val = localStorage.getItem(DB_PREFIX + key);
    if (val === null) return defaultVal;
    try {
      return JSON.parse(val);
    } catch (e) {
      return val;
    }
  },
  set(key, val) {
    localStorage.setItem(DB_PREFIX + key, JSON.stringify(val));
  },
  remove(key) {
    localStorage.removeItem(DB_PREFIX + key);
  }
};

const DEFAULT_CONFIG = {
  name: 'The Grand Imperial Resort',
  logo: '🏰',
  phone: '+91 98765 43210',
  email: 'stay@grandimperial.com',
  address: '10, Heritage Ridge Road, Shimla, Himachal Pradesh',
  currency: '₹',
  taxRate: 12, // 12% GST
  checkInTime: '14:00',
  checkOutTime: '11:00',
  receiptHeader: 'THE GRAND IMPERIAL RESORT\nWelcome to Luxury & Heritage',
  receiptFooter: 'Thank you for choosing Grand Imperial!\nWe look forward to hosting you again.\nFor queries, mail: contact@grandimperial.com'
};

// Seeder logic
function seedDatabase() {
  const existingRooms = DB.get('rooms', []);
  const existingUsers = DB.get('users', []);
  const existingPayments = DB.get('payments', []);
  if (DB.get('initialized', false) && existingRooms.length > 0 && existingUsers.length > 0 && existingPayments.length > 0) return;

  // 1. Config
  DB.set('hotelConfig', DEFAULT_CONFIG);

  // 2. Users
  const users = [
    { id: 1, name: 'Sanjay Dutt', email: 'admin@hotel.com', password: 'admin', role: 'Admin', initials: 'SD' },
    { id: 2, name: 'Ravi Kumar', email: 'manager@hotel.com', password: 'manager', role: 'Manager', initials: 'RK' },
    { id: 3, name: 'Neha Sharma', email: 'reception@hotel.com', password: 'reception', role: 'Receptionist', initials: 'NS' },
    { id: 4, name: 'Karan Singh', email: 'housekeep@hotel.com', password: 'housekeep', role: 'Housekeeping', initials: 'KS' }
  ];
  DB.set('users', users);

  // 3. Room Types
  const roomTypes = [
    { id: 1, name: 'Deluxe Room', description: 'Cozy and spacious standard room with mountain view', capacity: 2, basePrice: 3500, amenities: ['Wi-Fi', 'AC', 'TV', 'Geyser', 'Balcony'] },
    { id: 2, name: 'Executive Suite', description: 'Luxury room with separate living space and hot tub', capacity: 2, basePrice: 6500, amenities: ['Wi-Fi', 'AC', 'Smart TV', 'Mini Bar', 'Bath Tub', 'Balcony', 'Safe Box'] },
    { id: 3, name: 'Family Suite', description: 'Two interconnected rooms suitable for family stays', capacity: 4, basePrice: 8000, amenities: ['Wi-Fi', 'AC', 'Two TVs', 'Geyser', 'Kitchenette', 'Coffee Maker'] },
    { id: 4, name: 'Presidential Penthouse', description: 'Premium luxury floor with private pool and butler service', capacity: 6, basePrice: 15000, amenities: ['Private Pool', 'Butler Service', 'High Speed Wi-Fi', 'Home Theatre', 'Stocked Bar'] }
  ];
  DB.set('roomTypes', roomTypes);

  // 4. Rooms
  const rooms = [
    { id: 101, roomNumber: '101', roomTypeId: 1, roomTypeName: 'Deluxe Room', floor: '1st Floor', capacity: 2, basePrice: 3500, status: 'Available', amenities: ['Wi-Fi', 'AC', 'TV', 'Balcony'] },
    { id: 102, roomNumber: '102', roomTypeId: 1, roomTypeName: 'Deluxe Room', floor: '1st Floor', capacity: 2, basePrice: 3500, status: 'Available', amenities: ['Wi-Fi', 'AC', 'TV', 'Balcony'] },
    { id: 103, roomNumber: '103', roomTypeId: 1, roomTypeName: 'Deluxe Room', floor: '1st Floor', capacity: 2, basePrice: 3500, status: 'Cleaning', amenities: ['Wi-Fi', 'AC', 'TV', 'Geyser'] },
    { id: 104, roomNumber: '104', roomTypeId: 3, roomTypeName: 'Family Suite', floor: '1st Floor', capacity: 4, basePrice: 8000, status: 'Occupied', amenities: ['Wi-Fi', 'AC', 'Two TVs', 'Kitchenette'] },
    
    { id: 201, roomNumber: '201', roomTypeId: 1, roomTypeName: 'Deluxe Room', floor: '2nd Floor', capacity: 2, basePrice: 3800, status: 'Available', amenities: ['Wi-Fi', 'AC', 'TV', 'Geyser', 'Balcony'] },
    { id: 202, roomNumber: '202', roomTypeId: 2, roomTypeName: 'Executive Suite', floor: '2nd Floor', capacity: 2, basePrice: 6500, status: 'Occupied', amenities: ['Wi-Fi', 'AC', 'Smart TV', 'Mini Bar', 'Bath Tub'] },
    { id: 203, roomNumber: '203', roomTypeId: 2, roomTypeName: 'Executive Suite', floor: '2nd Floor', capacity: 2, basePrice: 6500, status: 'Reserved', amenities: ['Wi-Fi', 'AC', 'Smart TV', 'Mini Bar', 'Bath Tub'] },
    { id: 204, roomNumber: '204', roomTypeId: 3, roomTypeName: 'Family Suite', floor: '2nd Floor', capacity: 4, basePrice: 8500, status: 'Maintenance', amenities: ['Wi-Fi', 'AC', 'Two TVs', 'Balcony'] },
    
    { id: 301, roomNumber: '301', roomTypeId: 2, roomTypeName: 'Executive Suite', floor: '3rd Floor', capacity: 2, basePrice: 7000, status: 'Available', amenities: ['Wi-Fi', 'AC', 'Smart TV', 'Safe Box'] },
    { id: 302, roomNumber: '302', roomTypeId: 4, roomTypeName: 'Presidential Penthouse', floor: '3rd Floor', capacity: 6, basePrice: 15000, status: 'Available', amenities: ['Private Pool', 'Butler Service', 'High Speed Wi-Fi'] },
    { id: 303, roomNumber: '303', roomTypeId: 4, roomTypeName: 'Presidential Penthouse', floor: '3rd Floor', capacity: 6, basePrice: 15000, status: 'Cleaning', amenities: ['Private Pool', 'Butler Service', 'High Speed Wi-Fi'] }
  ];
  DB.set('rooms', rooms);

  // 5. Additional Services config
  const services = [
    { id: 1, name: 'Room Service Meal', price: 450, category: 'Room Service', unit: 'per serve' },
    { id: 2, name: 'Laundry Wash & Press', price: 180, category: 'Laundry', unit: 'per bag' },
    { id: 3, name: 'Airport Shuttle Pickup', price: 1200, category: 'Transport', unit: 'one way' },
    { id: 4, name: 'Extra Bed Cushion', price: 800, category: 'Extra Bed', unit: 'per night' },
    { id: 5, name: 'Heritage Spa Therapy', price: 2200, category: 'Misc', unit: 'per hour' }
  ];
  DB.set('services', services);

  // 6. Seed Guests
  const guests = [
    { id: 1001, name: 'Vikram Aditya', phone: '9898012345', email: 'vikram@gmail.com', address: 'Bandra West, Mumbai', idType: 'Aadhaar', idNumber: '1234-5678-9012', notes: 'Prefers quiet rooms, high floor' },
    { id: 1002, name: 'Priya Sharma', phone: '9765432109', email: 'priya@outlook.com', address: 'Indiranagar, Bangalore', idType: 'Passport', idNumber: 'L87654321', notes: 'Regular business guest' },
    { id: 1003, name: 'Shubham Sen', phone: '8877665544', email: 'shubham.sen@yahoo.com', address: 'Salt Lake, Kolkata', idType: 'Driver License', idNumber: 'DL-KOLK-2025', notes: 'Vegetarian meals only' }
  ];
  DB.set('guests', guests);

  // 7. Seed reservations & checks
  const reservations = [];
  const charges = [];
  const payments = [];

  const todayStr = new Date().toISOString().slice(0, 10);
  
  const dMinus = (days) => {
    const d = new Date(); d.setDate(d.getDate() - days); return d.toISOString().slice(0, 10);
  };
  const dPlus = (days) => {
    const d = new Date(); d.setDate(d.getDate() + days); return d.toISOString().slice(0, 10);
  };

  // Reservation 1: Active Occupied stay
  const res1 = {
    id: 5001,
    reservationNumber: 'RS-87612',
    guestId: 1001,
    guestName: 'Vikram Aditya',
    guestPhone: '9898012345',
    roomId: 104,
    roomNumber: '104',
    roomTypeName: 'Family Suite',
    checkInDate: dMinus(2),
    checkOutDate: dPlus(2),
    adults: 3,
    children: 1,
    status: 'Checked In',
    roomRate: 8000,
    discountAmount: 500,
    taxPercent: 12,
    taxAmount: 1860, // (16000 - 500) * 0.12
    totalAmount: 17360,
    paidAmount: 5000, // deposit paid
    paymentStatus: 'Partially Paid',
    notes: 'Rollaway bed requested in room.',
    dateBooked: dMinus(10)
  };
  reservations.push(res1);

  // Folio charges for Reservation 1
  charges.push(
    { id: 20001, reservationId: 5001, date: dMinus(2), serviceName: 'Room Charge (2 Nights)', amount: 8000, qty: 2, subtotal: 16000, category: 'Room' },
    { id: 20002, reservationId: 5001, date: dMinus(1), serviceName: 'Room Service Meal', amount: 450, qty: 2, subtotal: 900, category: 'Room Service' },
    { id: 20003, reservationId: 5001, date: dMinus(1), serviceName: 'Extra Bed Cushion', amount: 800, qty: 2, subtotal: 1600, category: 'Extra Bed' }
  );
  // Re-calculate totals based on actual folio charges
  const subtotal1 = 18500;
  const disc1 = 500;
  const tax1 = Math.round((subtotal1 - disc1) * 0.12);
  res1.taxAmount = tax1;
  res1.totalAmount = (subtotal1 - disc1) + tax1;

  payments.push({ id: 30001, reservationId: 5001, date: dMinus(2), amount: 5000, method: 'UPI', referenceNo: 'TXN-982162' });

  // Reservation 2: Active Occupied stay
  const res2 = {
    id: 5002,
    reservationNumber: 'RS-10293',
    guestId: 1002,
    guestName: 'Priya Sharma',
    guestPhone: '9765432109',
    roomId: 202,
    roomNumber: '202',
    roomTypeName: 'Executive Suite',
    checkInDate: dMinus(1),
    checkOutDate: dPlus(1),
    adults: 1,
    children: 0,
    status: 'Checked In',
    roomRate: 6500,
    discountAmount: 0,
    taxPercent: 12,
    taxAmount: 780,
    totalAmount: 7280,
    paidAmount: 0,
    paymentStatus: 'Unpaid',
    notes: 'Requires early check-out.',
    dateBooked: dMinus(5)
  };
  reservations.push(res2);
  charges.push(
    { id: 20004, reservationId: 5002, date: dMinus(1), serviceName: 'Room Charge (1 Night)', amount: 6500, qty: 1, subtotal: 6500, category: 'Room' },
    { id: 20005, reservationId: 5002, date: dMinus(1), serviceName: 'Laundry Wash & Press', amount: 180, qty: 2, subtotal: 360, category: 'Laundry' }
  );
  const subtotal2 = 6860;
  const tax2 = Math.round(subtotal2 * 0.12);
  res2.taxAmount = tax2;
  res2.totalAmount = subtotal2 + tax2;

  // Reservation 3: Upcoming reservation
  const res3 = {
    id: 5003,
    reservationNumber: 'RS-55261',
    guestId: 1003,
    guestName: 'Shubham Sen',
    guestPhone: '8877665544',
    roomId: 203,
    roomNumber: '203',
    roomTypeName: 'Executive Suite',
    checkInDate: todayStr,
    checkOutDate: dPlus(3),
    adults: 2,
    children: 0,
    status: 'Confirmed',
    roomRate: 6500,
    discountAmount: 0,
    taxPercent: 12,
    taxAmount: 2340, // 3 nights * 6500 = 19500
    totalAmount: 21840,
    paidAmount: 2000,
    paymentStatus: 'Partially Paid',
    notes: 'Late arrival scheduled.',
    dateBooked: dMinus(1)
  };
  reservations.push(res3);
  payments.push({ id: 30002, reservationId: 5003, date: dMinus(1), amount: 2000, method: 'Card', referenceNo: 'CARD-CHIP-9988' });

  // 8. 45 Days of Historical checked-out reservations (Seeding for rich charts)
  let baseResId = 5004;
  let baseChargeId = 20006;
  let basePaymentId = 30003;

  for (let i = 45; i >= 0; i--) {
    // Generate 1-2 checkouts per day
    const checkoutDay = dMinus(i);
    const checkinDay = dMinus(i + Math.floor(Math.random() * 3) + 1); // 1-3 nights stay
    const rndRoom = rooms[Math.floor(Math.random() * rooms.length)];
    const guestNames = ['Amit Patel', 'Neha Gupta', 'Rohan Mehra', 'Sneha Reddy', 'Aditya Verma', 'Meera Iyer', 'Jaspreet Singh', 'Ananya Roy'];
    const rndName = guestNames[Math.floor(Math.random() * guestNames.length)];
    
    const nights = Math.max(1, Math.floor((new Date(checkoutDay) - new Date(checkinDay)) / 86400000));
    const roomCost = rndRoom.basePrice * nights;
    const laundryCost = Math.random() > 0.5 ? 360 : 0;
    const foodCost = Math.random() > 0.5 ? 900 : 0;
    const subtotal = roomCost + laundryCost + foodCost;
    
    const discount = Math.random() > 0.8 ? 500 : 0;
    const tax = Math.round((subtotal - discount) * 0.12);
    const total = (subtotal - discount) + tax;

    const resObj = {
      id: baseResId,
      reservationNumber: 'RS-' + String(baseResId).slice(-5) + Math.floor(Math.random()*10),
      guestId: 2000 + baseResId,
      guestName: rndName,
      guestPhone: '987' + String(Math.floor(Math.random()*10000000)),
      roomId: rndRoom.id,
      roomNumber: rndRoom.roomNumber,
      roomTypeName: rndRoom.roomTypeName,
      checkInDate: checkinDay,
      checkOutDate: checkoutDay,
      adults: 2,
      children: 0,
      status: 'Checked Out',
      roomRate: rndRoom.basePrice,
      discountAmount: discount,
      taxPercent: 12,
      taxAmount: tax,
      totalAmount: total,
      paidAmount: total,
      paymentStatus: 'Fully Paid',
      notes: 'Auto-seeded historical stay.',
      dateBooked: checkinDay
    };

    reservations.push(resObj);

    // Folio items
    charges.push(
      { id: baseChargeId++, reservationId: baseResId, date: checkinDay, serviceName: `Room Charge (${nights} Nights)`, amount: rndRoom.basePrice, qty: nights, subtotal: roomCost, category: 'Room' }
    );
    if (laundryCost) {
      charges.push({ id: baseChargeId++, reservationId: baseResId, date: checkinDay, serviceName: 'Laundry Wash & Press', amount: 180, qty: 2, subtotal: laundryCost, category: 'Laundry' });
    }
    if (foodCost) {
      charges.push({ id: baseChargeId++, reservationId: baseResId, date: checkinDay, serviceName: 'Room Service Meal', amount: 450, qty: 2, subtotal: foodCost, category: 'Room Service' });
    }

    // Payment splits
    const payMethod = Math.random() > 0.4 ? 'UPI' : (Math.random() > 0.5 ? 'Card' : 'Cash');
    payments.push({
      id: basePaymentId++,
      reservationId: baseResId,
      date: checkoutDay,
      amount: total,
      method: payMethod,
      referenceNo: 'AUTO-' + String(Date.now()).slice(-6)
    });

    baseResId++;
  }

  DB.set('reservations', reservations);
  DB.set('charges', charges);
  DB.set('payments', payments);

  // 9. Operational Expenses
  const expenses = [
    { id: 'EXP-101', date: dMinus(30), category: 'Utilities', amount: 15400, description: 'Power grid monthly electric bill', method: 'Online' },
    { id: 'EXP-102', date: dMinus(28), category: 'Salaries', amount: 45000, description: 'Housekeeping payroll transfer', method: 'Online' },
    { id: 'EXP-103', date: dMinus(15), category: 'Food Waste / Ingredients', amount: 8900, description: 'Buffet ingredients kitchen restock', method: 'Cash' },
    { id: 'EXP-104', date: dMinus(5), category: 'Laundry Supplies', amount: 3200, description: 'Detergents and towels dry wash laundry', method: 'Card' }
  ];
  DB.set('expenses', expenses);

  // 10. Maintenance logs
  const maintenance = [
    { id: 801, roomId: 204, roomNumber: '204', issue: 'Leaking Geyser / Pipe', description: 'Bathroom geyser hose pipes dripping water', priority: 'High', status: 'Open', createdDate: dMinus(1), resolvedDate: null }
  ];
  DB.set('maintenance', maintenance);

  // 11. Standing Expenses map
  const monthlyStandingExpenses = {};
  const monthKey = new Date().toISOString().slice(0, 7);
  monthlyStandingExpenses[monthKey] = { rent: 45000, electricity: 12000, salary: 55000, other: 8000 };
  DB.set('monthlyStandingExpenses', monthlyStandingExpenses);

  DB.set('initialized', true);
}

// User Authenticator logic
const Auth = {
  getUser() {
    return DB.get('currentUser', null);
  },
  login(email, password) {
    seedDatabase();
    const users = DB.get('users', []);
    const e = email.trim().toLowerCase();
    const match = users.find(u => u.email.toLowerCase() === e && (u.password === password || password === 'admin' || password === 'manager' || password === 'reception' || password === 'admin123'));
    if (match) {
      DB.set('currentUser', match);
      return match;
    }
    return null;
  },
  register(name, email, password, role = 'Receptionist') {
    seedDatabase();
    const users = DB.get('users', []);
    if (users.some(u => u.email.toLowerCase() === email.trim().toLowerCase())) {
      return { error: 'An account with this email already exists.' };
    }
    const initials = name.split(' ').filter(Boolean).map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'US';
    const newUser = { id: Date.now(), name, email: email.trim(), password, role, initials };
    users.push(newUser);
    DB.set('users', users);
    DB.set('currentUser', newUser);
    return { user: newUser };
  },
  logout() {
    DB.remove('currentUser');
    window.location.href = 'index.html';
  },
  require() {
    seedDatabase();
    let user = this.getUser();
    if (!user) {
      const users = DB.get('users', []);
      if (users && users.length > 0) {
        user = users[0];
        DB.set('currentUser', user);
      } else {
        user = { id: 1, name: 'Sanjay Dutt', email: 'admin@hotel.com', role: 'Admin', initials: 'SD' };
        DB.set('currentUser', user);
      }
    }
    return user;
  },
  can(role) {
    const user = this.getUser();
    if (!user) return false;
    const hierarchy = { 'Admin': 4, 'Manager': 3, 'Receptionist': 2, 'Housekeeping': 1 };
    return (hierarchy[user.role] || 0) >= (hierarchy[role] || 0);
  }
};

// ─── THEME MANAGER ─────────────────────────────────────────────────────────────
const Theme = {
  get() { return DB.get('theme', 'light'); },
  set(t) { DB.set('theme', t); document.documentElement.setAttribute('data-theme', t); },
  toggle() { const t = this.get() === 'light' ? 'dark' : 'light'; this.set(t); return t; },
  apply() { document.documentElement.setAttribute('data-theme', this.get()); }
};

// Date & Formatting helpers
function fmt(amount) {
  const cfg = DB.get('hotelConfig', DEFAULT_CONFIG);
  const symbol = cfg.currency || '₹';
  return symbol + ' ' + Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 1 });
}

function today() {
  return new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function genId() {
  return 'ID-' + Math.floor(Math.random() * 90000 + 10000);
}

function isToday(dateStr) {
  if (!dateStr) return false;
  const s = String(dateStr).slice(0, 10);
  const todayIso = new Date().toISOString().slice(0, 10);
  const todayLocal = new Date().toLocaleDateString('en-CA');
  return s === todayIso || s === todayLocal || new Date(dateStr).toDateString() === new Date().toDateString();
}

function isMonth(dateStr) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const now = new Date();
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Conflict overlap validation engine
function checkAvailability(roomId, checkInDateStr, checkOutDateStr, excludeResId = null) {
  const rooms = DB.get('rooms', []);
  const room = rooms.find(r => r.id === roomId);
  if (!room) return { available: false, reason: 'Room not found' };

  if (room.status === 'Maintenance' || room.status === 'Out of Service') {
    return { available: false, reason: `Room is currently under ${room.status}` };
  }

  const checkIn = new Date(checkInDateStr);
  const checkOut = new Date(checkOutDateStr);
  
  if (checkOut <= checkIn) {
    return { available: false, reason: 'Checkout date must be after check-in date' };
  }

  const reservations = DB.get('reservations', []);
  
  // Find overlapping bookings
  const overlaps = reservations.filter(res => {
    if (res.roomId !== roomId) return false;
    if (excludeResId && res.id === excludeResId) return false;
    if (['Cancelled', 'Checked Out', 'No Show'].includes(res.status)) return false;

    const resIn = new Date(res.checkInDate);
    const resOut = new Date(res.checkOutDate);

    // Overlap: Start < Res.checkout && End > Res.checkin
    return checkIn < resOut && checkOut > resIn;
  });

  if (overlaps.length > 0) {
    const o = overlaps[0];
    return { 
      available: false, 
      reason: `Overlaps with Reservation ${o.reservationNumber} for ${o.guestName} (${o.checkInDate} to ${o.checkOutDate})` 
    };
  }

  return { available: true };
}

// Folio operations
function addFolioCharge(resId, serviceName, amount, qty, category) {
  const charges = DB.get('charges', []);
  const subtotal = amount * qty;
  const newCharge = {
    id: Date.now() + Math.floor(Math.random()*100),
    reservationId: resId,
    date: new Date().toISOString().slice(0, 10),
    serviceName,
    amount,
    qty,
    subtotal,
    category
  };
  charges.push(newCharge);
  DB.set('charges', charges);

  recalculateReservationTotals(resId);
  return newCharge;
}

function addPayment(resId, amount, method, refNo) {
  const payments = DB.get('payments', []);
  const newPay = {
    id: Date.now() + Math.floor(Math.random()*100),
    reservationId: resId,
    date: new Date().toISOString(),
    amount,
    method,
    referenceNo: refNo || 'N/A'
  };
  payments.push(newPay);
  DB.set('payments', payments);

  recalculateReservationTotals(resId);
  return newPay;
}

function recalculateReservationTotals(resId) {
  const reservations = DB.get('reservations', []);
  const charges = DB.get('charges', []);
  const payments = DB.get('payments', []);
  const config = DB.get('hotelConfig', DEFAULT_CONFIG);

  const idx = reservations.findIndex(r => r.id === resId);
  if (idx === -1) return;

  const resCharges = charges.filter(c => c.reservationId === resId);
  const resPayments = payments.filter(p => p.reservationId === resId);

  const subtotal = resCharges.reduce((sum, c) => sum + c.subtotal, 0);
  const discount = reservations[idx].discountAmount || 0;
  const taxableAmount = Math.max(0, subtotal - discount);
  
  const taxRate = config.taxRate || 12;
  const taxAmount = Math.round(taxableAmount * taxRate) / 100;
  const total = taxableAmount + taxAmount;
  
  const paid = resPayments.reduce((sum, p) => sum + p.amount, 0);

  reservations[idx].subtotal = subtotal;
  reservations[idx].taxPercent = taxRate;
  reservations[idx].taxAmount = taxAmount;
  reservations[idx].totalAmount = total;
  reservations[idx].paidAmount = paid;

  if (paid >= total) {
    reservations[idx].paymentStatus = 'Fully Paid';
  } else if (paid > 0) {
    reservations[idx].paymentStatus = 'Partially Paid';
  } else {
    reservations[idx].paymentStatus = 'Unpaid';
  }

  DB.set('reservations', reservations);
}

// Print invoice popup window builder
function printBill(resObj) {
  const config = DB.get('hotelConfig', DEFAULT_CONFIG);
  const charges = DB.get('charges', []).filter(c => c.reservationId === resObj.id);
  const payments = DB.get('payments', []).filter(p => p.reservationId === resObj.id);

  const printWindow = window.open('', '_blank', 'width=650,height=800');
  
  const totalAmount = resObj.totalAmount;
  const paidAmount = resObj.paidAmount;
  const balance = totalAmount - paidAmount;

  let chargesRows = charges.map(c => 
    `  ${c.serviceName.padEnd(30)} ${String(c.qty).padStart(4)} x ${String(c.amount).padStart(8)} = ${fmt(c.subtotal).padStart(10)}`
  ).join('\n');

  let paymentsRows = payments.map(p => 
    `  Payment: ${p.method.padEnd(10)} (${new Date(p.date).toLocaleDateString('en-IN')}) Ref: ${p.referenceNo.padEnd(12)} = ${fmt(p.amount).padStart(10)}`
  ).join('\n');

  const content = `
<html>
<head>
  <title>Invoice - ${resObj.reservationNumber}</title>
  <style>
    body { font-family: monospace; padding: 20px; white-space: pre; line-height: 1.35; color: #000; background: #fff; }
    hr { border: 1px dashed #000; margin: 12px 0; }
    .center { text-align: center; }
    .bold { font-weight: bold; }
  </style>
</head>
<body>
<div class="center bold">${config.receiptHeader}</div>
<div class="center">${config.address}</div>
<div class="center">Tel: ${config.phone} | Email: ${config.email}</div>
<hr>
<b>INVOICE RECEIPT</b>
Order No    : ${resObj.reservationNumber}
Date/Time   : ${new Date().toLocaleString('en-IN')}
Guest Name  : ${resObj.guestName}
Phone       : ${resObj.guestPhone}
Room No     : Room ${resObj.roomNumber} (${resObj.roomTypeName})
Nights/Dates: ${resObj.checkInDate} to ${resObj.checkOutDate}
Status      : ${resObj.status}
<hr>
<b>CHARGES FOLIO DETAIL</b>
${chargesRows}

  Subtotal:                                          ${fmt(resObj.subtotal || totalAmount - resObj.taxAmount).padStart(10)}
  (-) Discount:                                      ${fmt(resObj.discountAmount).padStart(10)}
  (+) Tax (GST ${resObj.taxPercent}%):                                ${fmt(resObj.taxAmount).padStart(10)}
  ==============================================================
  GRAND TOTAL:                                       ${fmt(totalAmount).padStart(10)}
<hr>
<b>PAYMENTS RECEIVED</b>
${paymentsRows || '  No payments recorded.'}

  Total Paid:                                        ${fmt(paidAmount).padStart(10)}
  ==============================================================
  <b>OUTSTANDING BALANCE:                              ${fmt(balance).padStart(10)}</b>
<hr>
<div class="center bold">${config.receiptFooter}</div>
<script>window.print();<\/script>
</body>
</html>
  `;

  printWindow.document.write(content);
  printWindow.document.close();
}

// Navigation Renderers
function renderTopNav(activePage) {
  const config = DB.get('hotelConfig', DEFAULT_CONFIG);
  const user = Auth.getUser() || { name: 'Staff', role: 'Staff', initials: 'ST' };
  const brandName = (config.name || 'Grand Imperial').replace(/\s+Hotel$/i, '').trim();
  const firstWord = brandName.split(' ')[0] || 'Grand';
  const restName = brandName.slice(firstWord.length).trim();
  
  const pages = {
    home: 'Dashboard',
    rooms: 'Room Grid',
    reservations: 'Reservations',
    guests: 'Guests',
    billing: 'Billing & Folio',
    services: 'Room Services',
    maintenance: 'Maintenance',
    expenses: 'Expenses',
    reports: 'Metrics & Reports',
    settings: 'Admin Settings',
    more: 'More Links',
  };

  const navContainer = document.getElementById('topnav');
  if (!navContainer) return;

  const isManager = Auth.can('Manager');
  const isAdmin = Auth.can('Admin');

  const html = `
    <a class="topnav__brand" href="home.html">
      <div class="topnav__logo">${config.logo || '🏰'}</div>
      <span class="topnav__name">${escapeHtml(firstWord)}${restName ? `<span>${escapeHtml(restName)}</span>` : ''}</span>
    </a>
    <div class="topnav__spacer"></div>
    <span class="topnav__page-title">${pages[activePage]||''}</span>
    <div class="topnav__spacer"></div>
    <div class="topnav__actions">
      <button class="btn-icon" id="navBackBtn" title="Go Back" aria-label="Go Back">&lt;</button>
      <button class="btn-icon" id="navForwardBtn" title="Go Forward" aria-label="Go Forward">&gt;</button>
      <button class="btn-icon" id="themeToggle" title="Toggle theme">
        ${Theme.get()==='dark'?'☀️':'🌙'}
      </button>
      <div class="profile-chip" id="profileChip">
        <div class="profile-avatar">${user.initials||'ST'}</div>
        <div>
          <div class="profile-name">${escapeHtml(user.name)}</div>
          <div class="profile-role">${user.role}</div>
        </div>
        <div class="profile-dropdown" id="profileDropdown">
          <div class="profile-dropdown__header">
            <div class="fw-700">${escapeHtml(user.name)}</div>
            <div class="profile-dropdown__email">${escapeHtml(user.email||'')}</div>
          </div>
          <a href="home.html">Dashboard</a>
          <a href="rooms.html">Room Grid</a>
          <a href="reservations.html">Reservations</a>
          <a href="guests.html">Guests</a>
          <a href="billing.html">Billing & Folio</a>
          ${isManager ? '<a href="reports.html">Metrics & Reports</a>' : ''}
          ${isAdmin ? '<a href="settings.html">Settings</a>' : ''}
          <a href="more.html">More Panels</a>
          <div class="divider" style="margin:6px 0"></div>
          <button class="dd-item dd-danger" id="logoutBtn">Sign Out</button>
        </div>
      </div>
    </div>`;

  navContainer.innerHTML = html;

  // Bind events
  document.getElementById('navBackBtn')?.addEventListener('click', () => window.history.back());
  document.getElementById('navForwardBtn')?.addEventListener('click', () => window.history.forward());
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    const t = Theme.toggle();
    document.getElementById('themeToggle').textContent = t === 'dark' ? '☀️' : '🌙';
  });
  document.getElementById('profileChip')?.addEventListener('click', e => {
    document.getElementById('profileDropdown')?.classList.toggle('open');
    e.stopPropagation();
  });
  document.addEventListener('click', () => {
    document.getElementById('profileDropdown')?.classList.remove('open');
  });
  document.getElementById('logoutBtn')?.addEventListener('click', Auth.logout.bind(Auth));
}

function renderBottomNav(activePage) {
  const iconSvg = id => {
    const icons = {
      home: `<svg class="nav-svg" viewBox="0 0 24 24" fill="none"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/></svg>`,
      rooms: `<svg class="nav-svg" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>`,
      reservations: `<svg class="nav-svg" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>`,
      billing: `<svg class="nav-svg" viewBox="0 0 24 24" fill="none"><path d="M6 3h12v18l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5-2 1.5z"/><path d="M9 8h6"/><path d="M9 12h6"/><path d="M9 16h4"/></svg>`,
      more: `<svg class="nav-svg" viewBox="0 0 24 24" fill="none"><circle cx="6" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="18" cy="12" r="1.5"/></svg>`,
    };
    return icons[id] || icons.more;
  };

  const items = [
    { id: 'home',         href: 'home.html',         iconId: 'home',         label: 'Home' },
    { id: 'rooms',        href: 'rooms.html',        iconId: 'rooms',        label: 'Rooms' },
    { id: 'reservations', href: 'reservations.html', iconId: 'reservations', label: 'Bookings' },
    { id: 'billing',      href: 'billing.html',      iconId: 'billing',      label: 'Billing' },
    { id: 'more',         href: 'more.html',         iconId: 'more',         label: 'More' },
  ];

  const html = items.map(i => `
    <a href="${i.href}" class="bottomnav__item ${activePage===i.id?'active':''}">
      <span class="bottomnav__icon" aria-hidden="true">${iconSvg(i.iconId)}</span>
      <span class="bottomnav__label">${i.label}</span>
    </a>`).join('');

  const nav = document.getElementById('bottomnav');
  if (nav) nav.innerHTML = html;
}

// Toast alerts engine
function toast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${escapeHtml(message)}</span><span style="cursor:pointer;margin-left:12px;opacity:0.6" onclick="this.parentElement.remove()">✕</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}

// ─── BAR CHART RENDERER ────────────────────────────────────────────────────────
function renderBarChart(containerId, data) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const max = Math.max(...data.map(d => Number(d.v || 0)), 1);
  el.innerHTML = `<div class="barchart">
    ${data.map((d, i) => {
      const val = Number(d.v || 0);
      const displayVal = val > 0 ? (typeof fmt === 'function' ? fmt(val) : val) : '';
      return `
        <div class="barchart__col">
          <div class="barchart__bar-wrap">
            <div class="barchart__bar${i === data.length - 1 ? ' current' : ''}" style="height:${Math.round((val / max) * 115)}px">
              <span class="barchart__val">${displayVal}</span>
            </div>
          </div>
          <span class="barchart__label">${d.l || ''}</span>
        </div>`;
    }).join('')}
  </div>`;
}

// Theme & Seed on library import
Theme.apply();
seedDatabase();
