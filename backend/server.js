const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Mongoose Schema & Model
const submissionSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'Anonymous Fan' },
    email: { type: String, required: true, index: true },
    phone: { type: String, default: '' },
    interest: { type: String, default: 'All updates' },
    selected_episode_id: { type: String, default: '' },
    selected_episode_title: { type: String, default: 'All Episodes' },
    comment: { type: String, default: '' },
    learnings: { type: String, default: '' },
    guest_or_topic_suggestion: { type: String, default: '' },
    ipAddress: { type: String, default: '' },
  },
  { timestamps: true }
)

const Submission = mongoose.model('Submission', submissionSchema)

// Fallback in-memory storage if database URI is not provided yet
const memoryStorage = []

// Connect to MongoDB if MONGODB_URI is provided
const MONGODB_URI = process.env.MONGODB_URI
if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log('✓ Successfully connected to MongoDB Database!'))
    .catch((err) => console.error('✕ MongoDB Connection Error:', err.message))
} else {
  console.log('ℹ MONGODB_URI not provided. Running with memory fallback storage.')
}

// Routes

// 1. Health Check for Render
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'Epaphra Render Backend', timestamp: new Date() })
})

// 2. Submit Fan Feedback & Newsletter Registration
app.post('/api/feedback', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      interest,
      selected_episode_id,
      selected_episode_title,
      comment,
      learnings,
      guest_or_topic_suggestion,
    } = req.body

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Valid email address is required.' })
    }

    const cleanEmail = email.trim().toLowerCase()
    const submissionData = {
      name: name?.trim() || 'Anonymous Fan',
      email: cleanEmail,
      phone: phone?.trim() || '',
      interest: interest || 'All updates',
      selected_episode_id: selected_episode_id || '',
      selected_episode_title: selected_episode_title || 'All Episodes',
      comment: comment?.trim() || learnings?.trim() || '',
      learnings: learnings?.trim() || comment?.trim() || '',
      guest_or_topic_suggestion: guest_or_topic_suggestion?.trim() || '',
      createdAt: new Date(),
    }

    let isDuplicate = false

    if (mongoose.connection.readyState === 1) {
      // MongoDB is connected
      const existing = await Submission.findOne({ email: cleanEmail })
      if (existing) {
        isDuplicate = true;
      } else {
        await Submission.create(submissionData)
      }
    } else {
      // Fallback memory database
      const existing = memoryStorage.find((s) => s.email === cleanEmail)
      if (existing) {
        isDuplicate = true
      } else {
        memoryStorage.push(submissionData)
      }
    }

    if (isDuplicate) {
      return res.status(200).json({
        success: true,
        isDuplicate: true,
        message: "You're already part of the community!",
        email: cleanEmail,
      })
    }

    console.log('✓ New Fan Feedback Saved:', submissionData)

    return res.status(201).json({
      success: true,
      isDuplicate: false,
      message: "✓ YOU'RE IN. Welcome to the conversation!",
      data: submissionData,
    })
  } catch (error) {
    console.error('Error saving submission:', error)
    res.status(500).json({ success: false, message: 'Internal server error.' })
  }
})

// 3. Admin Access Route (Get all subscribers / submissions)
app.get('/api/subscribers', async (req, res) => {
  const adminSecret = process.env.ADMIN_SECRET || 'epaphra2026'
  const providedSecret = req.headers['x-admin-secret'] || req.query.secret

  if (providedSecret !== adminSecret) {
    return res.status(401).json({ success: false, message: 'Unauthorized access. Provide valid admin secret.' })
  }

  try {
    let submissions = []
    if (mongoose.connection.readyState === 1) {
      submissions = await Submission.find().sort({ createdAt: -1 })
    } else {
      submissions = memoryStorage
    }

    res.status(200).json({
      success: true,
      totalSubscribers: submissions.length,
      submissions,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch subscribers.' })
  }
})

// Start Express Server
app.listen(PORT, () => {
  console.log(`🚀 Epaphra Render Backend running on port ${PORT}`)
})
