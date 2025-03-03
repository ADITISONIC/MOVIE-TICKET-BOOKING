const { setAsync, getAsync, delAsync } = require("../utils/redis");

const lockSeats = async (showId, seats, userId) => {
  const lockKey = `lock:${showId}:${seats.join(",")}`;
  const lockValue = userId;

  // Set a lock for 10 minutes (600 seconds)
  await setAsync(lockKey, lockValue, "EX", 600);
};

const releaseSeats = async (showId, seats) => {
  const lockKey = `lock:${showId}:${seats.join(",")}`;
  await delAsync(lockKey);
};

const checkSeatAvailability = async (showId, seats) => {
  for (const seat of seats) {
    const lockKey = `lock:${showId}:${seat}`;
    const lockValue = await getAsync(lockKey);
    if (lockValue) {
      throw new Error(`Seat ${seat} is already locked.`);
    }
  }
};

const bookTicket = async (req, res) => {
  const { showId, seats, userId } = req.body;

  try {
    // Check seat availability
    await checkSeatAvailability(showId, seats);

    // Lock seats
    await lockSeats(showId, seats, userId);

    // Proceed with booking logic
    const show = await Show.findById(showId);
    const totalPrice = calculatePrice(
      show.basePrice,
      seats.length,
      show.seatsAvailable,
      show.startTime - Date.now()
    );

    const booking = new Booking({
      userId,
      showId,
      seatsBooked: seats.length,
      totalPrice,
      status: "pending",
    });

    await booking.save();

    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};