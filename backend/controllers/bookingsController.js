// backend/controllers/bookingsController.js
const config = require('../config');
const oracledb = require('oracledb');

// Fallback mock DB
const mockBookings = [];

exports.createBooking = async (req, res) => {
  const { customer_id, room_id, checkin, checkout } = req.body;
  if (config.MOCK_MODE) {
    // Mock mode: just push to array
    const booking = {
      booking_id: mockBookings.length + 1,
      customer_id,
      room_id,
      checkin,
      checkout,
      status: 'reserved'
    };
    mockBookings.push(booking);
    return res.status(201).json({ booking_id: booking.booking_id, mock: true });
  }

  // Oracle DB mode
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: config.ORACLE_USER,
      password: config.ORACLE_PASSWORD,
      connectString: config.ORACLE_CONNECTSTRING
    });

    const result = await connection.execute(
      `BEGIN CreateBooking(:customer_id, :room_id, TO_DATE(:checkin, 'YYYY-MM-DD'), TO_DATE(:checkout, 'YYYY-MM-DD'), :booking_id); END;`,
      {
        customer_id,
        room_id,
        checkin,
        checkout,
        booking_id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      }
    );
    await connection.commit();
    res.status(201).json({ booking_id: result.outBinds.booking_id });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ error: 'Booking failed' });
  } finally {
    if (connection) await connection.close();
  }
};
