// frontend/src/components/BookingModal.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import confettiAnimation from '../assets/confetti.json'; // Download a confetti Lottie JSON

const modalVariants = {
  hidden: { opacity: 0, y: 100, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  exit: { opacity: 0, y: -100, scale: 0.95 }
};

export default function BookingModal() {
  const [showModal, setShowModal] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      setShowModal(false);
      setConfirmed(false);
    }, 2500);
  };

  return (
    <div>
      <button
        className="px-6 py-3 bg-[#00C2A8] text-white rounded-lg font-semibold shadow-lg hover:bg-[#F6C85F] transition"
        onClick={() => setShowModal(true)}
      >
        Book Room
      </button>
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            <motion.div
              className="bg-white rounded-xl p-8 shadow-2xl w-[400px] relative"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              {!confirmed ? (
                <>
                  <h2 className="text-2xl font-bold mb-4 text-[#8E44AD]">Confirm Booking</h2>
                  <ul className="mb-6">
                    <motion.li
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-lg"
                    >
                      Room: Deluxe Suite
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-lg"
                    >
                      Price: $350
                    </motion.li>
                    <motion.li
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-lg"
                    >
                      Dates: 2025-09-15 to 2025-09-18
                    </motion.li>
                  </ul>
                  <button
                    className="w-full py-3 bg-gradient-to-r from-[#FF6B6B] to-[#8E44AD] text-white font-bold rounded-lg shadow-lg hover:scale-105 transition"
                    onClick={handleConfirm}
                  >
                    Confirm & Book
                  </button>
                </>
              ) : (
                <motion.div
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: 180 }}
                  transition={{ duration: 0.7 }}
                  className="flex flex-col items-center"
                >
                  <Lottie animationData={confettiAnimation} style={{ width: 120, height: 120 }} />
                  <h3 className="text-xl font-bold text-[#00C2A8] mt-4">Booking Confirmed!</h3>
                </motion.div>
              )}
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-[#FF6B6B] text-xl"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
