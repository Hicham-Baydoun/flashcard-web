"use client";
import { db, analytics } from './firebaseClient';
import { useState, useEffect } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import { logEvent } from 'firebase/analytics';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    // Track page view
    if (typeof window !== 'undefined' && analytics) {
      logEvent(analytics, 'page_view', {
        page_title: 'Home',
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
    }

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!db) {
      console.error('Firebase not initialized');
      return;
    }
    try {
      const { collection, addDoc } = await import('firebase/firestore');
      await addDoc(collection(db, 'waitingList'), {
        name,
        email,
        timestamp: new Date()
      });
      alert('Successfully added to waiting list');
      setName('');
      setEmail('');
      
      // Track custom event
      if (analytics) {
        logEvent(analytics, 'waiting_list_signup', {
          method: 'form_submission'
        });
      }
    } catch (error) {
      console.error('Error adding to waiting list: ', error);
      alert('Error adding to waiting list. Please try again.');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <main className={`${styles.main} ${darkMode ? styles.darkMode : ''} ${isMobile ? styles.mobile : ''}`}>
      <button onClick={toggleDarkMode} className={styles.darkModeToggle}>
        {darkMode ? '☀️' : '🌙'}
      </button>

      <div className={styles.header}>
        <h1>CodeLingo</h1>
        <h2>Your Study Companion</h2>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2 className={styles.credits}><ul><li>Purpose</li></ul></h2>
          <p>Transform your learning journey into a seamless and enjoyable experience.</p>
        </div>

        <div className={styles.card}>
        <h2 className={styles.credits}><ul><li>Goal</li></ul></h2>
          <p>Deliver a comprehensive platform for efficient and engaging coding education, ensuring accessibility for learners of all backgrounds.</p>
        </div>

        <div className={styles.card}>
        <h2 className={styles.credits}><ul><li>Future Upgrades</li></ul></h2>
          <p>Implement AI-driven personalized learning paths, real-time code analysis, and more.</p>
        </div>

        <div className={styles.card}>
        <h2 className={styles.credits}><ul><li>Made By</li></ul></h2>
          <p>
            <a href="https://www.linkedin.com/in/nada-baydoun/" target="_blank" rel="noopener noreferrer">.Nada Baydoun</a><br />
            <a href="https://www.linkedin.com/in/mohammad-ali-alaawar/" target="_blank" rel="noopener noreferrer">.Mohamad Ali Alaawar</a><br />
            <a href="https://www.linkedin.com/in/jana-w-63743222b/" target="_blank" rel="noopener noreferrer">.Jana Ward</a><br />
            <a href="https://www.linkedin.com/in/hicham-baydoun/" target="_blank" rel="noopener noreferrer">.Hicham Baydoun</a>
          </p>
        </div>
      </div>

      <div className={styles.waitingList}>
        <h2>Join our Waiting List</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Join Waiting List</button>
        </form>
      </div>
    </main>
  );
}