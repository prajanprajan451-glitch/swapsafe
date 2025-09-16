import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const termsContent = `
**SWAPSAFE TERMS OF SERVICE**

**Last Updated: September 16, 2025**

**1. ACCEPTANCE OF TERMS**
By creating an account or using SwapSafe services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.

**2. DESCRIPTION OF SERVICE**
SwapSafe is a peer-to-peer marketplace platform that facilitates secure transactions between users through AI-powered scam detection, escrow services, and community trust systems.

**3. USER ACCOUNTS AND REGISTRATION**
- You must provide accurate and complete information during registration
- You are responsible for maintaining the confidentiality of your account credentials
- You must be at least 18 years old to create an account
- One account per person is permitted

**4. USER CONDUCT**
You agree not to:
- Use the service for any illegal or unauthorized purpose
- Engage in fraudulent activities or scams
- Harass, abuse, or harm other users
- Upload malicious software or spam
- Violate any applicable laws or regulations

**5. MARKETPLACE TRANSACTIONS**
- All transactions are between users; SwapSafe facilitates but is not party to transactions
- Users are responsible for the accuracy of their listings
- SwapSafe reserves the right to remove listings that violate our policies
- Escrow services are provided to protect both buyers and sellers

**6. AI SCAM DETECTION**
- Our AI system analyzes transactions for potential fraud
- Flagged transactions may be subject to additional verification
- Users agree to cooperate with verification processes
- AI decisions may be appealed through our dispute resolution process

**7. FEES AND PAYMENTS**
- Service fees apply to completed transactions
- Payment processing is handled by third-party providers
- Refunds are subject to our refund policy
- Users are responsible for applicable taxes

**8. INTELLECTUAL PROPERTY**
- SwapSafe retains all rights to the platform and its technology
- Users retain rights to their content but grant us license to use it for service provision
- Users must respect the intellectual property rights of others

**9. PRIVACY AND DATA PROTECTION**
- Your privacy is important to us
- Please review our Privacy Policy for details on data collection and use
- We implement security measures to protect your information
- You control your privacy settings and data sharing preferences

**10. DISPUTE RESOLUTION**
- We provide dispute resolution services for transaction conflicts
- Users agree to participate in good faith in dispute resolution processes
- Binding arbitration may be required for unresolved disputes
- Class action lawsuits are waived

**11. LIMITATION OF LIABILITY**
SwapSafe is not liable for:
- Actions or omissions of other users
- Loss or damage to items during transactions
- Technical failures or service interruptions
- Indirect, incidental, or consequential damages

**12. TERMINATION**
- Either party may terminate the agreement at any time
- We may suspend or terminate accounts for violations
- Termination does not affect completed transactions
- Certain provisions survive termination

**13. MODIFICATIONS**
- We may update these terms from time to time
- Users will be notified of material changes
- Continued use constitutes acceptance of updated terms
- Previous versions remain available for reference

**14. GOVERNING LAW**
These terms are governed by the laws of the jurisdiction where SwapSafe operates, without regard to conflict of law principles.

**15. CONTACT INFORMATION**
For questions about these terms, contact us at:
- Email: legal@swapsafe.com
- Address: SwapSafe Legal Department, 123 Tech Street, Digital City, DC 12345
- Phone: +1 (555) 123-SAFE

By clicking "I Agree," you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
  `;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-300 p-4">
      <div className="bg-background border border-border rounded-lg shadow-elevated max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading font-bold text-foreground">
            Terms of Service
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-smooth"
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="prose prose-sm max-w-none">
            {termsContent?.split('\n')?.map((paragraph, index) => {
              if (paragraph?.trim() === '') return null;
              
              if (paragraph?.startsWith('**') && paragraph?.endsWith('**')) {
                const text = paragraph?.slice(2, -2);
                if (text?.includes('SWAPSAFE TERMS OF SERVICE')) {
                  return (
                    <h1 key={index} className="text-2xl font-heading font-bold text-foreground mb-4 text-center">
                      {text}
                    </h1>
                  );
                }
                if (text?.startsWith('Last Updated:')) {
                  return (
                    <p key={index} className="text-sm text-text-secondary text-center mb-6">
                      {text}
                    </p>
                  );
                }
                if (/^\d+\./?.test(text)) {
                  return (
                    <h3 key={index} className="text-lg font-heading font-semibold text-foreground mt-6 mb-3">
                      {text}
                    </h3>
                  );
                }
                return (
                  <h4 key={index} className="font-semibold text-foreground mt-4 mb-2">
                    {text}
                  </h4>
                );
              }
              
              return (
                <p key={index} className="text-sm text-text-secondary mb-3 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-xs text-text-secondary">
              Last updated: September 16, 2025
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button variant="default" onClick={onClose}>
                I Understand
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;