import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db, initAuth } from '../firebase';

const INITIAL_VOCAB = [
  { id: '1', words: ['garbage'], pos: 'n', definition: 'Waste food, paper, and rubbish thrown away.', example: 'Don\'t forget to take out the garbage.', status: 'Learning', group: 'L13-SatAth' },
  { id: '2', words: ['alter'], pos: 'v', definition: 'To change something, usually slightly.', example: 'We had to alter our plans due to rain.', status: 'Mastered', group: 'L13-SatAth' },
  { id: '3', words: ['incessant'], pos: 'adj', definition: 'Never stopping, especially in an annoying way.', example: 'The incessant noise kept us awake.', status: 'Needs Review', group: 'L13-SatAth' }
];

export function useVocabSync() {
  const [vocabList, setVocabList] = useState([]);
  const [customGroups, setCustomGroups] = useState(['L13-SatAth', 'General']);
  const [syncStatus, setSyncStatus] = useState('connecting');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    let unsubscribeDoc = null;

    initAuth().then((user) => {
      if (!user) {
        setSyncStatus('offline');
        setVocabList(INITIAL_VOCAB);
        return;
      }
      setUserId(user.uid);
      const userDocRef = doc(db, 'users', user.uid, 'data', 'vocab_store');

      unsubscribeDoc = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setVocabList(data.vocabList || []);
          setCustomGroups(data.customGroups || ['L13-SatAth', 'General']);
        } else {
          setDoc(userDocRef, {
            vocabList: INITIAL_VOCAB,
            customGroups: ['L13-SatAth', 'General'],
            updatedAt: Date.now()
          });
          setVocabList(INITIAL_VOCAB);
        }
        setSyncStatus('synced');
      }, (err) => {
        console.error('Cloud Sync Error:', err);
        setSyncStatus('offline');
      });
    });

    return () => {
      if (unsubscribeDoc) unsubscribeDoc();
    };
  }, []);

  const updateCloudState = async (newVocab, newGroups) => {
    setVocabList(newVocab);
    if (newGroups) setCustomGroups(newGroups);

    if (userId) {
      try {
        const userDocRef = doc(db, 'users', userId, 'data', 'vocab_store');
        await setDoc(userDocRef, {
          vocabList: newVocab,
          customGroups: newGroups || customGroups,
          updatedAt: Date.now()
        }, { merge: true });
      } catch (e) {
        console.error("Local save OK, cloud sync queued offline:", e);
      }
    }
  };

  return { vocabList, customGroups, syncStatus, updateCloudState };
}
