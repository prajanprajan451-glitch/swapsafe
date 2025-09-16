import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PrivacyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const privacyContent = `
**SWAPSAFE PRIVACY POLICY**

**Last Updated: September 16, 2025**

**1. INTRODUCTION**
SwapSafe ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our peer-to-peer marketplace platform.

**2. INFORMATION WE COLLECT**

**Personal Information:**
- Name, email address, phone number
- Identity verification documents (through DigiLocker)
- Payment information (processed by third-party providers)
- Profile photos and user-generated content

**Transaction Information:**
- Purchase and sale history
- Communication with other users
- Dispute and resolution records
- Trust scores and ratings

**Technical Information:**
- Device information and IP address
- Browser type and operating system
- Usage patterns and preferences
- Location data (with permission)

**AI and Analytics Data:**
- Transaction patterns for scam detection
- User behavior analytics
- Performance metrics
- Security monitoring data

**3. HOW WE USE YOUR INFORMATION**

**Service Provision:**
- Create and manage your account
- Facilitate marketplace transactions
- Process payments and escrow services
- Provide customer support

**Safety and Security:**
- AI-powered scam detection and prevention
- Identity verification and trust scoring
- Fraud monitoring and investigation
- Platform security and integrity

**Communication:**
- Transaction notifications and updates
- Marketing communications (with consent)
- Policy updates and important notices
- Customer service responses

**Improvement and Analytics:**
- Platform performance optimization
- User experience enhancement
- Feature development and testing
- Market research and analytics

**4. INFORMATION SHARING AND DISCLOSURE**

**With Other Users:**
- Public profile information
- Transaction history and ratings
- Communication within the platform
- Trust scores and verification status

**With Service Providers:**
- Payment processors for transaction handling
- Identity verification services (DigiLocker)
- Cloud storage and hosting providers
- Analytics and marketing platforms

**Legal Requirements:**
- Compliance with applicable laws
- Response to legal processes
- Protection of rights and safety
- Prevention of fraud and illegal activities

**Business Transfers:**
- Merger, acquisition, or sale of assets
- Bankruptcy or reorganization
- Due diligence processes
- Successor entity transfers

**5. DATA SECURITY**

**Technical Safeguards:**
- Encryption of data in transit and at rest
- Secure server infrastructure
- Regular security audits and testing
- Access controls and authentication

**Organizational Measures:**
- Employee training on data protection
- Limited access on need-to-know basis
- Incident response procedures
- Regular policy reviews and updates

**6. YOUR PRIVACY RIGHTS**

**Access and Control:**
- View and update your personal information
- Download your data in portable format
- Delete your account and associated data
- Control privacy settings and preferences

**Communication Preferences:**
- Opt-out of marketing communications
- Choose notification preferences
- Manage cookie settings
- Control data sharing options

**Legal Rights (where applicable):**
- Right to rectification of inaccurate data
- Right to erasure ("right to be forgotten")
- Right to restrict processing
- Right to data portability

**7. COOKIES AND TRACKING**

**Types of Cookies:**
- Essential cookies for platform functionality
- Analytics cookies for usage insights
- Preference cookies for user settings
- Marketing cookies for targeted advertising

**Cookie Management:**
- Browser settings for cookie control
- Opt-out options for non-essential cookies
- Third-party cookie policies
- Regular cookie policy updates

**8. THIRD-PARTY SERVICES**

**Integrated Services:**
- DigiLocker for identity verification
- Payment processors (RazorPay, etc.)
- Social media login providers
- Analytics and advertising platforms

**External Links:**
- Links to third-party websites
- Separate privacy policies apply
- No control over external practices
- User responsibility for external sites

**9. DATA RETENTION**

**Retention Periods:**
- Account data: Duration of account plus 7 years
- Transaction records: 7 years for legal compliance
- Communication logs: 3 years for dispute resolution
- Analytics data: 2 years for business insights

**Deletion Criteria:**
- Account closure and user request
- Legal retention requirements fulfilled
- Business purpose no longer applicable
- Data minimization principles

**10. INTERNATIONAL DATA TRANSFERS**

**Cross-Border Processing:**
- Data may be processed in different countries
- Adequate protection measures in place
- Compliance with applicable transfer laws
- User consent for international transfers

**11. CHILDREN'S PRIVACY**
- Services not intended for users under 18
- No knowing collection of children's data
- Parental consent required for minors
- Immediate deletion of children's data if discovered

**12. CHANGES TO THIS POLICY**
- Regular review and updates
- Notification of material changes
- Effective date of new versions
- Continued use implies acceptance

**13. CONTACT INFORMATION**

**Privacy Inquiries:**
- Email: privacy@swapsafe.com
- Address: SwapSafe Privacy Team, 123 Tech Street, Digital City, DC 12345
- Phone: +1 (555) 123-SAFE
- Response time: Within 30 days

**Data Protection Officer:**
- Email: dpo@swapsafe.com
- Direct line for privacy concerns
- Independent oversight of data practices
- Liaison with regulatory authorities

By using SwapSafe, you acknowledge that you have read and understood this Privacy Policy and agree to the collection, use, and disclosure of your information as described herein.
  `;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-300 p-4">
      <div className="bg-background border border-border rounded-lg shadow-elevated max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading font-bold text-foreground">
            Privacy Policy
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
            {privacyContent?.split('\n')?.map((paragraph, index) => {
              if (paragraph?.trim() === '') return null;
              
              if (paragraph?.startsWith('**') && paragraph?.endsWith('**')) {
                const text = paragraph?.slice(2, -2);
                if (text?.includes('SWAPSAFE PRIVACY POLICY')) {
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

export default PrivacyModal;