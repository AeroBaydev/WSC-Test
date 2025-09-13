"use client"

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { motion } from 'framer-motion'

function RegistrationSuccessContent() {
  const searchParams = useSearchParams()
  const { user } = useUser()
  const [status, setStatus] = useState('loading')
  const [message, setMessage] = useState('')

  const clerkUserId = searchParams.get('clerkUserId')
  const category = searchParams.get('category')

  useEffect(() => {
    // Check if we're in a popup/iframe and should close automatically
    const isInPopup = window.opener || window.parent !== window;
    
    const confirmRegistration = async () => {
      if (!clerkUserId || !category) {
        setStatus('error')
        setMessage('Missing registration information')
        return
      }

      try {
        const response = await fetch('/api/mark-registered', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            clerkUserId,
            category,
          }),
        })

        const data = await response.json()

        if (data.success) {
          setStatus('success')
          setMessage('Registration confirmed successfully!')
          
          // If in popup, auto-close after 3 seconds
          if (isInPopup) {
            setTimeout(() => {
              try {
                if (window.opener && !window.opener.closed) {
                  window.opener.location.href = 'https://worldskillchallenge.com/#register';
                  window.close();
                } else if (window.parent && window.parent !== window) {
                  window.parent.location.href = 'https://worldskillchallenge.com/#register';
                }
              } catch (error) {
                window.location.href = 'https://worldskillchallenge.com/#register';
              }
            }, 3000);
          }
        } else {
          setStatus('already-registered')
          setMessage(data.message || 'Already registered in this category')
        }
      } catch (error) {
        console.error('Error confirming registration:', error)
        setStatus('error')
        setMessage('Failed to confirm registration. Please contact support.')
      }
    }

    confirmRegistration()
  }, [clerkUserId, category])

  const getStatusContent = () => {
    switch (status) {
      case 'loading':
        return {
          icon: '⏳',
          title: 'Confirming Registration...',
          description: 'Please wait while we confirm your registration.',
          color: 'text-blue-600'
        }
      case 'success':
        return {
          icon: '🎉',
          title: 'Congratulations! Registration Complete!',
          description: `You have successfully registered for ${category}. Welcome to World Skill Challenge 2025! Check your email for further instructions and competition details.`,
          color: 'text-green-600'
        }
      case 'already-registered':
        return {
          icon: 'ℹ️',
          title: 'Already Registered',
          description: `You are already registered for ${category}.`,
          color: 'text-orange-600'
        }
      case 'error':
        return {
          icon: '❌',
          title: 'Registration Error',
          description: message || 'Something went wrong. Please try again or contact support.',
          color: 'text-red-600'
        }
      default:
        return {
          icon: '❓',
          title: 'Unknown Status',
          description: 'Please contact support.',
          color: 'text-gray-600'
        }
    }
  }

  const statusContent = getStatusContent()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-6xl mb-6"
        >
          {statusContent.icon}
        </motion.div>

        <h1 className={`text-2xl font-bold mb-4 ${statusContent.color}`}>
          {statusContent.title}
        </h1>

        <p className="text-gray-600 mb-8 leading-relaxed">
          {statusContent.description}
        </p>

        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6"
          >
            <p className="text-green-700 text-sm">
              <strong>Category:</strong> {category}
            </p>
            <p className="text-green-700 text-sm">
              <strong>Registration Date:</strong> {new Date().toLocaleDateString()}
            </p>
          </motion.div>
        )}

        <div className="space-y-4">
          <motion.button
            onClick={() => {
              // Try multiple methods to redirect parent window
              try {
                if (window.opener && !window.opener.closed) {
                  // Payment was opened in popup
                  window.opener.location.href = 'https://worldskillchallenge.com/#register';
                  window.close();
                } else if (window.parent && window.parent !== window) {
                  // Payment was opened in iframe
                  window.parent.location.href = 'https://worldskillchallenge.com/#register';
                } else {
                  // Fallback: redirect current window
                  window.location.href = 'https://worldskillchallenge.com/#register';
                }
              } catch (error) {
                // If all else fails, redirect current window
                window.location.href = 'https://worldskillchallenge.com/#register';
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-semibold py-3 px-6 transition-all duration-300"
          >
            Back to Registration
          </motion.button>

          <motion.button
            onClick={() => {
              // Try multiple methods to redirect parent window
              try {
                if (window.opener && !window.opener.closed) {
                  // Payment was opened in popup
                  window.opener.location.href = 'https://worldskillchallenge.com/';
                  window.close();
                } else if (window.parent && window.parent !== window) {
                  // Payment was opened in iframe
                  window.parent.location.href = 'https://worldskillchallenge.com/';
                } else {
                  // Fallback: redirect current window
                  window.location.href = 'https://worldskillchallenge.com/';
                }
              } catch (error) {
                // If all else fails, redirect current window
                window.location.href = 'https://worldskillchallenge.com/';
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold py-3 px-6 transition-all duration-300"
          >
            Go to Homepage
          </motion.button>
        </div>

        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <p className="text-red-700 text-sm">
              If you continue to experience issues, please contact our support team at{' '}
              <a href="mailto:worldskillchallenge@gmail.com" className="underline">
                worldskillchallenge@gmail.com
              </a>
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-6">⏳</div>
        <h1 className="text-2xl font-bold mb-4 text-blue-600">Loading...</h1>
        <p className="text-gray-600 mb-8">Please wait while we prepare your registration details.</p>
      </div>
    </div>
  )
}

export default function RegistrationSuccess() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <RegistrationSuccessContent />
    </Suspense>
  )
}
