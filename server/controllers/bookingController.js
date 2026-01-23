import Booking from "../models/Booking.js";
import Room from "../models/room.js";
import Hotel from "../models/Hotel.js";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { sendEmail } from "../config/nodemailer.js";
import Stripe from "stripe";

// Send Booking Confirmation Email using Brevo API
const sendBookingConfirmationEmail = async ({ to, booking, room, hotel }) => {
  try {
    const subject = "🏨 Booking Confirmed – Roomora";

    const htmlContent = `
      <h2>Booking Confirmation</h2>
      <p>Your booking has been <strong>successfully confirmed</strong>.</p>

      <h3>Booking Details</h3>
      <ul>
        <li><strong>Hotel:</strong> ${hotel.name}</li>
        <li><strong>Room:</strong> ${room.title}</li>
        <li><strong>Check-in:</strong> ${new Date(booking.checkInDate).toDateString()}</li>
        <li><strong>Check-out:</strong> ${new Date(booking.checkOutDate).toDateString()}</li>
        <li><strong>Guests:</strong> ${booking.guests}</li>
        <li><strong>Total Price:</strong> $${booking.totalPrice}</li>
        <li><strong>Payment:</strong> ${booking.paymentMethod}</li>
      </ul>

      <p>Thank you for choosing <strong>Roomora</strong> 🌟</p>
    `;

    // Use your Brevo API function
    await sendEmail(to, subject, htmlContent);

    console.log(' Booking confirmation email sent to:', to);
  } catch (error) {
    console.error(" Email sending failed:", error.message);
    throw error;
  }
};

// Helper function to check Availability
export const checkAvailability = async (checkInDate, checkOutDate, roomId) => {
  try {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
      console.error("Invalid dates provided:", { checkInDate, checkOutDate });
      return false;
    }

    const bookings = await Booking.find({
      room: roomId,
      status: { $ne: "cancelled" },
      $or: [
        {
          checkInDate: { $lt: checkOut },
          checkOutDate: { $gt: checkIn },
        },
      ],
    });
    return bookings.length === 0;
  } catch (error) {
    console.error("Error checking availability:", error);
    return false;
  }
};

// API to check room availability
export const checkRoomAvailabilityAPI = async (req, res) => {
  try {
    const { checkInDate, checkOutDate, roomId } = req.body;
    const isAvailable = await checkAvailability(
      checkInDate,
      checkOutDate,
      roomId,
    );
    res.json({ success: true, available: isAvailable });
  } catch (error) {
    console.error("Error in availability API:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Create Booking
export const createBooking = async (req, res) => {
  try {
    const {
      room: roomId,
      hotel: hotelId,
      checkInDate,
      checkOutDate,
      guests,
      paymentMethod,
    } = req.body;

    const userId = req.auth().userId;

    const hotelData = await Hotel.findById(hotelId);
    if (hotelData && hotelData.owner === userId) {
      return res.status(403).json({
        success: false,
        message: "Owners cannot book their own property rooms.",
      });
    }

    const isAvailable = await checkAvailability(
      checkInDate,
      checkOutDate,
      roomId
    );

    if (!isAvailable) {
      return res.status(400).json({
        success: false,
        message: "Room is not available for the selected dates.",
      });
    }

    const roomData = await Room.findById(roomId);
    if (!roomData) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }

    const nights = Math.ceil(
      (new Date(checkOutDate) - new Date(checkInDate)) /
      (1000 * 60 * 60 * 24)
    );

    const totalPrice = nights * roomData.pricePerNight;

    const newBooking = new Booking({
      user: userId,
      room: roomId,
      hotel: hotelId,
      checkInDate,
      checkOutDate,
      totalPrice,
      guests: Number(guests),
      paymentMethod,
      isPaid: paymentMethod === "Online Payment",
      status: "confirmed",
    });

    await newBooking.save();

    /* ===== SEND EMAIL ===== */
    try {
      const user = await clerkClient.users.getUser(userId);
      const email = user?.emailAddresses?.[0]?.emailAddress;

      if (email) {
        await sendBookingConfirmationEmail({
          to: email,
          booking: newBooking,
          room: roomData,
          hotel: hotelData,
        });
      }
    } catch (err) {
      console.error("Email sending failed:", err.message);
    }

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get User Bookings
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.auth().userId;
    const bookings = await Booking.find({ user: userId })
      .populate("room")
      .populate("hotel")
      .sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get hotel bookings
export const getHotelBookings = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const bookings = await Booking.find({ hotel: hotelId })
      .populate("room")
      .populate("user")
      .sort({ createdAt: -1 });

    const totalBookings = bookings.length;
    const totalEarnings = bookings
      .filter((b) => b.status === "confirmed")
      .reduce((sum, b) => sum + b.totalPrice, 0);

    res.json({ success: true, bookings, totalBookings, totalEarnings });
  } catch (error) {
    console.error("Error fetching hotel bookings:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}
// Stripe payment intent
export const stripePayment = async (req, res) => {
  try {
    const { bookingId } = req.body;

    // Validate bookingId
    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required"
      });
    }

    // Find booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    // Check if booking is already paid
    if (booking.isPaid) {
      return res.status(400).json({
        success: false,
        message: "This booking has already been paid"
      });
    }

    // Find room data with hotel
    const roomData = await Room.findById(booking.room).populate('hotel');
    if (!roomData || !roomData.hotel) {
      return res.status(404).json({
        success: false,
        message: "Room or hotel information not found"
      });
    }

    const totalPrice = booking.totalPrice;
    const { origin } = req.headers;

    // Validate origin
    if (!origin) {
      return res.status(400).json({
        success: false,
        message: "Origin header is required"
      });
    }

    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

    const lineItems = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${roomData.title} at ${roomData.hotel.name}`,
            description: `Booking from ${new Date(booking.checkInDate).toDateString()} to ${new Date(booking.checkOutDate).toDateString()}`,
          },
          unit_amount: Math.round(totalPrice * 100), // Ensure it's an integer
        },
        quantity: 1,
      },
    ];

    // Create a Stripe Checkout Session
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      mode: 'payment',
      success_url: `${origin}/verify?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/my-bookings`,
      metadata: {
        bookingId: booking._id.toString(),
        userId: booking.user?.toString() // Correct field name is 'user'
      },
    });

    res.json({
      success: true,
      sessionId: session.id,
      url: session.url // Optional: return the checkout URL directly
    });

  } catch (error) {
    console.error("Error creating Stripe payment intent:", error);

    // Handle specific Stripe errors
    if (error.type === 'StripeCardError') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create payment session. Please try again."
    });
  }
};

// Stripe Webhook Handler
export const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
    // Use req.rawBody (buffer) for signature verification
    event = stripeInstance.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const bookingId = session.metadata.bookingId;

      try {
        // Update booking to mark as paid
        const booking = await Booking.findById(bookingId);
        if (booking) {
          booking.isPaid = true;
          booking.status = 'confirmed';
          await booking.save();
          console.log(` Booking ${bookingId} marked as paid`);
        } else {
          console.error(` Booking ${bookingId} not found`);
        }
      } catch (error) {
        console.error('Error updating booking:', error);
      }
      break;

    case 'checkout.session.expired':
    case 'payment_intent.payment_failed':
      const failedSession = event.data.object;
      console.log(` Payment failed for session: ${failedSession.id}`);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
};

// Verify Stripe Payment
export const verifyStripePayment = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const userId = req.auth().userId;

    if (!sessionId) {
      return res.status(400).json({ success: false, message: "Session ID is required" });
    }

    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripeInstance.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      const bookingId = session.metadata.bookingId;

      const booking = await Booking.findById(bookingId);
      if (!booking) {
        return res.status(404).json({ success: false, message: "Booking not found" });
      }

      // Ensure the booking belongs to the authenticated user
      if (booking.user.toString() !== userId) {
        return res.status(403).json({ success: false, message: "Unauthorized access" });
      }

      if (!booking.isPaid) {
        booking.isPaid = true;
        booking.status = 'confirmed';
        await booking.save();
      }

      return res.json({ success: true, message: "Payment verified successfully", bookingId });
    } else {
      return res.json({ success: false, message: "Payment not completed yet" });
    }

  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};