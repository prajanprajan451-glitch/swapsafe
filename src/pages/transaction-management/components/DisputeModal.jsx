import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DisputeModal = ({ isOpen, onClose, transaction, onSubmitDispute }) => {
  const [disputeData, setDisputeData] = useState({
    reason: '',
    description: '',
    evidence: [],
    requestedAction: 'refund'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const disputeReasons = [
    { value: 'item_not_received', label: 'Item not received' },
    { value: 'item_not_as_described', label: 'Item not as described' },
    { value: 'damaged_item', label: 'Item arrived damaged' },
    { value: 'wrong_item', label: 'Wrong item received' },
    { value: 'seller_unresponsive', label: 'Seller unresponsive' },
    { value: 'payment_issue', label: 'Payment processing issue' },
    { value: 'other', label: 'Other reason' }
  ];

  const requestedActions = [
    { value: 'refund', label: 'Full refund' },
    { value: 'partial_refund', label: 'Partial refund' },
    { value: 'replacement', label: 'Item replacement' },
    { value: 'return', label: 'Return item' }
  ];

  const handleInputChange = (field, value) => {
    setDisputeData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event?.target?.files);
    const newEvidence = files?.map(file => ({
      id: Date.now() + Math.random(),
      name: file?.name,
      size: file?.size,
      type: file?.type,
      file: file
    }));
    
    setDisputeData(prev => ({
      ...prev,
      evidence: [...prev?.evidence, ...newEvidence]
    }));
  };

  const removeEvidence = (evidenceId) => {
    setDisputeData(prev => ({
      ...prev,
      evidence: prev?.evidence?.filter(item => item?.id !== evidenceId)
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmitDispute(transaction?.id, disputeData);
      onClose();
      setDisputeData({
        reason: '',
        description: '',
        evidence: [],
        requestedAction: 'refund'
      });
    } catch (error) {
      console.error('Failed to submit dispute:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-300 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-heading font-semibold text-card-foreground">
              Report Issue
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Order #{transaction?.id} - {transaction?.product?.name}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Dispute Reason */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              What's the issue? *
            </label>
            <select
              value={disputeData?.reason}
              onChange={(e) => handleInputChange('reason', e?.target?.value)}
              required
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
            >
              <option value="">Select a reason</option>
              {disputeReasons?.map((reason) => (
                <option key={reason?.value} value={reason?.value}>
                  {reason?.label}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <Input
              label="Detailed Description *"
              type="text"
              placeholder="Please provide detailed information about the issue..."
              value={disputeData?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
              required
              description="Be specific about what happened and when. This helps us resolve your dispute faster."
            />
          </div>

          {/* Requested Action */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              What would you like us to do?
            </label>
            <select
              value={disputeData?.requestedAction}
              onChange={(e) => handleInputChange('requestedAction', e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
            >
              {requestedActions?.map((action) => (
                <option key={action?.value} value={action?.value}>
                  {action?.label}
                </option>
              ))}
            </select>
          </div>

          {/* Evidence Upload */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Supporting Evidence
            </label>
            <p className="text-sm text-text-secondary mb-3">
              Upload photos, screenshots, or documents that support your claim (Max 5 files, 10MB each)
            </p>
            
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="evidence-upload"
              />
              <label
                htmlFor="evidence-upload"
                className="cursor-pointer flex flex-col items-center space-y-2"
              >
                <Icon name="Upload" size={32} className="text-text-secondary" />
                <span className="text-sm text-card-foreground font-medium">
                  Click to upload files
                </span>
                <span className="text-xs text-text-secondary">
                  PNG, JPG, PDF, DOC up to 10MB each
                </span>
              </label>
            </div>

            {/* Uploaded Files */}
            {disputeData?.evidence?.length > 0 && (
              <div className="mt-4 space-y-2">
                {disputeData?.evidence?.map((file) => (
                  <div
                    key={file?.id}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name="File" size={16} className="text-text-secondary" />
                      <div>
                        <div className="text-sm font-medium text-card-foreground">
                          {file?.name}
                        </div>
                        <div className="text-xs text-text-secondary">
                          {formatFileSize(file?.size)}
                        </div>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEvidence(file?.id)}
                      iconName="X"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Important Notice */}
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
              <div>
                <h4 className="font-medium text-card-foreground mb-1">
                  Important Notice
                </h4>
                <p className="text-sm text-text-secondary">
                  Filing a false dispute may result in account suspension. Our AI system will review all evidence and communications. The dispute resolution process typically takes 3-5 business days.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              disabled={!disputeData?.reason || !disputeData?.description}
            >
              Submit Dispute
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DisputeModal;