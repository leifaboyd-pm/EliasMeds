/* Background push handler. Uses the compat builds because service workers
   import scripts via importScripts(). Keep the config below in sync with index.html. */
importScripts('https://www.gstatic.com/firebasejs/12.14.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.14.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCAeipdmiBqGy-Sk0VDXWmh3ycfdW5v-CA",
  authDomain: "elias-meds.firebaseapp.com",
  projectId: "elias-meds",
  storageBucket: "elias-meds.firebasestorage.app",
  messagingSenderId: "716456576963",
  appId: "1:716456576963:web:af23a183394c1c7ccd9f76"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const n = payload.notification || {};
  self.registration.showNotification(n.title || 'Elias — medicine due', {
    body: n.body || '',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    tag: 'elias-med'
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.matchAll({ type: 'window' }).then((list) => {
    for (const c of list) { if ('focus' in c) return c.focus(); }
    if (clients.openWindow) return clients.openWindow('./');
  }));
});
