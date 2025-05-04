"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

export default function TermsOfService() {
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
            <h1 className="text-3xl font-bold text-purple-400 mb-6">CleaNote – Terms of Service</h1>
            <p className="text-gray-400 mb-8">Effective Date: May 3, 2025</p>

            <p>
              Welcome to CleaNote! These Terms of Service ("Terms") govern your use of our note-taking application
              ("Service"). By accessing or using CleaNote, you agree to be bound by these Terms.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. Use of Service</h2>
            <p>
              You may use CleaNote only if you are 13 years or older and capable of entering into a legally binding
              agreement. You are responsible for maintaining the confidentiality of your account and for all activities
              that occur under it.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Google Account Integration</h2>
            <p>
              CleaNote uses Google APIs to store and manage your notes in Google Drive. By using the app, you grant
              CleaNote permission to access and manage a dedicated folder in your Google Drive, solely for the purpose
              of storing, retrieving, and updating your notes.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. User Content</h2>
            <p>
              You retain full ownership of all content you create using CleaNote. We do not claim ownership or rights to
              your content beyond what is necessary to operate the Service.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. Restrictions</h2>
            <p>
              You agree not to misuse CleaNote, attempt unauthorized access, or use the Service in a way that could harm
              others or disrupt its operation.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to CleaNote if you violate these Terms or engage
              in harmful or unlawful behavior while using the app.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Modifications</h2>
            <p>
              We may update these Terms occasionally. If changes are significant, we will notify users through the app
              or by other means. Continued use of the Service after changes means you accept the revised Terms.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">7. Disclaimer</h2>
            <p>
              CleaNote is provided "as is" without warranties of any kind. We are not liable for data loss, service
              interruptions, or any damages resulting from the use or inability to use the Service.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">8. Contact</h2>
            <p>
              If you have any questions or concerns about these Terms, please contact us at:
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
