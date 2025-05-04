"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link
            href="/"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Link>

          <div className="prose prose-invert prose-purple max-w-none">
            <h1 className="text-3xl font-bold text-purple-400 mb-6">CleaNote – Privacy Policy</h1>
            <p className="text-gray-400 mb-8">Effective Date: May 3, 2025</p>

            <p>
              Your privacy is important to us. This Privacy Policy explains how CleaNote ("we", "our", "us") collects,
              uses, and protects your information.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. Data We Collect</h2>
            <p>
              <strong>Google Account Information:</strong> When you sign in, we access your basic profile (name and
              email) for authentication.
            </p>
            <p>
              <strong>Google Drive Access:</strong> CleaNote uses Google Drive to store your notes in a private,
              app-specific folder.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. How We Use Your Data</h2>
            <p>We use your data strictly to:</p>
            <ul className="list-disc pl-6 mt-2 mb-4">
              <li>Authenticate your identity via your Google Account</li>
              <li>Store and manage your notes within your Google Drive</li>
            </ul>
            <p>We do not sell, rent, or share your personal data with any third parties.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Data Storage</h2>
            <p>
              All your notes are stored directly in your Google Drive. CleaNote does not store any user-created content
              on our servers.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Permissions</h2>
            <p>
              CleaNote uses Google's OAuth 2.0 protocol to request access to your Drive. You can review or revoke these
              permissions at any time via your Google Account settings.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Security</h2>
            <p>
              We use industry-standard encryption and security practices to ensure secure communication between CleaNote
              and Google services. However, no system is completely immune to vulnerabilities, and we cannot guarantee
              absolute security.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Your Rights</h2>
            <p>You have full control over your data. You can:</p>
            <ul className="list-disc pl-6 mt-2 mb-4">
              <li>View, edit, or delete your notes directly from Google Drive</li>
              <li>Revoke CleaNote's access from your Google Account permissions page at any time</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">7. Changes</h2>
            <p>
              We may update this Privacy Policy from time to time. If we make significant changes, we'll notify you
              through the app or via your email.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">8. Contact</h2>
            <p>
              If you have any questions or privacy concerns, please contact us at:
              <br />
              <a href="mailto:shekharbarca10@gmail.com" className="text-purple-400 hover:text-purple-300">
                shekharbarca10@gmail.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
