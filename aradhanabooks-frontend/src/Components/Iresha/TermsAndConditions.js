 import React from "react";
import "./TermsAndConditions.css";  

const TermsAndConditions = () => {
  return (
    <div className="iresha-terms-wrapper">
      <h1 className=".iresha-h1">Terms and Conditions</h1>

      <h2 className=".iresha-h2">1. Introduction</h2>
      <p className=".iresha-p">
        Welcome to Aradhana Books & Stationary. These Terms and Conditions govern your use of our online services. By accessing or using our platform, you agree to comply with these terms.
      </p>

      <h2>2. Acceptance of Terms</h2>
      <p className=".iresha-p">
        By using our services, you confirm that you accept these terms and that you will comply with them. If you do not agree to these terms, you must not use our services.
      </p>

      <h2 className=".iresha-h2">3. User Accounts</h2>
      <p className=".iresha-p">
        To access certain features, you may be required to create an account. You must provide accurate and complete information and keep your account credentials confidential. You are responsible for all activities under your account.
      </p>

      <h2 className=".iresha-h2">4. Products and Services</h2>
      <p className=".iresha-p">
        We strive to provide accurate descriptions of our products and services. However, we do not warrant that the information is error-free, complete, or current. Prices and availability are subject to change without notice.
      </p>

      <h2 className=".iresha-h2">5. Payment Terms</h2>
      <p className=".iresha-p">
        Payments for purchases must be made through the payment methods provided on our platform. You agree to provide valid and accurate payment information.
      </p>

      <h2 className=".iresha-h2">6. Returns and Refunds</h2>
      <p className=".iresha-p">
        Our return and refund policy is outlined separately on our website. Please refer to that policy for details regarding eligibility and process.
      </p>

      <h2 className=".iresha-h2">7. Limitation of Liability</h2>
      <p className=".iresha-p">
        To the extent permitted by law, Aradhana Books & Stationary shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of our services.
      </p>

      <h2 className=".iresha-h2">8. Modifications to Terms</h2>
      <p className=".iresha-p">
        We may update these Terms and Conditions from time to time. We will notify you of any changes by posting the new terms on our website. Your continued use of our services after any modifications constitutes your acceptance of the new terms.
      </p>

      <h2 className=".iresha-h2">9. Governing Law</h2>
      <p className=".iresha-p">
        These terms are governed by the laws of Sri Lanka. Any disputes arising from these terms shall be resolved in the courts of Elpitiya.
      </p>

      <h2 className=".iresha-h2">10. Contact Information</h2>
      <p className=".iresha-p">
        If you have any questions about these Terms and Conditions, please contact us at +94 91 572 0544
        .
      </p>

      <button id="iresha-button" onClick={() => window.history.back()}>
        Back
      </button>
    </div>
  );
};

export default TermsAndConditions;
