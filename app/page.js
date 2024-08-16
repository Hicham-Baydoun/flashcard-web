"use client";
import { useState, useEffect } from 'react';
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [db, setDb] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }

    // Import Firebase only on the client side
    import('../firebase').then((firebase) => {
      setDb(firebase.db);
    }).catch((error) => {
      console.error('Error loading Firebase:', error);
    });
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
    } catch (error) {
      console.error('Error adding to waiting list: ', error);
      alert('Error adding to waiting list. Please try again.');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <main className={`${styles.main} ${darkMode ? styles.darkMode : ''}`}>
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
            <a href="https://www.linkedin.com/in/mohammad-ali-alaawar/" target="_blank" rel="noopener noreferrer">.Mohamad Ali Alaaawar</a><br />
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
