// Status color mapping for follow-ups
export const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "warning";
    case "in_progress":
      return "info";
    case "resolved":
      return "success";
    case "closed":
      return "light";
    default:
      return "light";
  }
};

// Priority color mapping for follow-ups
export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent":
      return "error";
    case "high":
      return "warning";
    case "medium":
      return "info";
    case "low":
      return "success";
    default:
      return "light";
  }
};

// Customer follow-up type colors
export const getCustomerFollowUpTypeColor = (type: string) => {
  switch (type) {
    case "complaint":
      return "error";
    case "issue":
      return "warning";
    case "inquiry":
      return "info";
    case "feedback":
      return "success";
    default:
      return "light";
  }
};

// Payment follow-up type colors
export const getPaymentFollowUpTypeColor = (type: string) => {
  switch (type) {
    case "payment_failed":
      return "error";
    case "billing_dispute":
      return "warning";
    case "payment_due":
      return "info";
    case "refund_request":
      return "primary";
    case "payment_verification":
      return "success";
    default:
      return "light";
  }
};

// Delivery follow-up type colors
export const getDeliveryFollowUpTypeColor = (type: string) => {
  switch (type) {
    case "delivery_delay":
      return "warning";
    case "failed_delivery":
      return "error";
    case "damage_report":
      return "error";
    case "delivery_confirmation":
      return "success";
    case "route_issue":
      return "info";
    default:
      return "light";
  }
};

// Returns follow-up type colors
export const getReturnsFollowUpTypeColor = (type: string) => {
  switch (type) {
    case "return_request":
      return "info";
    case "return_processing":
      return "warning";
    case "refund_processing":
      return "primary";
    case "return_pickup":
      return "success";
    case "return_verification":
      return "success";
    default:
      return "light";
  }
};

// Refund status color mapping
export const getRefundStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "warning";
    case "processing":
      return "info";
    case "completed":
      return "success";
    case "failed":
      return "error";
    default:
      return "light";
  }
};

// Format date and time for display
export const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Format currency amount
export const formatAmount = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

// Check if a follow-up is overdue
export const isOverdue = (dueDate: string, followUps: any[]) => {
  return new Date(dueDate) < new Date() && 
         followUps.find(f => f.dueDate === dueDate)?.status !== 'resolved' &&
         followUps.find(f => f.dueDate === dueDate)?.status !== 'closed';
};

// Calculate days overdue
export const getDaysOverdue = (dueDate: string) => {
  return Math.ceil((new Date().getTime() - new Date(dueDate).getTime()) / (1000 * 60 * 60 * 24));
};
