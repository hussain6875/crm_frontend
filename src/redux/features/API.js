const basic_api = "http://localhost:8080";
export const getAllTickets = `${basic_api}/tickets`;
export const getTicketById = (id) => {
  return `${basic_api}/tickets/${id}`;
};
export const createTicket = `${getAllTickets}/create`;
export const editTicket = `${getAllTickets}/edit/`;
export const allActivities = `${basic_api}/activities`;

export const attachImage = `${basic_api}/files`;
