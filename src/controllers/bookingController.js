const { setAsync, getAsync, delAsync } = require("../utils/redis");
const Show = require("../models/showModel");
const Booking = require("../models/bookingModel");

// Lock seats for a specific user
const lockSeats = async (showId, seats, userId) => {
  const lockKey = `lock:${showId}:${seats.join(",")}`;
  const lockValue = userId;

  // Set a lock for 10 minutes (600 seconds)
  await setAsync(lockKey, lockValue, "EX", 600);
};

// Release seats
const releaseSeats = async (showId, seats) => {
  const lockKey = `lock:${showId}:${seats.join(",")}`;
  await delAsync(lockKey);
};

// Check if seats are available
const checkSeatAvailability = async (showId, seats) => {
  for (const seat of seats) {
    const lockKey = `lock:${showId}:${seat}`;
    const lockValue = await getAsync(lockKey);
    if (lockValue) {
      throw new Error(`Seat ${seat} is already locked.`);
    }
  }
};

// Calculate dynamic price
const calculatePrice = (basePrice, seatsBooked, totalSeats, timeLeft) => {
  let finalPrice = basePrice;

  // If 70%+ seats are booked, increase price by 30%
  if (seatsBooked / totalSeats >= 0.7) finalPrice *= 1.3;

  // If booking is within 3 hours of the show, increase price by 20%
  if (timeLeft <= 3 * 60 * 60 * 1000) finalPrice *= 1.2;

  // Peak hours (7 PM - 10 PM)
  const now = new Date();
  const hours = now.getHours();
  if (hours >= 19 && hours <= 22) finalPrice *= 1.5;

  return finalPrice;
};

// Book tickets
const bookTicket = async (req, res) => {
  const { showId, seats, userId } = req.body;

  try {
    // Check seat availability
    await checkSeatAvailability(showId, seats);

    // Lock seats
    await lockSeats(showId, seats, userId);

    // Fetch show details
    const show = await Show.findById(showId);
    if (!show) {
      await releaseSeats(showId, seats); // Release seats if show not found
      throw new Error("Show not found");
    }

    // Check if enough seats are available
    if (seats.length > show.seatsAvailable) {
      await releaseSeats(showId, seats); // Release seats if not enough seats
      throw new Error("Not enough seats available");
    }

    // Calculate total price
    const totalPrice = calculatePrice(
      show.basePrice,
      seats.length,
      show.seatsAvailable,
      show.startTime - Date.now()
    );

    // Create booking
    const booking = new Booking({
      userId,
      showId,
      seatsBooked: seats.length,
      totalPrice,
      status: "pending",
    });

    await booking.save();

    // Update seats available in the show
    show.seatsAvailable -= seats.length;
    await show.save();

    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Release expired bookings (to be called by a cron job)
const releaseExpiredBookings = async () => {
  const expiredBookings = await Booking.find({
    status: "pending",
    createdAt: { $lt: new Date(Date.now() - 10 * 60 * 1000) }, // 10 minutes ago
  });

  for (const booking of expiredBookings) {
    await releaseSeats(booking.showId, booking.seatsBooked);
    await Booking.findByIdAndUpdate(booking._id, { status: "cancelled" });

    // Restore seats available in the show
    const show = await Show.findById(booking.showId);
    if (show) {
      show.seatsAvailable += booking.seatsBooked;
      await show.save();
    }
  }
};
const getBookings = async (req, res) => {
  const { userId } = req.query;

  try {
    const bookings = await Booking.find({ userId }).populate(
      "showId",
      "startTime endTime"
    );
    res.status(200).json(bookings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching bookings", error: error.message });
  }
};


module.exports = { bookTicket, releaseExpiredBookings, getBookings };
